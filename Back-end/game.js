const candyTypes = ['red', 'blue', 'green', 'yellow', 'orange'];

// Variables para el juego
let selectedCandy = null;
let score = 0;

// Función para crear un tablero de juego inicial
function createGameBoard(rows, columns) {
    const gameBoard = document.querySelector('.game-board');
    for (let i = 0; i < rows; i++) {
        const row = document.createElement('div');
        row.classList.add('row');
        for (let j = 0; j < columns; j++) {
            const candy = document.createElement('div');
            candy.classList.add('candy');
            const randomType = candyTypes[Math.floor(Math.random() * candyTypes.length)];
            candy.classList.add(randomType);

            // Agregar evento de clic para seleccionar o intercambiar caramelos
            candy.addEventListener('click', () => {
                if (selectedCandy === null) {
                    selectedCandy = candy;
                } else {
                    // Intercambiar los caramelos
                    const temp = selectedCandy.className;
                    selectedCandy.className = candy.className;
                    candy.className = temp;
                    selectedCandy = null;

                    // Realizar comprobación de coincidencias
                    checkForMatches();
                }
            });

            row.appendChild(candy);
        }
        gameBoard.appendChild(row);
    }
}

// Función para verificar coincidencias y eliminar caramelos
function checkForMatches() {
    const candies = document.querySelectorAll('.candy');
    for (const candy of candies) {
        const color = candy.className.split(' ')[1]; // Obtener el color del caramelo
        const neighbors = getNeighbors(candy);
        let matchingCandies = [candy];

        // Buscar caramelos del mismo color en fila
        for (const neighbor of neighbors) {
            if (neighbor.className.includes(color)) {
                matchingCandies.push(neighbor);
            }
        }

        // Buscar caramelos del mismo color en columna
        if (matchingCandies.length >= 3) {
            for (const neighbor of neighbors) {
                if (neighbor.className.includes(color) && !matchingCandies.includes(neighbor)) {
                    matchingCandies.push(neighbor);
                }
            }
        }

        // Si hay al menos 3 caramelos del mismo color en fila o columna, eliminarlos
        if (matchingCandies.length >= 3) {
            for (const matchingCandy of matchingCandies) {
                matchingCandy.className = 'candy';
            }
            // Sumar puntos
            score += matchingCandies.length;
            updateScore();
        }
    }
}

// Función para obtener los vecinos de un caramelo (arriba, abajo, izquierda, derecha)
function getNeighbors(candy) {
    const neighbors = [];
    const rowIndex = candy.parentElement.rowIndex;
    const cellIndex = candy.cellIndex;

    // Vecino de arriba
    if (rowIndex > 0) {
        neighbors.push(candy.parentElement.parentElement.rows[rowIndex - 1].cells[cellIndex]);
    }
    // Vecino de abajo
    if (rowIndex < 9) {
        neighbors.push(candy.parentElement.parentElement.rows[rowIndex + 1].cells[cellIndex]);
    }
    // Vecino de la izquierda
    if (cellIndex > 0) {
        neighbors.push(candy.parentElement.cells[cellIndex - 1]);
    }
    // Vecino de la derecha
    if (cellIndex < 9) {
        neighbors.push(candy.parentElement.cells[cellIndex + 1]);
    }

    return neighbors;
}

// Función para actualizar la puntuación en la página
function updateScore() {
    const scoreElement = document.querySelector('.score');
    scoreElement.textContent = `Puntuación: ${score}`;
}

//Inicializar el tablero
window.addEventListener('load', () => {
    createGameBoard(10, 10); // Tablero de 10x10
});