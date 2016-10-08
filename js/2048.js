var game = {
    data:[],//二维数组，存放游戏数据4*4
    score:0,//记录成绩
    state:1,//0代表游戏结束，1代表正在游戏，2代表动画正在演示
    start: function(){
        this.data = [
            [0,0,0,0],
            [0,0,0,0],
            [0,0,0,0],
            [0,0,0,0]
        ];
        this.score = 0;
        this.state = 1;
        var gameover=document.getElementById("gameover");
        gameover.style.display="none";
        this.randomNum();
        this.randomNum();
        this.updateView();
    },
    randomNum:function(){
        if(this.isFull()){
            return 0;
        }
        while(true){
            var i = Math.floor(Math.random()*4);
            var j = Math.floor(Math.random()*4);
            if(this.data[i][j]===0){
                this.data[i][j]=Math.random()<0.5?2:4;
                break;
            }
        }

    },
    isFull:function(){
        for(var i=0;i<4;i++){
            for(var j=0;j<4;j++){
                if(this.data[i][j]==0){
                    return 0;
                }
            }
        }
        return 1;
    },
    updateView:function(){
        for(var i=0;i<4;i++){
        	for(var j=0;j<4;j++){
        		var div = document.getElementById('c'+i+j);
        		div.innerHTML = this.data[i][j]===0?"":this.data[i][j];
        		div.className = this.data[i][j]===0?"cell":"cell t"+this.data[i][j];
        	}
        }
        var getscore = document.getElementById('getscore');
        getscore.innerHTML = this.score;
        if(this.isGameOver()){
            this.state = 0;
            var gameover=document.getElementById('gameover');
        	gameover.style.display="block";
        	var finalscore=document.getElementById('finalscore');
        	finalscore.innerHTML=this.score;
        }
    },
    isGameOver:function(){
        if(!this.isFull()){
            return 0;
        }
        for(var i=0;i<4;i++){
            for(var j=0;j<4;j++){
                if(j<3){
                    if(this.data[i][j]===this.data[i][j+1]){
                        return 0;
                    }
                }
                if(i<3){
                    if(this.data[i][j]===this.data[i+1][j]){
                        return 0;
                    }
                }
            }
        }
        return 1;
    },
    moveLeft:function(){
    	var flag=0;//判断是否有移动
        for(var i=0;i<4;i++){
            if(this.moveLeftInRow(i)){
            	flag=1;
            }
        }
        if(flag===1){
        	this.state = 2;
        	animation.move();
        	setTimeout(function(){
        		game.state = 1;
        		game.randomNum();
        		game.updateView();
        	},animation.times*animation.interval);
        };
    },
    moveLeftInRow:function(i){
    	var flag=0;
        for(var j=0;j<3;j++){
            var nextCol = this.getNextRight(i,j);
            if(nextCol===-1){//-1表示位置不存在
                break;
            }else {
                if(this.data[i][j]===0){
                    this.data[i][j]=this.data[i][nextCol];
                    this.data[i][nextCol]=0;
                    animation.addTask("c"+i+nextCol,"c"+i+j);
                    j--;
                    flag=1;
                }else if(this.data[i][j]===this.data[i][nextCol]){
                    this.data[i][j]*=2;
                    this.data[i][nextCol]=0;
                    this.score+=this.data[i][j];
                    animation.addTask("c"+i+nextCol,"c"+i+j);
                    flag=1;
                }
            }
        }
        return flag;
    },
    getNextRight:function(i,j){
        for(var k=j+1;k<4;k++){
            if(this.data[i][k]!=0){
                return k;
            }
        }
        return -1;//-1表示右边不存在数字
    },
    moveRight:function(){
    	var flag=0;
        for(var i=0;i<4;i++){
            if(this.moveRightInRow(i)){
            	flag=1;
            }
        }
        if(flag===1){
        	this.state=2;
        	animation.move();
        	setTimeout(function(){
        		game.state=1;
        		game.randomNum();
        		game.updateView();
        	},animation.times*animation.interval);
        }
    },
    moveRightInRow:function(i){
    	var flag=0;
        for(var j=3;j>0;j--){
            var nextCol = this.getNextLeft(i,j);
            if(nextCol===-1){
                break;
            }else{
                if(this.data[i][j]===0){
                    this.data[i][j]=this.data[i][nextCol];
                    this.data[i][nextCol]=0;
                    animation.addTask("c"+i+nextCol,"c"+i+j);
                    j++;
                    flag=1;
                }else if(this.data[i][j]===this.data[i][nextCol]){
                    this.data[i][j]*=2;
                    this.data[i][nextCol]=0;
                    this.score+=this.data[i][j];
                    animation.addTask("c"+i+nextCol,"c"+i+j);
                    flag=1;
                }
            }
        }
        return flag;
    },
    getNextLeft:function(i,j){
        for(var k=j-1;k>=0;k--){
            if(this.data[i][k]!=0){
                return k;
            }
        }
        return -1;
    },
    moveTop:function(){
    	var flag=0;
        for(var j=0;j<4;j++){
            if(this.moveTopInCol(j)){
            	flag=1;
            }
        }
        if(flag===1){
        	this.state=2;
        	animation.move();
        	setTimeout(function(){
        		game.state=1;
        		game.randomNum();
        		game.updateView();
        	},animation.times*animation.interval);
        }
    },
    moveTopInCol:function(j){
    	var flag=0;
        for(var i=0;i<3;i++){
            var nextRow=this.getNextBottom(i,j);
            if(nextRow===-1){
                break;
            }else {
                if(this.data[i][j]===0){
                    this.data[i][j]=this.data[nextRow][j];
                    this.data[nextRow][j]=0;
                    animation.addTask("c"+nextRow+j,"c"+i+j);
                    i--;
                    flag=1;
                }else if(this.data[i][j]===this.data[nextRow][j]){
                    this.data[i][j]*=2;
                    this.data[nextRow][j]=0;
                    this.score+=this.data[i][j];
                    animation.addTask("c"+nextRow+j,"c"+i+j);
                    flag=1;
                }
            }
        }
        return flag;
    },
    getNextBottom:function(i,j){
        for(var k=i+1;k<4;k++){
            if(this.data[k][j]!=0){
                return k;
            }
        }
        return -1;
    },
    moveBottom:function(){
    	var flag=0;
        for(var j=0;j<4;j++){
            if(this.moveBottomInCol(j)){
            	flag=1;
            }
        }
        if(flag===1){
        	this.state=2;
        	animation.move();
        	setTimeout(function(){
        		game.state=1;
        		game.randomNum();
        		game.updateView();
        	},animation.times*animation.interval);
        }
    },
    moveBottomInCol:function(j){
    	var flag=0;
        for(var i=3;i>=0;i--){
            var nextRow=this.getNextTop(i,j);
            if(nextRow===-1){
                break;
            }else {
                if(this.data[i][j]===0){
                    this.data[i][j]=this.data[nextRow][j];
                    this.data[nextRow][j]=0;
                    animation.addTask("c"+nextRow+j,"c"+i+j);
                    i++;
                    flag=1;
                }else if(this.data[i][j]===this.data[nextRow][j]){
                    this.data[i][j]*=2;
                    this.data[nextRow][j]=0;
                    this.score+=this.data[i][j];
                    animation.addTask("c"+nextRow+j,"c"+i+j);
                    flag=1;
                }
            }
        }
        return flag;
    },
    getNextTop:function(i,j){
        for(var k=i-1;k>=0;k--){
            if(this.data[k][j]!=0){
                return k;
           }
        }
        return -1;
    }
}
game.start();
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
//实现移动动画
var animation = {
	times: 10,//动画分成的次数
	interval: 10, //动画每次的间隔时间
	timer: null,//保持定时器id
	tasks: [],
	addTask:function(source,target){
		var div1 = document.getElementById(source);
		var div2 = document.getElementById(target);
		var topStep = (div2.offsetTop-div1.offsetTop)/this.times;
		var leftStep = (div2.offsetLeft-div1.offsetLeft)/this.times;
		var task = new taskClass(div1,topStep,leftStep);
		this.tasks.push(task);
	},
	move:function(){
		this.timer=setInterval(function(){
			for(var i=0;i<animation.tasks.length;i++){
				animation.tasks[i].moveOneStep();
			}
			animation.times--;
			if(animation.times===0){
				for(var i=0;i<animation.tasks.length;i++){
					animation.tasks[i].clear();
				}
				clearInterval(animation.timer);
				animation.tasks=[];
				animation.times=10;
				animation.timer=null;
				
			}
		},this.interval);
	}
}
function taskClass(div,topStep,leftStep){
	this.div=div;
	this.topStep=topStep;
	this.leftStep=leftStep;
}
taskClass.prototype.moveOneStep=function(){
	this.div.style.top=this.div.offsetTop+this.topStep+"px";
	this.div.style.left=this.div.offsetLeft+this.leftStep+"px";
}
taskClass.prototype.clear=function(){
	//还原到原来位置
	this.div.style.top="";
	this.div.style.left="";
}
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