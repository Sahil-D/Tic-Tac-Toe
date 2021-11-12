const cellElements = document.querySelectorAll('[data-cell]');
const board = document.getElementById('board');
const winningMessageElement = document.getElementById('winning-message');
const winningMessageText = document.querySelector(
  '[data-winning-message-text]'
);
const restartButton = document.getElementById('restart-button');

const CLASS_X = 'x';
const CLASS_O = 'circle';
const WINNING_COMBINATIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 4, 8],
  [2, 4, 6],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
];

let circleTurn;

// game start by calling this function
startGame();

function startGame() {
  //for reset purpose
  circleTurn = false;
  winningMessageElement.classList.remove('show');

  setBoardHoverClass();
  cellElements.forEach((cell) => {
    // for reset purpose
    cell.classList.remove(CLASS_X);
    cell.classList.remove(CLASS_O);
    cell.removeEventListener('click', handleCellClick);

    cell.addEventListener('click', handleCellClick, { once: true });
  });
}

function handleCellClick(e) {
  // clicked cell
  const cell = e.target;

  const currentClass = circleTurn ? CLASS_O : CLASS_X;

  // placing check
  placeMark(cell, currentClass);

  // check for win or draw
  if (checkWin(currentClass)) {
    // console.log('winner is class : ', currentClass);
    endGame(false);
  } else if (isDraw()) {
    endGame(true);
  } else {
    // switch turn
    circleTurn = !circleTurn;
    setBoardHoverClass();
  }
}

function placeMark(cell, currentClass) {
  cell.classList.add(currentClass);
}

function setBoardHoverClass() {
  board.classList.remove(CLASS_X);
  board.classList.remove(CLASS_O);

  board.classList.add(circleTurn ? CLASS_O : CLASS_X);
}

function isDraw() {
  // converting cell elements to an array
  return [...cellElements].every((cell) => {
    return cell.classList.contains(CLASS_X) || cell.classList.contains(CLASS_O);
  });
}

function checkWin(currentClass) {
  return WINNING_COMBINATIONS.some((combination) => {
    return combination.every((index) => {
      return cellElements[index].classList.contains(currentClass);
    });
  });
}

function endGame(draw) {
  winningMessageText.innerHTML = draw
    ? '! Match Tied !'
    : `Winner is ${circleTurn ? 'O' : 'X'}`;

  winningMessageElement.classList.add('show');
}

restartButton.addEventListener('click', startGame);
