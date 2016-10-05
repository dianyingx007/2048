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
        console.log(this.data[0]);
        console.log(this.data[1]);
        console.log(this.data[2]);
        console.log(this.data[3]);
        console.log('score:'+this.score);
        if(this.isGameOver()){
            this.state = 0;
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
        	this.randomNum();
        	this.updateView();
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
                    j--;
                    flag=1;
                }else if(this.data[i][j]===this.data[i][nextCol]){
                    this.data[i][j]*=2;
                    this.data[i][nextCol]=0;
                    this.score+=this.data[i][j];
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
        	this.randomNum();
        	this.updateView();
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
                    j++;
                    flag=1;
                }else if(this.data[i][j]===this.data[i][nextCol]){
                    this.data[i][j]*=2;
                    this.data[i][nextCol]=0;
                    this.score+=this.data[i][j];
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
        	this.randomNum();
        	this.updateView();
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
                    i--;
                    flag=1;
                }else if(this.data[i][j]===this.data[nextRow][j]){
                    this.data[i][j]*=2;
                    this.data[nextRow][j]=0;
                    this.score+=this.data[i][j];
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
        	this.randomNum();
        	this.updateView();
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
                    i++;
                    flag=1;
                }else if(this.data[i][j]===this.data[nextRow][j]){
                    this.data[i][j]*=2;
                    this.data[nextRow][j]=0;
                    this.score+=this.data[i][j];
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

//js输入方法：prompt（“提示信息”，预定输入信息）
game.start();
for(;game.state;){
    console.log('moveleft');
    game.moveLeft();
    console.log('moveRight');
    game.moveRight();
    console.log('moveTop');
    game.moveTop();
    console.log('moveBottom');
    game.moveBottom();
}
console.log('isGameOver');