# Snake Game
## Jugar online
Puedes jugar aquí: [Snake Game](https://odettebux.github.io/snake_game/)


ES: Juego clásico de Snake hecho con HTML, CSS y JavaScript vanilla.
EN: Classic Snake game built with vanilla HTML, CSS, and JavaScript.

## Características / Features

- ES: Movimiento en cuadrícula (Snake clásico)
  EN: Grid-based movement (classic Snake)
- ES: Comida aleatoria y crecimiento de la serpiente
  EN: Random food spawn and snake growth
- ES: Puntuación, nivel y récord (guardado en `localStorage`)
  EN: Score, level, and high score (saved in `localStorage`)
- ES: Game Over + reinicio
  EN: Game Over + restart
- ES: Pausa / resume
  EN: Pause / resume
- ES: Dificultad seleccionable: `Easy`, `Classic`, `Hard`
  EN: Selectable difficulty: `Easy`, `Classic`, `Hard`
- ES: Modo opcional `Wrap walls` (atravesar bordes)
  EN: Optional `Wrap walls` mode (pass through borders)
- ES: Sonidos retro (activables/desactivables)
  EN: Retro sound effects (toggle on/off)
- ES: Controles de teclado y botones en pantalla
  EN: Keyboard controls and on-screen buttons

## Requisitos / Requirements

- Node.js (para tests / for tests)
- Python 3 (para servidor local / for local server)

## Ejecutar en local / Run locally

```bash
npm start
```

Abrir en el navegador / Open in browser:

- `http://localhost:5173`

## Tests

```bash
npm test
```

## Controles / Controls

- ES: Mover: flechas o `W`, `A`, `S`, `D`
  EN: Move: arrow keys or `W`, `A`, `S`, `D`
- ES: Empezar: `Enter` o botón `Start`
  EN: Start: `Enter` or `Start` button
- ES: Pausa: `Espacio` o `P`
  EN: Pause: `Space` or `P`
- ES: Reiniciar: botón `Restart`
  EN: Restart: `Restart` button

## Ajustes del juego / Game settings

- `Difficulty`: ES: cambia la velocidad base | EN: changes base game speed
- `Wrap walls`: ES: atraviesa bordes | EN: go through one edge and appear on the opposite side
- `Sound`: ES/EN: activa o desactiva / toggle audio effects

## Estructura principal / Main structure

- `index.html`: ES interfaz / EN UI
- `styles.css`: ES/EN styles
- `src/snake-core.js`: ES lógica principal / EN core logic
- `src/game.js`: ES loop + render + controles + audio / EN game loop + render + controls + audio
- `tests/snake-core.test.js`: ES/EN core logic tests
