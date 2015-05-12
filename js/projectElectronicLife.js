"use strict";
function Vector(x, y){
	this.x = x;
	this.y = y;
};
Vector.prototype.plus = function(v1){
	return new Vector(this.x + v1.x, this.y + v1.y);
};
Vector.prototype.minus = function(v1){
	return new Vector(this.x - v1.x, this.y - v1.y);
};

function Grid(width, height){
	this.width = width;
	this.height = height;
	this.space = new Array(width * height);
};

Grid.prototype.isInside = function(vector){
	return vector.x > 0 && vector.y > 0 
		&& vector.x < this.width && vector.y < this.height; 
};

Grid.prototype.get = function(vector){
	// console.log("HERE", this.space[vector.x, vector.y * this.width]);
	return this.space[vector.x + vector.y * this.width];
};

Grid.prototype.set = function(vector, value){
	this.space[vector.x + vector.y * this.width] = value;
};

Grid.prototype.forEach = function(f, context) {
  for (var y = 0; y < this.height; y++) {
    for (var x = 0; x < this.width; x++) {
      var value = this.space[x + y * this.width];
      if (value != null)
        f.call(context, value, new Vector(x, y));
    }
  }
};

//==============
//simple test
var grid = new Grid(5, 5);
console.log(grid.get(new Vector(1,1)));
grid.set(new Vector(1,1), "X");
console.log(grid.get(new Vector(1,1)));
//==============

var directions = {
	"n" : new Vector(0, -1),
	"ne" : new Vector(1, -1),
	"e" : new Vector(1, 0),
	"se" : new Vector(1, 1),
	"s" : new Vector(0, 1),
	"sw" : new Vector(-1, 1),
	"w" : new Vector(-1, 0),
	"nw" : new Vector(-1, -1)
}
function randomElement (array) {
	return array[Math.floor(Math.random() * array.length)];
}
// var directionNames = "n ne e es s sw w nw".split(" ");

function BouncingCritter () {
	this.direction = randomElement(Object.keys(directions));
}

BouncingCritter.prototype.act = function (view) {
	if(view.look(this.direction) != " "){
		this.direction = view.find(" ") || "s";
	}
	return {type: "move", direction: this.direction};
}

function elementFromChar (legend, ch) {
	if(ch === " "){
		return null;
	}
	var element = new legend[ch]();
	element.originChar = ch;
	return element;
}

function World (map, legend) {
	var grid = new Grid(map[0].length, map.length);
	this.grid = grid;
	this.legend = legend;
	map.forEach(function(row, y) {
		for (var x = 0; x < row.length; x++) {
			grid.set(new Vector(x, y), elementFromChar(legend, row[x]));
		};
	});
}

function charFromElement (element) {
	if(element === null){
		return " ";
	}
	return element.originChar;
}
World.prototype.toString = function () {
	var res = "";
	for (var y = 0; y < this.grid.height; y++) {
		for (var x = 0; x < this.grid.width ; x++) {
			res += charFromElement(this.grid.get(new Vector(x, y)));
		};
		res += "\n";
	};
	return res;
}
function Wall () {}

var plan = ["############################",
            "#      #    #      o      ##",
            "#                          #",
            "#          #####           #",
            "##         #   #    ##     #",
            "###           ##     #     #",
            "#           ###      #     #",
            "#   ####                   #",
            "#   ##       o             #",
            "# o  #         o       ### #",
            "#    #                     #",
            "############################"];
var world = new World(plan, {"o": BouncingCritter, "#": Wall});
var newWorld = new World(
  ["############",
   "#     #    #",
   "#   ~    ~ #",
   "#  ##      #",
   "#  ##  o####",
   "#          #",
   "############"],
  {"#": Wall,
   "~": WallFollower,
   "o": BouncingCritter}
);
// console.log(world);
console.log(newWorld.toString());
console.log(world.toString());
World.prototype.turn = function () {
	var acted = [];
	this.grid.forEach(function (critter, vector) {
		if(critter.act && acted.indexOf(critter) == -1){
			acted.push(critter);
			this.letAct(critter, vector);
		}
	}, this);
}
World.prototype.letAct = function (critter, vector) {
	var action = critter.act(new View(this, vector));
	if(action && action.type == "move"){
		var dest = this.checkDestination(action, vector);
		if(dest && this.grid.get(dest) == null) {
			this.grid.set(vector, null);
			this.grid.set(dest, critter);
		}
	}
}

