"use strict";

/////////////SETTING STARTING INTERFACE OF GAME////////

//Selecting and Renaming Elements to manipulate
const player0El = document.querySelector(".player--0");
const player1El = document.querySelector(".player--1");
const score0El = document.querySelector("#score--0");
const current0El = document.getElementById("current--0");
const score1El = document.getElementById("score--1");
const current1El = document.getElementById("current--1");
const diceEl = document.querySelector(".dice");
const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");

let scores, currentScore, activePlayer, playing;

//Set the starting conditions of the score to zero:
//DRY -- this function is screated to store repeated values in a new variable
const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;

  //To hide/show the dice, we add a hidden class to the html file and set the class to display none in css
  diceEl.classList.add("hidden");

  //in order to diactivate all buttons when a player wins;
  playing = true;
  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;
  player0El.classList.remove("player--winner");
  player1El.classList.remove("player--winner");
  player0El.classList.add("player--active");
  player1El.classList.remove("player--active");
};

const switchPlayer = function () {
  //Switch player: use ternary operator
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  currentScore = 0;
  //Toggle between player 1 and 0
  player0El.classList.toggle("player--active");
  player1El.classList.toggle("player--active");
};

////////////////PLAYING THE GAME /////////////
//initial conditions
init();

/////////////React to clicking the ROLL DICE button///////////
btnRoll.addEventListener("click", function () {
  if (playing) {
    //1. Generating a random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;

    //2. Display Dice
    diceEl.classList.remove("hidden");
    diceEl.src = `images/dice-${dice}.png`;

    //3. Check for rolled 1:
    if (dice !== 1) {
      //Add dice to current score
      currentScore += dice;

      //Building dynamic ID name
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;

      //current0El.textContent = currentScore //Let the recult be displayed to the current player instead
    } else {
      //switch to next player:
      switchPlayer();
    }
  }
});

/////////React to clicking the HOLD BUTTON button//////////
btnHold.addEventListener("click", function () {
  if (playing) {
    //1. Add current Score to active players score
    //scores[1]= scores[1] + currentScore; --shorthand
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    //2. Switch to next player
    // switchPlayer();

    //3. Check if players scores is >= 100 ---
    if (scores[activePlayer] >= 100) {
      //finsh the game
      playing = false;
      diceEl.classList.add("hidden");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--winner");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove("player--active");
    } else {
      switchPlayer();
    }
  }
});

////////////React to clicking the NEW GAME button//////////
btnNew.addEventListener("click", init);
