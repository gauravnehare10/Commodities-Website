/**
 * JS performance budget (docs/PROJECT_REQUIREMENTS.md NFR-01): ≤ 150 KB gzip of JS per route.
 * Reads each prerendered HTML file, sums the gzipped size of every /assets/*.js it references
 * (modulepreload + module scripts) and fails if any route exceeds the budget.
 * Run after `npm run build`: npm run budget
 */
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';
import { gzipSync } from 'node:zlib';

const BUDGET_KB = 150;
const root = join(import.meta.dirname, '..', 'build', 'client');
const gzCache = new Map<string, number>();
const gz = (file: string) => {
  if (!gzCache.has(file))
    gzCache.set(file, gzipSync(readFileSync(join(root, 'assets', file))).length);
  return gzCache.get(file)!;
};

function htmlFiles(dir: string): string[] {
  return readdirSync(dir).flatMap((name) => {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) return name === 'assets' ? [] : htmlFiles(p);
    return name.endsWith('.html') && !name.startsWith('__') ? [p] : [];
  });
}

let failed = false;
const rows = htmlFiles(root).map((file) => {
  const html = readFileSync(file, 'utf8');
  const scripts = new Set([...html.matchAll(/\/assets\/([\w.-]+\.js)/g)].map((m) => m[1]!));
  const kb = [...scripts].reduce((sum, f) => sum + gz(f), 0) / 1024;
  if (kb > BUDGET_KB) failed = true;
  return {
    route:
      '/' +
      relative(root, file)
        .replace(/\\/g, '/')
        .replace(/index\.html$/, ''),
    kb,
    files: scripts.size,
  };
});

rows.sort((a, b) => b.kb - a.kb);
for (const r of rows) {
  console.log(
    `${r.kb > BUDGET_KB ? '✖' : '✔'} ${r.route.padEnd(42)} ${r.kb.toFixed(1).padStart(6)} KB gz  (${r.files} files)`,
  );
}
if (failed) {
  console.error(`\nJS budget exceeded (${BUDGET_KB} KB gzip per route).`);
  process.exit(1);
}
console.log(`\nAll routes within ${BUDGET_KB} KB gzip JS budget.`);
