'use strict'

// Greetings section.

function hello() {
    alert("Hello!");
}

// Name Asking section.

const proompt = "What is your name?"

function askName(proompt) {
    let name = prompt(proompt);
    if (name === null) {
        return;
    } else if (name === "") {
        iD("name_area").innerHTML = "Nice to meet you, lazy anonymous user! I hope you enjoyed the memes!"
    } else if (/\d/.test(name)) {
        let newProompt = "There's no way your name contains numbers."
        askName(newProompt);
    } else {
        iD("name_area").innerHTML = "Nice to meet you, " + name + "! I hope you enjoyed the memes!"
    }
}

// Clicker game section.

let count = 0;

function clicker() {
    count++;
    iD("tally").innerHTML = count;
}

function reset() {
    count = 0;
    iD("tally").innerHTML = count;
}

// Memory game section.

let round = 3;
let iteration = 0;
let gameString = "";
let attempt = 0;
const attemptPrompt = "Write the numbers in order of appearance without spaces between."
const maxAttempts = 2;

function rng() {
    return Math.floor(Math.random() * 10);
}

// Starts the memory game. Calls delayedLoop() whilst timeout calling answer(). The timeout is synced to the current round. The greater the round, the more numbers that need to be printed, the longer answer() has to wait.
function getNumbers(innRound) {
    round++;
    delayedLoop();
    setTimeout(function() {
        answer();
    }, (round*1000 + 1000));
}

// setIntervals randomly printing a number and adding that number to gameString. Stops when iteration equals round. Set to go off every 1000ms.
function delayedLoop() {
    let timerId = setInterval(function (){
        iteration++;
        if (iteration <= round) {
            let x = rng();
            iD("memory_line").innerHTML = x;
            flash();
            gameString = gameString + x.toString();
        } else {
            clearTimeout(timerId);
            iteration = 0;
        }
    }, 1000);
}

// Prompts for an answer. Checks for null, wrong/right answers. Gives 2 tries before ending. Either soft resets or hard resets game depending on input.
function answer(aprompt) {
    attempt++;
    let pAnswer = prompt(aprompt)
    if (pAnswer === null) {
        alert("Not in the gaming mood? The game will sadly reset.")
        resetGame();
        return;
    } else if (pAnswer == gameString) {
        alert("Correct! You just memorized " + round + " digits. Starting again will add one more digit. See how far you can go!");
        softReset();
    } else if (pAnswer !== gameString && attempt < 2) {
        let newPrompt = "Nope, you got " + (maxAttempts - attempt) + " more try."
        answer(newPrompt);
    } else {
        alert("Too bad! You are out of tries. The answer was " + gameString + ". Try again?");
        resetGame();
    }
}

// Soft resets game: clears gameString and number of attempts.
function softReset() {
    gameString = "";
    attempt = 0;
}

// Hard resets game: Resets all parameters back to base levels.
function resetGame() {
    round = 3;
    iteration = 0;
    gameString = "";
    attempt = 0;
    iD("memory_line").innerHTML = "&nbsp;";
}

// sets promise that will resolve after ms milliseconds.
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Changes opacity of the numbers between 0 and 1 to "flash" the number. This ensures repeated numbers don't go unnoticed. 
async function flash() {
    iD("memory_line").style.opacity = "0";
    await sleep(100);
    iD("memory_line").style.opacity = "1";
}

function iD(element) {
    return document.getElementById(element);
}
