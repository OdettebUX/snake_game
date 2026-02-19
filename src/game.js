import {
  createInitialState,
  queueDirection,
  tick,
  togglePause,
} from './snake-core.js';

const GRID_SIZE = 20;
const CELL_SIZE = 20;
const TICK_MS = 120;

const canvas = document.querySelector('[data-game-canvas]');
const ctx = canvas.getContext('2d');
const scoreLabel = document.querySelector('[data-score]');
const statusLabel = document.querySelector('[data-status]');
const restartButton = document.querySelector('[data-restart]');
const pauseButton = document.querySelector('[data-pause]');
const controlButtons = document.querySelectorAll('[data-direction]');

canvas.width = GRID_SIZE * CELL_SIZE;
canvas.height = GRID_SIZE * CELL_SIZE;

let state = createInitialState({ cols: GRID_SIZE, rows: GRID_SIZE });
let timerId = null;

const KEY_TO_DIRECTION = {
  ArrowUp: 'up',
  ArrowDown: 'down',
  ArrowLeft: 'left',
  ArrowRight: 'right',
  w: 'up',
  a: 'left',
  s: 'down',
  d: 'right',
};

function startLoop() {
  if (timerId !== null) {
    clearInterval(timerId);
  }

  timerId = setInterval(() => {
    state = tick(state);
    if (!state.food && !state.gameOver) {
      state = { ...state, gameOver: true };
    }
    render();
  }, TICK_MS);
}

function restartGame() {
  state = createInitialState({ cols: GRID_SIZE, rows: GRID_SIZE });
  render();
}

function handleDirection(direction) {
  state = queueDirection(state, direction);
}

function handlePauseToggle() {
  state = togglePause(state);
  render();
}

function drawCell(x, y, color) {
  const padding = 1;
  ctx.fillStyle = color;
  ctx.fillRect(
    x * CELL_SIZE + padding,
    y * CELL_SIZE + padding,
    CELL_SIZE - padding * 2,
    CELL_SIZE - padding * 2
  );
}

function renderGrid() {
  ctx.fillStyle = '#101417';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.strokeStyle = '#1f2a30';
  ctx.lineWidth = 1;

  ctx.beginPath();
  for (let x = 0; x <= GRID_SIZE; x += 1) {
    const px = x * CELL_SIZE + 0.5;
    ctx.moveTo(px, 0);
    ctx.lineTo(px, canvas.height);
  }
  for (let y = 0; y <= GRID_SIZE; y += 1) {
    const py = y * CELL_SIZE + 0.5;
    ctx.moveTo(0, py);
    ctx.lineTo(canvas.width, py);
  }
  ctx.stroke();
}

function render() {
  renderGrid();

  for (let i = 0; i < state.snake.length; i += 1) {
    const segment = state.snake[i];
    drawCell(segment.x, segment.y, i === 0 ? '#75f27a' : '#45b84b');
  }

  if (state.food) {
    drawCell(state.food.x, state.food.y, '#f04f50');
  }

  scoreLabel.textContent = String(state.score);

  if (state.gameOver) {
    statusLabel.textContent = 'Game Over';
    pauseButton.disabled = true;
  } else if (state.paused) {
    statusLabel.textContent = 'Paused';
    pauseButton.disabled = false;
  } else {
    statusLabel.textContent = 'Running';
    pauseButton.disabled = false;
  }

  pauseButton.textContent = state.paused ? 'Resume' : 'Pause';
}

window.addEventListener('keydown', (event) => {
  if (event.key === ' ' || event.key.toLowerCase() === 'p') {
    event.preventDefault();
    handlePauseToggle();
    return;
  }

  const direction = KEY_TO_DIRECTION[event.key] || KEY_TO_DIRECTION[event.key.toLowerCase()];
  if (direction) {
    event.preventDefault();
    handleDirection(direction);
  }
});

restartButton.addEventListener('click', () => {
  restartGame();
});

pauseButton.addEventListener('click', () => {
  handlePauseToggle();
});

for (const button of controlButtons) {
  button.addEventListener('click', () => {
    const direction = button.dataset.direction;
    if (direction) {
      handleDirection(direction);
    }
  });
}

render();
startLoop();
