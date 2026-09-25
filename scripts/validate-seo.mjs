import { readFileSync, existsSync } from 'node:fs';
import { resolve, relative, dirname } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const errors = [];
const warnings = [];

const routeMap = new Map([
  ['/', 'index.html'],
  ['/services/', 'services/index.html'],
  ['/services/house-cleaning', 'services/house-cleaning.html'],
  ['/services/commercial-cleaning', 'services/commercial-cleaning.html'],
  ['/services/deep-cleaning', 'services/deep-cleaning.html'],
  ['/services/move-in-move-out-cleaning', 'services/move-in-move-out-cleaning.html'],
  ['/services/post-construction-cleaning', 'services/post-construction-cleaning.html'],
  ['/service-areas', 'service-areas.html'],
  ['/privacy-policy', 'privacy-policy.html']
]);

const indexableRoutes = [...routeMap.keys()].filter((route) => route !== '/privacy-policy');
const read = (file) => readFileSync(resolve(root, file), 'utf8');
const match = (html, pattern) => html.match(pattern)?.[1]?.trim() ?? '';
const stripTags = (value) => value.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
const targetFileForPath = (pathname) => {
  if (routeMap.has(pathname)) return routeMap.get(pathname);
  if (/\.[a-z0-9]+$/i.test(pathname)) return pathname.slice(1);
  if (pathname.endsWith('/')) return `${pathname.slice(1)}index.html`;
  return `${pathname.slice(1)}.html`;
};

for (const required of ['404.html', '_headers', '_redirects', 'robots.txt', 'sitemap.xml', 'llms.txt', 'assets/seo-pages.css']) {
  if (!existsSync(resolve(root, required))) errors.push(`Missing required file: ${required}`);
}

const sitemap = read('sitemap.xml');
const sitemapUrls = [...sitemap.matchAll(/<loc>(https:\/\/prmbcleaning\.com[^<]+)<\/loc>/g)].map((item) => item[1]);
const sitemapPaths = sitemapUrls.map((url) => new URL(url).pathname);

for (const route of indexableRoutes) {
  if (!sitemapPaths.includes(route)) errors.push(`Indexable route missing from sitemap: ${route}`);
}
for (const route of sitemapPaths) {
  if (!indexableRoutes.includes(route)) errors.push(`Unexpected or non-indexable route in sitemap: ${route}`);
}

const titles = new Map();
const descriptions = new Map();

for (const [route, file] of routeMap) {
  const absolute = resolve(root, file);
  if (!existsSync(absolute)) {
    errors.push(`Route ${route} has no file: ${file}`);
    continue;
  }

  const html = read(file);
  const title = stripTags(match(html, /<title>([\s\S]*?)<\/title>/i));
  const description = match(html, /<meta\s+name=["']description["']\s+content=["']([^"']+)["']/i);
  const canonical = match(html, /<link\s+rel=["']canonical["']\s+href=["']([^"']+)["']/i);
  const h1Count = (html.match(/<h1(?:\s|>)/gi) ?? []).length;
  const robots = match(html, /<meta\s+name=["']robots["']\s+content=["']([^"']+)["']/i);

  if (!title || title.length > 65) errors.push(`${file}: invalid title length (${title.length})`);
  if (!description || description.length < 70 || description.length > 165) errors.push(`${file}: invalid meta description length (${description.length})`);
  if (h1Count !== 1) errors.push(`${file}: expected 1 H1, found ${h1Count}`);
  if (route !== '/privacy-policy' && robots.includes('noindex')) errors.push(`${file}: indexable page contains noindex`);
  if (route !== '/privacy-policy' && canonical !== `https://prmbcleaning.com${route}`) errors.push(`${file}: canonical mismatch (${canonical})`);

  if (titles.has(title)) errors.push(`${file}: duplicate title also used by ${titles.get(title)}`);
  else titles.set(title, file);
  if (descriptions.has(description)) errors.push(`${file}: duplicate description also used by ${descriptions.get(description)}`);
  else descriptions.set(description, file);

  for (const script of html.matchAll(/<script\s+type=["']application\/ld\+json["']>([\s\S]*?)<\/script>/gi)) {
    try { JSON.parse(script[1]); }
    catch (error) { errors.push(`${file}: invalid JSON-LD (${error.message})`); }
  }

  for (const link of html.matchAll(/href=["']([^"']+)["']/gi)) {
    const href = link[1];
    if (/^(?:https?:|mailto:|tel:|sms:|data:)/i.test(href) || href.startsWith('#')) continue;
    const url = new URL(href, `https://prmbcleaning.com${route}`);
    if (url.hostname !== 'prmbcleaning.com') continue;
    const targetFile = targetFileForPath(url.pathname);
    if (!existsSync(resolve(root, targetFile))) errors.push(`${file}: broken internal link ${href} -> ${targetFile}`);
  }
}

const page404 = read('404.html');
if (!/name=["']robots["'][^>]+noindex/i.test(page404)) errors.push('404.html must be noindex');
if ((page404.match(/<h1(?:\s|>)/gi) ?? []).length !== 1) errors.push('404.html must contain exactly one H1');

const robots = read('robots.txt');
for (const token of ['Sitemap: https://prmbcleaning.com/sitemap.xml', 'OAI-SearchBot', 'Claude-SearchBot', 'Googlebot']) {
  if (!robots.includes(token)) errors.push(`robots.txt missing ${token}`);
}

const redirects = read('_redirects');
for (const legacy of ['/privacy-policy.html', '/privacy-policy/', '/about/']) {
  if (!redirects.includes(legacy)) errors.push(`_redirects missing legacy route ${legacy}`);
}

if (warnings.length) console.warn(`Warnings:\n- ${warnings.join('\n- ')}`);
if (errors.length) {
  console.error(`SEO validation failed (${errors.length}):\n- ${errors.join('\n- ')}`);
  process.exit(1);
}

console.log(`SEO validation passed: ${indexableRoutes.length} indexable routes, ${sitemapUrls.length} sitemap URLs, ${titles.size} unique page titles.`);
