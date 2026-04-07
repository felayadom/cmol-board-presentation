const slides = document.querySelectorAll('.slide');
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
  currentSlideEl.textContent = index + 1;
  currentSlide = index;
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

nextBtn.addEventListener('click', nextSlide);
prevBtn.addEventListener('click', prevSlide);

document.addEventListener('keydown', (e) => {
  if (document.querySelector('.modal.open')) {
    if (e.key === 'Escape') closeModal();
    return;
  }

  if (e.key === 'ArrowRight' || e.key === 'PageDown') nextSlide();
  if (e.key === 'ArrowLeft' || e.key === 'PageUp') prevSlide();
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

principlesModal.addEventListener('click', (e) => {
  if (e.target === principlesModal) closeModal();
});

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
    document.getElementById(button.dataset.tab).classList.add('active');
  });
});

showSlide(0);
