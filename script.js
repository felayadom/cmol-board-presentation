const slides = document.querySelectorAll('.slide');
const slideScrolls = document.querySelectorAll('.slide-scroll');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const currentSlideEl = document.getElementById('currentSlide');
const totalSlidesEl = document.getElementById('totalSlides');

let currentSlide = 0;
totalSlidesEl.textContent = slides.length;

function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.classList.toggle('active', i === index);
  });

  slideScrolls.forEach((scrollEl, i) => {
    if (i === index) {
      scrollEl.scrollTop = 0;
    }
  });

  currentSlideEl.textContent = index + 1;
  currentSlide = index;

  // Hide/show arrows
  if (prevBtn) {
    prevBtn.style.display = index === 0 ? 'none' : 'block';
  }

  if (nextBtn) {
    nextBtn.style.display = index === slides.length - 1 ? 'none' : 'block';
  }
}

function nextSlide() {
  if (currentSlide < slides.length - 1) {
    showSlide(currentSlide + 1);
  }
}

function prevSlide() {
  if (currentSlide > 0) {
    showSlide(currentSlide - 1);
  }
}

if (nextBtn) nextBtn.addEventListener('click', nextSlide);
if (prevBtn) prevBtn.addEventListener('click', prevSlide);

document.addEventListener('keydown', (e) => {
  const openModal = document.querySelector('.modal.open');
  if (openModal) {
    if (e.key === 'Escape') closeModal();
    return;
  }

  const activeScroll = slides[currentSlide]?.querySelector('.slide-scroll');
  if (!activeScroll) return;

  const atTop = activeScroll.scrollTop <= 2;
  const atBottom = activeScroll.scrollTop + activeScroll.clientHeight >= activeScroll.scrollHeight - 2;

  if (e.key === 'ArrowRight' || e.key === 'PageDown') {
    nextSlide();
  }

  if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
    prevSlide();
  }

  if (e.key === 'ArrowDown') {
    if (!atBottom) {
      activeScroll.scrollBy({ top: 120, behavior: 'smooth' });
    } else {
      nextSlide();
    }
  }

  if (e.key === 'ArrowUp') {
    if (!atTop) {
      activeScroll.scrollBy({ top: -120, behavior: 'smooth' });
    } else {
      prevSlide();
    }
  }
});

const modalTriggers = document.querySelectorAll('[data-open-modal]');
const closeTriggers = document.querySelectorAll('[data-close-modal]');
const principlesModal = document.getElementById('principlesModal');

modalTriggers.forEach(btn => {
  btn.addEventListener('click', () => {
    const target = document.getElementById(btn.dataset.openModal);
    if (target) target.classList.add('open');
  });
});

closeTriggers.forEach(btn => {
  btn.addEventListener('click', closeModal);
});

if (principlesModal) {
  principlesModal.addEventListener('click', (e) => {
    if (e.target === principlesModal) closeModal();
  });
}

function closeModal() {
  document.querySelectorAll('.modal').forEach(modal => modal.classList.remove('open'));
}

const tabButtons = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');

tabButtons.forEach(button => {
  button.addEventListener('click', () => {
    tabButtons.forEach(btn => btn.classList.remove('active'));
    tabContents.forEach(content => content.classList.remove('active'));

    button.classList.add('active');
    const target = document.getElementById(button.dataset.tab);
    if (target) target.classList.add('active');
  });
});

showSlide(0);

const insightAccordions = document.querySelectorAll('.insight-accordion');

insightAccordions.forEach(item => {
  const button = item.querySelector('.insight-btn');
  button.addEventListener('click', () => {
    item.classList.toggle('active');
  });
});
