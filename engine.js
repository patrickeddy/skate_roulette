const state = {
  currentTrick: undefined,
  score: 0,
  landedTricks: [],
  bailedTricks: [],
}

const GAME_SCORE = 'SKATE_' // _ is the second try on 'E'
const tricks = [
  'ollie',
  'nollie',
  'kickflip',
  'BS pop shove-it',
  'FS pop shove-it',
  'treflip',
  'hardflip',
  'nollie kickflip',
  'BS flip',
  'FS flip',
]

function isGameOver() {
  return state.score === GAME_SCORE.length
}

function isLastLetter() {
  return state.score === GAME_SCORE.length - 1
}

function landed() {
  if (state.score === GAME_SCORE.length - 1) {
    state.score -= 1
  }
  state.landedTricks.push(state.currentTrick)
  render()
}

function bailed() {
  state.score += 1
  state.bailedTricks.push(state.currentTrick)
  render()
}

const styles = `
  body {
    text-align: center;
    font-family: arial;
  }

  h3 {
    font-size: 3em;
  }

  h4 {
    font-size: 2em;
  }

  button {
    font-size: 1.5em;
    padding: 1rem;
    background: black;
    color: white;
  }

  .last-try {
    color: red;
  }

  ol {
    text-align: left;
    width: 30%;
    margin: 1rem auto;
  }

  li {
    font-size: 1.5em;
  }
`

function renderScore() {
  return `
  <h4>
    ${GAME_SCORE.slice(0, state.score).slice(0, GAME_SCORE.length-1)}
  </h4>
  `
}

function renderRestartGameButton() {
  return `
  <div>
    <button onclick="window.location.reload()">Restart Game</button>
  </div>
  `
}

function renderTrickButtons() {
  return `
  <div>
    <button onclick="landed()">Landed</button>
    <button onclick="bailed()">Bailed</button>
  </div>
  `
}

function renderGameSummary() {
  return `
    <div>
      <h3>Landed Tricks: ${state.landedTricks.length}</h3>
      <ol>
        ${state.landedTricks.map(function(trick) {
          return `<li>${trick}</li>`;
        }).join('')}
      </ol>
      <h3>Bailed Tricks: ${state.bailedTricks.length}</h3>
      <ol>
        ${state.bailedTricks.map(function(trick) {
          return `<li>${trick}</li>`;
        }).join('')}
      </ol>
    </div>
  `
}

function renderGameState() {
  return `
    <div>
      <h3>${state.currentTrick}</h3>
    </div>
    <div>
      ${renderScore()}
    </div>
  `
}

function renderPage() {
  return `
    ${isGameOver() ? renderGameSummary() : renderGameState()}
    ${isLastLetter() ? `<div class="last-try">ONE LAST TRY!</div>` : ''}
    ${isGameOver() ? renderRestartGameButton() : renderTrickButtons()}
  `
}

function renderMeta() {
  return `
    <meta charset="utf-8">
    <style>${styles}</style>
  `
}

function render() {
  if (!isLastLetter()) {
    state.currentTrick = tricks[Math.floor(Math.random() * tricks.length)]
  }

  const headElem = document.querySelector('head')
  headElem.innerHTML = renderMeta()
  const rootElem = document.querySelector('#root')
  rootElem.innerHTML = renderPage()
}

function main() {
  render()
}

window.onload = main
