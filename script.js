// Simple scripts: theme toggle, burger menu, simple drag and drop for parts, form handling
document.addEventListener('DOMContentLoaded', function () {
  const body = document.body;
  const themeToggle = document.getElementById('themeToggle');
  const burger = document.getElementById('burger');
  const nav = document.getElementById('mainNav');

  // Theme toggle (persist in localStorage)
  const savedTheme = localStorage.getItem('gst-theme');
  if (savedTheme) body.className = savedTheme;
  themeToggle.addEventListener('click', () => {
    body.classList.toggle('light');
    body.classList.toggle('dark');
    const current = body.className || 'light';
    localStorage.setItem('gst-theme', current);
  });

  // Burger (mobile menu)
  burger.addEventListener('click', () => {
    nav.classList.toggle('open');
    burger.classList.toggle('open');
    // simple accessible focus
    if (nav.classList.contains('open')) {
      nav.style.display = 'flex';
      nav.style.flexDirection = 'column';
      nav.style.position = 'absolute';
      nav.style.top = '64px';
      nav.style.right = '16px';
      nav.style.background = 'white';
      nav.style.padding = '12px';
      nav.style.borderRadius = '10px';
      nav.style.boxShadow = '0 12px 40px rgba(2,6,23,0.08)';
    } else {
      nav.style.display = '';
      nav.style.position = '';
      nav.style.top = '';
      nav.style.right = '';
      nav.style.background = '';
      nav.style.padding = '';
      nav.style.borderRadius = '';
      nav.style.boxShadow = '';
    }
  });

  // Activate nav link on click
  document.querySelectorAll('.nav-link').forEach(a=>{
    a.addEventListener('click', (e)=>{
      document.querySelectorAll('.nav-link').forEach(x=>x.classList.remove('active'));
      a.classList.add('active');
      // close mobile nav
      nav.classList.remove('open');
      burger.classList.remove('open');
    });
  });

  // Drag and drop for game parts
  let dragged = null;
  document.querySelectorAll('.part').forEach(part=>{
    part.addEventListener('dragstart', e=>{
      dragged = part;
      setTimeout(()=>part.style.visibility='hidden', 0);
    });
    part.addEventListener('dragend', e=>{
      setTimeout(()=>part.style.visibility='', 0);
      dragged = null;
    });
  });

  const slots = document.querySelectorAll('.slot');
  slots.forEach(slot=>{
    const slotEl = slot;
    slotEl.addEventListener('dragover', e=>e.preventDefault());
    slotEl.addEventListener('drop', e=>{
      e.preventDefault();
      if (!dragged) return;
      const partType = dragged.getAttribute('data-part');
      const slotType = slotEl.getAttribute('data-slot');
      // place copy inside slot
      slotEl.textContent = dragged.textContent;
      slotEl.dataset.placed = partType;
    });
  });

  document.getElementById('checkBtn').addEventListener('click', ()=>{
    const msgEl = document.getElementById('gameMessage');
    const ok = document.querySelector('.slot[data-slot="cpu"]').dataset.placed === 'cpu'
            && document.querySelector('.slot[data-slot="gpu"]').dataset.placed === 'gpu'
            && document.querySelector('.slot[data-slot="ram"]').dataset.placed === 'ram';
    if (ok) {
      msgEl.textContent = 'Система собрана верно ✅';
    } else {
      msgEl.textContent = 'Что-то не на месте — попробуйте ещё.';
    }
  });

  // Simple form handling (no backend) — show confirmation
  const form = document.getElementById('contactForm');
  const formMessage = document.getElementById('formMessage');
  form.addEventListener('submit', e=>{
    e.preventDefault();
    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const message = form.message.value.trim();
    if (!name || !email || !message) {
      formMessage.textContent = 'Пожалуйста, заполните все поля.';
      return;
    }
    formMessage.textContent = 'Спасибо! Ваше сообщение отправлено (демо).';
    form.reset();
  });
});
