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