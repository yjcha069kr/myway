/* main-visual */
// 이미지 넘기기
const track = document.querySelector('.visual-track');
const slides = document.querySelectorAll('.slide');
const prev = document.querySelector('.prev');
const next = document.querySelector('.next');

let current = 0;

function updateSlide() {
    track.style.transform = `translateX(-${current * 100}%)`;
}

next.addEventListener('click', () => {
    current = (current + 1) % slides.length;
    updateSlide();
});

prev.addEventListener('click', () => {
    current = (current - 1 + slides.length) % slides.length;
    updateSlide();
});


// 페이지네이션
const dots = document.querySelectorAll('.dot');

function updateSlide() {
    track.style.transform = `translateX(-${current * 100}%)`;

    dots.forEach(dot => dot.classList.remove('active'));
    dots[current].classList.add('active');
}

next.addEventListener('click', () => {
    current = (current + 1) % slides.length;
    updateSlide();
});

prev.addEventListener('click', () => {
    current = (current - 1 + slides.length) % slides.length;
    updateSlide();
});

dots.forEach((dot, i) => {
    dot.addEventListener('click', () => {
        current = i;
        updateSlide();
    });
});