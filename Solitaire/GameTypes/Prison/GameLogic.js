var prison = prison || {};

(function (prison) {
    function GameLogic() {
        this.ranks = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"];
        this.suits = ["H", "D", "C", "S"];
        this.timesCanRedraw = 0;
    }

    GameLogic.prototype.specialConditions = function (piles) {

    };
    GameLogic.prototype.canPickUp = function (pile, pileNumber, cardPosition) {
        //for the first 4 piles
        if (pileNumber >= 0 && pileNumber <= 3) {
            return false;
        }
        //for the next 8 one card piles
        else if (pileNumber >= 4 && pileNumber <= 11) {
            return (pile.cards.length == 1);
            // for the last 10 piles
        }
        else {
            return (pile.cards.length - 1 == cardPosition);
        }
    };
    GameLogic.prototype.wonGame = function (piles) {
        return (piles[0].cards.length == 13 &&
        piles[1].cards.length == 13 &&
        piles[2].cards.length == 13 &&
        piles[3].cards.length == 13 );
    };
    GameLogic.prototype.canPlace = function (fieldPile, tempPile, fieldPileCard, tempPileCard, pileNumber, oldPileNumber, cardNumber) {
        var lastCardInPile = (fieldPile.cards.length - 1);
        //can we place cards on the first 4 piles
        if (pileNumber >= 0 && pileNumber <= 3) {
            if (fieldPile.cards[lastCardInPile].suit == tempPileCard.suit) {
                if (fieldPile.cards[lastCardInPile].rank == "A" &&
                    tempPileCard.rank == "2") {
                    return true;
                }
                else {
                    return (this.ranks.indexOf(fieldPile.cards[lastCardInPile].rank) + 1 ==
                    this.ranks.indexOf(tempPileCard.rank));
                }
            }
            else {
                return false;
            }


        }
        //can we place card on the next 8 one card piles
        else if (pileNumber >= 4 && pileNumber <= 11) {
            return (fieldPile.cards.length == 0);

        }
        // can we place cards on the last 10 piles
        else if (pileNumber >= 12 && pileNumber <= 22) {
            if (fieldPile.cards.length == 0) {
                return true;
            }
            else if (fieldPile.cards[lastCardInPile].suit == tempPileCard.suit) {
                if (fieldPile.cards[lastCardInPile].rank == "2" &&
                    tempPileCard.rank == "A") {
                    return true;
                }
                else {
                    return (this.ranks.indexOf(fieldPile.cards[lastCardInPile].rank) - 1 ==
                    this.ranks.indexOf(tempPileCard.rank));
                }
            }
            else {
                return false;
            }
        }
        else {
            return false;
        }
    };

    prison.getGameLogic = function () {
        return new GameLogic();
    }
})(prison);