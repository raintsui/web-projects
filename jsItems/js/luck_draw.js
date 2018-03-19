var data = ['Photo8','7000元电视机','50元电话费充值券','惠普电脑','谢谢参与','300超市购物券','玛瑙珠子一串','联想笔记本'];
var timer = null,
    flag = 0;

window.onload = function(){
	var start = document.getElementById('start'),
	    stop = document.getElementById('stop');
	   
	//开始抽奖
	start.onclick = luckDraw;
	stop.onclick = stopLuck;//！！！原先将函数名也取成stop与变量名一样造成冲突

	//鼠标按键抽奖 (还有一个问题：要是鼠标按开始，那么键盘上要按两次才能解决这个问题，怎么才能解决呢？)
	document.onkeyup = function(event){//event对象的keyCode属性提供键盘对应键的键盘码
		event =event||window.event;
		console.log(event.keyCode);
		if(event.keyCode ==13){
			if(flag ==0){
				luckDraw();
				flag = 1;
		    }else{
				stopLuck();
				flag = 0;
		    }
	    }
	};
};

function luckDraw(){
	var title = document.getElementById('title'),
	    start = document.getElementById('start');
	clearInterval(timer);//解决下面问题，再次按它时清除上一次的计时器。
//点击的越快数组项转换的越快，按得越多，计时器越多。
	timer = setInterval(function(){
		var random = Math.floor(Math.random()*data.length);
		title.innerHTML = data[random];
	},50);
	start.style.backgroundColor = "#999";
}

function stopLuck(){
	clearInterval(timer);
	var start = document.getElementById('start');
	start.style.backgroundColor = '#036';
}