(() => {
  const form=document.getElementById('review-demo');
  if(!form)return;
  form.addEventListener('submit',event=>{
    event.preventDefault();
    if(!form.reportValidity())return;
    const preview=document.querySelector('.adventure-review-preview');
    const data=new FormData(form);
    preview.querySelector('.review-stars').textContent=String(data.get('valoracion')).split(' ')[0];
    preview.querySelector('blockquote').textContent=String(data.get('comentario')).trim();
    preview.querySelector('footer strong').textContent=String(data.get('nombre')).trim();
    preview.querySelector('footer div>span').textContent=String(data.get('actividad')).trim();
    preview.hidden=false;
    let status=form.querySelector('[role="status"]');
    if(!status){status=document.createElement('p');status.setAttribute('role','status');form.appendChild(status);}
    const messages={es:'Vista previa preparada. No se ha enviado ni guardado ningún dato.',en:'Preview ready. No data has been sent or saved.',fr:'Aperçu prêt. Aucune donnée envoyée ou enregistrée.',de:'Vorschau bereit. Es wurden keine Daten gesendet oder gespeichert.',it:'Anteprima pronta. Nessun dato inviato o salvato.',pt:'Pré-visualização pronta. Nenhum dado enviado ou guardado.'};
    status.textContent=messages[document.documentElement.lang]||messages.es;
  });
})();
