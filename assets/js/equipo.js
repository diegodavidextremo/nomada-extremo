(() => {
  const profiles = [...document.querySelectorAll('.specialist-details')];
  const leadershipButtons = [...document.querySelectorAll('.leadership-profile-button')];
  if ((!profiles.length && !leadershipButtons.length) || typeof HTMLDialogElement === 'undefined') return;

  const dialog = document.createElement('dialog');
  dialog.className = 'team-profile-dialog';
  dialog.setAttribute('aria-labelledby', 'team-profile-title');
  dialog.innerHTML = `
    <div class="team-profile-dialog__panel">
      <button class="team-profile-dialog__close" type="button" aria-label="Cerrar perfil profesional" data-i18n-aria="october.closeProfile">×</button>
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

  function showProfile({ profileKicker, profileTitle, profileRole, profileContent, profileTags, trigger }) {
    kicker.textContent = profileKicker;
    title.textContent = profileTitle;
    role.textContent = profileRole;
    body.replaceChildren(profileContent);
    if (profileTags) body.append(profileTags);

    lastTrigger = trigger;
    document.body.classList.add('team-profile-open');
    dialog.showModal();
    closeButton.focus();
  }

  function openProfile(details) {
    const card = details.closest('.specialist-card');
    const content = details.querySelector('.specialist-details__content');
    const tags = card?.querySelector('.specialist-tags');
    if (!card || !content) return;

    const summary = details.querySelector('summary');
    details.open = false;
    showProfile({
      profileKicker: (window.noextTranslate || (text => text))('Requisitos del puesto'),
      profileTitle: card.querySelector('h3')?.textContent?.trim() || 'Perfil profesional',
      profileRole: card.querySelector('.specialist-card__role')?.textContent?.trim() || '',
      profileContent: content.cloneNode(true),
      profileTags: tags?.cloneNode(true) || null,
      trigger: summary
    });
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

  leadershipButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const card = button.closest('.leadership-card');
      const template = card?.querySelector('.leadership-profile-template');
      if (!card || !template) return;

      showProfile({
        profileKicker: 'Dirección financiera y operativa',
        profileTitle: card.querySelector('h3')?.textContent?.trim() || 'Perfil directivo',
        profileRole: card.querySelector('.leadership-role')?.textContent?.trim() || '',
        profileContent: template.content.cloneNode(true),
        profileTags: null,
        trigger: button
      });
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
