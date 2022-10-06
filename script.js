'use strict';
const player0El = document.querySelector(".player--0");
const player1El = document.querySelector(".player--1");
const overlay = document.querySelector(".overlay");
const popup = document.querySelector(".popup");
const close = document.querySelector(".close");
const open = document.querySelector(".rules");
const diceEl = document.querySelector(".dice");
const score0El = document.getElementById("score--0");
const score1El = document.getElementById("score--1");
const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");
const current0El = document.getElementById("current--0");
const current1El = document.getElementById("current--1");
let currentScore;
let activePlayer;
let scores;

const init = ()=>{
    currentScore = 0;
    activePlayer = 0;
    scores = [0,0];
    activePlayer = 0;
    document.getElementById(`current--0`).textContent = 0;
    document.getElementById(`current--1`).textContent = 0;
    document.getElementById(`score--0`).textContent = 0;
    document.getElementById(`score--1`).textContent = 0;
    player0El.classList.add("player--active");
    player1El.classList.remove("player--active");
    player1El.classList.remove("player--winner");
    player0El.classList.remove("player--winner");
    btnHold.disabled = "";
    btnRoll.disabled = "";
}
init();

const switchPlayer = ()=>{
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    currentScore = 0;
    activePlayer = activePlayer === 0 ? 1:0;
    player0El.classList.toggle("player--active");
    player1El.classList.toggle("player--active");
}

// Game Rules functionality
open.addEventListener("click", ()=>{
    popup.style.zIndex = "999";
    overlay.style.zIndex = "998";
    overlay.style.backdropFilter = "blur(10px)";
})
close.addEventListener("click", ()=>{
    popup.style.zIndex = "-999";
    overlay.style.zIndex = "-998";
    overlay.style.backdropFilter = "blur(0)";
})
// Starting adjustments
score0El.textContent = 0;
score1El.textContent = 0;

// Rolling dice functionality

btnRoll.addEventListener("click", ()=>{
    // Generating a random dice roll
    const randomNumber = Math.floor(Math.random() * 6 + 1);
    // display dice
    diceEl.src = `dice-${randomNumber}.png`;
    diceEl.style.display = "block";
    // check if dice = 1
    if (randomNumber !== 1) {
        // add dice current score
        currentScore+=randomNumber;
        document.getElementById(`current--${activePlayer}`).textContent = currentScore;
    }
    else{
        // Switch the current player
        switchPlayer();
    }
})

btnHold.addEventListener("click", ()=>{
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];
    if (scores[activePlayer]>= 100) {
        document.querySelector(`.player--${activePlayer}`).classList.add("player--winner");
        document.querySelector(`.player--${activePlayer}`).classList.remove("player--active");
        btnHold.disabled = "true";
        btnRoll.disabled = "true";
        diceEl.style.display = "none";
    }
    else{
        switchPlayer();
    }
})


btnNew.addEventListener("click",init);

