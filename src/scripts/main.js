const state = {
  view: {
    squares: document.querySelectorAll(".square"),
    enemy: document.querySelector(".enemy"),
    timeLeft: document.querySelector("#time-left"),
    score: document.querySelector("#score"),
    lives: document.querySelector("#lives"),
  },
  values: {
    hitPosition: 0,
    result: 0,
    currentTime: 60,
    lives: 3,
  },
  actions: {
    timerId: setInterval(randomSquare, 500),
    countDownTimerId: setInterval(countDown, 1000),
  },
};

function countDown() {
  state.values.currentTime--;
  state.view.timeLeft.textContent = state.values.currentTime;

  if (state.values.currentTime <= 0) {
    clearTimeout(state.actions.countDownTimerId);
    clearTimeout(state.actions.timerId);
    alert("Game Over! Your result is: " + state.values.result);
    window.location.reload();
  }
}

function playSound() {
  let audio = new Audio("./src/audios/hit.m4a");

  audio.volume = 0.2;
  audio.play();
}

function randomSquare() {
  state.view.squares.forEach((square) => {
    square.classList.remove("enemy");
  });

  let randomNumber = Math.floor(Math.random() * 9);
  let randomSquare = state.view.squares[randomNumber];

  randomSquare.classList.add("enemy");
  state.values.hitPosition = randomSquare.id;
}

function addListenerHitbox() {
  state.view.squares.forEach((square) => {
    square.addEventListener("mousedown", () => {
      if (square.id === state.values.hitPosition) {
        state.values.result++;
        state.view.score.textContent = state.values.result;
        state.values.hitPosition = null;
        playSound();
      } else {
        state.values.lives--;
        state.view.lives.textContent = state.values.lives;

        if (state.values.lives <= 0) {
          alert("Game Over! Your result is: " + state.values.result);
          window.location.reload();
        }
      }
    });
  });
}

function initialize() {
  addListenerHitbox();
}

initialize();
