var model = model || {};

(function (model) {
    /**
     * @namespace model
     * This is the declaration of the Deck class
     * @param {int} number - Count of card sets to generate.
     * @prop {Array} cards - Contains the generated cards for the given deck.
     * @prop {Array} ranks - Predefined array of strings corresponding to card ranks. Used to create a deck of cards.
     * @prop {Array} suits - Predefined array of string corresponding to card suits. Used to create a deck of cards.
     * @prop createDeck - Takes the number given to the constructor and creates the set of cards.
     * @constructor getDeck - Takes the number parameter and creates sets of 52 cards.
     */
    function Deck (number) {
        this.cards = [];
        this.ranks =["2","3","4","5","6","7","8","9","10","J","Q","K","A"];
        this.suits = ["H","D","C","S"];
        this.createDeck(number);
    }

    /**
     * Takes the number given to the constructor and creates the set of cards.
     * @param {int} number - The count of sets of 52 cards to be created.
     */
    Deck.prototype.createDeck = function (number) {
        for (var i = 0; i < number; i++) {
            for (var j = 0; j < this.ranks.length; j++) {
                for (var k = 0; k < this.suits.length; k++) {
                    this.cards.push(model.getCard(this.ranks[j],this.suits[k]));
                }
            }
        }
    };
    /**
     * Used only for debugging. Logs all the cards in the console.
     */
    Deck.prototype.showCards = function () {
        console.log(this.cards);
    };
    /**
     * Shuffles the deck.
     */
    Deck.prototype.shuffle = function () {
        var someArray = this.cards;
        var theLength = someArray.length - 1;
        var toSwap; // The index we will swap  (i.e. the random number)
        var temp; // A temporary variable to hold reference to index variable i points to
        for (var i = theLength; i > 0; i--) {
            toSwap = Math.floor(Math.random() * i);
            temp = someArray[i];
            someArray[i] = someArray[toSwap];
            someArray[toSwap] = temp;
        }
    };
    /**
     * Deck constructor
     * @param number - Count of sets to be created.
     * @returns {Deck}
     */
    model.getDeck = function (number) {
        return new Deck(number);
    }
})(model);