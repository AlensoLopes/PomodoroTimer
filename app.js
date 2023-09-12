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

    interval = setInterval(() => {
        current--;
        timerDisplay();
        saveTime();
        if(current === 0 && isWork){
            stopTimer();
            isWork = false;
            isBreak = true;
            initStartBreak();
        }else if(current === 0 && isBreak){
            stopTimer();
            isWork = true;
            isBreak = false;
            initStartWork();
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
}

function initStartWork(){
    current = workTime * 60;
    work.style.color = "#00cc00";
    break_.style.color = "black";
    document.body.style.background = " rgb(218,140,14);";
    document.body.style.background = "radial-gradient(circle, rgba(218,140,14,1) 19%, rgba(218,48,14,1) 62%, rgba(207,0,105,1) 100%)";
    document.body.style.animation = "breath 5s ease-in-out infinite";
    document.body.style.backgroundPosition = "center";
    saveTime();
    timerDisplay();
}

function initStartBreak(){
    current = breakTime * 60;
    break_.style.color = "#00cc00";
    work.style.color = "black";
    saveTime();
    timerDisplay();
    document.body.style.animation = "transition 5s ease-in-out infinite"
    document.body.style.background = "rgb(174,215,238)";
    document.body.style.background = "radial-gradient(circle, rgba(174,215,238,1) 19%, rgba(145,198,156,1) 62%, rgba(148,233,211,1) 100%)";
    document.body.style.animation = "breath 5s ease-in-out infinite";
    document.body.style.backgroundPosition = "center";
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
}

function changeInput(){
    document.getElementById("workTime").addEventListener("change", () => {
        if(document.getElementById("workTime").value < 1){
            document.getElementById("workTime").value = 25;
        }
        workTime = document.getElementById("workTime").value;
        current = workTime * 60;
        saveTime();
        init();
    });
    document.getElementById("breakTime").addEventListener("change", () => {
        if(document.getElementById("breakTime").value < 1){
            document.getElementById("breakTime").value = 5;
        }
        breakTime = document.getElementById("breakTime").value;
        saveTime();
        init();
    });
}

window.onload = () => {
    current = workTime * 60;
    changeInput();
    init();
}