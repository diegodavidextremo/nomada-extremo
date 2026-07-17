#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const source = path.join(root, 'assets', 'data', 'horizonte-nomada.json');
const target = path.join(root, 'assets', 'data', 'horizonte-nomada-data.js');
const data = JSON.parse(fs.readFileSync(source, 'utf8'));

const output = `/* Generado desde assets/data/horizonte-nomada.json. */\nwindow.NOMADA_HORIZON_DATA = ${JSON.stringify(data, null, 2)};\n`;
fs.writeFileSync(target, output, 'utf8');
console.log(`Horizonte Nómada: ${data.length} conceptos sincronizados.`);
