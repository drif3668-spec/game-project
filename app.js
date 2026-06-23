const pond = document.querySelector("#pond");
const fish = document.querySelector("#fish");
const scoreEl = document.querySelector("#score");
const timeEl = document.querySelector("#time");
const message = document.querySelector("#message");
const restart = document.querySelector("#restart");

let score = 0;
let timeLeft = 30;
let gameTimer = null;
let moveTimer = null;
let running = false;

function randomPosition() {
  const bounds = pond.getBoundingClientRect();
  const x = 50 + Math.random() * Math.max(1, bounds.width - 100);
  const y = 50 + Math.random() * Math.max(1, bounds.height - 110);
  fish.style.left = `${x}px`;
  fish.style.top = `${y}px`;
}

function setMessage(text) {
  message.textContent = text;
}

function finishGame() {
  running = false;
  clearInterval(gameTimer);
  clearInterval(moveTimer);
  fish.disabled = true;
  setMessage(`Time is up. Final score: ${score}`);
}

function startGame() {
  score = 0;
  timeLeft = 30;
  running = true;
  fish.disabled = false;
  scoreEl.textContent = score;
  timeEl.textContent = timeLeft;
  setMessage("Catch the fish before time runs out.");
  randomPosition();

  clearInterval(gameTimer);
  clearInterval(moveTimer);

  gameTimer = setInterval(() => {
    timeLeft -= 1;
    timeEl.textContent = timeLeft;
    if (timeLeft <= 0) finishGame();
  }, 1000);

  moveTimer = setInterval(randomPosition, 850);
}

fish.addEventListener("click", () => {
  if (!running) return;
  score += 1;
  scoreEl.textContent = score;
  setMessage(score % 5 === 0 ? "Nice streak." : "Caught one.");
  randomPosition();
});

restart.addEventListener("click", startGame);
window.addEventListener("resize", randomPosition);

startGame();
