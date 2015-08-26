var model = model || {};

(function (model) {

    function Timer(value) {
        this.total_seconds = 0;
        this.started = false;
        this.value = value;
        
    }

    Timer.prototype.startTimer = function () {

        var currentTimeString,
            _this = this;

        this.started = true;

        setInterval(function () {
            if (!_this.started) return;

            function pretty_time_string(num) {
                return ( num < 10 ? "0" : "" ) + num;
            }

            _this.total_seconds++;
            //console.log("this.total_seconds = " + _this.total_seconds);

            var total_seconds;
            var hours = Math.floor(_this.total_seconds / 3600);
            total_seconds = _this.total_seconds % 3600;

            var minutes = Math.floor(total_seconds / 60);
            total_seconds = total_seconds % 60;

            var seconds = Math.floor(total_seconds);

            hours = pretty_time_string(hours);
            minutes = pretty_time_string(minutes);
            seconds = pretty_time_string(seconds);

            currentTimeString = hours + " : " + minutes + " : " + seconds;

            $("#time").html(" Play Time: <span>" + currentTimeString + "</span>");
        }, 1000);
    };

    Timer.prototype.restartTimer = function () {
        this.total_seconds = 0;
        this.started = true;
    };

    Timer.prototype.stopTimer = function () {
        this.started = false;
    };

    Timer.prototype.saveCurrentTimer = function () {
        //var arrTimeResult = JSON.parse(sessionStorage.getItem("gameTime"));
        console.log("typeof gameTimes = " + typeof gameTimes);
        if (!gameTimes) {
            gameTimes = [];
            gameNames = [];
        }
        if (gameTimes.length === 10) {
            gameTimes.shift();
            gameNames.shift();
        }
        gameTimes.push(this.total_seconds);
        gameNames.push(this.value);
        //sessionStorage.setItem("gameTime", this.total_seconds);
        sessionStorage.setItem("gameTime", JSON.stringify(gameTimes));
        sessionStorage.setItem("gameName", JSON.stringify(gameNames));

    };

    model.getTimer = function (value) {
        return new Timer(value);
    };
})(model);