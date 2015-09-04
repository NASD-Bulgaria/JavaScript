var ttq = ttq || {};

(function(ttq){
    /**
     * Class Game
     * @constructor
     * Invokes function that generate a deck with appropriate sets of cards,
     * generates a field with piles and cards in them
     * and loads the game logic for the current game.
     */
    function Game(){
        this.deck = model.getDeck(2);
        this.field = ttq.getField(this.deck);
        this.gameLogic = ttq.getGameLogic();
    }

    ttq.getGame = function(){
        return new Game();
    }
})(ttq);