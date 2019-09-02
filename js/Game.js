class Game{
    constructor(){
        this.board = new Board();
        this.players = this.createPlayers();
        this.ready = false;
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
}