

$(window).ready(function () {
    glob = scope.getGlobalFunctions();
    deck = model.getDeck(1);
    glob.loadCards(deck);
    glob.drawAllCards(deck);
    $("#currentMoney").html("Money:"+parseInt(sessionStorage.getItem("currentMoney"))+"&euro;");
    message("Welcome to the game!");

    function pretty_time_string(num) {
        return ( num < 10 ? "0" : "" ) + num;
    }
    if (gameTimes) {
        for (var i = 0; i < gameTimes.length; i++) {

            var name = gameNames[i];
            //game name

            var hours = Math.floor(gameTimes[i] / 3600);
            //total_seconds = total_seconds % 3600;

            var minutes = Math.floor(gameTimes[i] % 3600 / 60);
            //total_seconds = total_seconds % 60;

            var seconds = Math.floor(gameTimes[i] % 3600 % 60 % 60);

            hours = pretty_time_string(hours);
            minutes = pretty_time_string(minutes);
            seconds = pretty_time_string(seconds);
            $("#timeResult").append("<p>"+name+":" + hours + ":" + minutes + ":" + seconds + "</p>");
        }
    }
});
function initialize() {
    glob = scope.getGlobalFunctions();
    glob.loadCards(deck);
    glob.drawAllCards(deck);
}
var timer,
    gameTimes = JSON.parse(sessionStorage.getItem("gameTime"));
    var gameNames = JSON.parse(sessionStorage.getItem("gameName"));

function startGame(value) {

    if (!gameIsStartet){

        if(parseInt(sessionStorage.getItem("currentBet")) != 0){
            gameIsStartet=true;
            initialize();
            gameTypeSave(value);
            var money = parseInt(sessionStorage.getItem("currentMoney"))-bet;
            sessionStorage.setItem("currentMoney",money);
            $("#currentMoney").text("Money:"+money);
            $("#bet,#timeResult,#lowerBet").fadeOut("slow");

            game = model.getGameApp(value);
            events = model.getEvent(game,glob);
            glob.clearBoard();
            game.generateGame();
            glob.drawField(game);
            events.mouseDownListen();
            events.mouseUpListen();
            if (timer) {
                timer.restartTimer();
            } else {
                timer = model.getTimer(value);
                timer.startTimer();
            }
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

function end(){

    $("#bet").fadeIn("slow");
    timer.stopTimer();
    glob.clearBoard();
    glob = scope.getGlobalFunctions();
    deck = model.getDeck(1);
    glob.loadCards(deck);
    glob.drawAllCards(deck);

    sessionStorage.setItem("currentBet",0);
    $("#currentMoney").html("Money:"+parseInt(sessionStorage.getItem("currentMoney"))+"&euro;");
    $("#betMoney").text("Current Bet:");


}

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

    var loopTimer = setTimeout('drawWinDefect('+x+', '+y+', '+cardNum+')',2);
    setInterval(function() {
        if(!toReset)toReset = true;
    },5000);

}



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







