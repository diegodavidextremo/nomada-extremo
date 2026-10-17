/* Index-only reading trial: browser speech, no microphone, no text-upload service. */
(() => {
  'use strict';
  const entry = document.getElementById('home-reader');
  if (!entry) return;
  const synth = window.speechSynthesis;
  const supported = !!synth && typeof window.SpeechSynthesisUtterance === 'function';
  const locales = {es:'es-ES',en:'en-GB',fr:'fr-FR',de:'de-DE',it:'it-IT',pt:'pt-PT',nl:'nl-NL'};
  const labels = {
    es:{listen:'Escuchar esta página',section:'Escuchar esta sección',pause:'Pausar',resume:'Continuar',stop:'Detener',speed:'Velocidad',starting:'Preparando la lectura…',reading:'Lectura en curso.',paused:'Lectura en pausa.',stopped:'Lectura detenida.',finished:'Lectura finalizada.',empty:'No hay contenido abierto para leer en este apartado.',unsupported:'Este navegador no permite leer en voz alta. Prueba con otro navegador.',missing:'No hay una voz en español disponible en este dispositivo. Prueba otro navegador o añade una voz en los ajustes de tu dispositivo.',loading:'Las voces todavía se están cargando. Espera un momento y vuelve a pulsar.',error:'No se ha podido reproducir la voz. Puedes volver a intentarlo o probar otro navegador.',help:'Se lee el contenido principal y los apartados abiertos, sin menús ni campos de formularios. Algunas voces del navegador necesitan conexión.',voice:'Voz',part:'Apartado',intro:'Introducción',language:'Preparando el idioma seleccionado…'},
    en:{listen:'Listen to this page',section:'Listen to this section',pause:'Pause',resume:'Resume',stop:'Stop',speed:'Speed',starting:'Preparing to read…',reading:'Reading aloud.',paused:'Reading paused.',stopped:'Reading stopped.',finished:'Reading finished.',empty:'There is no open content to read in this section.',unsupported:'This browser cannot read aloud. Try another browser.',missing:'No English voice is available on this device. Try another browser or add a voice in your device settings.',loading:'Voices are still loading. Please wait a moment and press again.',error:'The voice could not be played. You can retry or use another browser.',help:'Reads the main content and open sections, skipping menus and form fields. Some browser voices require an internet connection.',voice:'Voice',part:'Section',intro:'Introduction',language:'Preparing the selected language…'},
    fr:{listen:'Écouter cette page',section:'Écouter cette section',pause:'Pause',resume:'Reprendre',stop:'Arrêter',speed:'Vitesse',starting:'Préparation de la lecture…',reading:'Lecture en cours.',paused:'Lecture en pause.',stopped:'Lecture arrêtée.',finished:'Lecture terminée.',empty:'Aucun contenu ouvert à lire dans cette section.',unsupported:'Ce navigateur ne permet pas la lecture à voix haute. Essayez un autre navigateur.',missing:'Aucune voix française n’est disponible sur cet appareil. Essayez un autre navigateur ou ajoutez une voix dans les réglages de votre appareil.',loading:'Les voix sont en cours de chargement. Patientez un instant et réessayez.',error:'La voix n’a pas pu être lue. Réessayez ou utilisez un autre navigateur.',help:'Lit le contenu principal et les sections ouvertes, sans menus ni champs de formulaire. Certaines voix nécessitent une connexion Internet.',voice:'Voix',part:'Section',intro:'Introduction',language:'Préparation de la langue sélectionnée…'},
    de:{listen:'Diese Seite anhören',section:'Diesen Abschnitt anhören',pause:'Pausieren',resume:'Fortsetzen',stop:'Beenden',speed:'Tempo',starting:'Vorlesen wird vorbereitet…',reading:'Vorlesen läuft.',paused:'Vorlesen pausiert.',stopped:'Vorlesen beendet.',finished:'Vorlesen abgeschlossen.',empty:'In diesem Abschnitt gibt es keinen geöffneten Inhalt zum Vorlesen.',unsupported:'Dieser Browser unterstützt das Vorlesen nicht. Versuche einen anderen Browser.',missing:'Auf diesem Gerät ist keine deutsche Stimme verfügbar. Versuche einen anderen Browser oder füge in den Geräteeinstellungen eine Stimme hinzu.',loading:'Die Stimmen werden noch geladen. Bitte warte einen Moment und versuche es erneut.',error:'Die Stimme konnte nicht abgespielt werden. Versuche es erneut oder nutze einen anderen Browser.',help:'Liest den Hauptinhalt und geöffnete Abschnitte vor, ohne Menüs und Formularfelder. Manche Stimmen benötigen eine Internetverbindung.',voice:'Stimme',part:'Abschnitt',intro:'Einführung',language:'Die ausgewählte Sprache wird vorbereitet…'},
    it:{listen:'Ascolta questa pagina',section:'Ascolta questa sezione',pause:'Pausa',resume:'Riprendi',stop:'Interrompi',speed:'Velocità',starting:'Preparazione della lettura…',reading:'Lettura in corso.',paused:'Lettura in pausa.',stopped:'Lettura interrotta.',finished:'Lettura terminata.',empty:'Non ci sono contenuti aperti da leggere in questa sezione.',unsupported:'Questo browser non supporta la lettura ad alta voce. Prova un altro browser.',missing:'Su questo dispositivo non è disponibile una voce italiana. Prova un altro browser o aggiungi una voce nelle impostazioni del dispositivo.',loading:'Le voci si stanno caricando. Attendi un momento e premi di nuovo.',error:'Non è stato possibile riprodurre la voce. Riprova o utilizza un altro browser.',help:'Legge il contenuto principale e le sezioni aperte, senza menu né campi dei moduli. Alcune voci richiedono una connessione Internet.',voice:'Voce',part:'Sezione',intro:'Introduzione',language:'Preparazione della lingua selezionata…'},
    pt:{listen:'Ouvir esta página',section:'Ouvir esta secção',pause:'Pausar',resume:'Continuar',stop:'Parar',speed:'Velocidade',starting:'A preparar a leitura…',reading:'Leitura em curso.',paused:'Leitura em pausa.',stopped:'Leitura parada.',finished:'Leitura terminada.',empty:'Não há conteúdo aberto para ler nesta secção.',unsupported:'Este navegador não permite a leitura em voz alta. Experimenta outro navegador.',missing:'Não existe uma voz em português disponível neste dispositivo. Experimenta outro navegador ou adiciona uma voz nas definições do dispositivo.',loading:'As vozes ainda estão a carregar. Aguarda um momento e volta a premir.',error:'Não foi possível reproduzir a voz. Tenta novamente ou utiliza outro navegador.',help:'Lê o conteúdo principal e as secções abertas, sem menus nem campos de formulários. Algumas vozes precisam de ligação à Internet.',voice:'Voz',part:'Secção',intro:'Introdução',language:'A preparar o idioma selecionado…'},
    nl:{listen:'Deze pagina beluisteren',section:'Dit onderdeel beluisteren',pause:'Pauzeren',resume:'Doorgaan',stop:'Stoppen',speed:'Snelheid',starting:'Voorlezen wordt voorbereid…',reading:'Voorlezen bezig.',paused:'Voorlezen gepauzeerd.',stopped:'Voorlezen gestopt.',finished:'Voorlezen voltooid.',empty:'Dit onderdeel bevat geen geopende inhoud om voor te lezen.',unsupported:'Deze browser kan niet voorlezen. Probeer een andere browser.',missing:'Er is geen Nederlandse stem beschikbaar op dit apparaat. Probeer een andere browser of voeg een stem toe in de apparaatinstellingen.',loading:'De stemmen worden nog geladen. Wacht even en druk opnieuw.',error:'De stem kon niet worden afgespeeld. Probeer het opnieuw of gebruik een andere browser.',help:'Leest de hoofdinhoud en geopende onderdelen voor, zonder menu’s en formuliervelden. Sommige stemmen hebben een internetverbinding nodig.',voice:'Stem',part:'Onderdeel',intro:'Inleiding',language:'De geselecteerde taal wordt voorbereid…'}
  };
  const excluded = 'header,footer,nav,form,button,input,textarea,select,label,svg,script,style,template,noscript,[hidden],[aria-hidden="true"],[role="dialog"],dialog,details:not([open]),.home-reader,[data-reader-ignore],.site-header,#footer,#contactDock,.site-reading-index,.adventure-review-preview';
  const readable = 'h1,h2,h3,h4,p,li,blockquote,dt,dd,.card-titulo,.act-card-titulo,.curso-titulo,.bono-titulo,.pack-titulo,.sello strong';
  const controls = [];
  let language = currentLanguage(), queue = [], cursor = 0, offset = 0, token = 0;
  let owner = null, phase = 'idle', status = '', voice = null, rate = 1, utterance = null;
  let startupTimer, languageTimer, waitingForLanguage = false;
  const copy = () => labels[language];
  const normalize = text => String(text || '').replace(/\s+/g,' ').trim();
  function currentLanguage() { return labels[document.documentElement.lang?.split('-')[0]] ? document.documentElement.lang.split('-')[0] : 'es'; }
  function icon(name) {
    const paths = {volume:'M11 5 6 9H3v6h3l5 4V5Zm4 3a6 6 0 0 1 0 8m3-11a10 10 0 0 1 0 14',pause:'M9 5v14M15 5v14',play:'m8 5 11 7-11 7V5Z',stop:'M6 6h12v12H6Z'};
    const svg = document.createElementNS('http://www.w3.org/2000/svg','svg');
    svg.setAttribute('viewBox','0 0 24 24');svg.setAttribute('aria-hidden','true');svg.setAttribute('focusable','false');
    const path = document.createElementNS(svg.namespaceURI,'path');path.setAttribute('d',paths[name]);svg.append(path);return svg;
  }
  function button(name, symbol) { const b=document.createElement('button');b.type='button';b.className='home-reader-button home-reader-'+name;b.append(icon(symbol),document.createElement('span'));return b; }
  function setButton(b, text, symbol) { b.querySelector('span').textContent=text;if(symbol)b.replaceChild(icon(symbol),b.firstChild); }
  function makeControl(root, scope, main) {
    root.classList.add('home-reader');root.setAttribute('translate','no');
    const start=button('start','volume'),notice=document.createElement('div'),panel=document.createElement('div');
    notice.className='home-reader-status';notice.setAttribute('role','status');notice.setAttribute('aria-live','polite');notice.setAttribute('aria-atomic','true');
    panel.className='home-reader-controls';panel.id='home-reader-controls-'+controls.length;
    start.setAttribute('aria-controls',panel.id);start.setAttribute('aria-expanded','false');
    const pause=button('pause','pause'),stop=button('stop','stop'),speed=document.createElement('label'),speedText=document.createElement('span'),select=document.createElement('select');
    speed.className='home-reader-speed';
    for(const value of [.75,1,1.25,1.5]){const option=document.createElement('option');option.value=value;option.textContent=value+'×';select.append(option);}
    select.value=rate;speed.append(speedText,select);panel.append(pause,stop,speed);
    const location=document.createElement('div'),help=document.createElement('div');location.className='home-reader-location';help.className='home-reader-help';
    root.append(start,notice,panel,location,help);root.hidden=false;
    const control={root,scope,main,start,notice,panel,pause,stop,speedText,select,location,help};controls.push(control);
    start.addEventListener('click',()=>startReading(control));
    pause.addEventListener('click',togglePause);
    stop.addEventListener('click',()=>{stopReading('stopped');start.focus();});
    select.addEventListener('change',()=>{
      rate=Number(select.value);
      if(owner && ['starting','reading'].includes(phase)){interrupt();speakCurrent();}
      render();
    });
    root.addEventListener('keydown',event=>{if(event.key==='Escape' && owner===control){event.stopPropagation();event.preventDefault();stopReading('stopped');start.focus();}});
    return control;
  }
  function render() {
    const c=copy();
    for(const item of controls){
      const active=item===owner && ['starting','reading','paused'].includes(phase);
      item.root.lang=language;item.root.classList.toggle('is-expanded',active);
      setButton(item.start,item.main?c.listen:c.section);item.start.hidden=active;
      item.start.disabled=!supported || waitingForLanguage;item.start.setAttribute('aria-expanded',String(active));
      setButton(item.pause,phase==='paused'?c.resume:c.pause,phase==='paused'?'play':'pause');setButton(item.stop,c.stop);
      item.pause.disabled=false;item.panel.hidden=!active;
      item.speedText.textContent=c.speed;item.select.value=String(rate);item.help.textContent=c.help;
      const message = item===owner ? c[status]||'' : (!supported && item.main ? c.unsupported : waitingForLanguage && item.main ? c.language : '');
      if(item.notice.textContent!==message)item.notice.textContent=message;
      item.location.textContent=active && voice ? c.voice+': '+voice.name+' · '+voice.lang+(queue[cursor]?' · '+c.part+': '+queue[cursor].heading:'') : '';
    }
  }
  function availableVoice() {
    const preferred=locales[language].toLowerCase();
    return synth.getVoices().filter(v=>v.lang?.toLowerCase().split(/[-_]/)[0]===language)
      .sort((a,b)=>score(b)-score(a))[0] || null;
    function score(v){return (v.lang.toLowerCase()===preferred?100:0)+(v.localService?30:0)+(v.default?5:0);}
  }
  function split(text) {
    const chunks=[];let remaining=text;
    while(remaining.length>160){
      const part=remaining.slice(0,161);let cut=0;
      for(const match of part.matchAll(/[.!?;:]\s/g))if(match.index>65)cut=match.index+1;
      if(!cut)cut=part.lastIndexOf(' ');if(cut<1)cut=160;
      chunks.push(remaining.slice(0,cut).trim());remaining=remaining.slice(cut).trim();
    }
    if(remaining)chunks.push(remaining);return chunks;
  }
  function content(scope) {
    return [...scope.querySelectorAll(readable)].filter(el=>{
      if(el.closest(excluded) || !el.getClientRects().length)return false;
      if(['hidden','collapse'].includes(getComputedStyle(el).visibility))return false;
      // Nested paragraphs/list items are read individually rather than twice.
      if(el.querySelector(readable))return false;
      return !!normalize(el.innerText || el.textContent);
    }).flatMap(el=>{
      const section=el.closest('section');
      const title=section?.querySelector('h1,h2,h3');
      const heading=normalize(title?.innerText || title?.textContent)||copy().intro;
      return split(normalize(el.textContent)).map(text=>({text,heading,node:el}));
    });
  }
  function interrupt() { token++;clearTimeout(startupTimer);utterance=null;if(supported)synth.cancel(); }
  function stopReading(message='') {
    const restoreFocus=owner?.root.contains(document.activeElement) && document.activeElement!==owner.start;
    interrupt();queue=[];cursor=0;offset=0;phase='idle';status=message;render();
    if(restoreFocus && !owner.start.disabled && owner.start.getClientRects().length)owner.start.focus({preventScroll:true});
  }
  function startReading(control) {
    if(!supported || waitingForLanguage)return;
    interrupt();language=currentLanguage();owner=control;queue=[];cursor=0;offset=0;phase='idle';
    const voices=synth.getVoices();voice=availableVoice();
    if(!voice){status=voices.length?'missing':'loading';render();return;}
    queue=content(control.scope);
    if(!queue.length){status='empty';render();return;}
    status='starting';phase='starting';render();speakCurrent();
    if(['starting','reading'].includes(phase))control.pause.focus({preventScroll:true});
  }
  function speakCurrent() {
    while(queue[cursor] && (!queue[cursor].node.getClientRects().length || queue[cursor].node.closest('details:not([open])'))){cursor++;offset=0;}
    if(!owner || !queue[cursor]){stopReading('finished');return;}
    const currentToken=++token,baseOffset=offset,continuing=phase==='reading';
    let began=false;
    const speech=new SpeechSynthesisUtterance(queue[cursor].text.slice(baseOffset));
    utterance=speech;speech.voice=voice;speech.lang=voice.lang||locales[language];speech.rate=rate;
    if(!continuing){phase='starting';status='starting';}
    render();
    startupTimer=setTimeout(()=>{if(token===currentToken && !began)stopReading('error');},12000);
    speech.onstart=()=>{if(token!==currentToken)return;began=true;clearTimeout(startupTimer);phase='reading';status='reading';render();};
    speech.onboundary=event=>{if(token===currentToken && Number.isFinite(event.charIndex))offset=Math.min(baseOffset+event.charIndex,queue[cursor].text.length-1);};
    speech.onend=()=>{if(token!==currentToken)return;clearTimeout(startupTimer);cursor++;offset=0;speakCurrent();};
    speech.onerror=()=>{if(token===currentToken)stopReading('error');};
    try { synth.speak(speech); } catch (_) { stopReading('error'); }
  }
  function togglePause() {
    if(!owner)return;
    if(phase==='paused'){speakCurrent();return;}
    if(!['starting','reading'].includes(phase))return;
    // Cancel plus a word bookmark also works where native pause/resume is unreliable.
    // Without word-boundary events, resume repeats the current short passage.
    interrupt();phase='paused';status='paused';render();
  }
  function languageStarting(event) {
    const next=event.target.closest?.('[data-language-switcher] button[data-lang]')?.dataset.lang;
    if(!next || next===language)return;
    stopReading();waitingForLanguage=true;render();
    clearTimeout(languageTimer);languageTimer=setTimeout(()=>{waitingForLanguage=false;language=currentLanguage();render();},15000);
  }
  makeControl(entry,document.body,true);
  for(const section of document.querySelectorAll('.home-explore-panel>section')){
    const root=document.createElement('div');
    (section.querySelector(':scope>.container')||section).prepend(root);
    makeControl(root,section,false);
  }
  if(supported)synth.addEventListener('voiceschanged',render);
  document.addEventListener('click',languageStarting,true);
  window.addEventListener('noext:languagechange',()=>{clearTimeout(languageTimer);stopReading();waitingForLanguage=false;language=currentLanguage();owner=null;status='';render();});
  window.addEventListener('pagehide',()=>stopReading());
  // A closed section should never keep talking in the background.
  document.addEventListener('toggle',event=>{if(owner && !owner.main && event.target instanceof HTMLDetailsElement && !event.target.open && event.target.contains(owner.root))stopReading('stopped');},true);
  render();
})();
