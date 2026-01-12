const input = document.getElementById("diaryInput");
const saveBtn = document.getElementById("saveBtn");
const list = document.getElementById("diaryList");

let diaries = JSON.parse(localStorage.getItem("diaries")) || [];

function render() {
  list.innerHTML = "";
  diaries.forEach(diary => {
    const li = document.createElement("li");

    const date = document.createElement("div");
    date.className = "date";
    date.textContent = diary.date;

    const text = document.createElement("div");
    text.textContent = diary.text;

    li.appendChild(date);
    li.appendChild(text);
    list.appendChild(li);
  });
}

saveBtn.addEventListener("click", () => {
  if (input.value.trim() === "") return;

  diaries.unshift({
    text: input.value,
    date: new Date().toLocaleString()
  });

  localStorage.setItem("diaries", JSON.stringify(diaries));
  input.value = "";
  render();
});

render();
