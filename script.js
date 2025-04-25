const words = ["apple", "banana", "grape", "mango", "peach", "kiwi", "orange"];
let secretWord = words[Math.floor(Math.random() * words.length)];
let attempts = 5;
let gameOver = false;

console.log("Secret Word (for testing):", secretWord); // For testing purposes

const input = document.getElementById("guessInput");
const feedback = document.getElementById("feedback");
const hint = document.getElementById("hint");
const submitBtn = document.getElementById("submitBtn");
const playAgainBtn = document.getElementById("playAgainBtn");

hint.textContent = `Hint: The word starts with '${secretWord.charAt(0).toUpperCase()}'`;

submitBtn.addEventListener("click", handleGuess);
input.addEventListener("keypress", function (e) {
  if (e.key === "Enter") handleGuess();
});

playAgainBtn.addEventListener("click", () => {
  secretWord = words[Math.floor(Math.random() * words.length)];
  console.log("New Secret Word (for testing):", secretWord);
  attempts = 5;
  gameOver = false;
  input.disabled = false;
  submitBtn.disabled = false;
  feedback.textContent = "";
  feedback.className = "";
  input.value = "";
  hint.textContent = `Hint: The word starts with '${secretWord.charAt(0).toUpperCase()}'`;
  playAgainBtn.style.display = "none";
});

function handleGuess() {
  if (gameOver) return;

  const userGuess = input.value.trim().toLowerCase();
  input.value = "";

  if (userGuess === "") {
    attempts--;
    feedback.textContent = `Incorrect guess. You have ${attempts} attempts left. Try again!`;
  } else if (userGuess === secretWord) {
    feedback.textContent = "Congratulations! You guessed the secret word!";
    feedback.className = "win";
    gameOver = true;
    endGame();
    return;
  } else {
    attempts--;
    feedback.textContent = `Incorrect guess. You have ${attempts} attempts left. Try again!`;
  }

  if (attempts === 0) {
    feedback.textContent = `Game over! The secret word was '${secretWord}'.`;
    feedback.className = "lose";
    gameOver = true;
    endGame();
  }
}

function endGame() {
  input.disabled = true;
  submitBtn.disabled = true;
  playAgainBtn.style.display = "inline-block";
}