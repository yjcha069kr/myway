const calendarContainer = document.getElementById('calendar');
const modal = document.getElementById('entry-modal');
const entryText = document.getElementById('entry-text');
const saveBtn = document.getElementById('save-entry');
const closeBtn = document.getElementById('close-entry');

let current = new Date();
let currentMonth = current.getMonth();
let currentYear = current.getFullYear();
let selectedDate = null;
let diaryData = {}; // 날짜별 글 저장

function buildCalendar(year, month) {
    calendarContainer.innerHTML = '';

    // 요일 헤더
    const weekdaysDiv = document.createElement('div');
    weekdaysDiv.className = 'weekdays';
    const days = ['일','월','화','수','목','금','토'];
    for(let d of days){
        const dayDiv = document.createElement('div');
        dayDiv.textContent = d;
        weekdaysDiv.appendChild(dayDiv);
    }
    calendarContainer.appendChild(weekdaysDiv);

    // 날짜 그리드
    const datesDiv = document.createElement('div');
    datesDiv.className = 'dates';

    const firstDay = new Date(year, month, 1).getDay();
    const lastDate = new Date(year, month+1, 0).getDate();

    // 빈 칸
    for(let i=0;i<firstDay;i++){
        const emptyDiv = document.createElement('div');
        datesDiv.appendChild(emptyDiv);
    }

    // 날짜 셀
    for(let i=1;i<=lastDate;i++){
        const dateDiv = document.createElement('div');
        dateDiv.className = 'date-cell';
        dateDiv.textContent = i;
        const fullDate = `${year}-${month+1}-${i}`;
        dateDiv.dataset.date = fullDate;

        if(i===current.getDate() && month===current.getMonth() && year===current.getFullYear()){
            dateDiv.classList.add('today');
        }

        dateDiv.addEventListener('click', () => {
            selectedDate = fullDate;

            document.querySelectorAll('.selected').forEach(el=>el.classList.remove('selected'));
            dateDiv.classList.add('selected');

            entryText.value = diaryData[selectedDate] || '';
            modal.style.display = 'block';
        });

        datesDiv.appendChild(dateDiv);
    }

    calendarContainer.appendChild(datesDiv);
}

// 모달 저장
saveBtn.addEventListener('click', ()=>{
    if(selectedDate) diaryData[selectedDate] = entryText.value;
    modal.style.display = 'none';
});

// 모달 닫기
closeBtn.addEventListener('click', ()=>{
    modal.style.display = 'none';
});

// 초기 달력 빌드
buildCalendar(currentYear, currentMonth);
