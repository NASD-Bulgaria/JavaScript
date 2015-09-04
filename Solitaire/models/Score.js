var model = model || {};

(function (model) {

	/**
	 * Class Score
	 * @param value - the name of current Game
	 * @constructor
	 */
	function Score(value) {
		this.value = value;
	}

	/**
	 * Function saves the current time
	 */
	Score.prototype.saveCurrentTimer = function () {
		if (!gameTimes) {
            gameTimes = [];
            gameNames = [];
        }
        if (gameTimes.length === 10) {
            gameTimes.shift();
            gameNames.shift();
        }
        gameTimes.push(timer.total_seconds);
        gameNames.push(this.value);
        
        sessionStorage.setItem("gameTime", JSON.stringify(gameTimes));
        sessionStorage.setItem("gameName", JSON.stringify(gameNames));
	};

	/**
	 * Function that changes the look timer
	 * @param num
	 * @returns {string}
	 */
	Score.prototype.convertScore = function (num) {
        return ( num < 10 ? "0" : "" ) + num;
    };

	/**
	 * Function displays the current time result
	 */
	Score.prototype.displayScore = function () {
		 _this = this;

		if (gameTimes) {
	        for (var i = 0; i < gameTimes.length; i++) {

	            var name = gameNames[i]; //game name

	            var hours = Math.floor(gameTimes[i] / 3600);

	            var minutes = Math.floor(gameTimes[i] % 3600 / 60);

	            var seconds = Math.floor(gameTimes[i] % 3600 % 60 % 60);

	            hours = _this.convertScore(hours);
	            minutes = _this.convertScore(minutes);
	            seconds = _this.convertScore(seconds);
	            $("#timeResult").append("<p>"+name+"-" + hours + ":" + minutes + ":" + seconds + "</p>");
	        }
    	}
	};

    /**
     *
     * @param value
     * @returns {Score}
     */
	model.getScore = function (value) {
        return new Score(value);
    };

})(model);