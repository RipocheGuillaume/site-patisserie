import { writeFileSync } from 'node:fs';
const value = process.env.API_BASE_URL;
if (!value) throw new Error('Définissez la variable GitHub API_BASE_URL (ex. https://api.exemple.fr/api).');
const url = new URL(value);
if (url.protocol !== 'https:' || url.username || url.password || url.search || url.hash ||
    ['localhost', '127.0.0.1', '[::1]'].includes(url.hostname)) {
  throw new Error('API_BASE_URL doit être une URL HTTPS publique sans identifiants, paramètres ou fragment.');
}
const apiUrl = url.href.replace(/\/$/, '');
writeFileSync(new URL('../src/environments/environment.production.ts', import.meta.url),
  `export const environment = { apiUrl: ${JSON.stringify(apiUrl)} };\n`);
