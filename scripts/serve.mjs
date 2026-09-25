import { createServer } from 'node:http';
import { createReadStream, existsSync, statSync } from 'node:fs';
import { extname, resolve, sep } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const port = Number(process.env.PORT || 4173);
const host = '127.0.0.1';
const mime = {
  '.css': 'text/css; charset=utf-8',
  '.html': 'text/html; charset=utf-8',
  '.jpg': 'image/jpeg',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.mp4': 'video/mp4',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.txt': 'text/plain; charset=utf-8',
  '.xml': 'application/xml; charset=utf-8'
};

const resolveRequest = (requestPath) => {
  const pathname = decodeURIComponent(requestPath.split('?')[0]);
  const candidates = pathname === '/'
    ? ['index.html']
    : pathname.endsWith('/')
      ? [`${pathname.slice(1)}index.html`]
      : extname(pathname)
        ? [pathname.slice(1)]
        : [`${pathname.slice(1)}.html`, `${pathname.slice(1)}/index.html`];

  for (const candidate of candidates) {
    const file = resolve(root, candidate);
    if (!file.startsWith(`${root}${sep}`) && file !== root) continue;
    if (existsSync(file) && statSync(file).isFile()) return file;
  }
  return null;
};

const server = createServer((request, response) => {
  const file = resolveRequest(request.url || '/');
  const status = file ? 200 : 404;
  const target = file ?? resolve(root, '404.html');
  response.writeHead(status, {
    'Content-Type': mime[extname(target).toLowerCase()] ?? 'application/octet-stream',
    'Cache-Control': 'no-store',
    'X-Content-Type-Options': 'nosniff'
  });
  if (request.method === 'HEAD') return response.end();
  createReadStream(target).pipe(response);
});

server.listen(port, host, () => {
  console.log(`READY http://${host}:${port}`);
});

const close = () => server.close(() => process.exit(0));
process.on('SIGINT', close);
process.on('SIGTERM', close);
