/* ================= main-visual ================= */
const slides = document.querySelector(".slides");
const dots = document.querySelectorAll(".main-visual .dot");
let index = 0;

function move(i) {
  index = i;
  slides.style.transform = `translateX(-${i * 100}%)`;

  dots.forEach(d => d.classList.remove("active"));
  dots[i].classList.add("active");
}

setInterval(() => {
  move((index + 1) % dots.length);
}, 4000);

dots.forEach((dot, i) => {
  dot.addEventListener("click", () => move(i));
});




// 메뉴 케로셀
document.addEventListener("DOMContentLoaded", () => {

  document.querySelectorAll(".menu-carousel").forEach(carousel => {

    const track = carousel.querySelector(".menu-cards");
    const prevBtn = carousel.querySelector(".menu-btn.prev");
    const nextBtn = carousel.querySelector(".menu-btn.next");

    // pagination은 menu-carousel 바깥 (new-menu / signature-menu)
    const section = carousel.closest(".new-menu, .signature-menu");
    const dots = section.querySelectorAll(".menu-pagination .dot");

    const card = track.querySelector(".menu-card");
    const gap = 20; // CSS gap
    const moveX = card.offsetWidth + gap;

    let index = 0;

    function updateDots() {
      dots.forEach(d => d.classList.remove("active"));
      if (dots[index]) dots[index].classList.add("active");
    }

    nextBtn.addEventListener("click", () => {
      track.scrollBy({ left: moveX, behavior: "smooth" });
      index = Math.min(index + 1, dots.length - 1);
      updateDots();
    });

    prevBtn.addEventListener("click", () => {
      track.scrollBy({ left: -moveX, behavior: "smooth" });
      index = Math.max(index - 1, 0);
      updateDots();
    });

    dots.forEach((dot, i) => {
      dot.addEventListener("click", () => {
        track.scrollTo({
          left: moveX * i,
          behavior: "smooth"
        });
        index = i;
        updateDots();
      });
    });

    updateDots();
  });

});
