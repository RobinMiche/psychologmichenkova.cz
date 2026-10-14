// Mobilní menu
const toggle = document.querySelector('.nav-toggle');
const menu = document.getElementById('nav-menu');

toggle.addEventListener('click', () => {
  const open = menu.classList.toggle('open');
  toggle.setAttribute('aria-expanded', open);
  toggle.setAttribute('aria-label', open ? 'Zavřít menu' : 'Otevřít menu');
});

menu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    menu.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
  });
});

document.getElementById('year').textContent = new Date().getFullYear();

// Tlačítka „Objednejte se“ / „Přihlášení“ předvyplní zájem ve formuláři
const zajem = document.getElementById('f-zajem');
document.querySelectorAll('[data-zajem]').forEach(btn => {
  btn.addEventListener('click', () => { zajem.value = btn.dataset.zajem; });
});

// Odeslání formuláře přes Formspree (fetch, bez přesměrování)
const form = document.getElementById('contactForm');
const formStatus = form.querySelector('.form-status');
const submitBtn = form.querySelector('button[type="submit"]');

form.addEventListener('submit', async e => {
  e.preventDefault();
  formStatus.className = 'form-status';
  formStatus.textContent = '';
  submitBtn.disabled = true;
  submitBtn.textContent = 'Odesílám…';

  try {
    const res = await fetch(form.action, {
      method: 'POST',
      body: new FormData(form),
      headers: { Accept: 'application/json' }
    });
    if (!res.ok) throw new Error(res.status);
    form.reset();
    formStatus.classList.add('ok');
    formStatus.textContent = 'Děkuji, zpráva byla odeslána. Ozvu se vám co nejdříve.';
  } catch (err) {
    formStatus.classList.add('err');
    formStatus.textContent = 'Zprávu se nepodařilo odeslat. Napište mi prosím na psychologmichenkova@gmail.com nebo zavolejte na +420 606 455 174.';
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = 'Odeslat';
  }
});
