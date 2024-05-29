document.addEventListener('DOMContentLoaded', () => {
    const cells = document.querySelectorAll('.cell');
    const boardState = Array(9).fill(null);
    let currentPlayer = 'X';

    cells.forEach(cell => cell.addEventListener('click', handleCellClick));

    function handleCellClick(event) {
        const cell = event.target;
        const index = cell.dataset.index;

        if (boardState[index] !== null) {
            return;
        }

        boardState[index] = currentPlayer;
        cell.textContent = currentPlayer;

        if (checkWin(currentPlayer)) {
            alert(${currentPlayer} wins!);
            resetGame();
        } else if (boardState.every(cell => cell !== null)) {
            alert('Draw!');
            resetGame();
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        }
    }

    function checkWin(player) {
        const winningCombinations = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];

        return winningCombinations.some(combination => 
            combination.every(index => boardState[index] === player)
        );
    }

    function resetGame() {
        boardState.fill(null);
        cells.forEach(cell => cell.textContent = '');
        currentPlayer = 'X';
    }
});