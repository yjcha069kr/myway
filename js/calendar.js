// ===== 오늘 날짜 =====
const today = new Date();
let currentYear = today.getFullYear();
let currentMonth = today.getMonth();
let selectedDate = null;

// ===== DOM =====
const calendarEl = document.getElementById('calendar');
const memoText = document.getElementById('memo-text');
const selectedDateText = document.getElementById('selected-date');
const saveMemoBtn = document.getElementById('save-memo');

const monthTitle = document.getElementById('month-title');
const prevBtn = document.getElementById('prev-month');
const nextBtn = document.getElementById('next-month');

// ===== mood/weather buttons =====
const moodButtons = document.querySelectorAll('.mood-btn[data-mood]');
const weatherButtons = document.querySelectorAll('.mood-btn[data-weather]');

// ===== checklist =====
const checklistEl = document.getElementById('checklist');

// ===== 월 타이틀 =====
function updateMonthTitle() {
  monthTitle.textContent = `${currentYear}.${String(currentMonth + 1).padStart(2, '0')}`;
}

// ===== 달력 생성 =====
function buildCalendar(year, month) {
  calendarEl.innerHTML = '';

  const weekdays = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

  // 요일
  const weekdaysEl = document.createElement('div');
  weekdaysEl.className = 'weekdays';

  weekdays.forEach(day => {
    const div = document.createElement('div');
    div.textContent = day;
    weekdaysEl.appendChild(div);
  });

  calendarEl.appendChild(weekdaysEl);

  // 날짜 영역
  const datesEl = document.createElement('div');
  datesEl.className = 'dates';

  const firstDay = new Date(year, month, 1).getDay();
  const lastDate = new Date(year, month + 1, 0).getDate();

  // 빈칸
  for (let i = 0; i < firstDay; i++) {
    datesEl.appendChild(document.createElement('div'));
  }

  // 날짜 생성
  for (let date = 1; date <= lastDate; date++) {
    const cell = document.createElement('div');
    cell.className = 'date-cell';
    cell.textContent = date;

    const dateString = `${year}-${String(month + 1).padStart(2, '0')}-${String(date).padStart(2, '0')}`;

    // 오늘 표시 (현재 달일 때만)
    if (
      year === today.getFullYear() &&
      month === today.getMonth() &&
      date === today.getDate()
    ) {
      cell.classList.add('today');
      selectDate(cell, dateString);
    }

    // 메모 있는 날 표시
    if (localStorage.getItem(`memo-${dateString}`)) {
      cell.classList.add('memoed');
    }

    // 클릭
    cell.addEventListener('click', () => {
      selectDate(cell, dateString);
    });

    datesEl.appendChild(cell);
  }

  calendarEl.appendChild(datesEl);
}

// ===== 날짜 선택 =====
function selectDate(cell, dateString) {
  document.querySelectorAll('.date-cell').forEach(c =>
    c.classList.remove('selected')
  );

  cell.classList.add('selected');
  selectedDate = dateString;
  selectedDateText.textContent = dateString;

  // 저장된 값 불러오기
  loadDateData(dateString);
}

// ===== 저장된 데이터 불러오기 =====
function loadDateData(dateString) {
  // 메모 불러오기
  memoText.value = localStorage.getItem(`memo-${dateString}`) || '';

  // 기분 불러오기
  const savedMood = localStorage.getItem(`mood-${dateString}`);
  moodButtons.forEach(btn => {
    btn.classList.remove('selected');
    if (btn.dataset.mood === savedMood) btn.classList.add('selected');
  });

  // 날씨 불러오기
  const savedWeather = localStorage.getItem(`weather-${dateString}`);
  weatherButtons.forEach(btn => {
    btn.classList.remove('selected');
    if (btn.dataset.weather === savedWeather) btn.classList.add('selected');
  });

  // 체크리스트 불러오기
  loadChecklist(dateString);
}

// ===== 체크리스트 불러오기 =====
function loadChecklist(dateString) {
  checklistEl.innerHTML = '';

  const savedChecklist = JSON.parse(localStorage.getItem(`checklist-${dateString}`)) || [];

  savedChecklist.forEach((item, idx) => {
    const li = document.createElement('li');
    li.innerHTML = `
      <input type="checkbox" id="c-${idx}" ${item.checked ? 'checked' : ''}>
      <label for="c-${idx}">${item.text}</label>
      <button class="del-item" data-idx="${idx}">x</button>
    `;
    checklistEl.appendChild(li);
  });
}

