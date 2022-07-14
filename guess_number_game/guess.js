// guess the number game
// random game
let randomNumber = Math.floor(Math.random() * 100) + 1;

// pointers to each element
const guesses = document.querySelector('#guesses');
const lastResult = document.querySelector('#lastResult');
const lowOrHi = document.querySelector('#lowOrHi');

const guessSubmit = document.querySelector('#guessSubmit');
const guessField = document.querySelector('#guessField');

// guess counter
let guessCount = 1;
let resetButton;

guessSubmit.addEventListener('click', checkGuess);

function checkGuess() {
    // get the user's gess
    const userGuess = Number(guessField.value);

    if (guessCount === 1) {
      guesses.textContent = 'Previous guesses: ';
    }
    guesses.textContent += userGuess + ' ';
  
    //verify if the user's guess is correct, lower or higher
    if (userGuess === randomNumber) {
      lastResult.textContent = 'Congratulations! You got it right!';
      lastResult.style.backgroundColor = 'green';
      lowOrHi.textContent = '';
      setGameOver();
    } else if (guessCount === 10) {
        // guess count exceeded the limit
      lastResult.textContent = '!!!GAME OVER!!!';
      lowOrHi.textContent = '';
      // game's over
      setGameOver();
    } else {
        // wrong guess
      lastResult.textContent = 'Wrong guess!';
      lastResult.style.backgroundColor = 'red';

      // check if guess is lower or higher
      if(userGuess < randomNumber) {
        lowOrHi.textContent = 'Last guess was too low!';
      } else if(userGuess > randomNumber) {
        lowOrHi.textContent = 'Last guess was too high!';
      }
    }
  
    guessCount++;
    guessField.value = '';
    guessField.focus();
  }
  
  // game over
  function setGameOver() {
    guessField.disabled = true;
    guessSubmit.disabled = true;

    const resetDiv = document.querySelector("#reset");

    resetButton = document.createElement('button');
    resetButton.textContent = 'Start new game';
    resetDiv.append(resetButton);
    resetButton.addEventListener('click', resetGame);
  }

  // reset/restart the game
  function resetGame() {
    guessCount = 1;
  
    const resetParas = document.querySelectorAll('#resultParas p');
    for (const resetPara of resetParas) {
      resetPara.textContent = '';
    }
  
    resetButton.parentNode.removeChild(resetButton);
  
    guessField.disabled = false;
    guessSubmit.disabled = false;
    guessField.value = '';
    guessField.focus();
  
    lastResult.style.backgroundColor = 'white';
  
    // new random number
    randomNumber = Math.floor(Math.random() * 100) + 1;
  }