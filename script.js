const startButton = document.getElementById("start");
const stopButton = document.getElementById("stop");
const resetButton = document.getElementById("reset");
const lapButton = document.getElementById("lap");

const hrElement = document.getElementById("hr");
const minElement = document.getElementById("min");
const secElement = document.getElementById("sec");
const lapsList = document.getElementById("laps-list");

let timer; 
let lapTimer; 

let startTime; 
let lapStartTime; 

let hr = 0;
let min = 0;
let sec = 0;
let lapCounter = 1; 

function startStopwatch() {
    startTime = Date.now();
    lapStartTime = startTime;
    timer = setInterval(updateStopwatch, 1000); 
    lapTimer = setInterval(updateLapTime, 1000);
}


function stopStopwatch() {
    clearInterval(timer);
    clearInterval(lapTimer);
}


function resetStopwatch() {
    clearInterval(timer);
    clearInterval(lapTimer);
    hr = 0;
    min = 0;
    sec = 0;
    lapCounter = 1;
    updateDisplay();
    lapsList.innerHTML = ''; 
}


function recordLap() {
    const lapTime = formatTime(hr) + ":" + formatTime(min) + ":" + formatTime(sec); 
    const lapItem = document.createElement("li"); 
    lapItem.textContent = "Lap " + lapCounter + ": " + lapTime;
    lapsList.appendChild(lapItem);
    lapCounter++;
    lapStartTime = Date.now();
}


function updateStopwatch() {
    const elapsedTime = Date.now() - startTime;
    hr = Math.floor(elapsedTime / 3600000);
    min = Math.floor((elapsedTime % 3600000) / 60000);
    sec = Math.floor((elapsedTime % 60000) / 1000);
    updateDisplay();
}


function updateLapTime() {
    const elapsedTime = Date.now() - lapStartTime;
    const lapHr = Math.floor(elapsedTime / 3600000);
    const lapMin = Math.floor((elapsedTime % 3600000) / 60000);
    const lapSec = Math.floor((elapsedTime % 60000) / 1000);
    document.getElementById("lap-time").textContent = formatTime(lapHr) + ":" + formatTime(lapMin) + ":" + formatTime(lapSec); // Only show hours, minutes, and seconds for lap time
}


function updateDisplay() {
    hrElement.textContent = formatTime(hr);
    minElement.textContent = formatTime(min);
    secElement.textContent = formatTime(sec);
}


function formatTime(value) {
    return value < 10 ? "0" + value : value;
}

startButton.addEventListener("click", startStopwatch);
stopButton.addEventListener("click", stopStopwatch);
resetButton.addEventListener("click", resetStopwatch);
lapButton.addEventListener("click", recordLap);

updateDisplay();
