var topsyTurvy = topsyTurvy || {};

(function(topsyTurvy){

    /**
     * Contains ranks, suits arrays and timesCanRedraw.
     * @constructor
     */
    function GameLogic(){
        this.ranks =["2","3","4","5","6","7","8","9","10","J","Q","K","A"];
        this.suits = ["H","D","C","S"];
        this.timesCanRedraw = 3;
    }

    /**
     *Function that contains special conditions.
     * @param piles
     */
    GameLogic.prototype.specialConditions = function (piles){
        for (var i = 2; i < 9; i++) {
            if(piles[i].cards[piles[i].cards.length-1].rank == "Q" && piles[i].cards.length == 14){
                piles[i].cards.push(piles[i].cards[0]);
                piles[i].cards[piles[i].cards.length-1].face = true;
                piles[i].cards.shift();
            }
        }
    };

    /**
     * A function that defines if the clicked card can be picked up
     * @param pile - array
     * @param pileNumber - the number of current clicked Pile
     * @param cardPosition - the index of clicked card
     * @returns {boolean}
     */
    GameLogic.prototype.canPickUp = function(pile, pileNumber, cardPosition){
        if(pileNumber == 0 ||
            (pileNumber == 1 && pile.cards.length > 0) ||
            ((pileNumber >= 2 || pileNumber <= 9) && pile.cards.length == 14)){
            return true;
        }
        else if(cardPosition==13 && pileNumber >= 2 && pileNumber < 9 ){
            return true;
        }
        else if(pileNumber >= 10 && pileNumber <= 17){
            if(cardPosition == pile.cards.length-1){ // if the clicked card is the latest
                return true;
            }
            else {
                for (var i = cardPosition + 1; i < pile.cards.length; i++) {//if the two consecutive cards are different suits
                    if (pile.cards[i].suit != pile.cards[i - 1].suit) {
                        return false;
                    }
                    else {
                        if (pile.cards[i].rank == "A" && pile.cards[i - 1].rank == "2") {//ascending order
                            return true;
                        }
                        else if (this.ranks.indexOf(pile.cards[i].rank) + 1 != this.ranks.indexOf(pile.cards[i - 1].rank)) {//if the two cards are in the correct order
                            return false;
                        }
                    }
                }
                return true;
            }
        }
        else{
            return false;
        }
    };

    /**
     * A function that defines whether the win condition of the given game is met.
     * @param piles
     * @returns {boolean}
     */
    GameLogic.prototype.wonGame = function (piles) {
        return (piles[2].cards[piles[2].cards.length-1].rank=="Q" &&
            piles[3].cards[piles[3].cards.length-1].rank=="Q" &&
            piles[4].cards[piles[4].cards.length-1].rank=="Q" &&
            piles[5].cards[piles[5].cards.length-1].rank=="Q" &&
            piles[6].cards[piles[6].cards.length-1].rank=="Q" &&
            piles[7].cards[piles[7].cards.length-1].rank=="Q" &&
            piles[8].cards[piles[8].cards.length-1].rank=="Q" &&
            piles[9].cards[piles[9].cards.length-1].rank=="Q");
    };

    /**
     * Function that defines if the given card of the temp pile can be placed on a new target pile.
     * @param fieldPile
     * @param tempPile
     * @param fieldPileCard
     * @param tempPileCard
     * @param pileNumber
     * @param oldPileNumber
     * @param cardNumber
     * @returns {boolean}
     */
    GameLogic.prototype.canPlace = function(fieldPile, tempPile, fieldPileCard, tempPileCard, pileNumber, oldPileNumber, cardNumber){

        if(pileNumber == 0 && oldPileNumber == 0) {
            return true;
        }
        else if(pileNumber == 1 || (pileNumber == 0 && oldPileNumber != 0)){
            return false;
        }
        else if(pileNumber >= 10 && pileNumber <= 17){
            if(fieldPile.cards.length == 0){
                return true;
            }
            else if(fieldPileCard.suit == tempPileCard.suit){
                if(fieldPileCard.rank == "2" && tempPileCard.rank == "A"){
                    return true;
                }
                else {
                    return (this.ranks.indexOf(fieldPileCard.rank) - 1 == this.ranks.indexOf(tempPileCard.rank))
                }
            }
            else{
                return false;
            }
        }
        else if((pileNumber >= 2 && pileNumber <= 9) && !(oldPileNumber >= 2 && oldPileNumber <= 9)){
            if(pileNumber != 9 && fieldPile.cards.length == 1 && tempPile.cards.length == 1 && tempPileCard.rank == "K"){
                return true;
            }
            else if(pileNumber == 9 && fieldPile.cards.length == 0 && tempPile.cards.length == 1 && tempPileCard.rank == "K"){
                return true;
            }
            else if(
                (pileNumber != 9 && fieldPile.cards.length >1 && fieldPile.cards.length < 15 && tempPile.cards.length == 1 && fieldPileCard.suit == tempPileCard.suit )||
                (pileNumber == 9 && fieldPile.cards.length >0 && fieldPile.cards.length < 14 && tempPile.cards.length == 1 && fieldPileCard.suit == tempPileCard.suit)
                ){
                //fieldPileCard, tempPileCard
                 if(fieldPileCard.rank == "A" && tempPileCard.rank == "2"){
                    return true;
                }
                else if(this.ranks.indexOf(fieldPileCard.rank) + 1 == this.ranks.indexOf(tempPileCard.rank)){
                    return true;
                }
            }
            else{
                return false;
            }
        }
        else{
            return false;
        }
    };

    topsyTurvy.getGameLogic = function(){
        return new GameLogic();
    }

})(topsyTurvy);