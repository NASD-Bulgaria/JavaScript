var prison = prison || {};

(function(prison){
    function Field(deck){
        this.piles = [];
        this.deck = deck;
    }

    Field.prototype.generateGame = function () {

        //4 piles for collect cards

        for(var i=0;i<4;i++){
            this.piles.push(model.getPile(i*110+350, 20,false,0));
        }
        //drawing 7 special piles with flipped card and 1 without flipped card foundation piles

        for(var i=0;i<8;i++){
            this.piles.push(model.getPile(i*110+130, 175,false,0));
        }
        //8 piles that will be cascading and can take cards

        for(var i=0;i<10;i++){
            this.piles.push(model.getPile(i*110+20, 330,true,0));
        }

        this.deck.shuffle();
        var randomCard = Math.floor((Math.random() * 13) );
        var colPile = 0;
        var curPile = 4;
        for (var i = 0; i < this.deck.cards.length; i++) {
            this.deck.cards[i].face=true;
            if(this.deck.ranks.indexOf(this.deck.cards[i].rank)==randomCard){
                this.piles[colPile].cards.push(this.deck.cards[i]);
                colPile++;
            }
            else {
                if(curPile>=4&&curPile<=11){
                    this.piles[curPile].cards.push(this.deck.cards[i]);
                    curPile++;
                }
                else{
                    this.piles[curPile].cards.push(this.deck.cards[i]);
                    if(this.piles[curPile].cards.length==4){
                        curPile++;
                    }
                }
            }
        }
        return this.piles;
    };

    prison.getField = function(deck){
        return new Field(deck);
    }
})(prison);