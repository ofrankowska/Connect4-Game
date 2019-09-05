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
            } else if (e.key === 'ArrowDown') {
                this.playToken();
            }
        }
    }
    /**
     * Finds Space object to drop Token into, drops Token
     */
    playToken() {
        let spaces = this.board.spaces;
        let activeToken = this.activePlayer.activeToken;
        let targetColumn = spaces[activeToken.columnLocation];
        let targetSpace = null;

        for (let space of targetColumn) {
            if (space.token === null) {
                targetSpace = space;
                // at the end targetSpace will hold the lowest empty space in the column
            }
        }

        if (targetSpace !== null) {
            const game = this;
            this.ready = false;

            activeToken.drop(targetSpace, function () {
                game.updateGameState(activeToken, targetSpace);
                // referring to the game variable instead of this because this callback function has a different scope than the rest of the content of the Class. If you use the this keyword inside that callback function, it will refer to the div element that was created with drawHTMLToken()
            });
        }
        // else there's no empty spcae in the column so the token can't be dropeed

    }
    /** 
     * Updates game state after token is dropped. 
     * @param   {Object}  token  -  The token that's being dropped.
     * @param   {Object}  target -  Targeted space for dropped token.
     */
    updateGameState(token, target) {
        target.mark(token);

        if (this.checkForWin(target)) {
            this.gameOver(`${this.activePlayer.name} wins!`);

        } else {
            this.switchPlayers();

            if (this.activePlayer.checkTokens()) {
                this.activePlayer.activeToken.drawHTMLToken();
                this.ready = true

            } else {
                this.gameOver('No more tokens')
            }

        }
    }

    /** 
     * Checks if there's a winner on the board after each token drop.
     * @param   {Object}    Targeted space for dropped token.
     * @return  {boolean}   Boolean value indicating whether the game has been won (true) or not (false)
     */
    checkForWin(target) {
        const owner = target.token.owner;
        let win = false;

        //vertical
        for (let x = 0; x < this.board.columns; x++) {
            for (let y = 0; y < this.board.rows - 3; y++) {
                if (this.board.spaces[x][y].owner === owner &&
                    this.board.spaces[x][y + 1].owner === owner &&
                    this.board.spaces[x][y + 2].owner === owner &&
                    this.board.spaces[x][y + 3].owner === owner) {
                    win = true;
                }
            }
        }

        //horizontal
        for (let x = 0; x < this.board.columns - 3; x++) {
            for (let y = 0; y < this.board.rows; y++) {
                if (this.board.spaces[x][y].owner === owner &&
                    this.board.spaces[x + 1][y].owner === owner &&
                    this.board.spaces[x + 2][y].owner === owner &&
                    this.board.spaces[x + 3][y].owner === owner) {
                    win = true;
                }
            }
        }

        //diagonal
        for (let x = 3; x < this.board.columns; x++) {
            for (let y = 0; y < this.board.rows - 3; y++) {
                if (this.board.spaces[x][y].owner === owner &&
                    this.board.spaces[x - 1][y + 1].owner === owner &&
                    this.board.spaces[x - 2][y + 2].owner === owner &&
                    this.board.spaces[x - 3][y + 3].owner === owner) {
                    win = true;
                }
            }
        }

        //diagonal
        for (let x = 3; x < this.board.columns; x++) {
            for (let y = 3; y < this.board.rows; y++) {
                if (this.board.spaces[x][y].owner === owner &&
                    this.board.spaces[x - 1][y - 1].owner === owner &&
                    this.board.spaces[x - 2][y - 2].owner === owner &&
                    this.board.spaces[x - 3][y - 3].owner === owner) {
                    win = true;
                }
            }
        }

        return win;
    }
    /** 
     * Switches active player. 
     */
    switchPlayers() {
        for (let player of this.players) {
            player.active = player.active === true ? false : true;
        }
        //--alternatively--
        // for (let player of this.players) {
        //     player.active = !player.active;
        //   }
    }

    /** 
     * Displays game over message.
     * @param {string} message - Game over message.      
     */
    gameOver(message) {
        const div = document.getElementById('game-over');
        div.textContent = message;
        div.style.display = 'block';
    }

}