// ===== 체크리스트 항목 추가 =====
function addChecklistItem(text = '새 항목') {
  const dateString = selectedDate;
  if (!dateString) return;

  const savedChecklist = JSON.parse(localStorage.getItem(`checklist-${dateString}`)) || [];
  savedChecklist.push({ text, checked: false });

  localStorage.setItem(`checklist-${dateString}`, JSON.stringify(savedChecklist));
  loadChecklist(dateString);
}

// ===== 체크리스트 저장 (체크 상태) =====
function saveChecklist(dateString) {
  const items = [...checklistEl.querySelectorAll('li')].map(li => {
    const text = li.querySelector('label').textContent;
    const checked = li.querySelector('input').checked;
    return { text, checked };
  });

  localStorage.setItem(`checklist-${dateString}`, JSON.stringify(items));
}

// ===== 기분/날씨 버튼 선택 =====
moodButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    if (!selectedDate) return;

    // 선택 스타일(배경 유지 + 아이콘 색만 변함)
    moodButtons.forEach(b => b.classList.remove('selected'));
    btn.classList.add('selected');

    // 저장은 저장 버튼 누를 때만
  });
});

weatherButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    if (!selectedDate) return;

    weatherButtons.forEach(b => b.classList.remove('selected'));
    btn.classList.add('selected');

    // 저장은 저장 버튼 누를 때만
  });
});

// ===== 메모 저장 =====
saveMemoBtn.addEventListener('click', () => {
  if (!selectedDate) return;

  // 메모 저장
  if (memoText.value.trim() === '') {
    localStorage.removeItem(`memo-${selectedDate}`);
  } else {
    localStorage.setItem(`memo-${selectedDate}`, memoText.value);
  }

  // 기분 저장
  const selectedMood = document.querySelector('.mood-btn.selected[data-mood]');
  if (selectedMood) {
    localStorage.setItem(`mood-${selectedDate}`, selectedMood.dataset.mood);
  } else {
    localStorage.removeItem(`mood-${selectedDate}`);
  }

  // 날씨 저장
  const selectedWeather = document.querySelector('.mood-btn.selected[data-weather]');
  if (selectedWeather) {
    localStorage.setItem(`weather-${selectedDate}`, selectedWeather.dataset.weather);
  } else {
    localStorage.removeItem(`weather-${selectedDate}`);
  }

  // 체크리스트 저장
  saveChecklist(selectedDate);

  alert('저장됐어요 🌷');

  // 달력에 메모 표시 업데이트
  document.querySelectorAll('.date-cell').forEach(cell => {
    const dateString = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(cell.textContent).padStart(2, '0')}`;
    if (localStorage.getItem(`memo-${dateString}`)) {
      cell.classList.add('memoed');
    }
  });
});

// ===== 월 이동 =====
prevBtn.addEventListener('click', () => {
  currentMonth--;
  if (currentMonth < 0) {
    currentMonth = 11;
    currentYear--;
  }
  buildCalendar(currentYear, currentMonth);
  updateMonthTitle();
});

nextBtn.addEventListener('click', () => {
  currentMonth++;
  if (currentMonth > 11) {
    currentMonth = 0;
    currentYear++;
  }
  buildCalendar(currentYear, currentMonth);
  updateMonthTitle();
});

// ===== checklist 삭제 버튼 이벤트 (동적 생성) =====
checklistEl.addEventListener('click', (e) => {
  if (e.target.classList.contains('del-item')) {
    const idx = Number(e.target.dataset.idx);
    const dateString = selectedDate;
    const savedChecklist = JSON.parse(localStorage.getItem(`checklist-${dateString}`)) || [];

    savedChecklist.splice(idx, 1);
    localStorage.setItem(`checklist-${dateString}`, JSON.stringify(savedChecklist));
    loadChecklist(dateString);
  }
});

// ===== 체크박스 변경 시 저장되지 않도록 (저장 버튼 눌러야 저장) =====
checklistEl.addEventListener('change', () => {
  // 아무것도 하지 않음 (저장 버튼으로만 저장)
});

// ===== 최초 실행 =====
buildCalendar(currentYear, currentMonth);
updateMonthTitle();


// ===== 항목추가 버튼 =====
const addCheckBtn = document.getElementById('add-check');

addCheckBtn.addEventListener('click', () => {
  if (!selectedDate) {
    alert("날짜를 먼저 선택해주세요.");
    return;
  }

  const newText = prompt("새 항목을 입력하세요:");
  if (!newText || newText.trim() === "") return;

  addChecklistItem(newText.trim());
});