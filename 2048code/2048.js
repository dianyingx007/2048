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
    },
    moveleft:function(){
        if(this.canLeft()){
            console.log('canLeft');
            for(var i=0;i<4;i++){
                this.moveLeftInRow(i);
            }
            this.randomNum();
            this.updateView();
        }
    },
    canLeft:function(){
        return 1;
    },
    moveLeftInRow:function(i){
        
    }
}
game.start();