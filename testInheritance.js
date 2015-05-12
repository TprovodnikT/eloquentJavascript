function Animal(type){
	this.type = type;
} 
Animal.prototype.eat = function () {
	console.log("this", this.type, "likes eat");
}
function Rabbit (name) {
	Animal.call(this, "milkeaters");
	this.name = name;
}
// Rabbit.prototype = Object.create(Animal.prototype);

Rabbit.prototype.dance = function () {
	console.log("like mick jagger dancing", this.name);
}

var whiteRabbit = new Rabbit("black");
whiteRabbit.eat();
whiteRabbit.dance();