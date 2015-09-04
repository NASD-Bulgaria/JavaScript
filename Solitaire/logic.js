

$(window).ready(function () {
    glob = scope.getGlobalFunctions();
    deck = model.getDeck(1);
    sounds = model.getSounds();
    glob.loadCards(deck);
    glob.drawAllCards(deck);

    buttons = model.getButtons();

    buttons.checkForMoney();
    buttons.bindBetButton();
    buttons.bindLowerBetButtons();
    buttons.displayMoney();
    
    score = model.getScore();
    score.displayScore();
    message("Welcome to the game!");

});
function initialize() {

    glob = scope.getGlobalFunctions();
    glob.loadCards(deck);
    glob.drawAllCards(deck);
}
var timer,
    gameTimes = JSON.parse(sessionStorage.getItem("gameTime")),
    gameNames = JSON.parse(sessionStorage.getItem("gameName"));

    

//start button for creating the chosen game 
function startGame(value) {

    if (!gameIsStartet){

        if(parseInt(sessionStorage.getItem("currentBet")) != 0){
            gameIsStartet=true;
            initialize();
            gameTypeSave(value);
            game = model.getGameApp(value);
            events = model.getEvent(game,glob);
            glob.clearBoard();
            game.generateGame();
            glob.drawField(game);
            events.mouseDownListen();
            events.mouseUpListen();

            timer = model.getTimer();
            timer.startTimer();
            score = model.getScore(value);

            buttons.displayStartingMoney();

            message("You started " + value + " solitaire");
        }
        else {
            message("You have to place bet before starting new game");
        }


    }
    else{
        message("Another game has already started");
    }

}

//Reload curent page
function reload() {
    gameIsStartet=false;
    location.reload();
}
toReset= false;

function drawWinDefect(x, y, cardNum){

    var rad=70;
    var tempY=0;
    var tempX=0;

    if (x<=rad){
        if ((parseInt((x)/(rad*2)))%2==0){

            tempX=x-2*rad*parseInt(x/(rad*2));
            tempY+=Math.sqrt(rad*rad-tempX*tempX);
        }else{

            tempX=x-2*rad*parseInt(x/(rad*2));
            tempY-=Math.sqrt(rad*rad-tempX*tempX);
        }
    }
    else{
        if ((parseInt((x-rad)/(rad)))%2==0){

            tempX=x-rad*parseInt(x/(rad));
            tempY-=Math.sqrt(rad*rad-tempX*tempX);
        }else{

            tempX=x-rad*parseInt(x/(rad));
            tempY+=Math.sqrt(rad*rad-tempX*tempX);
        }
    }

    if (cardNum>=this.deck.cards.length){
        cardNum=0;
    }

    var card =this.deck.cards[cardNum];
    card.x = x;
    card.y = y + tempY;
    card.face=true;
    glob.paintCard(card);

    cardNum++;
    x+=7;


    if (x>=1200){
        y+=80;
        x=0;
    }

    if (y>=750){
        y=rad;
    }

    if(toReset){
        reload();
    }

    var loopTimer = setTimeout('drawWinDefect('+x+', '+y+', '+cardNum+')',5);
    setInterval(function() {
        if(!toReset)toReset = true;
    },5000);

}

//Create floating message in the Header #logo
function message(string) {
    var text = $("<span></span>");
    text.attr("id", "toAnim");
    text.html(string);
    $("#logo").html(text);
    $("#toAnim").textillate({
        in: {
            effect: 'rollIn',delay: 50,type: 'letter'
        },
        out: {
            effect: 'flipOutX', delay: 30, shuffle: true
        }
    });
    $('#toAnim').on('inAnimationEnd.tlt', function () {
        $('#toAnim').textillate('out');
    });
}







