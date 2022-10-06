'use strict';

//SELECTING ELEMENTS
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');


//DECLARING VARIABLES
let scores, currentScore, activePlayer, playing;

//STARTING CONDITIONS
const init = function () {
  currentScore = 0;
  activePlayer = 0;
  playing = true;
  scores = [0, 0];

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  diceEl.classList.add('hidden');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
};
init();

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

//Rolling dice functionality
btnRoll.addEventListener('click', function () {
  if (playing) {
    //1. GENERATING A RANDOM DICE ROLL
    const dice = Math.trunc(Math.random() * 6) + 1;

    //2. DISPLAY DICE
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;

    //3. CHECKED FOR ROLLED 1: IF TRUE, SWITCH TO NEXT PLAYER
    if (dice !== 1) {
      //ADD DICE TO CURRENT SCORE
      //currentScore = currentScore + dice;
      //current0El.textContent = currentScore;
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      //SWITCH TO NEXT PLAYER
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
  // 1. ADD CURRENT SCORE TO ACTIVE PLAYER'S SCORE
    scores[activePlayer] += currentScore;
    //scores[1] = scores[1] + currentScore;

    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    //2. check if player's score is >= 100
    if (scores[activePlayer] >= 20) {
      //Finish the game
      playing = false;
      diceEl.classList.add('hidden');

      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player-winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
      //playing = false;
    } else {
      //switch to the next player
      switchPlayer();
    }
  }
});

btnNew.addEventListener('click', init);

