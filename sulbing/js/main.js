document.addEventListener("DOMContentLoaded", () => {

  /* ================= main-visual ================= */
  const track = document.querySelector('.visual-track');
  const slides = document.querySelectorAll('.slide');
  const prev = document.querySelector('.prev');
  const next = document.querySelector('.next');
  const dots = document.querySelectorAll('.dot');

  let current = 0;

  function updateSlide() {
    track.style.transform = `translateX(-${current * 100}%)`;

    dots.forEach(dot => dot.classList.remove('active'));
    if (dots[current]) dots[current].classList.add('active');
  }

  next?.addEventListener('click', () => {
    current = (current + 1) % slides.length;
    updateSlide();
  });

  prev?.addEventListener('click', () => {
    current = (current - 1 + slides.length) % slides.length;
    updateSlide();
  });

  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => {
      current = i;
      updateSlide();
    });
  });

  /* ================= 메뉴 UI ================= */
  const menuCards = document.querySelector(".menu-cards");
  if (!menuCards) return;

  menuDatas.forEach(menu => {
    const card = document.createElement("div");
    card.className = "menu-card";

    const title = document.createElement("h3");
    title.textContent = menu.category;
    card.appendChild(title);

    menu.items.forEach(item => {
      const img = document.createElement("img");
      img.src = item.img;
      img.alt = item.alt;
      card.appendChild(img);
    });

    menuCards.appendChild(card);
  });

});
