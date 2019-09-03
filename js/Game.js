class Game{
    constructor(){
        this.board = new Board();
        this.players = this.createPlayers();
        this.ready = false;
    }

    /*
    * Returns active player.
    * @return  {Object}    player - The active player.
    */
    get activePlayer(){
        // find is similar to filter but it only returns the first element
        return this.players.find(player => player.active);
    }

    /** 
     * Creates two player objects
     * @return  {Array}    An array of two Player objects.
     */
    createPlayers(){
        const players = [new Player('#e15258', 'Player 1', 1, true),
                        new Player('#e59a13', 'Player 2', 2)];
        return players;
    }

    /** 
    * Initializes game. 
    */
    startGame(){
        //getter methods are accessed like properties
        this.board.drawHTMLBoard();
        this.activePlayer.activeToken.drawHTMLToken();
        this.ready = true;
    }

}