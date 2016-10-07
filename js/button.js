//button点击重新开始
var restart=document.getElementById("restart");
restart.onclick = function(){
	event.stopPropagation();
	game.start();
};
restart.addEventListener("touchstart",function(){
	event.stopPropagation();
	game.start();
},false);