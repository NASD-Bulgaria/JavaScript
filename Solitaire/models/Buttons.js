var model = model || {};

(function(model){
	function Buttons (){
		sessionStorage.setItem("currentBet",0);

		this.checkForMoney = function () {
			console.log(parseInt(sessionStorage.getItem("currentMoney")));
			if(parseInt(sessionStorage.getItem("currentMoney")) <= 0 ||
			 !sessionStorage.getItem("currentMoney")){
	    	sessionStorage.setItem("currentMoney",1000);
			}
		};
		this.displayMoney = function () {
			$("#currentMoney").html("Money:"+parseInt(sessionStorage.getItem("currentMoney"))+"&euro;");
		};
		this.getMoney = 0;
		this.getBet = 0;
	}

Buttons.prototype.displayStartingMoney = function (){

	var bet = parseInt(sessionStorage.getItem("currentBet"));
	var money = parseInt(sessionStorage.getItem("currentMoney"))-bet;
	console.log(bet+":"+money);
    sessionStorage.setItem("currentMoney",money);
    $("#currentMoney").text("Money:"+money);
    $("#bet,#timeResult,#lowerBet").fadeOut("slow");

}
Buttons.prototype.bindBetButton = function (){
	
	$("#bet").bind("click", function () {
		message("You have placed bet");
		this.getBet = parseInt(sessionStorage.getItem("currentBet"));
		this.getMoney = parseInt(sessionStorage.getItem("currentMoney"));

		//console.log(this.getBet+":"+this.getMoney);
	    if (this.getBet <this.getMoney){
	        var bet = this.getBet + 50;
	        sessionStorage.setItem("currentBet",bet);

	        $("#betMoney").html("Current Bet:"+bet+"&euro;").css({'background-color': 'orangered','border-radius': '5px','padding': '0 7px'});
	        $("#lowerBet").html("Lower bet 50&euro;").fadeIn("slow");
	    }
	});
}

Buttons.prototype.bindLowerBetButtons = function(){
	$("#lowerBet").bind("click",function(){
		message("You have lowered the bet");
		this.getBet = parseInt(sessionStorage.getItem("currentBet"));
		//console.log(this.getBet);
	    if(this.getBet>0){	        
	        var bet = this.getBet-50;
	        sessionStorage.setItem("currentBet",bet);
	        $("#betMoney").html("Current Bet:"+bet+"&euro;");
	    }
	    else {
	        message("You have to place bet first!");
	    }
	});
}

Buttons.prototype.displayWinMoney = function(){

	message("You have won the game");
	var money = parseInt(sessionStorage.getItem("currentMoney")) + parseInt(sessionStorage.getItem("currentBet"))*2;
    sessionStorage.setItem("currentMoney", money);
    $("#currentMoney").text("Money"+" "+money+"€");
    $("#betMoney").text("Current Bet:");
    
}

	model.getButtons = function (){
		return new Buttons(); 
	}

})(model);