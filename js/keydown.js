document.onkeydown = function(){
	if(game.state!=2){
		var event = window.event || arguments[0];
		if(game.state===1){
			if(event.keyCode == 37){
				game.moveLeft();
			}else if(event.keyCode == 39){
				game.moveRight();
			}else if(event.keyCode == 38){
				game.moveTop();
			}else if(event.keyCode == 40){
				game.moveBottom();
			}
		}else if(event.keyCode == 13){
			game.start();
		}
	}
};