const timer = document.querySelector(".time");
const start = document.querySelectorAll(".timer__button");

const work = document.querySelector(".work");
const break_ = document.querySelector(".break");

const sound = new Audio("sound/sound.mp4");

let workTime = 25;
let breakTime = 5;
let current = 0;
let interval;

let isWork = true,
    isBreak = false;

/**
 * @brief Display the timer in the html page in the format mm:ss.
 **/
function timerDisplay(){
    let minutes = Math.floor(current / 60);
    let seconds = current % 60;
    if(seconds < 10){
        seconds = "0" + seconds;
    }
    timer.innerHTML = `${minutes}:${seconds}`;
}

/**
 * @brief Allow to start the timer, and start the time. Change the part when the timer is over.
 **/
function startTimer(){
    start[0].style.display = "none";
    start[1].style.display = "inline-block";

    interval = setInterval(() => {
        current--;
        timerDisplay();
        saveTime();
        if(current === 0 && isWork){
            isWork = false;
            isBreak = true;
            sound.play();
            initStartBreak();
        }else if(current === 0 && isBreak){
            isWork = true;
            isBreak = false;
            sound.play();
            initStartWork();
        }
    }, 1000);
}


/**
 * @brief Stop the timer.
 * @details Stop the timer and change the button to start.
 * @see startTimer()
 * */
function stopTimer(){
    clearInterval(interval);
    start[0].style.display = "inline-block";
    start[1].style.display = "none";
}

/**
 * @brief Reset the timer.
 * @details Reset the timer and change the button to start.
 * @see startTimer()
 * */

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

/**
 * @brief init the timer for the work part.
 * @details init the timer for the work part and change the color of the background.
 * @see startWork();
 */
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

/**
 * @brief init the timer for the break part.
 * @details init the timer for the break part and change the color of the background.
 * @see startBreak();
 */
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

/**
 * @brief Save the time in the local storage.
 * @details Save the time in the local storage to retrieve the time when closing the tab.
 * @see initCurrentTime()
 * */
function saveTime(){
    localStorage.setItem("current", current);
    localStorage.setItem("workTime", workTime);
    localStorage.setItem("breakTime", breakTime);
}


/**
 * @brief init the time when the page is loaded.
 * @details init the time to the last time stored in the localstorage when the page is loaded.
 * @see saveTime()
 * */
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


/**
 * @brief init the timer.
 * @details init the timer and add the event on the start button.
 * */
function init(){
    initCurrentTime();
    timerDisplay();
    start[0].addEventListener("click", startTimer);
}

/**
 * @brief Change the input value.
 * @details Change the input value when the user change the value and save it in the storage.
 * */
function changeInput(){
    document.getElementById("workTime").addEventListener("change", () => {
        if(document.getElementById("workTime").value <= 0 
        || document.getElementById("workTime").value %1 !== 0 
        || document.getElementById("workTime").value > 60){
            document.getElementById("workTime").value = 25;
            alert("Error with workTime, time was reset");
        }
        workTime = document.getElementById("workTime").value;
        current = workTime * 60;
        saveTime();
        init();
    });
    document.getElementById("breakTime").addEventListener("change", () => {
        if(document.getElementById("breakTime").value <= 0 
        || document.getElementById("breakTime").value > 60
        || document.getElementById("breakTime").value %1 !== 0){
            document.getElementById("breakTime").value = 5;
            alert("Error with breakTime, time was reset");
        }
        breakTime = document.getElementById("breakTime").value;
        saveTime();
        init();
    });
}

/**
 * @brief init the timer when the page is loaded.
 * */
window.onload = () => {
    if(localStorage.getItem("current") === 0){
        localStorage.clear();
        workTime = 25;
        breakTime = 5;
        document.getElementById("workTime").value = workTime;
        document.getElementById("breakTime").value = breakTime;
        current = workTime * 60;
        saveTime();
    }
    current = workTime * 60;
    changeInput();
    init();
}