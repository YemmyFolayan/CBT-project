var $me= {};
(function (window, document) {
//creating a object extender
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
//function dat selects any random letter
function randomly(MAX){
	var alpha = ["a","b","c","d","e","f","g","h","i","j"];
	return alpha[Math.floor(Math.random() * MAX)];
}
var list= [], write= "random ";
(function (){
	for(var ii= 0; ii<5; ii+=1){
		list[ii]= randomly(10);
		if(ii%2 !== 0){
			list[ii] = list[ii].toUpperCase();
		}
		write += list[ii] + " ";
	}
})();

$me.mixin = function (target,source, method){
	if(!arguments[2]){
		console.log("no method passed");
		return;
	}
	for(var ii = 2, ll= arguments.length; ii <ll; ii++){
		var prop = arguments[ii];
		if (!target[prop] && source.hasOwnProperty(prop)){
			target[prop] = source[prop];
		}
	}
	return target;
};
var popUp = function(){
	if(hasClass(this.firstChild, "activate")){
		//remove the class
		removeClass(this.firstChild,"activate");
		//use the addClass function to add a class
		addClass(this.firstChild, "deactivate");
	}
	else{
		removeClass(this.firstChild, "deactivate");
		//check to know if there us any other class in the displayed document
		//or in the elem & if there is deactivate it
		activeClassRemov(this);
		addClass(this.firstChild,"activate");
	}	
};
})(window, document);
function best(){
	be.call(this);
}
best.prototype = Object.create(be.prototype);
var obj = {};
function be(){
	this.p= "read";
}
be.prototype.m = "up";
var b= new be();
$me.mixin(obj,b,"p");
