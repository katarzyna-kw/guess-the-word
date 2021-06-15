//ul
const guessedLettersElement = document.querySelector(".guessed-letters");
//button
const guessButton = document.querySelector(".guess");
//text input guess
const letterInput = document.querySelector(".letter");
//chosen word appears with ● for letters not yet guessed
const wordInProgress = document.querySelector(".word-in-progress");
//number of guesses left
const remainingGuesses = document.querySelector(".remaining");
//message appears to users after guess
const message = document.querySelector(".message");
//button to play again
const playAgainButton = document.querySelector(".play-again hide");

const word = "magnolia";
const guessedLetters = [];

//Display ● for each letter of the chosen word
const placeholder = function (word) {
    const placeholderArray = [];
    for (const letter of word) {
        console.log(letter);
        placeholderArray.push("●");
    }
    wordInProgress.innerText = placeholderArray.join("");
};

placeholder(word);

guessButton.addEventListener("click", function(e) {
    e.preventDefault();
    message.innerText = "";
    const userGuess = letterInput.value;
    const checkUserGuess = checkGuessInput(userGuess);
    console.log("check input value: ", checkUserGuess);
    if (checkUserGuess) {
        makeGuess(userGuess);
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
        message.innerText = "You have already guessed that letter. Try again!";
    } else {
        guessedLetters.push(guess);
        console.log("guessedLetters array: ", guessedLetters);
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

//check if player won
const checkIfGameWon = function () {
    if (word.toUpperCase() === wordInProgress.innerText) {
        message.classList.add("win");
        message.innerHTML = `<p class="highlight">You guessed correct the word! Congrats!</p>`;
    }
;}