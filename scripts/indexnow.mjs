import { readFileSync, readdirSync } from 'node:fs';
import { resolve } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const endpoint = 'https://api.indexnow.org/indexnow';
const expectedHost = 'prmbcleaning.com';
const submit = process.argv.includes('--submit');
const dryRun = process.argv.includes('--dry-run') || !submit;

if (submit && process.argv.includes('--dry-run')) {
  throw new Error('Choose either --dry-run or --submit, not both.');
}

const sitemap = readFileSync(resolve(root, 'sitemap.xml'), 'utf8');
const urls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1].trim());

if (!urls.length) throw new Error('No URLs found in sitemap.xml.');
if (urls.length > 10_000) throw new Error('IndexNow accepts at most 10,000 URLs per request.');
if (new Set(urls).size !== urls.length) throw new Error('sitemap.xml contains duplicate URLs.');

for (const value of urls) {
  const url = new URL(value);
  if (url.protocol !== 'https:' || url.hostname !== expectedHost) {
    throw new Error(`Unexpected sitemap host or protocol: ${value}`);
  }
  if (url.search || url.hash) throw new Error(`Canonical URL must not contain query or fragment: ${value}`);
}

if (dryRun) {
  console.log(JSON.stringify({
    mode: 'dry-run',
    endpoint,
    host: expectedHost,
    urlCount: urls.length,
    urlList: urls,
    nextGate: 'Deploy and verify the root key file, verify Bing ownership, then obtain action-time owner confirmation.'
  }, null, 2));
  process.exit(0);
}

const confirmation = process.env.INDEXNOW_CONFIRM_SUBMISSION ?? '';
const keyFiles = readdirSync(root, { withFileTypes: true })
  .filter((entry) => entry.isFile() && /^[A-Za-z0-9-]{8,128}\.txt$/.test(entry.name))
  .filter((entry) => readFileSync(resolve(root, entry.name), 'utf8').trim() === entry.name.slice(0, -4));

if (keyFiles.length !== 1) {
  throw new Error('Expected exactly one self-verifying IndexNow key file at the site root.');
}
const key = keyFiles[0].name.slice(0, -4);

if (confirmation !== 'PRMB_ONLY') {
  throw new Error('Set INDEXNOW_CONFIRM_SUBMISSION=PRMB_ONLY only after action-time owner confirmation.');
}

const keyLocation = `https://${expectedHost}/${key}.txt`;
const keyResponse = await fetch(keyLocation, { redirect: 'error' });
if (!keyResponse.ok || (await keyResponse.text()).trim() !== key) {
  throw new Error('The root IndexNow key file is not publicly verifiable.');
}

const response = await fetch(endpoint, {
  method: 'POST',
  headers: { 'content-type': 'application/json; charset=utf-8' },
  body: JSON.stringify({
    host: expectedHost,
    key,
    keyLocation,
    urlList: urls
  })
});

console.log(JSON.stringify({
  mode: 'submit',
  endpoint,
  host: expectedHost,
  urlCount: urls.length,
  status: response.status,
  accepted: response.status === 200 || response.status === 202,
  note: 'A successful receipt does not guarantee crawling or indexing.'
}, null, 2));

if (response.status !== 200 && response.status !== 202) process.exitCode = 1;
