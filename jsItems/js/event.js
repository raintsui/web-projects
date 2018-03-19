//跨浏览器事件处理程序+事件对象
var EventUtil = {
			addHandler:function(element,type,handler){
				if(element.addEventListener){
					element.addEventListener(type,handler,false);
				} else if(element.attachEvent){
					element.attachEvent("on"+type,handler);
				  }else{
				  	element["on"+type]=handler;
				  }
			},
			removeHandler:function(element,type,handler){
				if(element.removeEventListener){
					element.process.removeListener(type, handler);
				}else if(element.detachEvent){
					element.detachEvent("on"+type,handler);
				}else{
					element["on"+type]=null;
				}
			},
			getEvent:function(event){
				return event?event:window.event;
			},
			getType:function(){
				return event.type;
			},
			getElement:function(event){
				return event.target || event.srcElement;

			},
			preventDefault:function(event){
				if(event.preventDefault){
					event.preventDefault();
				}else{
					event.returnValue=false;
				}
			},
			stopPropagation:function(event){
				if(event.stopPropagation){
					event.stopPropagation();
				}else{
					event.cancelBubble();//cancelBubble只能取消事件冒泡，而stopPropagation取消事件冒泡和事件冒泡。
				}
			}
		};