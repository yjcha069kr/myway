/* 연도 클릭시 이동 */
const yearButtons = document.querySelectorAll(".year");

yearButtons.forEach(button => {
  button.addEventListener("click", () => {
    const year = button.dataset.year;
    window.location.href = `year.html?year=${year}`;
  });
});