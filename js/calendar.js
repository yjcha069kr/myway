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

  memoText.value =
    localStorage.getItem(`memo-${dateString}`) || '';
}

// ===== 메모 저장 =====
saveMemoBtn.addEventListener('click', () => {
  if (!selectedDate) return;

  const selectedCell = document.querySelector('.date-cell.selected');

  // 비어있으면 삭제
  if (memoText.value.trim() === '') {
    localStorage.removeItem(`memo-${selectedDate}`);
    selectedCell.classList.remove('memoed');
    return;
  }

  localStorage.setItem(`memo-${selectedDate}`, memoText.value);
  selectedCell.classList.add('memoed');
  alert('저장됐어요 🌷');
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

// ===== 최초 실행 =====
buildCalendar(currentYear, currentMonth);
updateMonthTitle();
