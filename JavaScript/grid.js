const GRID_SIZE = 4;
const CELL_SIZE = 10;
const CELL_GAP = 1;

function createElements(gridContainer) {
    const cells = [];
    for (let i = 0; i < GRID_SIZE * GRID_SIZE; i++) {
        const element = document.createElement('div');
        element.classList.add('cell');
        cells.push(element);
        gridContainer.append(element);
    }
    return cells;
}

export default class Grid {
    #gridCells

    constructor (gridContainer) {
        gridContainer.style.setProperty('--grid-size', GRID_SIZE);
        gridContainer.style.setProperty('--cell-size', `${CELL_SIZE}vmin`);
        gridContainer.style.setProperty('--cell-gap', `${CELL_GAP}vmin`);
        this.#gridCells = createElements(gridContainer).map((element, index) => {
            return new GridCells(element, index % GRID_SIZE, parseInt(index / 4));
        })
    }

    get gridCells() {
        return this.#gridCells;
    }

    get gridCellsByColumn() {
        return this.#gridCells.reduce((cellColumn, cell) => {
            cellColumn[cell.x] = cellColumn[cell.x] || [];
            cellColumn[cell.x][cell.y] = cell;
            return cellColumn;
        }, [])
    }

    get gridCellsByRow() {
        return this.#gridCells.reduce((cellRow, cell) => {
            cellRow[cell.y] = cellRow[cell.y] || [];
            cellRow[cell.y][cell.x] = cell;
            return cellRow;
        }, [])
    }

    emptyCells() {
        const cells = [];
        for (let i = 0; i < this.#gridCells.length; i++) {
            if (this.#gridCells[i].isEmpty == true) {
                cells.push(this.#gridCells[i]);
            }
        }
        return cells;
    }
}

class GridCells {
    #isEmpty
    #x
    #y
    #element

    constructor (element, column, row) {
        this.#element = element;
        this.#x = column;
        this.#y = row;
        this.#isEmpty = true;
    }

    get x() {
        return this.#x;
    }

    get y() {
        return this.#y;
    }

    get isEmpty() {
        return this.#isEmpty;
    }

    get element() {
        return this.#element;
    }

    set isEmpty(value) {
        this.#isEmpty = value;
    }
}