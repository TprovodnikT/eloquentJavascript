"use strict";
function InputError (text) {
	this.text = text;
	this.stack = (new Error()).stack;
}
InputError.prototype = Object.create(Error.prototype);
InputError.prototype.name = "InputError";

function promptDirection (question) {
	var result = prompt(question, "");
	if(result.toLowerCase() === "right"){
		return "R";
	}else if(result.toLowerCase() === "left"){
		return "L";
	}
	throw new InputError("Something is wrong with "+result);
}
function look () {
	var dir = promptDirection("Where?");
	if(dir === "L"){
		return "home";
	}else{
		return "two fury bears";
	}
}
/*for(;;){
	try{
		console.log("You see: ", loko());
		break;
	}catch(e){
		if(e instanceof InputError){
			console.log("Bad values. Try again!!!");
		}else{
			throw e;
		}
	}
}*/
function AssertionFailed (msg) {
	this.msg = msg;
}
AssertionFailed.prototype = Object.create(Error.prototype);
function assert (test, msg) {
	if(!test){
		throw new AssertionFailed(msg);
	}
}
function lastElementOfArray (arr) {
	assert(arr.length > 0, "Empty array");
	return arr[arr.length-1];
}
//HOME word-break:
//=========================================
function MultiplicatorUnitFailure () {}
function primitiveMultiply (a, b) {
	var x = Math.random();
	console.log(x)
	if(x > 0.5){
		return a * b;
	}
	throw new MultiplicatorUnitFailure();
}
function reliableMultiply (a, b) {
	for(;;){
		try{
			return primitiveMultiply(a, b);
		}catch(e){
			if(e instanceof MultiplicatorUnitFailure){
				console.log("Multiplication fails");
			}else{
				console.log("Not handled error");
			}
		}
	}
}
// console.log(reliableMultiply(8, 8));
//Locked Box
var box = {
	locked: true,
	lock:function () {
		this.locked = true;
	},
	unlock: function () {
		this.locked = false;
	},
	_content: [],
	get content() {
		if(this.locked){
			throw new Error("Is locked");
		}
		return this._content;
	}
}
// box.unlock();
function withBoxUnlocked (body) {
	var firstState = box.locked;
	try{
		if(firstState){
			box.unlock();
		}
		body();
	}catch(e){
		console.log("Something went wrong!"+e);

	}finally{
		firstState? box.lock(): box.unlock();
	}
}

withBoxUnlocked(function() {
  box.content.push("золотишко");
});
try {
  withBoxUnlocked(function() {
    throw new Error("Пираты на горизонте! Отмена!");
  });
} catch (e) {
  console.log("Произошла ошибка:", e);
}
console.log(box.locked)
//=========================================