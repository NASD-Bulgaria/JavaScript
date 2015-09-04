var gf = gf || {};

(function(gf){
    function GameLogic(){
        this.ranks =["2","3","4","5","6","7","8","9","10","J","Q","K","A"];
        this.suits = ["H","D","C","S"];
        this.timesCanRedraw = 1;
    }

    GameLogic.prototype.canPickUp = function(pile, pileNumber, cardPosition){
        return (
        pileNumber==0 || // pile with facedown deck
        (pileNumber == 1 && pile.cards.length > 0) || //pile to place cards from deck
        pileNumber < 22 //else
        );      
    };

    GameLogic.prototype.wonGame = function (piles) {
        return (
            piles[22].cards.length==13 &&
            piles[23].cards.length==13 &&
            piles[24].cards.length==13 &&
            piles[25].cards.length==13 &&
            piles[26].cards.length==13 &&
            piles[27].cards.length==13 &&
            piles[28].cards.length==13 &&
            piles[29].cards.length==13
            ) ;
    };

    GameLogic.prototype.canPlace = function(fieldPile, tempPile, fieldPileCard, tempPileCard, pileNumber, oldPileNumber, cardNumber, piles){
        //can we draw card from 
        if(pileNumber == 0 && oldPileNumber ==0) {
            return true;
        }
        //can we place on placeble pile
        else if(pileNumber==1){
            return false;
        }
        //can we place one or two cards on 2 to 22 piles
        if(pileNumber < 22){
            return (cardNumber== -1 || cardNumber== 0); 
        }
        //check for placable "A" to "K" cards
        else if(pileNumber < 26){
            if(tempPileCard.rank == "A"){
                return this.checkForAnotherSuit(piles,tempPileCard);
            }
            else{
                if(fieldPileCard.suit == tempPileCard.suit){
                   return this.checkForNextPlacableCard(fieldPileCard,tempPileCard,pileNumber);
                }
            }
        }
        //check for placable "K" to "A" cards
        else if(pileNumber<30) {
            if(tempPileCard.rank == "K"){
                return this.checkForAnotherSuit(piles,tempPileCard);
            }
            else if(fieldPileCard.suit == tempPileCard.suit){
                return this.checkForNextPlacableCard(fieldPileCard,tempPileCard,pileNumber);
            }
        }
        else{
            return false;
        }
    };

    GameLogic.prototype.checkForAnotherSuit = function (piles,tempPileCard){
        var i = 22;
        var j = 26;
        if(tempPileCard.rank == "K"){
            i = 26;
            j = 30;
        }
        for( i; i<j; i++){
            if(piles[i].cards.length>0){
                if (tempPileCard.suit==piles[i].cards[0].suit){
                    return false;
                }
            }
        }
        return true;
    };

    GameLogic.prototype.checkForNextPlacableCard = function (fieldPileCard,tempPileCard,pileNumber) {
        if(pileNumber < 26){
         return ((fieldPileCard.rank == "A" && tempPileCard.rank == "2") ||
            (this.ranks.indexOf(fieldPileCard.rank) == this.ranks.indexOf(tempPileCard.rank) - 1));
            
        }
        else{
            return ((fieldPileCard.rank == "2" && tempPileCard.rank == "A") || 
                (this.ranks.indexOf(fieldPileCard.rank) - 1 == this.ranks.indexOf(tempPileCard.rank)));            
        }
    };

    GameLogic.prototype.specialConditions = function (){

    };

    gf.getGameLogic = function(){
        return new GameLogic();
    }
})(gf);