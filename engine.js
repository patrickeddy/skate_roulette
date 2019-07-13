const tricks = [
  'ollie',
  'nollie',
  'kickflip',
  'varial kickflip',
  'treflip',
  'BS flip',
  'FS flip',
  'fakie kickflip',
  'hardflip',
  'BS pop shove-it',
  'FS pop shove-it',
  'BS heelflip',
  'FS heelflip',
  'heelflip',
  'varial heelflip',
  'nollie kickflip',
  'nollie varial kickflip',
  'nollie tre flip',
  'nollie heelflip',
  'nollie varial heelflip',
  'nollie FS flip',
  'pressure flip',
  'BS pressure flip',
  'FS pressure flip',
  'BS 360 kickflip',
  'BS big spin',
  'FS big spin',
  'fakie FS big spin',
  'fakie BS big spin',
  'nollie FS big spin',
  'nollie BS big spin',
  '360 shove-it',
  'hospital flip',
]

const GAME_SCORE = 'SKATE_' // _ is the second try on 'E'
const state = {
  availableTricks: tricks,
  currentTrick: undefined,
  score: 0,
  landedTricks: [],
  bailedTricks: [],
}

function hasWon() {
  return state.availableTricks.length === 0
}

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
  html, body {
    text-align: center;
    font-family: Arial;
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
    font-size: 1.5em;
    margin: 1rem;
  }

  ol {
    text-align: left;
    width: 200px;
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

function renderWin() {
  return `
    <h3>You Won 🛹</h3>
    ${renderGameSummary()}
    ${renderRestartGameButton()}
  `
}

function renderPage() {
  if (hasWon()) {
    return renderWin()
  }

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
    const trickIndex = state.availableTricks.findIndex(function(trick) { return trick === state.currentTrick })
    state.availableTricks.splice(trickIndex, 1)
    const newTrick = state.availableTricks[Math.floor(Math.random() * tricks.length)]
    state.currentTrick = newTrick
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
