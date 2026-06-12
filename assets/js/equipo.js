(() => {
  const profiles = [...document.querySelectorAll('.specialist-details')];
  if (!profiles.length || typeof HTMLDialogElement === 'undefined') return;

  const dialog = document.createElement('dialog');
  dialog.className = 'team-profile-dialog';
  dialog.setAttribute('aria-labelledby', 'team-profile-title');
  dialog.innerHTML = `
    <div class="team-profile-dialog__panel">
      <button class="team-profile-dialog__close" type="button" aria-label="Cerrar perfil profesional">×</button>
      <header class="team-profile-dialog__header">
        <span class="team-profile-dialog__kicker">Perfil profesional</span>
        <h2 id="team-profile-title"></h2>
        <p class="team-profile-dialog__role"></p>
      </header>
      <div class="team-profile-dialog__body"></div>
    </div>`;
  document.body.append(dialog);

  const kicker = dialog.querySelector('.team-profile-dialog__kicker');
  const title = dialog.querySelector('#team-profile-title');
  const role = dialog.querySelector('.team-profile-dialog__role');
  const body = dialog.querySelector('.team-profile-dialog__body');
  const closeButton = dialog.querySelector('.team-profile-dialog__close');
  let lastTrigger = null;

  function openProfile(details) {
    const card = details.closest('.specialist-card');
    const content = details.querySelector('.specialist-details__content');
    const tags = card?.querySelector('.specialist-tags');
    if (!card || !content) return;

    kicker.textContent = card.classList.contains('specialist-card--collaborator') ? 'Colaborador técnico especializado' : 'Perfil profesional';
    title.textContent = card.querySelector('h3')?.textContent?.trim() || 'Perfil profesional';
    role.textContent = card.querySelector('.specialist-card__role')?.textContent?.trim() || '';
    body.replaceChildren(content.cloneNode(true));
    if (tags) body.append(tags.cloneNode(true));

    lastTrigger = details.querySelector('summary');
    details.open = false;
    document.body.classList.add('team-profile-open');
    dialog.showModal();
    closeButton.focus();
  }

  profiles.forEach((details) => {
    const summary = details.querySelector('summary');
    if (!summary) return;
    summary.setAttribute('aria-haspopup', 'dialog');
    summary.addEventListener('click', (event) => {
      event.preventDefault();
      openProfile(details);
    });
  });

  function closeProfile() {
    document.body.classList.remove('team-profile-open');
    if (dialog.open) dialog.close();
    lastTrigger?.focus();
  }

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && dialog.open) {
      event.preventDefault();
      closeProfile();
    }
  });

  closeButton.addEventListener('click', closeProfile);
  dialog.addEventListener('click', (event) => {
    if (event.target === dialog) closeProfile();
  });
  dialog.addEventListener('cancel', (event) => {
    event.preventDefault();
    closeProfile();
  });
  dialog.addEventListener('close', () => {
    document.body.classList.remove('team-profile-open');
  });
})();