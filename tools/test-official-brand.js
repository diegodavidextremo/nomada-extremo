/* Verify the exact human-selected brand source and complete site-wide icon migration. */
const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict'),crypto=require('node:crypto'),sharp=require('sharp');
const root=path.resolve(__dirname,'..'),hash=data=>crypto.createHash('sha256').update(data).digest('hex');
(async()=>{
 const source=fs.readFileSync(path.join(root,'assets/images/emblema-oficial-actual.png'));
 const approved=fs.readFileSync(process.env.NOEXT_APPROVED_LOGO_PATH || 'C:/Users/Diego/Downloads/NÓMADA EXTREMO LOGO PARA WEB Y MARCA OFICIAL NOCHE.png');assert.equal(hash(source),hash(approved));
 for(const name of fs.readdirSync(root).filter(file=>file.endsWith('.html'))){const html=fs.readFileSync(path.join(root,name),'utf8');assert(!/assets\/images\/(?:logo-oficial|logo-photoroom)\.png/.test(html),name+' old emblem');for(const match of html.matchAll(/href="(assets\/icons\/[^"?]+)(?:\?[^" ]*)?"/g))assert(fs.existsSync(path.join(root,match[1])),name+' missing icon');}
 for(const name of ['components.js','chatbot.js']){const code=fs.readFileSync(path.join(root,'assets/js',name),'utf8');assert(code.includes('emblema-oficial-web.webp'));assert(!code.includes('logo-photoroom.png'));}
 const icon=await sharp(source).resize(32,32,{fit:'contain',background:{r:0,g:0,b:0,alpha:0}}).png().toBuffer();assert.equal(hash(icon),hash(fs.readFileSync(path.join(root,'assets/icons/favicon-32x32.png'))));
 const ico=fs.readFileSync(path.join(root,'assets/icons/favicon.ico'));assert.equal(ico.readUInt16LE(2),1);assert.equal(ico.readUInt16LE(4),1);assert.equal(ico.readUInt32LE(22),0x474e5089);
 const photo=fs.readFileSync(path.join(root,'assets/images/castillo-aguilas-roncaor-web.jpg'));const svg=fs.readFileSync(path.join(root,'assets/images/community-oficial-2026/camiseta-carnaval-noext.svg'),'utf8');assert.equal(hash(Buffer.from([...svg.matchAll(/data:image\/jpeg;base64,([^"]+)/g)].at(-1)[1],'base64')),hash(photo));
 console.log('Exact NIGHT source, favicon pixels, ICO and site-wide emblem references verified.');
})().catch(error=>{console.error(error);process.exitCode=1});
