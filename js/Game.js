class Game {
    constructor() {
        this.board = new Board();
        this.players = this.createPlayers();
        this.ready = false;
    }

    /*
    * Returns active player.
    * @return  {Object}    player - The active player.
    */
    get activePlayer() {
        // find is similar to filter but it only returns the first element
        return this.players.find(player => player.active);
    }

    /** 
     * Creates two player objects
     * @return  {Array}    An array of two Player objects.
     */
    createPlayers() {
        const players = [new Player('#e15258', 'Player 1', 1, true),
        new Player('#e59a13', 'Player 2', 2)];
        return players;
    }

    /** 
    * Initializes game. 
    */
    startGame() {
        //getter methods are accessed like properties
        this.board.drawHTMLBoard();
        this.activePlayer.activeToken.drawHTMLToken();
        this.ready = true;
    }

    /**
     * Branches code, depending on what key player presses
     * @param   {Object}    e - Keydown event object
     */
    handleKeydown(e) {
        if (this.ready) {
            // If the ArrowDown was pressed, the token should be dropped.
            if (e.key === 'ArrowLeft') {
                this.activePlayer.activeToken.moveLeft();
            } else if (e.key === 'ArrowRight') {
                this.activePlayer.activeToken.moveRight(this.board.columns);
            } else if (e.key === 'ArrowDown'){
                this.playToken();
            }
        }
    }

    playToken(){
        let spaces = this.board.spaces;
        let activeToken = this.activePlayer.activeToken;
        let targetColumn = spaces[activeToken.columnLocation];
        let targetSpace = null;

        for (let space of targetColumn){
            if(space.token === null){
                targetSpace = space;
                // at the end targetSpace will hold the lowest empty space in the column
            }
        }

        if (targetSpace !== null){
            this.ready = false;
            activeToken.drop(targetSpace);
        }
        // else there's no empty spcae in the column so the token can't be dropeed

    }

}