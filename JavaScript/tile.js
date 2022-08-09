function createTile(gridContainer, emptyCells) {
    const element = document.createElement('div');
    const randomEmptyCell = emptyCells[parseInt(Math.random() * emptyCells.length)];
    
    if (randomEmptyCell == undefined) {
        alert('Game Over!');
        window.location.reload();
        return;
    }

    randomEmptyCell.isEmpty = false;
    element.style.setProperty('--x', randomEmptyCell.x);
    element.style.setProperty('--y', randomEmptyCell.y);
    element.classList.add('tile');
    gridContainer.append(element);
    return element;
}

export default class Tile {
    #tile
    #value

    constructor (gridContainer, emptyCells, value = Math.random() < 0.5 ? 2 : 4) {
        this.#tile = createTile(gridContainer, emptyCells);
        this.value = value;
    }

    get value() {
        return this.#value;
    }

    get tile() {
        return this.#tile;
    }

    set value(value) {
        this.#value = value;
        const power = Math.log2(value); 
        const colorOpacity = 100 - (11 * power);
        this.#tile.textContent = value;
        this.#tile.style.setProperty('--background-opacity', `${colorOpacity}%`);
    }
}