World.prototype.checkDestination = function (action, vector) {
	if(directions.hasOwnProperty(action.direction)){
		var dest = vector.plus(directions[action.direction]);
		if(this.grid.isInside(dest)){
			return dest;
		}
	}
};
function View (world, vector) {
	this.world = world;
	this.vector = vector;
}
View.prototype.look = function (dir) {
	var target = this.vector.plus(directions[dir]);
	if(this.world.grid.isInside(target)){
		return charFromElement(this.world.grid.get(target));
	}else{
		return "#";
	}
}
View.prototype.findAll = function (ch) {
	// if(ch === "*") console.log("it is", ch);
	var found = [];
	for(var dir in directions){
		if(this.look(dir) === ch+""){
			found.push(dir);
		}
	}
	return found;
}
View.prototype.find = function (ch) {
	var found = this.findAll(ch);
	if(found.length === 0){
		return null;
	}
	return randomElement(found);
}

// console.log(dirPlus("n", -2));
// console.log("directions", directions);
//=================================
var stop = false;
var myInterval = [];
function startAndStop(n) {
	var inWorld;
	var containerId;
	var buttonId;
	if(n === 1){
		inWorld = world;
		containerId = "animatedViewWorld";
		buttonId = "stOrF1";
	}else if(n === 2){
		inWorld = newWorld;
		containerId = "animatedViewNewWorld";
		buttonId = "stOrF2";
	}else if(n === 3){
		inWorld = valley;
		containerId = "animatedViewLikeWorld";
		buttonId = "stOrF3";
	}else if(n === 4){
		inWorld = homeWorkWold;
		containerId = "animatedViewHomeWorkWorld";
		buttonId = "stOrF4";
	}
	console.log(inWorld.toString());
	var divStop = document.getElementById(buttonId);
	// divStop.innerHTML
	if(stop){
		myInterval[n] = window.setInterval(function(){
			inWorld.turn();
			animatedView(inWorld, containerId);
		}, 100);
		divStop.innerHTML = "Stop";
	}else{
		window.clearInterval(myInterval[n]);
		divStop.innerHTML = "Start";
	}
	stop = !stop;
}
function animatedView (thisWorld, containerId) {
	var div = document.getElementById(containerId);
	div.innerHTML = thisWorld.toString();
}
//=================================
function dirPlus (dir, n) {
	var dirIndex = Object.keys(directions).indexOf(dir);
	// console.log(Object.keys(directions));
	// console.log("dirIndex",dirIndex);
	return Object.keys(directions)[(dirIndex + n +8) % 8]
}
function WallFollower () {
	this.dir = "s";
}
WallFollower.prototype.act = function(view){
	var start = this.dir;
	if (view.look(dirPlus(this.dir, -3)) !== " "){
		start = this.dir = dirPlus(this.dir, -2);
	}
	while (view.look(this.dir) != " "){
		this.dir = dirPlus(this.dir, 1);
		if(this.dir === start) break;
	}
	return {type: "move", direction: this.dir};
}

function LifeLikeWorld(map, legend){
	World.call(this, map, legend);
}
LifeLikeWorld.prototype = Object.create(World.prototype);

var actionTypes = Object.create(null);

LifeLikeWorld.prototype.letAct = function (critter, vector) {
	var action = critter.act(new View(this, vector));
	var handled = action && action.type in actionTypes &&
		actionTypes[action.type].call(this, critter, vector, action);
		if(!handled) {
			critter.energy -= 0.2;
			if (critter.energy <= 0){
				this.grid.set(vector, null);
			}
		}
};

actionTypes.move = function (critter, vector, action) {
	var dest = this.checkDestination(action, vector);
	if(dest == null 
		|| critter.energy <= 1 
		|| this.grid.get(dest) != null){
		return false;
	}
	critter.energy -= 1;
	this.grid.set(vector, null);
	this.grid.set(dest, critter);
	return true;
};

