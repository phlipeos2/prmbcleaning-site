import { existsSync, mkdirSync, readFileSync, rmSync } from 'node:fs';
import { spawn } from 'node:child_process';
import { resolve, sep } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const outputDir = resolve(root, '.lighthouseci');
const tempDir = resolve(root, '.tmp');
const lighthouseCli = resolve(root, 'node_modules/lighthouse/cli/index.js');
const serverScript = resolve(root, 'scripts/serve.mjs');
const debugPort = 9300 + (process.pid % 500);
const chromeProfile = resolve(tempDir, `chrome-profile-${process.pid}`);
const routes = [
  ['home', '/'],
  ['services', '/services/'],
  ['house-cleaning', '/services/house-cleaning'],
  ['commercial-cleaning', '/services/commercial-cleaning'],
  ['deep-cleaning', '/services/deep-cleaning'],
  ['move-cleaning', '/services/move-in-move-out-cleaning'],
  ['post-construction', '/services/post-construction-cleaning'],
  ['service-areas', '/service-areas']
];
const thresholds = { accessibility: 0.9, 'best-practices': 0.9, seo: 0.95 };

mkdirSync(outputDir, { recursive: true });
mkdirSync(tempDir, { recursive: true });
mkdirSync(chromeProfile, { recursive: true });

const chromeCandidates = [
  process.env.CHROME_PATH,
  process.env.PROGRAMFILES && resolve(process.env.PROGRAMFILES, 'Google/Chrome/Application/chrome.exe'),
  process.env['PROGRAMFILES(X86)'] && resolve(process.env['PROGRAMFILES(X86)'], 'Google/Chrome/Application/chrome.exe'),
  process.env.LOCALAPPDATA && resolve(process.env.LOCALAPPDATA, 'Google/Chrome/Application/chrome.exe'),
  '/usr/bin/google-chrome-stable',
  '/usr/bin/google-chrome',
  '/usr/bin/chromium-browser',
  '/usr/bin/chromium'
].filter(Boolean);
const chromePath = chromeCandidates.find((candidate) => existsSync(candidate));
if (!chromePath) throw new Error('Chrome was not found. Set CHROME_PATH before running Lighthouse.');

const run = (command, args, options = {}) => new Promise((resolvePromise, reject) => {
  const child = spawn(command, args, { cwd: root, stdio: ['ignore', 'pipe', 'pipe'], ...options });
  let stdout = '';
  let stderr = '';
  child.stdout?.on('data', (chunk) => { stdout += chunk; });
  child.stderr?.on('data', (chunk) => { stderr += chunk; });
  child.on('error', reject);
  child.on('exit', (code) => code === 0
    ? resolvePromise({ stdout, stderr })
    : reject(new Error(`${command} exited ${code}\n${stdout}\n${stderr}`)));
});

const server = spawn(process.execPath, [serverScript], { cwd: root, stdio: ['ignore', 'pipe', 'pipe'] });
const ready = new Promise((resolveReady, reject) => {
  const timer = setTimeout(() => reject(new Error('Local audit server did not start in time.')), 10000);
  server.stdout.on('data', (chunk) => {
    if (chunk.toString().includes('READY')) {
      clearTimeout(timer);
      resolveReady();
    }
  });
  server.on('exit', (code) => reject(new Error(`Local audit server stopped with code ${code}.`)));
});

const failures = [];
const summaries = [];
const chrome = spawn(chromePath, [
  '--headless=new',
  `--remote-debugging-port=${debugPort}`,
  `--user-data-dir=${chromeProfile}`,
  '--no-first-run',
  '--no-default-browser-check',
  '--disable-gpu',
  '--no-sandbox',
  'about:blank'
], { cwd: root, stdio: 'ignore' });

const waitForChrome = async () => {
  const deadline = Date.now() + 15000;
  while (Date.now() < deadline) {
    try {
      const response = await fetch(`http://127.0.0.1:${debugPort}/json/version`);
      if (response.ok) return;
    } catch {}
    await new Promise((resolveWait) => setTimeout(resolveWait, 250));
  }
  throw new Error('Chrome debugging port did not become ready in time.');
};

try {
  await Promise.all([ready, waitForChrome()]);
  for (const [name, route] of routes) {
    const output = resolve(outputDir, `${name}.json`);
    await run(process.execPath, [
      lighthouseCli,
      `http://127.0.0.1:4173${route}`,
      '--quiet',
      '--output=json',
      `--output-path=${output}`,
      '--only-categories=performance,accessibility,best-practices,seo',
      `--port=${debugPort}`
    ], { env: { ...process.env, TEMP: tempDir, TMP: tempDir } });

    const report = JSON.parse(readFileSync(output, 'utf8'));
    const scores = Object.fromEntries(Object.entries(report.categories).map(([key, value]) => [key, value.score]));
    summaries.push({ page: name, ...scores });
    for (const [category, minimum] of Object.entries(thresholds)) {
      if ((scores[category] ?? 0) < minimum) failures.push(`${name}: ${category} ${scores[category]} < ${minimum}`);
    }
  }
} finally {
  server.kill('SIGTERM');
  chrome.kill('SIGTERM');
  await new Promise((resolveWait) => setTimeout(resolveWait, 750));
  if (chromeProfile.startsWith(`${tempDir}${sep}`)) {
    try { rmSync(chromeProfile, { recursive: true, force: true, maxRetries: 3, retryDelay: 500 }); }
    catch { console.warn(`Temporary Chrome profile remains at ${chromeProfile}`); }
  }
}

console.table(summaries.map((row) => ({
  page: row.page,
  performance: Math.round(row.performance * 100),
  accessibility: Math.round(row.accessibility * 100),
  bestPractices: Math.round(row['best-practices'] * 100),
  seo: Math.round(row.seo * 100)
})));

const lowPerformance = summaries.filter((row) => row.performance < 0.75);
if (lowPerformance.length) console.warn(`Performance warning (<75): ${lowPerformance.map((row) => row.page).join(', ')}`);
if (failures.length) {
  console.error(`Lighthouse quality gates failed:\n- ${failures.join('\n- ')}`);
  process.exit(1);
}
console.log(`Lighthouse quality gates passed for ${summaries.length} pages.`);
