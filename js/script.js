//ul
const guessedLetters = document.querySelector(".guessed-letters");
//button
const guessButton = document.querySelector(".guess");
//text input guess
const userGuessesLetter = document.querySelector(".letter");
//chosen word appears with ● for letters not yet guessed
const wordInProgress = document.querySelector(".word-in-progress");
//number of guesses left
const remainingGuesses = document.querySelector(".remaining");
//message appears to users after guess
const message = document.querySelector(".message");
//button to play again
const playAgainButton = document.querySelector(".play-again hide");

const word = "magnolia";

//Display ● for each letter of the chosen word
const updateWordInProgress = function (word) {
    const wordInProgressLetters = [];
    for (const letter of word) {
        console.log(letter);
        wordInProgressLetters.push("●");
    }
    wordInProgress.innerText = wordInProgressLetters.join("");
}

updateWordInProgress(word);

guessButton.addEventListener("click", function(e) {
    e.preventDefault();
    let userGuess = userGuessesLetter.value;
    console.log("userGuess:", userGuess);
    userGuessesLetter.value = "";
});