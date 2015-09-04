var model = model || {};

(function (model){
    /**
     * @namespace model
     * Card class declaration.
     * @param rank - Parameter to be used for the rank of the card.
     * @param suit - Parameter to be used for the suit of the card.
     * @prop x - X coordinate of the card. Defaulted to 55 for loading the cards to the canvas.
     * @prop y - Y coordinate of the card. Defaulted to 105 for loading the cards to the canvas.
     * @prop rank - Rank of the card.
     * @prop suit - Suit of the card.
     * @prop face - True for face up, false for face down.
     * @constructor getCard - Creates an Instance of a card.
     */
    function Card (rank,suit) {
        this.x = 55;
        this.y = 105;
        this.rank = rank;
        this.suit = suit;
        this.face = false;

    }

    /**
     * Function that takes x and y as parameter and changes current card's position.
     * @param {int} x - the new X coordinate to be given to the card.
     * @param {int} y - - the new X coordinate to be given to the card.
     */

    Card.prototype.changePos = function (x,y) {
        this.x = x;
        this.y = y;
    };
    /**
     * Constructor for Card
     * @param {string} rank - Rank of the card
     * @param {string} suit - Suit of the card
     * @returns {Card}
     */
    model.getCard = function (rank,suit) {
        return new Card(rank,suit);
    };
})(model);