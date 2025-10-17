const gameBoard = document.getElementById('gameBoard');
const gameInfo = document.getElementById('gameInfo');
const restartBtn = document.getElementById('restartBtn');

let boardState = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let gameActive = true;

// Winning combinations with line class for displaying strike-through
const winningCombinations = [
  { combo: [0,1,2], lineClass: 'line-horizontal' },
  { combo: [3,4,5], lineClass: 'line-horizontal' },
  { combo: [6,7,8], lineClass: 'line-horizontal' },
  { combo: [0,3,6], lineClass: 'line-vertical' },
  { combo: [1,4,7], lineClass: 'line-vertical' },
  { combo: [2,5,8], lineClass: 'line-vertical' },
  { combo: [0,4,8], lineClass: 'line-diagonal1' },
  { combo: [2,4,6], lineClass: 'line-diagonal2' }
];

// Initialize the game board
function initializeBoard() {
  gameBoard.innerHTML = '';
  boardState.fill('');
  gameActive = true;
  currentPlayer = 'X';
  gameInfo.textContent = `Player ${currentPlayer}'s turn`;

  for (let i = 0; i < 9; i++) {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    cell.dataset.index = i;
    cell.addEventListener('click', handleCellClick);
    gameBoard.appendChild(cell);
  }
}

// Handle cell click event
function handleCellClick(e) {
  const index = e.target.dataset.index;

  if (boardState[index] !== '' || !gameActive) return;

  updateCell(e.target, index);
  checkResult();
}

// Update cell UI and board state
function updateCell(cell, index) {
  boardState[index] = currentPlayer;
  cell.textContent = currentPlayer;
  cell.classList.add('disabled');
}

// Check for win or draw
function checkResult() {
  let roundWon = false;
  let winCombo = null;

  for (const winSet of winningCombinations) {
    const [a, b, c] = winSet.combo;
    if (
      boardState[a] === currentPlayer &&
      boardState[b] === currentPlayer &&
      boardState[c] === currentPlayer
    ) {
      roundWon = true;
      winCombo = winSet;
      break;
    }
  }

  if (roundWon) {
    gameActive = false;
    gameInfo.textContent = `Player ${currentPlayer} wins!`;
    showWinningLine(winCombo.combo, winCombo.lineClass);
    disableAllCells();
    return;
  }

  if (!boardState.includes('')) {
    gameActive = false;
    gameInfo.textContent = "It's a draw!";
    return;
  }

  // Switch player
  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  gameInfo.textContent = `Player ${currentPlayer}'s turn`;
}

// Disable all cells after game over
function disableAllCells() {
  const cells = document.querySelectorAll('.cell');
  cells.forEach(cell => cell.classList.add('disabled'));
}

// Display winning line on the winning cells
function showWinningLine(cells, lineClass) {
  cells.forEach(index => {
    const cell = gameBoard.children[index];
    const line = document.createElement('div');
    line.classList.add('line-through', lineClass);
    cell.appendChild(line);
  });
}

// Restart game event
restartBtn.addEventListener('click', () => {
  initializeBoard();
});

// Initialize game on load
initializeBoard();
