var eo = eo || {};

(function(eo){
    function Field(deck){
        this.piles = [];
        this.deck = deck;
    }

    Field.prototype.generateGame = function () {
        //first row, cascading cards
        for(var i=0;i<8;i++){
            this.piles.push(model.getPile(i*110+20,150,true)); 
        }
        //second row ,top pile
        for(var i=0;i<8;i++){
            this.piles.push(model.getPile(i*110+20,10,true)); 
        }
        //third right pile for placing "A" card
        for(var i=0;i<4;i++){
            this.piles.push(model.getPile(900,i*140+10,false)); 
        }

        this.deck.shuffle();

        var curPile = 0;
        for (var i = 0; i < this.deck.cards.length; i++) {  
            this.deck.cards[i].face = true;
            if(i >47){//last 4 cards on top piles
                 this.piles[i-40].cards.push(this.deck.cards[i]);
            }
            else{//all other cards for first 8 cascading piles
                this.piles[curPile].cards.push(this.deck.cards[i]);
                if (this.piles[curPile].cards.length==6) {
                    curPile++;
                }
            }
           
        }
        return this.piles;
    };

    Field.prototype.getPiles = function(){
        return this.piles;
    };

    eo.getField = function(deck){
        return new Field(deck);
    }
})(eo);