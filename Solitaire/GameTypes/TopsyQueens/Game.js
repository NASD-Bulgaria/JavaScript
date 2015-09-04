var topsyTurvy = topsyTurvy || {};

(function(topsyTurvy){
    /**
     * Class Game
     * @constructor
     * Invokes function that generate a deck with appropriate sets of cards,
     * generates a field with piles and cards in them
     * and loads the game logic for the current game.
     */
    function Game(){
        this.deck = model.getDeck(2);
        this.field = topsyTurvy.getField(this.deck);
        this.gameLogic = topsyTurvy.getGameLogic();
    }

    topsyTurvy.getGame = function(){
        return new Game();
    }
})(topsyTurvy);