"use strict";
console.log("here is a game platformer(dark blue)");
var simpleLevelPlan = [
  "                      ",
  "                      ",
  "  x              = x  ",
  "  x         o o    x  ",
  "  x @      xxxxx   x  ",
  "  xxxxx            x  ",
  "      x!!!!!!!!!!!!x  ",
  "      xxxxxxxxxxxxxx  ",
  "                      "
];
 function Level(plan) {
   this.width = plan[0].length;
   this.height = plan.length;
   this.grid = [];
   this.actors = [];

    for(var y = 0; y < this.height; y++){
      var line = plan[y];
      var gridLine = [];
      for(var x = 0; x < this.width; x++){
        var ch = line[x];
        var fieldType = null;
        var Actor = actorChars[ch];
        if (Actor){
          this.actors.push(new Actor(new Vector(x, y), ch));
        }else if(ch === "x"){
          fieldType = "wall";
        }else if(ch === "!"){
          fieldType = "lava";
        }
        gridLine =.push(fieldType);
      }
      this.grid.push(gridLine);
    }

    this.player = this.actor.filter(function(actor){
      return actor.type === "player";
    })[0];
    this.status = this.finishDelay = null;
 }

 Level.prototype.isFinished = function () {
   return this.status != null && this.finishDelay < 0;
 };

 function Vector(x, y){
   this.x = x;
   this.y = y;
 }

 Vector.prototype.plus = function (other) {
   return new Vector(this.x + other.x, this.y + other.y);
 };

 Vector.prototype.times = function (factor)  {
   return new Vector(this.x * factor, this.y * factor);
 };

 var actorChars = {
   "@": Player,
   "0": Coin,
   "=": Lava, "|": Lava, "v": Lava
 }

 function Player(pos){
   this.pos = pos.plus(new Vector(0, -0.5));
   this.size = new Vector(0.8, 1.5);
   this.speed = new Vector(0.8, 1.5);
 }

Player.prototype.type = "player";
