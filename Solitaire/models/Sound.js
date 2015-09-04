var model = model || {};

(function (model){
    function Sounds() {
        this.cardSound = new Audio("Resources/Tick.mp3");
        this.winSound = new Audio("Resources/success.wav");
    }

    Sounds.prototype.playCardSound = function (){
        this.cardSound.play();
    };

    Sounds.prototype.playWinSound = function () {
        this.winSound.play();
    };

    model.getSounds = function (){
        return new Sounds();
    }
})(model);