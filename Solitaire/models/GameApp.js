var model = model || {};

(function (model) {
    /**
     * GameApp class declaration. Contains a deck, set of piles, type of the game.
     * @prop deck - The deck that contains the set of cards to be used in the current game.
     * @prop piles - Contains all the piles with the appropriate positions on the canvas for the current game.
     * @prop gameType - Property that contains the type of the game.
     * @prop game - The object that contains an instance of the current game and includes deck, field and game logic.
     * @prop timesReloadDrawPile - Contains, how many times the draw pile can be reloaded with cards (default's to 0).
     * @param {string} type - The type of the game
     * @constructor
     */
    function GameApp(type) {
        this.deck = {};
        this.piles = [];
        this.gameType = type;
        this.game = {};
        this.timesReloadDrawPile = 0;
    }

    /**
     * This function is used to check if the win condition of the current game is met. Invokes wonGame function of the current game logic. If true
     * ends the game, stops and saves the timer, changes money value and prints a message on the screen.
      */
    GameApp.prototype.winCondition = function () {
        if (this.game.gameLogic.wonGame(this.piles)) {
            timer.stopTimer();

            console.log("win condition check");
            score.saveCurrentTimer();
            gameIsStartet= false;
            buttons.displayWinMoney();
            sounds.playWinSound();
            drawWinDefect(0,70,0);


        }
    };
    /**
     * This function checks if the coordinates of the mouse from the canvas are on a valid position (are on pile) and returns the index of the given pile.
     * @param x - X coordinate from the fired event.
     * @param y - Y coordinate from the fired event.
     * @param isPile - Used only in specific condition in the events where a try catch block is present.
     * @returns {number} - the number of the pile that is on the current mouse coordinates.
     */

    GameApp.prototype.ifTargetIsPile = function (x, y, isPile) {
        for (var i = 0; i < this.piles.length; i++) {
            if(isPile){
                if (this.piles[i].cascading) {
                    if (x >= this.piles[i].x && x <= this.piles[i].x + 90 &&
                        y >= this.piles[i].y && y <= this.piles[i].y + (this.piles[i].cards.length - 1) * 20 + 135) {
                        return i;
                    }
                }
                else {
                    if (x >= this.piles[i].x && x <= this.piles[i].x + 90 &&
                        y >= this.piles[i].y && y <= this.piles[i].y + 135) {
                        return i;
                    }
                }
            }
            else{
                if (this.piles[i].cascading) {
                    if (x >= this.piles[i].x && x <= this.piles[i].x + 90 &&
                        y >= this.piles[i].y && y <= this.piles[i].y + (this.piles[i].cards.length - 1) * 20 + 135) {
                        return i;
                    }
                }
                else{
                    if (x >= this.piles[i].x && x <= this.piles[i].x + 90 &&
                        y >= this.piles[i].y && y <= this.piles[i].y + 135) {
                        return i;
                    }
                }
            }
        }
        return -1;
    };
    /**
     * Function that takes the pileNumber returned from ifTargetIsPile and Y coordinate from mouse input and returns the index of the card clicked in current pile.
     * @param pileNumber - Returned from ifTargetIsPile function. This variable is the index of the targeted pile from the piles array.
     * @param mouseY - Y coordinate from mouse input
     * @returns {*}
     */
    GameApp.prototype.cardClicked = function (pileNumber, mouseY) {
        var pileY = this.piles[pileNumber].y;
        var positionInPile = mouseY - pileY;
        if (this.piles[pileNumber].cards.length==0) {
            return -1;
        }
        if(this.piles[pileNumber].cascading && mouseY != undefined){
            var temp = parseInt(positionInPile / 20);
            if(temp > this.piles[pileNumber].cards.length-1 ){
                return this.piles[pileNumber].cards.length-1;
            }
            else{
                return temp;
            }
        }
        else{
            return this.piles[pileNumber].cards.length-1;
        }
    };
    /**
     * This function is used to invoke the canPlace function of the given scope/game, which in different cases returns true or false.
     * @param tempPile
     * @param pileNumber
     * @param cardNumber
     * @param cardToPlace
     * @param oldPileNumber
     */
    GameApp.prototype.canPlaceCards = function(tempPile, pileNumber, cardNumber, cardToPlace, oldPileNumber){
        return this.game.gameLogic.canPlace(this.piles[pileNumber], tempPile, this.piles[pileNumber].cards[cardNumber], cardToPlace, pileNumber, oldPileNumber, cardNumber, this.piles);
    };
    /**
     * This function is used to initialize all the variables and game logic depending on which game is started.
     */
    GameApp.prototype.generateGame = function () {

        if(this.gameType!={}){

            console.log("test  "+this.gameType);

        }

        this.deck = {};
        this.piles = [];
        this.game = {};
        this.timesReloadDrawPile = 0;



        if (this.gameType == "Grandfather's Clock") {
            //console.log(this.game);
            this.game = gfc.getGame();
            this.piles = this.game.field.generateGame();
            this.deck = this.game.deck;
            //console.log(this.game);
        }
        else if (this.gameType == "TopsyTurvi Queens") {
            //console.log(this.game);
            this.game = ttq.getGame();
            this.piles = this.game.field.generateGame();
            this.deck = this.game.deck;
            //console.log(this.game);
        }
        else if (this.gameType == "Prison") {
            console.log(this.game);
            this.game = prison.getGame();
            this.piles = this.game.field.generateGame();
            this.deck = this.game.deck;
            console.log(this.game);
        }
        else if (this.gameType == "Alternations") {
            console.log(this.game);
            this.game = altr.getGame();
            this.piles = this.game.field.generateGame();
            this.deck = this.game.deck;
            console.log(this.game);
        }
        else if(this.gameType == "Grandfather"){
            console.log(this.game);
            this.game = gf.getGame();
            this.piles = this.game.field.generateGame();
            this.deck = this.game.deck;
            console.log(this.game);
        }
        else if(this.gameType == "Eight Off"){
            console.log(this.game);
            this.game = eo.getGame();
            this.piles = this.game.field.generateGame();
            this.deck = this.game.deck;
            console.log(this.game);
        }
    };
    /**
     * This function is used to move cards from source pile to a temporary pile.
     * @param pileNumber - the index of the source pile from piles array from where cards will be moved.
     * @param cardNumberInPile - the index of the card that the user has clicked on. (for moving more than one card)
     * @returns a temp pile.
     */
    GameApp.prototype.moveCards = function (pileNumber,cardNumberInPile) {
        var tempPile = model.getPile(0,0,true);
        if(this.piles[pileNumber].type != 1){
            for (var i = cardNumberInPile; i < this.piles[pileNumber].cards.length; i++) {
                tempPile.cards.push(this.piles[pileNumber].cards[i]);
            }
            for (var i = this.piles[pileNumber].cards.length - cardNumberInPile; i > 0 ; i--) {
                this.piles[pileNumber].cards.pop();
            }
        }
        return tempPile;
    };
    /**
     * Function that invokes the canPickUp function of the current scope/game. Returns true or false in the different cases. True if card/cards can be picked, false if they can not.
     * @param pileNumber
     * @param cardNumberInPile
     */
    GameApp.prototype.canPickUpCards = function(pileNumber, cardNumberInPile){
        return this.game.gameLogic.canPickUp(this.piles[pileNumber], pileNumber, cardNumberInPile);
    };
    /**
     * Special events function is used to invoke specialConditions function from the current scope/game. Used for cases when you have to change the face of a given card in the different games.
     */
    GameApp.prototype.executeSpecialEvents = function(){
        this.game.gameLogic.specialConditions(this.piles);
    };
    /**
     * Function that checks if the current pile is of type 1 (a pile to draw cards from). If true invokes drawFromDrawingPile method, else invokes placeCards method
     * @param pileNumber
     * @param oldPileNumber
     * @param pile
     */
    GameApp.prototype.placeCardsOnNewPile = function(pileNumber,oldPileNumber, pile){
        try {
            if (this.piles[pileNumber].type == 1 && this.piles[oldPileNumber].type == 1) {
                this.drawFromDrawingPile();
            }
            else {
                this.piles[pileNumber].placeCards(pile);
            }
        }catch(e){

        }
    };
    /**
     * Function that handles the case when the user has clicked on the drawing pile and wants to draw a card. Draws card from drawing pile and pushes it to the corresponding pile.
     */
    GameApp.prototype.drawFromDrawingPile = function(){
        if(this.piles[0].cards.length > 0){
            this.piles[1].cards.push(this.piles[0].cards[this.piles[0].cards.length-1]);
            this.piles[1].cards[this.piles[1].cards.length-1].face = true;
            console.log(this.piles[0].cards.length);
            this.piles[0].cards.pop();
            console.log(this.piles[0].cards.length);
        }
        else{
            if(this.timesReloadDrawPile < this.game.gameLogic.timesCanRedraw){
                var cardsCount = this.piles[1].cards.length;
                for (var i = 0; i < cardsCount; i++) {
                    this.piles[0].cards.push(this.piles[1].cards[this.piles[1].cards.length-1]);
                    this.piles[0].cards[this.piles[0].cards.length-1].face = false;
                    this.piles[1].cards.pop();
                }
                this.timesReloadDrawPile++;
            }
        }
    };
    /**
     * Constructor for the GameApp object.
     * @param type
     * @returns {GameApp}
     */
    model.getGameApp = function (type) {
        return new GameApp(type);
    };
})(model);