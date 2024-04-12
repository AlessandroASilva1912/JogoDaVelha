const board = document.getElementById('board');
const status = document.getElementById('status');
const winner = document.getElementById('winner');
const draw = document.getElementById('draw');
const resetBtn = document.getElementById('resetBtn');

let currentPlayer = 'X';
let cells = Array.from({ length: 9 }, () => null);
let gameWon = false;

function startGame() {
    cells.forEach((cell, index) => {
        cell = document.createElement('div');
        cell.classList.add('cell');
        cell.setAttribute('data-index', index);
        cell.addEventListener('click', () => cellClick(index));
        board.appendChild(cell);
    });
    resetBtn.addEventListener('click', resetGame);
}

function cellClick(index) {
    if (gameWon || cells[index]) return;
    cells[index] = currentPlayer;
    render();
    checkWinner();
    if (!gameWon && !cells.includes(null)) {
        draw.classList.remove('hidden');
    }
}

function checkWinner() {
    const winConditions = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];
    for (const condition of winConditions) {
        const [a, b, c] = condition;
        if (cells[a] && cells[a] === cells[b] && cells[a] === cells[c]) {
            gameWon = true;
            winner.textContent = `O jogador ${currentPlayer} venceu!`;
            winner.classList.remove('hidden');
            return;
        }
    }
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    status.textContent = `Vez do jogador ${currentPlayer}`;
}

function render() {
    cells.forEach((value, index) => {
        const cell = board.children[index];
        cell.textContent = value;
    });
}

function resetGame() {
    cells = Array.from({ length: 9 }, () => null);
    gameWon = false;
    currentPlayer = 'X';
    winner.classList.add('hidden');
    draw.classList.add('hidden');
    status.textContent = `Vez do jogador ${currentPlayer}`;
    render();
}

startGame();
