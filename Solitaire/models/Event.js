var model = model || {};

(function (model) {
    /**
     * Event object declaration. Its functions declare all the events used in the game and their logic. Contains instance of GameApp and GlobalFunctions.
     * The canvas where the game is displayed, a temp pile variable that contains the cards when they are moved from one pile to another.
     * @param gameApp - the instance of the current GameApp
     * @param glob - the instance of the current GlobalFunctions object.
     * @constructor
     */
    function Event(gameApp,glob){
        this.gameApp = gameApp;
        this.canvas = glob.canvas;
        this.tempPile = model.getPile(0,0,true);
        this.tempPileNumber = null;
        this.glob = glob;
    }

    /**
     * This function is for mousedown event. Checks if the target is pile, on what card of the pile the user has clicked, checks if the user can pick the card/cards
     * activates mouseMove event and plays a sound.
     */
    Event.prototype.mouseDownListen = function(){
        var _this = this;
        $("#canvas").bind("mousedown", function (e) {
            var mouseX = e.offsetX;
            var mouseY = e.offsetY;
                 _this.tempPileNumber = _this.gameApp.ifTargetIsPile(mouseX, mouseY);
                if (_this.tempPileNumber == -1) {

                }
                    var cardNumberInPile = _this.gameApp.cardClicked(_this.tempPileNumber, mouseY);
                    if(_this.gameApp.canPickUpCards(_this.tempPileNumber, cardNumberInPile)){
                        _this.tempPile = _this.gameApp.moveCards(_this.tempPileNumber,cardNumberInPile);
                        _this.mouseMoveListen();
                        _this.mouseOutListen();
                        sounds.playCardSound();
                    }



        });
    };
    Event.prototype.mouseOutListen = function () {
        var _this = this;
        $("#canvas").bind("mouseleave", function (){
            _this.gameApp.placeCardsOnNewPile(_this.tempPileNumber, null, _this.tempPile);
            _this.tempPile = model.getPile(0,0,true);//занулява
            _this.tempPileNumber = null;
            $("#canvas").unbind("mousemove");
            _this.gameApp.executeSpecialEvents(); // проверява дали има обърнати карти за някои игри
            _this.glob.clearBoard();
            _this.glob.drawField(_this.gameApp);

        });
    };
    /**
     * This method redraws the playground and changes the coordinates of the temp pile that the user holds when mouse down event is activated.
     */
    Event.prototype.mouseMoveListen = function() {
        var _this = this;


        $("#canvas").bind("mousemove", function (e){
            var mouseX = e.offsetX;
            var mouseY = e.offsetY;
            _this.glob.clearBoard();
            _this.glob.drawField(_this.gameApp);
            _this.glob.paintPile(_this.tempPile);
            _this.tempPile.changePosition(mouseX, mouseY);
        })
    };
    /**
     * The function activates mouseup event listener. Checks if the target of the mouse up is pile. On what card the user is clicked, places the cards on the new pile
     * checks for win condition, executes special conditions if any and redraws the playground.
     */
    Event.prototype.mouseUpListen = function () {
        var _this = this;
        $("#canvas").bind("mouseup", function (e){
            var mouseX = e.offsetX;
            var mouseY = e.offsetY;
            
            try {
                var newPileNumber = _this.gameApp.ifTargetIsPile(mouseX, mouseY, true);
                var newCardNumberInPile = _this.gameApp.cardClicked(newPileNumber);
                if(_this.gameApp.canPlaceCards(_this.tempPile, newPileNumber, newCardNumberInPile, _this.tempPile.cards[0], _this.tempPileNumber)){
                    _this.gameApp.placeCardsOnNewPile(newPileNumber,_this.tempPileNumber, _this.tempPile);
                    _this.gameApp.winCondition();
                    sounds.playCardSound();
                }
                else{
                    _this.gameApp.placeCardsOnNewPile(_this.tempPileNumber, null, _this.tempPile);
                    sounds.playCardSound();
                }
            }
            catch(e){
                _this.gameApp.placeCardsOnNewPile(_this.tempPileNumber, null, _this.tempPile);
            }
            finally{
                _this.tempPile = model.getPile(0,0,true);
                _this.tempPileNumber = null;
                $("#canvas").unbind("mousemove");
                $("#canvas").unbind("mouseout");
                _this.gameApp.executeSpecialEvents();
                _this.glob.clearBoard();
                _this.glob.drawField(_this.gameApp);
            }
        })
    };


    /**
     * constructor for the Event object
     * @param gameApp
     * @param glob
     * @returns {Event}
     */
    model.getEvent = function(gameApp,glob){
        return new Event(gameApp,glob);
    }
})(model);