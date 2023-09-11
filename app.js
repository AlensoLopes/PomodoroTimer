const timer = document.querySelector(".time");
const start = document.querySelectorAll(".timer__button");

let workTime = 25;
let breakTime = 5;
let current = 0;
let interval;

let isWork = true,
    isBreak = false;

function timerDisplay(){
    let minutes = Math.floor(current / 60);
    let seconds = current % 60;
    if(seconds < 10){
        seconds = "0" + seconds;
    }
    timer.innerHTML = `${minutes}:${seconds}`;
}

function startTimer(){
    start[0].style.display = "none";
    start[1].style.display = "inline-block";
    start[2].style.display = "inline-block";

    interval = setInterval(() => {
        current--;
        timerDisplay();
        saveTime();
        if(current === 0 && isWork){
            clearInterval(interval);
            isWork = false;
            isBreak = true;
            initStartBreak();
            stopTimer();
        }else if(current === 0 && isBreak){
            clearInterval(interval);
            isWork = true;
            isBreak = false;
            initStartWork();
            stopTimer();
        }
    }, 1);
}

function stopTimer(){
    clearInterval(interval);
    start[0].style.display = "inline-block";
    start[1].style.display = "none";
}

function reset(){
    stopTimer();
    current = workTime * 60;
    timerDisplay();
}

function initStartWork(){
    current = workTime * 60;
    work.style.color = "#00cc00";
    break_.style.color = "black";
    saveTime();
    timerDisplay();
}

function initStartBreak(){
    current = breakTime * 60;
    break_.style.color = "#00cc00";
    work.style.color = "black";
    saveTime();
    timerDisplay();
}

function saveTime(){
    localStorage.setItem("current", current);
    localStorage.setItem("workTime", workTime);
    localStorage.setItem("breakTime", breakTime);
}

function saveTime(){
    localStorage.setItem("current", current);
    localStorage.setItem("workTime", workTime);
    localStorage.setItem("breakTime", breakTime);
}

function initCurrentTime(){
    let savedCurrent = localStorage.getItem("current");
    let savedWorkTime = localStorage.getItem("workTime");
    let savedBreakTime = localStorage.getItem("breakTime");
    if(savedCurrent !== null){
        current = savedCurrent;
    }
    if(savedWorkTime !== null){
        workTime = savedWorkTime;
    }
    if(savedBreakTime !== null){
        breakTime = savedBreakTime;
    }
}

function init(){
    initCurrentTime();
    timerDisplay();
    start[0].addEventListener("click", startTimer);
    start[1].addEventListener("click", stopTimer);
}

init();