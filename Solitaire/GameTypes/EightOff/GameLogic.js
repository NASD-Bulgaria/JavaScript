var eo = eo || {};

(function(eo){
    function GameLogic(){
        this.ranks =["2","3","4","5","6","7","8","9","10","J","Q","K","A"];
        this.suits = ["H","D","C","S"];
    }

    GameLogic.prototype.canPickUp = function(pile, pileNumber, cardPosition){
        if(pileNumber >= 0 && pileNumber < 8){ // can pick cards from cascading piles
            if(cardPosition == pile.cards.length-1){
                return true;
            }
            else if(pile.cards.length==0){
                return false;
            }
            else{
                return this.canPickUpMoreCards(pile,cardPosition);
            }
        }
        return(pileNumber >= 8 && pileNumber < 16);
    };
    //wиn condition
    GameLogic.prototype.wonGame = function (piles) {
        return (piles[16].cards.length==13 &&
            piles[17].cards.length==13 &&
            piles[18].cards.length==13 &&
            piles[19].cards.length==13);
    };

    GameLogic.prototype.canPlace = function(fieldPile, tempPile, fieldPileCard, tempPileCard, pileNumber, oldPileNumber, cardNumber){
        //can we place cards on cascading 8 piles
        if(pileNumber>=0 && pileNumber<=7){
            return (cardNumber== -1 ||
                (this.ranks.indexOf(fieldPileCard.rank) - 1 == this.ranks.indexOf(tempPileCard.rank) && fieldPileCard.suit == tempPileCard.suit))              
        }
        //top 8 piles
        else if(pileNumber>=8 && pileNumber<=15){
            return(cardNumber== -1 && tempPile.cards.length <2);
        }
        //can we place cards on last 4 piles
        else if(pileNumber>=16 && pileNumber<=19){
            if(fieldPile.cards.length==0 && tempPileCard.rank=="A"){
                return true;
            }
            else if(fieldPileCard.suit == tempPileCard.suit){
                return((fieldPileCard.rank=="A"&& tempPileCard.rank=="2")|| //check if it's "2"
                    (this.ranks.indexOf(fieldPileCard.rank)== //check if it's next rank
                    this.ranks.indexOf(tempPileCard.rank) - 1));
            }
            else{
                return false;
            }
            
        }
        else {
            return false;
        }
    };

    GameLogic.prototype.specialConditions = function (piles){

    };

    GameLogic.prototype.canPickUpMoreCards = function (pile,cardPosition) {
        for (var i = cardPosition + 1; i < pile.cards.length; i++) { 
            if(pile.cards[i].suit != pile.cards[i-1].suit){
                return false;
            }
            else if(this.ranks.indexOf(pile.cards[i].rank) + 1 != this.ranks.indexOf(pile.cards[i - 1].rank)){
                return false;
            }
        }
        return true;
    };
      
    eo.getGameLogic = function(){
        return new GameLogic();
    }
})(eo);