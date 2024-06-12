let timer;
let hours = 0;
let minutes = 0;
let seconds = 0;
let milliseconds = 0;
let laps = [];
let isRunning = false;

const display = document.querySelector('.display');
const startBtn = document.querySelector('.startBtn');
const stopBtn = document.querySelector('.stopBtn');
const resetBtn = document.querySelector('.resetBtn');
const lapBtn = document.querySelector('.lapBtn');
const lapsList = document.querySelector('.laps');

function startTimer() {
  isRunning = true;
  timer = setInterval(() => {
    milliseconds++;
    if (milliseconds === 100) {
      milliseconds = 0;
      seconds++;
    }
    if (seconds === 60) {
      seconds = 0;
      minutes++;
    }
    if (minutes === 60) {
      minutes = 0;
      hours++;
    }
    display.textContent = formatTime(hours) + ':' + formatTime(minutes) + ':' + formatTime(seconds) + ':' + formatTime(milliseconds);
  }, 10);
}

function stopTimer() {
  isRunning = false;
  clearInterval(timer);
}

function resetTimer() {
  clearInterval(timer);
  hours = minutes = seconds = milliseconds = 0;
  display.textContent = '00:00:00:00';
  laps = [];
  lapsList.innerHTML = '';
}

function lapTimer() {
  laps.unshift(display.textContent);
  const li = document.createElement('li');
  li.textContent = display.textContent;
  lapsList.appendChild(li);
}

function formatTime(time) {
  return time < 10 ? '0' + time : time;
}

startBtn.addEventListener('click', () => {
  if (!isRunning) {
    startTimer();
    startBtn.textContent = 'Pause';
  } else {
    stopTimer();
    startBtn.textContent = 'Resume';
  }
});

stopBtn.addEventListener('click', () => {
  stopTimer();
  startBtn.textContent = 'Start';
});

resetBtn.addEventListener('click', resetTimer);

lapBtn.addEventListener('click', lapTimer);