actionTypes.eat = function(critter, vector, action) {
	var dest = this.checkDestination(action, vector);
	var atDest = dest != null && this.grid.get(dest);
	if(!atDest || atDest.energy == null){
		return false;
	}
	critter.energy += atDest.energy;
	this.grid.set(dest, null);
	return true;
};
actionTypes.grow = function (critter) {
	critter.energy += 0.5;
	return true;
}
actionTypes.reproduce = function (critter, vector, action) {
	var baby = elementFromChar(this.legend, critter.originChar);
	var dest = this.checkDestination(action, vector);
	if(dest == null || 
		critter.energy <= 2* baby.energy ||
		this.grid.get(dest) != null
	){
		return false;
	}
	critter.energy -= baby.energy * 2;
	this.grid.set(dest, baby);
	return true;
};

function Plant () {
	this.energy = Math.random() * 4 + 3;
}
Plant.prototype.act = function (context) {
	if(this.energy > 15) {
		var space = context.find(" ");
		if(space){
			return {type: "reproduce", direction: space};
		}
	}
	if(this.energy < 20){
			return {type: "grow"};
	}
}

function PlantEater () {
	this.energy = 20;
}
PlantEater.prototype.act = function (context) {
	var tiger = context.find("@");
	var space = context.find(" ");
	if(tiger){
		return {type: "move", direction: space}
	}
	if(this.energy > 60 && space){
		return {type: "reproduce", direction: space};
	}
	var plant = context.find("*");
	if(plant){
		return {type: "eat", direction: plant};
	}
	if(space){
		return {type: "move", direction: space};
	}
}

function Tiger () {
	this.energy = 80;
}
Tiger.prototype.act = function (context) {
	var plantEater = context.find("O");
	var space = context.find(" ");
	if(plantEater){
		return {type: "eat", direction: plantEater};
	}
	if(this.energy > 80 && space){
		return {type: "reproduce", direction: space};
	}
	if(space){
		return {type: "move", direction: space};
	}
}
// console.log("valley", valley);
var homeWorkWold = new LifeLikeWorld(
  ["####################################################",
   "#                 ####         ****              ###",
   "#   *  @  ##                 ########       OO    ##",
   "#   *    ##        O O                 ****       *#",
   "#       ##*                        ##########     *#",
   "#      ##***  *         ****                     **#",
   "#* **  #  *  ***      #########                  **#",
   "#* **  #      *               #   *              **#",
   "#     ##              #   O   #  ***          ######",
   "#*            @       #       #   *        O  #    #",
   "#*                    #  ######                 ** #",
   "###          ****          ***                  ** #",
   "#       O                        @         O       #",
   "#   *     ##  ##  ##  ##               ###      *  #",
   "#   **         #              *       #####  O     #",
   "##  **  O   O  #  #    ***  ***        ###      ** #",
   "###               #   *****                    ****#",
   "####################################################"],
  {"#": Wall,
   "@": Tiger,
   "O": PlantEater, // из предыдущего упражнения
   "*": Plant}
);
var valley = new LifeLikeWorld(
  ["############################",
   "#####                 ######",
   "##   ***                **##",
   "#   *##**         **  O  *##",
   "#    ***     O    ##**    *#",
   "#       O         ##***    #",
   "#                 ##**     #",
   "#   O       #*             #",
   "#*          #**       O    #",
   "#***        ##**    O    **#",
   "##****     ###***       *###",
   "############################"],
  {"#": Wall,
   "O": PlantEater,
   "*": Plant}
);

/*var valley = new LifeLikeWorld(
["############################",
"############################",
"############################",
"######################O#####",
"#############O##############",
"########O###################",
"############################",
"####O#######################",
"######################O#####",
"####################O#######",
"############################",
"############################"],
  {"#": Wall,
   "O": PlantEater,
   "*": Plant}
);*/
/*setInterval(function(){
	// global.clear();
			valley.turn();
			console.log(valley.toString());
		}, 300);*/