var model = model || {};

(function (model) {
    /**
     *Class Timer
     * @constructor
     */
    function Timer() {
        this.total_seconds = 0; //counter
    }

    /**
     * Function that changes the look timer
     * @param num
     * @returns {string}
     */
    Timer.prototype.timeToString = function (num) {
        return ( num < 10 ? "0" : "" ) + num;
    };

    /**
     * Function starts timer
     */
    Timer.prototype.startTimer = function () {

        var currentTimeString,
            _this = this;

        timerId = setInterval(function () {

            _this.total_seconds++;

            var total_seconds;
            var hours = Math.floor(_this.total_seconds / 3600);
            total_seconds = _this.total_seconds % 3600;

            var minutes = Math.floor(total_seconds / 60);
            total_seconds = total_seconds % 60;

            var seconds = Math.floor(total_seconds);

            hours = _this.timeToString(hours);
            minutes = _this.timeToString(minutes);
            seconds = _this.timeToString(seconds);

            currentTimeString = hours + " : " + minutes + " : " + seconds;

            $("#time").html(" Play Time: <span>" + currentTimeString + "</span>");
        }, 1000);
    };
    /**
     * Function stops timer
     */
    Timer.prototype.stopTimer = function(){
        clearInterval(timerId);
    };

    model.getTimer = function () {
        return new Timer();
    };
})(model);