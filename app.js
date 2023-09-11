const timer = document.querySelector(".time");
const start = document.querySelectorAll(".timer__button");

const work = document.querySelector(".work");
const break_ = document.querySelector(".break");

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
    }, 1000);
}

function stopTimer(){
    clearInterval(interval);
    start[0].style.display = "inline-block";
    start[1].style.display = "none";
}

function reset(){
    localStorage.clear();
    stopTimer();
    workTime = document.getElementById("workTime").value;
    breakTime = document.getElementById("breakTime").value;
    current = workTime * 60;
    init();
    saveTime();
    start[0].style.display = "inline-block";
    start[1].style.display = "none";
    start[2].style.display = "none";
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
    document.getElementById("workTime").value = workTime;
    document.getElementById("breakTime").value = breakTime;
}

function init(){
    initCurrentTime();
    timerDisplay();
    start[0].addEventListener("click", startTimer);
    start[1].addEventListener("click", stopTimer);
}

function changeInput(){
    document.getElementById("workTime").addEventListener("change", () => {
        workTime = document.getElementById("workTime").value;
        current = workTime * 60;
        saveTime();
        init();
    });
    document.getElementById("breakTime").addEventListener("change", () => {
        breakTime = document.getElementById("breakTime").value;
        saveTime();
        init();
    });
}

window.onload = () => {
    changeInput();
    init();
}