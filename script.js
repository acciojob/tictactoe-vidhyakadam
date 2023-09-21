//your JS code here. If required.
// script.js
document.addEventListener('DOMContentLoaded', function () {
    const player1Input = document.getElementById('player-1');
    const player2Input = document.getElementById('player-2');
    const submitButton = document.getElementById('submit');
    const message = document.querySelector('.message');
    const board = document.querySelector('.board');

    let currentPlayer = 'X';
    let gameBoard = ['', '', '', '', '', '', '', '', ''];
    let gameActive = true;

    // Create the Tic Tac Toe cells
    for (let i = 1; i <= 9; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.id = i;
        cell.addEventListener('click', () => handleCellClick(i));
        board.appendChild(cell);
    }

    // Handle cell click
    function handleCellClick(cellId) {
        if (!gameActive || gameBoard[cellId - 1] !== '') return;

        gameBoard[cellId - 1] = currentPlayer;
        document.getElementById(cellId).textContent = currentPlayer;
        checkWinner();

        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        message.textContent = `${getPlayerName(currentPlayer)}, you're up.`;
    }

    // Check for a win condition
    function checkWinner() {
        const winPatterns = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6]
        ];

        for (let pattern of winPatterns) {
            const [a, b, c] = pattern;
            if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
                gameActive = false;
                message.textContent = `${getPlayerName(currentPlayer)} congratulations, you won!`;
                return;
            }
        }

        if (!gameBoard.includes('')) {
            gameActive = false;
            message.textContent = 'It\'s a draw!';
        }
    }

    // Get player name based on 'X' or 'O'
    function getPlayerName(player) {
        return player === 'X' ? player1Input.value : player2Input.value;
    }

    // Start the game
    submitButton.addEventListener('click', () => {
        if (player1Input.value && player
