let minutes = document.querySelector("#minutes");
let milliseconds = document.querySelector("#milliseconds");
let seconds = document.querySelector("#seconds");
let recordList = document.querySelector("#recordList");
let hours = document.querySelector("#hours");
let ms = 0,
  h = 0,
  s = 0,
  m = 0,
  timerId = null;
let records = [];

function startStopwatch() {
  let getTime = () => {
    ms += 10;
    if (ms === 1000) {
      ms = 0;
      s++;
    }
    if (s === 60) {
      s = 0;
      m++;
    }
    if (m === 60) {
      m = 0;
      h++;
    }
    displayTimeFormat();
  };
  if (!timerId) timerId = setInterval(getTime, 10);
}

function stopStopwatch() {
  if (timerId) {
    clearInterval(timerId);
    timerId = null;

    records.push(
      `${formatTime(h)}:${formatTime(m)}:${formatTime(s)}:${formatMilliseconds(
        ms
      )}`
    );
    DisplayPreviousRecord();
  }
}

function resetStopwatch() {
  clearInterval(timerId);
  timerId = null;
  ms = s = m = h = 0;
  records = [];

  displayTimeFormat();
  DisplayPreviousRecord();
}

function formatTime(digit) {
  return digit < 10 ? "0" + digit : digit;
}

function formatMilliseconds(ms) {
  return ms.toString().padStart(2, "0");
}

function displayTimeFormat() {
  milliseconds.textContent = formatMilliseconds(ms);
  seconds.textContent = formatTime(s);
  minutes.textContent = formatTime(m);
  hours.textContent = formatTime(h);
}

function DisplayPreviousRecord() {
  recordList.innerHTML = records
    .map((record, i) => `<li>Record ${i + 1}: ${record}</li>`)
    .join("");
}
