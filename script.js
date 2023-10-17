const cells = document.querySelectorAll('[data-cell]');
const status = document.getElementById('status');
const newGameButton = document.getElementById('new-game');
let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;

// Check for a win
const checkWin = () => {
    const winCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    for (const combination of winCombinations) {
        const [a, b, c] = combination;
        if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
            gameActive = false;
            return gameBoard[a];
        }
    }

    if (!gameBoard.includes('')) {
        gameActive = false;
        return 'draw';
    }

    return null;
};

// Handle cell click
const handleCellClick = (cell, index) => {
    if (!gameActive || gameBoard[index] !== '') return;
    
    gameBoard[index] = currentPlayer;
    cell.textContent = currentPlayer;
    cell.style.color = currentPlayer === 'X' ? '#007acc' : '#ff5722';
    
    const winner = checkWin();
    if (winner) {
        if (winner === 'draw') {
            status.textContent = "It's a draw!";
        } else {
            status.textContent = `${winner} wins!`;
        }
        gameActive = false;
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        status.textContent = `${currentPlayer}'s turn`;
    }
};

// Reset the game
const resetGame = () => {
    gameActive = true;
    currentPlayer = 'X';
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    status.textContent = `${currentPlayer}'s turn`;
    cells.forEach(cell => {
        cell.textContent = '';
    });
};

// Add event listeners
cells.forEach((cell, index) => {
    cell.addEventListener('click', () => handleCellClick(cell, index));
});

newGameButton.addEventListener('click', resetGame);

// Initial game status
status.textContent = `${currentPlayer}'s turn`;
