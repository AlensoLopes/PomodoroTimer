const timer = document.querySelector(".time");
const start = document.querySelectorAll(".timer__button");

let workTime = 25;
let breakTime = 5;
let current = 0;
let interval;

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

function init(){
    start[0].addEventListener("click", startTimer());
    start[1].addEventListener("click", stopTimer());
}

init();