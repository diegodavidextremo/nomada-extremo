const fs=require('fs'),path=require('path');const root=path.resolve(__dirname,'..');
const read=f=>fs.readFileSync(path.join(root,f),'utf8'),write=(f,s)=>fs.writeFileSync(path.join(root,f),s);
let s=read('tools/browser-stage3.js');
s=s.replace(" await page.locator('#fixed-cost').fill('1000');"," await page.locator('#economy-form').evaluate(e=>e.closest('details').open=true);\n await page.locator('#fixed-cost').fill('1000');");
s=s.replace('/25 unidades/','/25 plazas/').replace('/no hay un margen/','/no queda dinero/');
s=s.replaceAll(" await page.locator('[data-defense-start]').first().click();"," await page.locator('[data-defense-start]').first().evaluate(e=>e.closest('details').open=true);\n await page.locator('[data-defense-start]').first().click();");
s=s.replace("getAttribute('id'),'tres-capas'","getAttribute('id'),'trabajo-lunes'");
s=s.replace(/count\(\),17\)/g,'count(),10)');write('tools/browser-stage3.js',s);
s=read('tools/test-interface-review.js').replaceAll("'.contact-channel-grid'","'.contact-directory'");write('tools/test-interface-review.js',s);
for(const file of fs.readdirSync(root).filter(f=>f.endsWith('.html'))){
 s=read(file).replace(/(assets\/(?:js|css)\/(?:components|site-improvements|intermodular|shared)\.(?:js|css))\?v=[^" ]+/g,'$1?v=20261025-2');write(file,s);
}
s=read('assets/js/components.js').replace('site-improvements.js?v=20261025','site-improvements.js?v=20261025-2').replace('i18n.js?v=20261025','i18n.js?v=20261025-2');write('assets/js/components.js',s);
s=read('assets/js/i18n.js').replace("catalogVersion = '20261025'","catalogVersion = '20261025-2'");write('assets/js/i18n.js',s);
console.log('Versioned editorial corrections and updated tests for the simpler ten-part project.');
