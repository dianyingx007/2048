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
restart.addEventListener("touchmove",function(){
	event.stopPropagation();
},false);
restart.addEventListener("touchend",function(){
	event.stopPropagation();
},false);