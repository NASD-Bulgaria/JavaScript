var gfc = gfc || {};

(function(gfc){
    /**
     * Game object declaration.
     * Invokes function that generate a deck with appropriate sets of cards, generates a field with piles and cards in them
     * and loads the game logic for the current game.
     *
     * @constructor
     */
    function Game(){
        this.deck = model.getDeck(1);
        this.field = gfc.getField(this.deck);
        this.gameLogic = gfc.getGameLogic();
    }

    gfc.getGame = function(){
        return new Game();
    }
})(gfc);