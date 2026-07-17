const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const version = process.argv[2];

if (!/^\d{8}-\d+$/.test(version || '')) {
  console.error('Uso: node tools/bump-components-version.js AAAAMMDD-N');
  process.exit(1);
}

let updated = 0;
for (const name of fs.readdirSync(root)) {
  if (!name.endsWith('.html')) continue;
  const file = path.join(root, name);
  const source = fs.readFileSync(file, 'utf8');
  const next = source.replace(
    /assets\/js\/components\.js(?:\?v=[0-9-]+)?/g,
    `assets/js/components.js?v=${version}`
  );
  if (next === source) continue;
  fs.writeFileSync(file, next, 'utf8');
  updated += 1;
}

console.log(`components.js?v=${version}: ${updated} páginas actualizadas.`);
