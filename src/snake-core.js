export const DIRECTIONS = {
  up: { x: 0, y: -1 },
  down: { x: 0, y: 1 },
  left: { x: -1, y: 0 },
  right: { x: 1, y: 0 },
};

const OPPOSITES = {
  up: 'down',
  down: 'up',
  left: 'right',
  right: 'left',
};

export function createInitialState(config = {}, rand = Math.random) {
  const cols = config.cols ?? 20;
  const rows = config.rows ?? 20;
  const startX = Math.floor(cols / 2);
  const startY = Math.floor(rows / 2);

  const snake = [
    { x: startX, y: startY },
    { x: startX - 1, y: startY },
    { x: startX - 2, y: startY },
  ];

  return {
    cols,
    rows,
    snake,
    direction: 'right',
    queuedDirection: 'right',
    food: placeFood(snake, cols, rows, rand),
    score: 0,
    gameOver: false,
    paused: false,
  };
}

export function queueDirection(state, nextDirection) {
  if (!DIRECTIONS[nextDirection]) {
    return state;
  }

  if (OPPOSITES[state.direction] === nextDirection) {
    return state;
  }

  if (OPPOSITES[state.queuedDirection] === nextDirection) {
    return state;
  }

  return {
    ...state,
    queuedDirection: nextDirection,
  };
}

export function togglePause(state) {
  if (state.gameOver) {
    return state;
  }

  return {
    ...state,
    paused: !state.paused,
  };
}

export function tick(state, rand = Math.random) {
  if (state.gameOver || state.paused) {
    return state;
  }

  const direction = state.queuedDirection;
  const delta = DIRECTIONS[direction];
  const head = state.snake[0];
  const nextHead = {
    x: head.x + delta.x,
    y: head.y + delta.y,
  };

  const hitsWall =
    nextHead.x < 0 ||
    nextHead.y < 0 ||
    nextHead.x >= state.cols ||
    nextHead.y >= state.rows;

  const ateFood =
    state.food !== null &&
    nextHead.x === state.food.x &&
    nextHead.y === state.food.y;
  const collisionBody = ateFood ? state.snake : state.snake.slice(0, -1);

  if (hitsWall || isOnBody(nextHead, collisionBody)) {
    return {
      ...state,
      direction,
      gameOver: true,
    };
  }
  const nextSnake = [nextHead, ...state.snake];

  if (!ateFood) {
    nextSnake.pop();
  }

  const nextFood = ateFood
    ? placeFood(nextSnake, state.cols, state.rows, rand)
    : state.food;

  return {
    ...state,
    snake: nextSnake,
    direction,
    queuedDirection: direction,
    food: nextFood,
    score: state.score + (ateFood ? 1 : 0),
  };
}

export function placeFood(snake, cols, rows, rand = Math.random) {
  const occupied = new Set(snake.map((segment) => `${segment.x},${segment.y}`));
  const freeCells = [];

  for (let y = 0; y < rows; y += 1) {
    for (let x = 0; x < cols; x += 1) {
      const key = `${x},${y}`;
      if (!occupied.has(key)) {
        freeCells.push({ x, y });
      }
    }
  }

  if (freeCells.length === 0) {
    return null;
  }

  const index = Math.floor(rand() * freeCells.length);
  return freeCells[index];
}

function isOnBody(point, snake) {
  for (let i = 0; i < snake.length; i += 1) {
    if (snake[i].x === point.x && snake[i].y === point.y) {
      return true;
    }
  }
  return false;
}
