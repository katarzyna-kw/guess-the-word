// BEDAE5 baby blue
// EECB27 golden
// E13239 crimson
// 1F1762 indigo
// 253F58 slate

//ul
const guessedLettersElement = document.querySelector(".guessed-letters");
//button
const guessButton = document.querySelector(".guess");
//text input guess
const letterInput = document.querySelector(".letter");
//chosen word appears with ● for letters not yet guessed
const wordInProgress = document.querySelector(".word-in-progress");
//number of guesses left
const remainingGuessesElement = document.querySelector(".remaining");
const remainingGuessesSpan = document.querySelector(".remaining span");
//message appears to users after guess
const message = document.querySelector(".message");
//button to play again
const playAgainButton = document.querySelector(".play-again");

//global variables
let word = "pie";
let guessedLetters = [];
let remainingGuesses = 8;

const getWord = async function () {
    const result = await fetch(
        "https://gist.githubusercontent.com/skillcrush-curriculum/7061f1d4d3d5bfe47efbfbcfe42bf57e/raw/5ffc447694486e7dea686f34a6c085ae371b43fe/words.txt"
        );
    const words = await result.text();
    const wordArray = words.split("\n");
    const randomWordIndex = Math.floor(Math.random() * wordArray.length);
    word = wordArray[randomWordIndex].trim();
    placeholder(word);
};

getWord();

//Display ● for each letter of the chosen word
const placeholder = function (word) {
    const placeholderArray = [];
    for (const letter of word) {
        // console.log(letter);
        placeholderArray.push("●");
    }
    wordInProgress.innerText = placeholderArray.join("");
};

guessButton.addEventListener("click", function (e) {
    e.preventDefault();
    message.innerText = "";
    const guess = letterInput.value;
    const checkGuess = checkGuessInput(guess);
    // console.log("check input value: ", checkUserGuess);
    if (checkGuess) {
        makeGuess(guess);
    }
    letterInput.value = "";
});

//check player's input
const checkGuessInput = function (input) {
    const acceptedLetter = /[a-zA-Z]/;
    const correctionMsg = "Please enter a single letter from A-Z.";
    if (input.length === 0) {
        message.innerText = correctionMsg;
    } else if (input.length > 1) {
        message.innerText = correctionMsg;
    } else if (!input.match(acceptedLetter)) {
        message.innerText = correctionMsg;
    } else {
        return input;
    }
};

//capture player's input
const makeGuess = function (guess) {
    guess = guess.toUpperCase();
    if (guessedLetters.includes(guess)) {
        message.innerText = `You have already guessed ${guess}. Try again!`;
    } else {
        guessedLetters.push(guess);
        console.log("guessedLetters array: ", guessedLetters);
        countRemainingGuesses(guess);
        showGuesses();
        updateWordInProgress(guessedLetters);
    }    
};

//show guessed letters
const showGuesses = function () {
    guessedLettersElement.innerHTML = "";
    for (const letter of guessedLetters) {
        const li = document.createElement("li");
        li.innerText = letter;
        guessedLettersElement.append(li);
    }
};

//update word in progress
const updateWordInProgress = function (guessedLetters) {
    const wordUpper = word.toUpperCase();
    //split string into array of letters
    const wordArray = wordUpper.split("");
    const updatedCharacters = [];
    for (const letter of wordArray) {
        if (guessedLetters.includes(letter)) {
            updatedCharacters.push(letter.toUpperCase());
        } else {
            updatedCharacters.push("●");
        }
    }
    wordInProgress.innerText = updatedCharacters.join("");
    checkIfGameWon();
};

const countRemainingGuesses = function (guess) {
  const upperWord = word.toUpperCase();
  if (!upperWord.includes(guess)) {
      message.innerText = `Nah, the word does not contain ${guess}.`;
      remainingGuesses -= 1;
  } else {
      message.innerText = `Yes! The letter ${guess} is in the word.`;
  }

  if (remainingGuesses === 0) {
      message.innerHTML = `Game over! The word was <span class="highlight">${upperWord}</span>.`;
      startOver();
  } else if (remainingGuesses === 1) {
      remainingGuessesSpan.innerText = `${remainingGuesses} guess`;
  } else {
      remainingGuessesSpan.innerText = `${remainingGuesses} guesses`;
  }
};

//check if player won
const checkIfGameWon = function () {
    if (word.toUpperCase() === wordInProgress.innerText) {
        message.classList.add("win");
        message.innerHTML = `<p class="highlight">You guessed correct the word! Congrats!</p>`;
        
        startOver();
    }
};

//hide and show elements on game over
const startOver = function () {
        guessButton.classList.add("hide");
        remainingGuessesElement.classList.add("hide");
        guessedLettersElement.classList.add("hide");
        playAgainButton.classList.remove("hide");
};

//play again button functionality
playAgainButton.addEventListener("click", function () {
    message.classList.remove("win");
    message.innerText = "";
    guessedLettersElement.innerHTML = "";
    remainingGuesses = 8;
    guessedLetters = [];
    // console.log(guessedLetters);
    remainingGuessesSpan.innerText = `${remainingGuesses} guesses`;
    // console.log(remainingGuessesSpan)

    guessButton.classList.remove("hide");
    playAgainButton.classList.add("hide");
    remainingGuessesElement.classList.remove("hide");
    guessedLettersElement.classList.remove("hide");

    getWord();
})