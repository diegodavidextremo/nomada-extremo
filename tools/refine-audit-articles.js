const fs=require('fs'),path=require('path');const root=path.resolve(__dirname,'..');
const read=f=>fs.readFileSync(path.join(root,f),'utf8'),write=(f,s)=>fs.writeFileSync(path.join(root,f),s);
const phrases=[
 ['Antes de elegir una salida','Before choosing an outing','Avant de choisir une sortie','Vor der Auswahl eines Ausflugs','Prima di scegliere un’uscita','Antes de escolher uma saída','Voordat je een uitstap kiest'],
 ['¿Dónde empieza y termina la ruta?','Where does the route start and end?','Où commence et se termine le parcours ?','Wo beginnt und endet die Route?','Dove inizia e finisce il percorso?','Onde começa e termina o percurso?','Waar begint en eindigt de route?'],
 ['¿Qué material aporta el centro?','What equipment does the centre provide?','Quel matériel le centre fournit-il ?','Welche Ausrüstung stellt das Zentrum?','Quale attrezzatura fornisce il centro?','Que equipamento fornece o centro?','Welke uitrusting levert het centrum?'],
 ['¿Qué alternativa hay si cambia el mar?','What is the alternative if sea conditions change?','Quelle alternative si les conditions en mer changent ?','Welche Alternative gibt es bei veränderten Meeresbedingungen?','Qual è l’alternativa se cambiano le condizioni del mare?','Qual é a alternativa se as condições do mar mudarem?','Wat is het alternatief als de omstandigheden op zee veranderen?'],
 ['¿Es una primera experiencia o un curso?','Is this an introductory experience or a course?','Est-ce une découverte ou une formation ?','Ist es ein Schnupperangebot oder ein Kurs?','È una prima esperienza o un corso?','É uma primeira experiência ou um curso?','Is dit een kennismaking of een cursus?'],
 ['¿Cómo se revisan los requisitos personales?','How are individual requirements checked?','Comment les conditions personnelles sont-elles vérifiées ?','Wie werden die persönlichen Voraussetzungen geprüft?','Come vengono verificati i requisiti personali?','Como são verificados os requisitos pessoais?','Hoe worden persoonlijke vereisten gecontroleerd?'],
 ['¿Qué ocurre si decido no continuar?','What happens if I decide not to continue?','Que se passe-t-il si je décide de ne pas continuer ?','Was passiert, wenn ich nicht weitermachen möchte?','Cosa succede se decido di non continuare?','O que acontece se decidir não continuar?','Wat gebeurt er als ik besluit niet verder te gaan?'],
 ['¿Qué modalidad y operador se proponen?','Which activity format and operator are proposed?','Quelle formule et quel opérateur sont proposés ?','Welche Variante und welcher Anbieter werden vorgeschlagen?','Quale modalità e quale operatore sono proposti?','Que modalidade e operador são propostos?','Welke variant en aanbieder worden voorgesteld?'],
 ['¿Cómo se confirma la fecha según las condiciones?','How is the date confirmed based on conditions?','Comment la date est-elle confirmée selon les conditions ?','Wie wird der Termin je nach Bedingungen bestätigt?','Come viene confermata la data in base alle condizioni?','Como é confirmada a data em função das condições?','Hoe wordt de datum bevestigd op basis van de omstandigheden?'],
 ['¿Qué incluye la propuesta y qué es opcional?','What is included in the proposal and what is optional?','Que comprend la proposition et que reste-t-il en option ?','Was ist enthalten und was ist optional?','Cosa include la proposta e cosa è facoltativo?','O que inclui a proposta e o que é opcional?','Wat is inbegrepen in het voorstel en wat is optioneel?'],
 ['Revisión editorial','Editorial review','Révision éditoriale','Redaktionelle Überprüfung','Revisione editoriale','Revisão editorial','Redactionele controle']
];
for(const [i,lang] of ['es','en','fr','de','it','pt','nl'].entries()){
 const d=JSON.parse(read('i18n/'+lang+'.json'));for(const p of phrases)d.strings[p[0]]=p[i];write('i18n/'+lang+'.json',JSON.stringify(d,null,2)+'\n');
}
for(const [file,questions,href] of [
 ['articulo-kayak-aguilas.html',[1,2,3],'kayak-mar.html'],
 ['articulo-bautismo-buceo.html',[4,5,6],'bautismo-buceo.html'],
 ['articulo-primer-vuelo.html',[7,8,9],'guia-actividades.html']
]){
 let html=read(file);if(html.includes('class="article-decision"'))continue;
 const block='<section class="article-decision"><h2>'+phrases[0][0]+'</h2><ul>'+questions.map(i=>'<li>'+phrases[i][0]+'</li>').join('')+'</ul><div class="article-next"><a class="btn btn-mar" href="'+href+'">Ver actividad</a><a class="btn btn-outline" href="material.html">Ver material</a></div><p class="article-reviewed"><span>Revisión editorial</span> · <time datetime="2026-10-25">25/10/2026</time></p></section>';
 html=html.replace('<div class="notice-card">',block+'<div class="notice-card">');write(file,html);
}
console.log('Added translated decision questions and canonical next steps to the three preparation guides.');
