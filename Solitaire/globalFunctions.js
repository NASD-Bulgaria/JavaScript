var scope = scope || {};

(function (scope){
    /**
     * Global functions class declaration. Global functions contains methods for drawing the game objects on the canvas.
     * @prop width - a constant that shows the width of a single card.
     * @prop height - a constant that shows the height of a single card.
     * @prop canvas - the canvas element taken from the html
     * @prop ctx - context that contains methods for drawing on the canvas.
     * @prop background - the background image that is drawn to the playing field.
     * @constructor
     */
    function GlobalFunctions () {
        this.width = 90;
        this.height = 135;
        this.canvas = document.getElementById("canvas");
        this.ctx = this.canvas.getContext("2d");
        this.background= new Image();
        this.background.src = "Resources/" + tableBg[tableBgNum] +".png";
    }

    /**
     * Function that draws the borders around different piles, then assigns new X and Y to every card and draws it in the corresponding place on the canvas
     * @param field - The field instance of the current game.
     */
    GlobalFunctions.prototype.drawField = function (field) {
        for (var i = 0; i < field.piles.length; i++) {
            var pile = field.piles[i];
            this.ctx.strokeStyle = "black 1px radius: 2px";
            this.ctx.strokeRect(pile.x + 3, pile.y + 3, 84, 129);

            if (gameTypeSaveText=='Eight Off' && i>=16 && i<=19){
                    this.ctx.font = "30px Arial";
                    this.ctx.fillText("A",pile.x + 3 + 30, pile.y + 3 +80);
            }

            if (gameTypeSaveText=='Grandfather' && i>=22 && i<=25){
                this.ctx.font = "30px Arial";
                this.ctx.fillText("A",pile.x + 3 + 30, pile.y + 3 +80);
            }
            if (gameTypeSaveText=='Grandfather' && i>=26 && i<=29){
                this.ctx.font = "30px Arial";
                this.ctx.fillText("K",pile.x + 3 + 30, pile.y + 3 +80);
            }

            if (gameTypeSaveText=='TopsyTurvi Queens' && i>=2 && i<=9){
                this.ctx.font = "30px Arial";
                this.ctx.fillText("K",pile.x + 3 + 30, pile.y + 3 +80);
            }

            if (gameTypeSaveText=='Alternations' && i>=2 && i<=9){
                this.ctx.font = "30px Arial";
                this.ctx.fillText("A",pile.x + 3 + 30, pile.y + 3 +80);
            }



            for (var j = 0; j < pile.cards.length; j++) {
                var card = pile.cards[j];
                card.x = pile.x;
                if (pile.cascading) {
                    card.y = pile.y + j*20;
                }
                else {
                    card.y = pile.y;
                }

                this.paintCard(card);

            }
        }
    };

    /**
     * This function is used to load the cards images before the game is started. Required because the code gets executed before the cards are loaded into the browser.
     * @param deck
     */
    GlobalFunctions.prototype.loadCards = function (deck) {
        for (var i = 0; i < deck.cards.length; i++) {
            var img = new Image();
            img.src = "Resources/" + deck.cards[i].rank + deck.cards[i].suit + ".png";
            deck.cards[i].image= img;
            var bg = new Image();
            bg.src =this.background.src;
            var cb = new Image();
            cb.src = "Resources/" + cartBG[cartBGNum] + ".png";

        }
        this.background.src = "Resources/" + tableBg[tableBgNum] +".png";

    };
    /**
     * this is a function that takes a card as a parameter and draws it according to its X and Y on the canvas.
     * @param card - an instance of the Card object
     */
    GlobalFunctions.prototype.paintCard =function (card) {
        var context = this.ctx;
        var img = new Image();
        if(card.face){
            img.src = "Resources/" +card.rank + card.suit + ".png";
        }
        else{
            img.src = "Resources/" + cartBG[cartBGNum] + ".png";
        }
            context.drawImage(img, card.x, card.y);


    } ;
    /**
     * Function that invokes paintCard method for every card in a given pile. Used to draw the cards from the temp pile while playing the game.
     * @param pile - an instance of the Pile object
     */
    GlobalFunctions.prototype.paintPile = function (pile) {
        for (var i = 0; i < pile.cards.length; i++) {
            this.paintCard(pile.cards[i]);
        }

    };
    /**
     * Draws all cards from a given deck
     * @param deck
     */
    GlobalFunctions.prototype.drawAllCards = function(deck) {
        for (var i = 0; i < deck.cards.length; i++) {
            this.paintCard(deck.cards[i]);
        }
    };
    /**
     * This function deletes the contains of the canvas by drawing the background image ontop.
     */
    GlobalFunctions.prototype.clearBoard = function () {

        var img = new Image();
        img.src = "Resources/" + tableBg[tableBgNum] +".png";
        this.ctx.drawImage(img,0,0);
    };
    scope.getGlobalFunctions = function () {
        return new GlobalFunctions();
    };


})(scope);


