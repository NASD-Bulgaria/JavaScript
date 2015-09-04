var model = model || {};

(function (model){
    /**
     * Declaration of the Pile class.
     * @prop x - contains the x coordinate
     * @prop y - contains the y coordinate
     * @prop cascading - whether the pile is cascading or not.
     * @prop cards - contains the cards of the current pile.
     * @param {int} x - x coordinate of the pile
     * @param {int} y - y coordinate of the pile
     * @param cascading - whether the pile is of cascading type or not.
     * @param type - the type of the pile. Whether it is a draw pile, special condition pile or a normal pile.
     * @constructor
     */
    function Pile (x, y, cascading, type) {
        this.x = x;
        this.y = y;
        this.cascading = cascading;
        this.cards = [];
        // type 0: foundation
        // type 1: pile with facedown deck to take card from
        // type 2: pile to place cards from pile type 1
        // type 3: pile with special condition
        this.type = type;
    }

    /**
     * Functions that returns the array containing the cards of the pile.
     */
    Pile.prototype.getPile = function(){
        return this.cards;
    };
    /**
     * Function that takes a pile as parameter and places its cards in the current pile's cards array
     * @param pile - an instance of the Pile object
     */
    Pile.prototype.placeCards = function (pile) {
        for (var i = 0; i < pile.cards.length; i++) {
            this.cards.push(pile.cards[i]);
        }
    };
    /**
     * Function that removes the last card of the given pile.
     */
    Pile.prototype.removeCard = function() {
        this.cards.remove(this.cards.length-1);
    };
    /**
     * Function that invokes the removeCard function and takes as a parameter how much cards will be removed from the pile.
     * @param number
     */
    Pile.prototype.removeCards = function (number) {
        for (var i = 0; i < number; i++) {
            this.removeCard();
        }
    };
    /**
     * Function that changes the position of the given pile according to mouse X and Y coordinates
     * @param x - X coordinate of the mouse on event fire.
     * @param y - Y coordinate of the mouse on event fire.
     */
    Pile.prototype.changePosition = function(x, y){
        this.x = x - 45;
        this.y = y - 55;
        for (var i = 0; i < this.cards.length; i++) {
            this.cards[i].changePos(this.x, this.y + i*20);
        }
    };
    /**
     * Constructor for the Pile object
     * @param x
     * @param y
     * @param cascading
     * @param type
     * @returns {Pile}
     */
    model.getPile = function (x, y, cascading, type) {
        return new Pile(x, y, cascading, type);
    };
})(model);
