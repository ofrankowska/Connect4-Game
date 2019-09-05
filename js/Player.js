class Player {
    constructor(color, name, id, active = false) {
        this.color = color;
        this.name = name;
        this.id = id;
        this.active = active;
        this.tokens = this.createTokens(21);
    }
    /**
     * Creates token objects for player
     * @param     {number}    num - Number of token objects to be created
     * @returns   {Array}     An array of the newly created token objects
     */

    createTokens(num) {
        const tokens = [];
        for (let i = 0; i < num; i++) {
            let token = new Token(i, this);
            tokens.push(token);
        }
        return tokens;
    }
    /**
     * Gets all tokens that haven't been dropped.
     * @return {array}  Array of unused tokens.
     */
    get unusedTokens() {
        return this.tokens.filter(token => !token.dropped)
    }
    /**
     * Gets the active token by returning the first token in the array of unused tokens.
     * @return {Object} First token object in the array of unused tokens.
     */
    get activeToken() {
        return this.unusedTokens[0];
    }
    /**
     * Check if a player has any undropped tokens left
     * @return {Boolean} 
     */
    checkTokens() {
        return this.unusedTokens.length == 0 ? false : true;
    }
}