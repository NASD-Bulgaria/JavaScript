var gfc = gfc || {};

(function(gfc){
    /**
     * Contains ranks and suits arrays for calculating if cards can be picked.
     * @constructor
     */
    function GameLogic(){
        this.ranks =["2","3","4","5","6","7","8","9","10","J","Q","K","A"];
        this.suits = ["H","D","C","S"];
    }

    /**
     * Function that contains special conditions for the current game if there are any present.
     */
    GameLogic.prototype.specialConditions = function (){

    };
    /**
     * A function that defines if the clicked card can be picked up
     * @param pile
     * @param pileNumber
     * @param cardPosition
     * @returns {boolean}
     */
    GameLogic.prototype.canPickUp = function(pile, pileNumber, cardPosition){
        if(cardPosition == pile.cards.length-1 && pileNumber < 8){
            return true;
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
        if (piles[8].cards[piles[8].cards.length-1].rank=="Q" &&
            piles[9].cards[piles[9].cards.length-1].rank=="A" &&
            piles[10].cards[piles[10].cards.length-1].rank=="2" &&
            piles[11].cards[piles[11].cards.length-1].rank=="3" &&
            piles[12].cards[piles[12].cards.length-1].rank=="4" &&
            piles[13].cards[piles[13].cards.length-1].rank=="5" &&
            piles[14].cards[piles[14].cards.length-1].rank=="6" &&
            piles[15].cards[piles[15].cards.length-1].rank=="7" &&
            piles[16].cards[piles[16].cards.length-1].rank=="8" &&
            piles[17].cards[piles[17].cards.length-1].rank=="9" &&
            piles[18].cards[piles[18].cards.length-1].rank=="10" &&
            piles[19].cards[piles[19].cards.length-1].rank=="J") {

            return true;
        }
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
    GameLogic.prototype.canPlace = function(fieldPile, tempPile,fieldPileCard, tempPileCard, pileNumber,oldPileNumber, cardNumber){

        if(pileNumber < 8){
            if(cardNumber== -1) {
                return true;
            }
            if(fieldPileCard.rank == "2" && tempPileCard.rank == "A"){
                return true;
            }
            else if(this.ranks.indexOf(fieldPileCard.rank) - 1 == this.ranks.indexOf(tempPileCard.rank)){
                return true;
            }
            else{
                return false;
            }
        }
        else{
            if(fieldPileCard.suit == tempPileCard.suit){

                if(fieldPileCard.rank == "A" && tempPileCard.rank == "2"){
                    return true;
                }
                else if(this.ranks.indexOf(fieldPileCard.rank) == this.ranks.indexOf(tempPileCard.rank) - 1){
                    return true;
                }
                else{
                    return false;
                }
            }
            else{
                return false;
            }
        }
    };
    /**
     * Constructor for the game logic
     * @returns {GameLogic}
     */
    gfc.getGameLogic = function(){
        return new GameLogic();
    }
})(gfc);