/*
Thanking God for all he as done in bringing me this far.

*/

(function(w,d,$){
	// begining of main function
	// set a default parameter
	var $me= {};
	$me.extend= function (target){
	if(!arguments[1]){
		console.log(" no object to extend");
		return;
	}
	for(var ii= 1,ll= (arguments.length);ii<ll; ii++){
		var source= arguments[ii];
		for(var prop in source){
			if(target[prop]===undefined && source.hasOwnProperty(prop)){
				target[prop] = source[prop];
			}
		}
		return target;
	}
};
var	defaultParams = {
        title: '',
        text: '',
        type: null,
        allowOutsideClick: false,
        showCancelButton: true,
        closeOnConfirm: true,
        closeOnCancel: true,
        confirmButtonText: 'OK',
		confirmCallback: null,
        confirmButtonColor: '#AEDEF4',
        cancelButtonText: 'Cancel',
		cancelButtonColor: "#eee",
        imageUrl: null,
		overlayBg: null,
        imageSize: null,
        timer: null
      };
	  //manipulation dom
	var hasClass= function(elemh, classN){
		var reg = new RegExp(" "+ classN+" ");
		return reg.test(" "+ elemh.className +" ");
	},
	addClass= function(elema, classN){
		if(!hasClass(elema, classN)){
			elema.className+= " " +classN;
		}
	},
	    stopEventPropagation = function(e) {
      // In particular, make sure the space bar doesn't scroll the main window.
      if (typeof e.stopPropagation === 'function') {
        e.stopPropagation();
        e.preventDefault();
      } else if (window.event && window.event.hasOwnProperty('cancelBubble')) {
        window.event.cancelBubble = true;
      }
    },
	removeClass = function(elem,className){
		
			var newClass = ' ' + elem.className.replace(/[\t\r\n]/g, ' ') + ' ';
      if (hasClass(elem, className)) {
        while (newClass.indexOf(' ' + className + ' ') >= 0) {
          newClass = newClass.replace(' ' + className + ' ', ' ');
        }
        elem.className = newClass.replace(/^\s+|\s+$/g, '');
     
		}
	},
	changeClass= function(elem,remove,replace){
		removeClass(elem, remove);
		addClass(elem,replace);
	},
	isDecendant= function(parent, child){
		var node =child.parentNode;
		while(node!= null){
			if(node == parent){
				return true;
			}
			node= node.parentNode;
		}
		return false;
	},
modal = ".smart-alert",
getModal = function(){
return 	document.querySelector(modal);
},
overlay = ".overlay",
getOverlay= function(){
	return document.querySelector(overlay);
};
window.smartAlertInisialization = function(){
	
	 var div = document.createElement("div");
	 var divWraped=  '<div class="overlay hidden" tabIndex="-1"></div><div class="smart-alert" tabIndex="-1"><div class="icon error"><span class="x-mark"><span class="line left"></span><span class="line right"></span></span></div><div class="icon warning"> <span class="body"></span> <span class="dot"></span> </div> <div class="icon info"></div> <div class="icon success"> <span class="line tip"></span> <span class="line long"></span> <div class="placeholder"></div> <div class="fix"></div> </div> <div class="icon custom"></div> <h2>Title</h2><p>Text</p><div class="button"><button class="hidden cancel" tabIndex="2">Cancel</button><button class="confirm" tabIndex="1">OK</button></div></div>';
       div.innerHTML= divWraped;
	   document.body.appendChild(div);
 };
 
 // window.smartAlert 
 

window.smartAlert = function(){
	if(getModal()){
		closeModal();
	}
	//create the alert body

	var	cancelButton= getModal().querySelector("button.cancel"),
		confirmButton = getModal().querySelector("button.confirm");

	var arg= arguments;
	if(!arg[0]){
		console.log("no arguments placed in smartAlert");
		return;
	}
	//extending the param Object with extend function
var v = {};
	var param = $me.extend(v, defaultParams);
	if(typeof arg[0] == "string"){
		param.title =  arg[0];
		param.text =arg[1]|| "";
		param.type = arg[2] || "";
		
	}
	else if(typeof arg[0] == "object"){
		if (arg[0].title == "underfined"){
			console.log("title missing in argument");
			return;
		}
		param.title = arg[0].title;
		param.text = arg[0].text || defaultParams.text;
		param.type = arg[0].type || defaultParams.type;
		param.allowOutsideClick  = arguments[0].allowOutsideClick || defaultParams.allowOutsideClick;
        param.showCancelButton   = arguments[0].showCancelButton !== undefined ? arguments[0].showCancelButton : defaultParams.showCancelButton;
        param.closeOnConfirm     = arguments[0].closeOnConfirm !== undefined ? arguments[0].closeOnConfirm : defaultParams.closeOnConfirm;
        param.closeOnCancel      = arguments[0].closeOnCancel !== undefined ? arguments[0].closeOnCancel : defaultParams.closeOnCancel;
        param.timer              = arguments[0].timer || defaultParams.timer;
		param.confirmCallback  	 = arguments[0].confirmCallback;

        // Show "Confirm" instead of "OK" if cancel button is visible
        param.confirmButtonText  = (defaultParams.showCancelButton) ? 'Confirm' : defaultParams.confirmButtonText;
        param.confirmButtonText  = arguments[0].confirmButtonText || defaultParams.confirmButtonText;
        param.confirmButtonColor = arguments[0].confirmButtonColor || defaultParams.confirmButtonColor;
        param.cancelButtonText   = arguments[0].cancelButtonText || defaultParams.cancelButtonText;
        param.imageUrl           = arguments[0].imageUrl || defaultParams.imageUrl;
        param.imageSize          = arguments[0].imageSize || defaultParams.imageSize;
        param.doneFunction       = arguments[1] || null;
		param.overlayBg 		= arg[0].overlayBg || defaultParams.overlayBg;
	}
	else{
		console.log("unexpected error");
	}
	//event for smart alert
  var onButtonEvent = function(event){
		var e = event || window.event;
		var target = e.target || e.srcElement,
		targetConfirm = (target.className === "confirm"),
		targetCancel= hasClass(target,"cancel"),
		modalIsVisible = hasClass( target, "visible");
			
		switch(e.type){
			case ("mouseover"):
				if (targetConfirm){
				
					target.style.backgroundColor= "#ff0000";
					}
			break;
			case("mouseout"):
					if(targetConfirm){
					target.style.backgroundColor = "none";
					}
			break;
			case ("focus") :
				var $confirmButton = getModal().querySelector("button.confirm"),
				$cancelButton = getModal().querySelector("button.cancel");
				if (targetConfirm){
					$cancelButton.style.boxShadow = "none";
				}
				else{
					$confirmButton.style.boxShadow = "none";
				}
			break;
			case ("click"):
				if(targetConfirm){
					if(param.confirmCallback){
						param.confirmCallback();
					}
					if(param.closeOnConfirm){
					closeModal();
					}
				}
				else if (param.closeOnCancel && targetCancel){
					closeModal();
				}
				stopEventPropagation(e);
			break;
			
		}
		
	};
//	var onKeyEvent = function(event){
//		var e = event ||window.event,
//		keyCode = e.keyCode || e.which,
//		btnIndex= -1;
//		target = e.target || e.srcElement;
//		if([9,13,32,27].indexOf(keyCode)===-1){
//			//have nothing to do with the other keys
//			return;
//		}
//		for(var i=0; i<button.length;i+=1){
//			if(target == button[i]){
//				btnIndex = i;
//				break;
//			}
//		}
//		switch(keycode){
//			case (13):
//				if(btnIndex ===-1){
//					target = confirmButton;
//				}
//			break;
//			case (9):
//				
//			break;
//		}
//	};
		var bi = document.querySelector(modal);
		bi.onclick= onButtonEvent;
	var	button = bi.querySelectorAll("button");
		for (var ii = 0; ii< button.length; ii++){
			button[ii].onclick = onButtonEvent;
			button[ii].onmouseout = onButtonEvent;
			
		}
		//visiblity of the cancelButton
		if (param.showCancelButton){
			// make button visible
			changeClass(cancelButton, "hidden", "visible");
		}
		//style sheet for the modal and its child element
		var csstext= {
			width: function(){
				return innerWidth*0.8;
			},
			left: function(){
				return (innerWidth- csstext.width())/2;
			} ,
			height: function(){
				return (innerHeight * 0.8);
			},
			top: function(){
				return (innerHeight - csstext.height())/2;
			},
			fontSize: function(){
				if(csstext.width()< csstext.height()){
				return 15 * (csstext.width()/260)+"px";
				}
				else{
					return 15 * (csstext.height()/260)+"px";
				}
			},
			zIndex: "999",
			padding : function(){
				return "5%";
			},
		
		},
	
		csstextOverlay={
			width: function(){
				return window.clientWidth;
			} ,
			height: function(){
				return window.clientHeight;
			}
		},
		button= {
			
		};
			var expand= function(elem,time){
				$(elem).show();
			var	t= time/10,
				wd = csstext.width()/10,
				hg = csstext.height() /10,
				wi = 0,
				c=1,
				hi= 0,
				fun= function(){
					wi+= wd;
					hi+= hg;
				var	li =function(){
						return (innerWidth-wi)/2;
					},
					ti= function(){
						return (innerHeight-hi)/2;
					};
					$(elem).css({width:wi,height:hi,left:li,top:ti});
					c++;
						if(c<=10){
				setTimeout(fun,t);
				}
				};
				
			fun();
			};
		var created;
		var openModal= function(){
			created= new Date();
			created= created.getTime();
			removeClass(getOverlay(), "hidden");
			$(modal).hide();
			$(modal).css(csstext);
			$(overlay).css(csstextOverlay);
			addClass(getOverlay(),"visible");
			expand(modal, 200);
			if(param.timer !== null && param.timer!==""){
				setTimeout(closeModal, param.timer);
			}
					
			
		};
		function closeModal(){
			$(modal).fadeOut(150);
			
			removeClass(getOverlay(), "visible");
			addClass(getOverlay(),"hidden");
	
		};
		
		openModal();
		window.onresize = function(){
			$(modal).css(csstext);
		};
		//contol clicks outside the modal
		function outsideClick(event){
				var e= event || window.event,
				target= e.target || e.srcElement,
				isModal= (target == getModal()),
				ModalIsVisible= hasClass(getOverlay(), "visible"),
				isDecendantOfModal= isDecendant(getOverlay(), target);
				if(!isModal && ModalIsVisible && !isDecendantOfModal && !param.allowOutsideClick ){
						var finished= new Date();
					finished= finished.getTime();
					var time= finished - created;
				if(time>2000){
					closeModal();
				}
				}
				
		};
		//this prevent outside events
		function preventOutsideEvent(event){
			var e = event|| window.event,
			target= e.target ||	e.srcElement,
			isDecendantOf= isDecendant(getModal(),target),
			isVisible= hasClass(getOverlay(),"visible");
			if(!isDecendantOf && isVisible){
			stopEventPropagation(e);		
			}
			
			
		};
		document.ontouchmove= preventOutsideEvent;
		document.onclick = outsideClick;
		document.onscroll= preventOutsideEvent;
		
//sets the value for title, text and type	
	var setTitle= $(modal+" h2"),
	setText= $(modal+" p");
	setTitle.html(param.title);
	setText.html(param.text);
	
	
	//end of window.smartAlert
};
//begining of cssSetter
var cssSetter =function(elem, style){
	elem.style.cssText = style;
	//end of cssSetter
};
//
    
			(  function () {
	  if (document.readyState === "complete" || document.readyState === "interactive" && document.body) {
		  window.smartAlertInisialization();
		  
	  } else {
		  if (document.addEventListener) {
			  document.addEventListener('DOMContentLoaded', function factorial() {
				  document.removeEventListener('DOMContentLoaded', arguments.callee, false);
				  window.smartAlertInisialization();
			  }, false);
		  } else if (document.attachEvent) {
			  document.attachEvent('onreadystatechange', function() {
				  if (document.readyState === 'complete') {
					  document.detachEvent('onreadystatechange', arguments.callee);
					  window.smartAlertInisialization();
				  }
			  });
		  }
	  }
  })();
			  
// end of main function
}(window,document,jQuery));
