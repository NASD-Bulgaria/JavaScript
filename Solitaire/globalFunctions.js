var scope = scope || {};

(function (scope){

    function GlobalFunctions () {
        this.width = 90;
        this.height = 135;
        this.canvas = document.getElementById("canvas");
        this.ctx = this.canvas.getContext("2d");
        this.background= new Image();
        //this.background.src = "Resources/bg24.png";
        this.background.src = "Resources/" + tableBg[tableBgNum] +".png";
    }

    GlobalFunctions.prototype.drawField = function (field) {
        for (var i = 0; i < field.piles.length; i++) {
            var pile = field.piles[i];
            this.ctx.strokeStyle = "black 1px radius: 2px";
            this.ctx.strokeRect(pile.x + 3, pile.y + 3, 84, 129);
            //========
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


            //========
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

    };
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
    GlobalFunctions.prototype.paintPile = function (pile) {
        for (var i = 0; i < pile.cards.length; i++) {
            this.paintCard(pile.cards[i]);
        }

    };

    GlobalFunctions.prototype.drawAllCards = function(deck) {
        for (var i = 0; i < deck.cards.length; i++) {
            this.paintCard(deck.cards[i]);
        }
    };

    GlobalFunctions.prototype.clearBoard = function () {

        var img = new Image();
        img.src = "Resources/" + tableBg[tableBgNum] +".png";
        this.ctx.drawImage(img,0,0);
    };
    scope.getGlobalFunctions = function () {
        return new GlobalFunctions();
    };


})(scope);

tableBg = ["sea01", "bg24", "bg24_002", "bg24_004"];       // masi
cartBG = ["backlizard", "backorcaspyhop2", "backturtle", "backcloud", "backpuffingrass"];        // garbove

//tableBgNum=0;
//cartBGNum=0;

if (sessionStorage.getItem('tableBgNum') === null) {
}else{
    var playerWin = sessionStorage.getItem('tableBgNum');
}
if (sessionStorage.getItem('cartBGNum') === null) {
}else{
    var playerWin = sessionStorage.getItem('cartBGNum');
}



//current Money and Current Bet
sessionStorage.setItem("currentBet",0);
var bet;
if(parseInt(sessionStorage.getItem("currentMoney")) <= 0 || !sessionStorage.getItem("currentMoney") ){
    sessionStorage.setItem("currentMoney",1000);
}
$("#lowerBet").fadeOut();
$("#bet").click(function(){
    message("You have placed bet");
    if (parseInt(sessionStorage.getItem("currentBet"))<parseInt(sessionStorage.getItem("currentMoney"))){
        bet = parseInt(sessionStorage.getItem("currentBet"))+50;
        sessionStorage.setItem("currentBet",bet);
        $("#betMoney").text("Current Bet:"+bet);
        $("#lowerBet").html("Lower bet 50&euro;").fadeIn("slow");
    }
});
//button for lowering current bet
$("#lowerBet").click(function(){

    if(parseInt(sessionStorage.getItem("currentBet"))>0){
        message("You have lowered the bet");
        bet = parseInt(sessionStorage.getItem("currentBet"))-50;
        sessionStorage.setItem("currentBet",bet);
        $("#betMoney").text("Current Bet:"+bet);
    }
    else {
        message("You have to place bet first!");
    }
});

//sounds
soundWin = document.createElement('audio');
soundWin.setAttribute('src', 'Models/success.wav');
soundWin.volume = 0.8;
soundTick = document.createElement('audio');
soundTick.setAttribute('src', 'Models/tick.mp3');
soundTick.volume = 0.8;
