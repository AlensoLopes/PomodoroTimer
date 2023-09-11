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

function init(){
    start[0].addEventListener("click", startTimer());
    start[1].addEventListener("click", stopTimer());
}