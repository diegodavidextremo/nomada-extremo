import json, urllib.parse, urllib.request, re, time
from pathlib import Path
ROOT=Path(__file__).resolve().parents[1]
FILES=[('naturista-mar','Naked swimming.jpg'),('naturista-sendero','Free-hiking in Sicily.jpg'),('naturista-paddle','Nacktwanderung im Harz II.JPG'),('naturista-amanecer','Beautiful sunrise from Taitung beach.jpg'),('naturista-ritual','Naturist woman sitting next to pond.jpg'),('naturista-horizonte','Naturist in crimea.jpg')]
def get(url):
 return urllib.request.urlopen(urllib.request.Request(url,headers={'User-Agent':'NomadaExtremoAcademicProject/1.0 (licensed illustrative media selection)'}),timeout=45)
out=ROOT/'assets/images/packs-2026';out.mkdir(exist_ok=True,parents=True)
entries=[]
prior=json.loads((out/'naturist-sources.json').read_text(encoding='utf8')) if (out/'naturist-sources.json').exists() else []
for ident,title in FILES:
 existing=next((e for e in prior if e['id']==ident and e['title']==title),None)
 if existing and Path(existing['local']).exists():
  entries.append(existing)
  continue
 params={'action':'query','format':'json','prop':'imageinfo','iiprop':'url|extmetadata|size','titles':'File:'+title}
 data=json.load(get('https://commons.wikimedia.org/w/api.php?'+urllib.parse.urlencode(params)))
 page=next(iter(data['query']['pages'].values()));info=page['imageinfo'][0];meta=info['extmetadata']
 clean=lambda x:re.sub('<[^>]*>','',x)
 entry={'id':ident,'title':title,'source':info['descriptionurl'],'url':info['url'],'author':clean(meta.get('Artist',{}).get('value','')),'license':meta.get('LicenseShortName',{}).get('value',''),'licenseUrl':meta.get('LicenseUrl',{}).get('value',''),'description':clean(meta.get('ImageDescription',{}).get('value','')),'width':info['width'],'height':info['height']}
 if not any(x in entry['license'] for x in ['CC BY','CC0','Public domain']):raise RuntimeError('Unverified reusable license '+str(entry))
 source=out/(ident+'-reference'+Path(title).suffix.lower());source.write_bytes(get(info['url']).read());entry['local']=str(source);entries.append(entry)
 (out/'naturist-sources.json').write_text(json.dumps(entries,ensure_ascii=False,indent=2),encoding='utf8')
 print(json.dumps({k:entry[k] for k in ['id','author','license','width','height','description']},ensure_ascii=False),flush=True)
 time.sleep(2)
(out/'naturist-sources.json').write_text(json.dumps(entries,ensure_ascii=False,indent=2),encoding='utf8')
