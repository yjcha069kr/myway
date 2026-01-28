/* ================= main-visual ================= */
document.addEventListener("DOMContentLoaded", () => {

  const track = document.querySelector('.visual-track');
  const slides = document.querySelectorAll('.slide');
  const prev = document.querySelector('.prev');
  const next = document.querySelector('.next');

  let current = 0;

  function updateSlide() {
    track.style.transform = `translateX(-${current * 100}%)`;
  }

  next?.addEventListener('click', () => {
    current = (current + 1) % slides.length;
    updateSlide();
  });

  prev?.addEventListener('click', () => {
    current = (current - 1 + slides.length) % slides.length;
    updateSlide();
  });

});


// 풀페이지스크롤
const mainVisual = document.getElementById("mainVisual");
const afterMain = document.getElementById("afterMain");
const header = document.getElementById("header");

let isAnimating = false;

window.addEventListener(
  "wheel",
  (e) => {
    if (isAnimating) return;

    const headerHeight = header.offsetHeight;
    const mainRect = mainVisual.getBoundingClientRect();

    // 메인 비주얼 영역 안에 있을 때만
    const isInMain =
      mainRect.top <= headerHeight &&
      mainRect.bottom > headerHeight;

    // 메인 비주얼이 아니면 관여 안 함
    if (!isInMain) return;

    // 🔼 위로 스크롤 → 그냥 놔둠
    if (e.deltaY <= 0) return;

    // 🔽 아래로 스크롤 → 스냅
    e.preventDefault();
    isAnimating = true;

    const targetY =
      afterMain.getBoundingClientRect().top +
      window.pageYOffset -
      headerHeight;

    window.scrollTo({
      top: targetY,
      behavior: "smooth",
    });

    setTimeout(() => {
      isAnimating = false;
    }, 800);
  },
  { passive: false }
);




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
