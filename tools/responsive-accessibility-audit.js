#!/usr/bin/env node
/* Responsive/accessibility audit for the static Nómada Extremo site. No project dependencies required. */
const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const excludedDirs = new Set(['.git', 'NOMADX', 'DiegoDavidExtremoAndroid', 'NomadaExtremoAndroid', 'SalidaDiscreta', 'MemoriaTotal', 'webs-diego', 'node_modules']);
const breakpoints = [320, 360, 390, 412, 430, 480, 600, 640, 768, 820, 900, 1024, 1200, 1366, 1440, 1920];

function walk(dir, out = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.isDirectory()) {
      if (!excludedDirs.has(entry.name)) walk(path.join(dir, entry.name), out);
    } else if (entry.isFile() && entry.name.endsWith('.html')) {
      out.push(path.join(dir, entry.name));
    }
  }
  return out;
}

function count(re, text) { return (text.match(re) || []).length; }
function has(re, text) { return re.test(text); }

const pages = walk(root).sort();
const results = [];
for (const file of pages) {
  const html = fs.readFileSync(file, 'utf8');
  const rel = path.relative(root, file).replaceAll('\\', '/');
  const checks = [];
  const h1Count = count(/<h1\b/gi, html);
  const imgTags = html.match(/<img\b[^>]*>/gi) || [];
  const imgsWithoutAlt = imgTags.filter(tag => !/\salt\s*=\s*['"]/i.test(tag));
  const forms = count(/<form\b/gi, html);
  const labels = count(/<label\b/gi, html);
  if (!has(/<meta\s+name=["']viewport["']/i, html)) checks.push('Falta meta viewport');
  if (h1Count !== 1) checks.push(`H1 esperado 1, encontrado ${h1Count}`);
  if (!has(/<script\s+src=["']assets\/js\/components\.js["']/i, html)) checks.push('No carga components.js compartido');
  if (!has(/<link\s+rel=["']icon["']/i, html)) checks.push('No declara favicon');
  if (imgsWithoutAlt.length) checks.push(`${imgsWithoutAlt.length} imagen(es) sin alt`);
  if (forms && labels === 0) checks.push('Formulario sin labels visibles');
  results.push({ page: rel, h1Count, images: imgTags.length, forms, labels, issues: checks });
}

const summary = {
  generatedAt: new Date().toISOString(),
  breakpoints,
  pagesChecked: results.length,
  pagesWithIssues: results.filter(r => r.issues.length).length,
  results
};

console.log(JSON.stringify(summary, null, 2));
if (summary.pagesWithIssues) {
  process.exitCode = 1;
}