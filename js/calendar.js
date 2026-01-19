// ===== 기본 날짜 정보 =====
const today = new Date();
let currentYear = today.getFullYear();
let currentMonth = today.getMonth();
let selectedDate = null;

// ===== DOM =====
const calendarEl = document.getElementById('calendar');
const memoText = document.getElementById('memo-text');
const selectedDateText = document.getElementById('selected-date');
const saveMemoBtn = document.getElementById('save-memo');

// ===== 달력 생성 =====
function buildCalendar(year, month) {
  calendarEl.innerHTML = '';

  const weekdays = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

  // 요일 헤더
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

  // 빈 칸
  for (let i = 0; i < firstDay; i++) {
    const empty = document.createElement('div');
    datesEl.appendChild(empty);
  }

  // 날짜 생성
  for (let date = 1; date <= lastDate; date++) {
    const cell = document.createElement('div');
    cell.className = 'date-cell';
    cell.textContent = date;

    const dateString = `${year}-${String(month + 1).padStart(2, '0')}-${String(date).padStart(2, '0')}`;

    // 오늘 표시
    if (
      date === today.getDate() &&
      month === today.getMonth() &&
      year === today.getFullYear()
    ) {
      cell.classList.add('today');
      selectDate(cell, dateString);
    }

    // 날짜 클릭
    cell.addEventListener('click', () => {
      selectDate(cell, dateString);
    });

    datesEl.appendChild(cell);
  }

  calendarEl.appendChild(datesEl);
}

// ===== 날짜 선택 처리 =====
function selectDate(cell, dateString) {
  document.querySelectorAll('.date-cell').forEach(c =>
    c.classList.remove('selected')
  );
  cell.classList.add('selected');

  selectedDate = dateString;
  selectedDateText.textContent = dateString;

  memoText.value =
    localStorage.getItem(`memo-${dateString}`) || '';
}

// ===== 메모 저장 =====
saveMemoBtn.addEventListener('click', () => {
  if (!selectedDate) return;

  localStorage.setItem(
    `memo-${selectedDate}`,
    memoText.value
  );
});

// ===== 초기 실행 =====
buildCalendar(currentYear, currentMonth);