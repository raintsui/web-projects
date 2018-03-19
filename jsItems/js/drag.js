/*构造根据类名来获得元素的方法
因为在IE10之前不支持document.getElementsByClassName
*/
/*基本思路，1.有父元素Id就先获取父元素不然直接document
2.设置eles为数组
3.获取父级的所有子元素
4.遍历这些子元素，符合类名是要求的则加入到eles中（push方法）
*/
function getByClassName(className,parent){
	var oParent = parent?document.getElementById(parent):document,
	elems=[],
	elements=oParent.getElementsByTagName('*');
		for(var i=0,len=elements.length;i<len;i++){
		if(elements[i].className==className){
			elems.push(elements[i]);
		}
	}
	return elems;
}

window.onload=drag;

/*鼠标事件都是在浏览器窗口的特定位置上发生的，这个位置信息保存在事件的clientX和clientY属性中，所有浏览器都支持这两个属性。
两者的值表示事件发生时鼠标指针在视口中水平位置和垂直坐标。不包括压面滚动的距离。
*/


 //获取鼠标按下的区域
function drag(){
	var oTitle = getByClassName('login_logo_webqq','loginPanel')[0];
	
	//拖曳
	oTitle.onmousedown=fnDown;
	//按钮关闭
	var oClose = document.getElementById('ui_boxyClose');
	oClose.onclick = function(){
		document.getElementById('loginPanel').style.display = "none";
	};
	//登录状态选择
	var loginState = document.getElementById('loginState');
	var loginState_txt = document.getElementById('login2qq_state_txt');
	var loginState_show = document.getElementById('loginStateShow');
	var stateList = document.getElementById('loginStatePanel');
	var lis = stateList.getElementsByTagName('li');
    //显示状态面板
    loginState.onclick = function(e){
    	e = e ||window.event;
    	if(e.stopPropagation){
    		e.stopPropagation();
    	}else if(e.cancelBubble){
    		e.cancelBubble = true;
    	}
    	stateList.style.display = "block";
    };
    //鼠标滑过、点击、离开状态列表时
    //对列表遍历
   for(var i = 0,l=lis.length;i<l;i++){
   	lis[i].onmouseover = function(){
   		this.style.backgroundColor = "#567";
   	};
   	lis[i].onmouseout = function(){
   		this.style.background = "#fff";
   	};
   	lis[i].onmousedown = function(e){
   		//替换状态内容
   		var id = this.id;
   		loginState_txt.innerHTML = getByClassName('stateSelect_text',id)[0].innerHTML;//应该是这里用了html DOM，才会出现黄色标点。
        loginState_show.className = '';
        loginState_show.className = 'login-state-show '+id;
        //隐藏列表
        e = e ||window.event;
        if(e.stopPropagation){
        	e.stopPropagation();
        }else if(e.cancelBubble){
        	e.cancelBubble = true;
        }
        stateList.style.display = "none"; 
    };
   }
	document.onclick = function(){
		stateList.style.display = "none";
	};

}

//目的区域按下鼠标
function fnDown(e){
	e = e || window.event;
	var oDrag = document.getElementById('loginPanel'),
	disX = e.clientX - oDrag.offsetLeft,
	disY = e.clientY - oDrag.offsetTop;
//移动
	document.onmousemove = function(event){ 
		e = event||window.event;//为什么这里还要弄一个闭包来包含fnMove函数。
		fnMove(e,disX,disY);
	};

	 /*这里是document，因为鼠标移动时是在文档这个区域作用的，
	 且这里的变量oDrag,oTitle必须在此重新定义，因为函数作用域问题，
	 该函数没有被包含在drag()函数中。*/  //由于这个问题导致我出错了。

//松开鼠标
    document.onmouseup= function(){
    	document.onmousemove =null;
    	document.onmouseup= null;
    };
}

//鼠标移动位置函数
function fnMove(e,disX,disY){
	var oDrag = document.getElementById('loginPanel');
	var w = e.clientX-disX,
	    h = e.clientY-disY,

	    winW = document.documentElement.clientWidth || document.body.clientWidth,
	    maxW = winW-oDrag.offsetWidth,
	    winH = document.documentElement.clientHeight || document.body.clientHeight - oDrag.offsetHeight,
	    maxH = winH-oDrag.offsetHeight;

	if(w<0){
		w = 0;
	}else if(w>maxW-10){
		w = max -10;
	}
	if(h<10){
		h=10;
	}else if(h>maxH){
		h=maxH;
	}

	oDrag.style.left= w+"px";
	oDrag.style.top =h+"px";

}


