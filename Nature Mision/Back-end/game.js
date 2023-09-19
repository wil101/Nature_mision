// Crear una matriz para representar el tablero de dulces (6x5)
const board = [
    [1, 2, 3, 4, 5],
    [2, 3, 4, 5, 1],
    [3, 4, 5, 1, 2],
    [4, 5, 1, 2, 3],
    [5, 1, 2, 3, 4],
    [1, 2, 3, 4, 5]
];

// Función para generar el tablero de dulces en el HTML
function generateBoard() {
    const gameContainer = document.querySelector('.game-container');
    
    for (let row = 0; row < board.length; row++) {
        for (let col = 0; col < board[row].length; col++) {
            const candy = document.createElement('div');
            candy.classList.add('candy');
            candy.dataset.row = row;
            candy.dataset.col = col;
            candy.style.backgroundColor = `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255})`;
            
            candy.addEventListener('click', () => {
                // Lógica para intercambiar dulces al hacer clic
                swapCandies(row, col);
            });
            
            gameContainer.appendChild(candy);
        }
    }
}

// Función para intercambiar dos dulces
function swapCandies(row, col) {
    // Implementa la lógica de intercambio aquí
    console.log(`Intercambiaste el caramelo en la fila ${row}, columna ${col}`);
}

// Generar el tablero al cargar la página
generateBoard();
