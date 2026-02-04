import test from 'node:test';
import assert from 'node:assert/strict';
import {
  createInitialState,
  queueDirection,
  tick,
  placeFood,
} from '../src/snake-core.js';

test('tick moves snake forward one cell', () => {
  const state = {
    cols: 10,
    rows: 10,
    snake: [
      { x: 4, y: 4 },
      { x: 3, y: 4 },
      { x: 2, y: 4 },
    ],
    direction: 'right',
    queuedDirection: 'right',
    food: { x: 8, y: 8 },
    score: 0,
    paused: false,
    gameOver: false,
  };

  const next = tick(state);

  assert.deepEqual(next.snake, [
    { x: 5, y: 4 },
    { x: 4, y: 4 },
    { x: 3, y: 4 },
  ]);
  assert.equal(next.score, 0);
  assert.equal(next.gameOver, false);
});

test('queueDirection rejects direct reversal', () => {
  const state = createInitialState({ cols: 10, rows: 10 }, () => 0);
  const next = queueDirection(state, 'left');

  assert.equal(next.queuedDirection, 'right');
});

test('tick grows snake and increments score when food is eaten', () => {
  const state = {
    cols: 6,
    rows: 6,
    snake: [
      { x: 2, y: 2 },
      { x: 1, y: 2 },
      { x: 0, y: 2 },
    ],
    direction: 'right',
    queuedDirection: 'right',
    food: { x: 3, y: 2 },
    score: 0,
    paused: false,
    gameOver: false,
  };

  const next = tick(state, () => 0);

  assert.equal(next.snake.length, 4);
  assert.deepEqual(next.snake[0], { x: 3, y: 2 });
  assert.equal(next.score, 1);
  assert.notDeepEqual(next.food, { x: 3, y: 2 });
});

test('tick sets gameOver when snake hits wall', () => {
  const state = {
    cols: 5,
    rows: 5,
    snake: [
      { x: 4, y: 1 },
      { x: 3, y: 1 },
      { x: 2, y: 1 },
    ],
    direction: 'right',
    queuedDirection: 'right',
    food: { x: 0, y: 0 },
    score: 0,
    paused: false,
    gameOver: false,
  };

  const next = tick(state);

  assert.equal(next.gameOver, true);
});

test('tick sets gameOver when snake collides with itself', () => {
  const state = {
    cols: 6,
    rows: 6,
    snake: [
      { x: 2, y: 2 },
      { x: 2, y: 3 },
      { x: 3, y: 3 },
      { x: 3, y: 2 },
    ],
    direction: 'left',
    queuedDirection: 'down',
    food: { x: 0, y: 0 },
    score: 0,
    paused: false,
    gameOver: false,
  };

  const next = tick(state);

  assert.equal(next.gameOver, true);
});

test('placeFood always returns an unoccupied location', () => {
  const snake = [
    { x: 0, y: 0 },
    { x: 1, y: 0 },
    { x: 2, y: 0 },
    { x: 0, y: 1 },
  ];

  const food = placeFood(snake, 4, 4, () => 0);

  assert.notEqual(food, null);
  for (const segment of snake) {
    assert.notDeepEqual(food, segment);
  }
});
