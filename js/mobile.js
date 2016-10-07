//移动端控制事件
var init = {minx:20,miny:20,sx:0,sy:0,ex:0,ey:0};//minx,miny限定多少才算移动
document.addEventListener("touchstart",function(){
	var event = window.event || arguments[0];
	init.sx=event.targetTouches[0].pageX;
	init.sy=event.targetTouches[0].pageY;
	init.ex=init.sx;
	init.ey=init.sy;
},false);
document.addEventListener("touchmove",function(){
	var event = window.event || arguments[0];
	event.preventDefault();//阻止浏览器滚动条滚动、缩放
	init.ex=event.targetTouches[0].pageX;
	init.ey=event.targetTouches[0].pageY;
},false);
document.addEventListener("touchend",function(){
	if(game.state!=2){
		if(game.state===1){
			var changeX = init.ex - init.sx;
			var changeY = init.ey - init.sy;
			if(Math.abs(changeX)>Math.abs(changeY)&&Math.abs(changeX)>init.minx){
				if(changeX>0){
					game.moveRight();
				}else {
					game.moveLeft();
				}
			}else if(Math.abs(changeY)>Math.abs(changeX)&&Math.abs(changeY)>init.miny){
				if(changeY>0){
					game.moveBottom();
				}else {
					game.moveTop();
				}
			}
		}
	}
},false);