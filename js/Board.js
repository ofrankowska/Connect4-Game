class Board {
    constructor() {
        this.rows = 6;
        this.columns = 7;
        this.spaces = this.createSpaces();
    }
    /** 
     * Generates 2D array of spaces. 
     * @return  {Array}     An array of space objects
     */
    createSpaces() {
        const spaces = [];

        for (let x = 0; x < this.rows; x++) {

            const column = [];

            for (let y = 0; y < this.columns; y++) {
                let space = new Space(x, y);
                column.push(space);
            }

            spaces.push(column);
        }

        return spaces;
    }

    /** 
     * Draws associated SVG spaces for all game spaces.
     */
    drawHTMLBoard() {
        for (let column of this.spaces) {
            for (let space of column) {
                space.drawSVGSpace();
            }
        }
        // for (let x = 0; x < this.rows; x++) {
        //     for (let y = 0; y < this.columns; y++) {
        //         let space = this.spaces[x][y];
        //         space.drawSVGSpace();
        //     }
        // }
    }
}