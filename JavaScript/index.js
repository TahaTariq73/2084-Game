import Grid from "./grid.js";
import Tile from "./tile.js";
import Utility from "./utility.js";

const MOVING_DURATION = 200;
const gridContainer = document.getElementById('grid-container');
const newGameBtn = document.getElementById('new-game-btn');
const scoreTxt = document.getElementById('score');
const highscoreTxt = document.getElementById('highscore');

const direction = {x: 0, y: 0};
const TILES = new Array();

let score = 0;
let highscore = localStorage.getItem('high-score');
if (highscore == null) localStorage.setItem('high-score', 0);
highscoreTxt.innerText = highscore;

function reset() {
    window.location.reload();
}
newGameBtn.addEventListener('click', reset, {once : true});

function increaseScore(increment) {
    score += increment;
    scoreTxt.innerText = String(score); 
}

function increaseHighscore(increment) {
    const currentHighscore = localStorage.getItem('high-score');
    localStorage.removeItem('high-score');
    localStorage.setItem('high-score', Number(currentHighscore) + increment);
    highscoreTxt.innerText = String(localStorage.getItem('high-score'));
}

function slidesGridCells(gridCells) {
    gridCells.forEach(e => {
        for (let i = 0; i < e.length; i++) {
            if ((direction.x == -1 && e[i].x == 0) || (direction.x ==  1 && e[i].x == 3) ||
                (direction.y == -1 && e[i].y == 0) || (direction.y ==  1 && e[i].y == 3)
            ) continue;
            
            const currentCell = e[i];
            const currentTile = getTile(currentCell)[0];

            if(currentTile != undefined) {
                let index = 0;
                let destination;

                for (let j = (direction.x == 0 ? e[i].y : e[i].x); 
                             (direction.x == 1 || direction.y == 1 ? j < 3 : j >= 1);
                        j += (direction.x == 0 ? direction.y : direction.x)) {
                        index++;
                        let nextCell = e[i - index];
                        
                        if (nextCell.isEmpty == false) {
                            const mergeTile = getTile(nextCell)[0];

                            if(currentTile != undefined && mergeTile.value == currentTile.value) {
                                currentCell.isEmpty = true;
                                currentTile.tile.remove();
                                mergeTile.value = mergeTile.value + currentTile.value;
                                destination = nextCell;

                                increaseScore(mergeTile.value + currentTile.value);
                                if (highscore < score) {
                                    increaseHighscore(mergeTile.value + currentTile.value);
                                }
                            }
                            break;
                        }

                        else if(nextCell.isEmpty == true && currentTile != undefined) {
                            currentCell.isEmpty = true;
                            destination = nextCell;
                        }}

                if (destination != null) {
                    direction.y == 0 ? 
                    Utility.setCustomProperty(currentTile.tile, '--x', destination.x) :
                    Utility.setCustomProperty(currentTile.tile, '--y', destination.y)
                    destination.isEmpty = false;  
            }}}
    })
}

function getTile(cellPos) {
    return TILES.filter(element => {
        const tilePosX = Utility.getCustomProperty(element.tile, '--x');
        const tilePosY = Utility.getCustomProperty(element.tile, '--y');

        if (tilePosX == cellPos.x && tilePosY == cellPos.y) {
            return element;
        }
    })
}

function moveUp() {
    direction.x = 0;
    direction.y = -1; 
    return slidesGridCells(grids.gridCellsByColumn);
}

function moveDown() {
    direction.x = 0;
    direction.y = 1;
    return slidesGridCells(grids.gridCellsByColumn.map(column => [...column].reverse()));
}

function moveLeft() {
    direction.y = 0;
    direction.x = -1;
    return slidesGridCells(grids.gridCellsByRow);
}

function moveRight() {
    direction.y = 0;
    direction.x = 1;
    return slidesGridCells(grids.gridCellsByRow.map(row => [...row].reverse()));
}

// Handling inputs from user
function handleInput(e) {
    switch (e.code) {
        case "ArrowUp":
            moveUp();
            break;
        case "ArrowDown":
            moveDown();
            break;
        case "ArrowLeft":
            moveLeft();
            break;
        case "ArrowRight":
            moveRight();
            break;
                            
        default:
            takeInput();
            return;
    }

    const newTile = new Tile(gridContainer, grids.emptyCells());
    TILES.push(newTile);
    setTimeout(() => takeInput(), MOVING_DURATION);
}

function takeInput() {
    window.addEventListener('keydown', handleInput, {once : true});
}

// Main logic
const grids = new Grid(gridContainer);
const tile1 = new Tile(gridContainer, grids.emptyCells());
const tile2 = new Tile(gridContainer, grids.emptyCells());
TILES.push(tile1);
TILES.push(tile2);

takeInput();