"use strict";
function TextCell(text){
	this.txt = text.split("\n");
}
TextCell.prototype.minHeight = function(){
	return this.txt.length;
}

TextCell.prototype.minWidth = function(){
	return this.txt.reduce(function(curr, line){
		return Math.max(curr, line.length);
	}, 0)
}
TextCell.prototype.draw = function(width, height){
	var res = [];
	for(var i = 0; i < height; i++){
		var line = this.txt[i]||"";
		res.push(line + repeat(" ",width-line.length));
	}
	return res;
}

/*var txtCell = new TextCell("asda\nsda\nsdasd");
console.log(txtCell.minWidth());
console.log(txtCell.minHeight());*/
function getColWidths(rows){
	return rows[0].map(function(_, i){
		return rows.reduce(function(width, row){
			return Math.max(width, row[i].minWidth());
		}, 0);
	})
}
function getRowHeights(rows){
	return rows.map(function(row){
		return row.reduce(function(height, elem){
			return Math.max(height, elem.minHeight());
		}, 0);
	})
}
var arr = [
	["1234\n1234567\n1", "1\n1\n1", "12"],
	["12\n1", "123123123", "32123"]
]
arr = arr.map(function(row){
	return row.map(function(elem){
		return new TextCell(elem);
	})
})
// console.log(arr);
// console.log(getRowHeights(arr));
// console.log(getColWidths(arr));

function repeat(string, times){
	var res = "";
	for(var i = 0; i < times; i++){
		res += string;
	}
	return res;
}

function drawTable(rows){
	var heights = getRowHeights(rows);
	var widths = getColWidths(rows);

	function drawLine(blocks, lineNo){
		return blocks.map(function(block){
			return block[lineNo];
		}).join(" ");
	}
	function drawRow(row, rowNum){
		var blocks = row.map(function(cell, colNum){
			return cell.draw(widths[colNum], heights[rowNum]);
		});
		return blocks[0].map(function(_, lineNo){
			return drawLine(blocks, lineNo);
		}).join("\n");
	}
	return rows.map(drawRow).join("\n");
}
//=============================
/*var rows = [];
for (var i = 0; i < 5; i++) {
   var row = [];
   for (var j = 0; j < 5; j++) {
     if ((j + i) % 2 == 0)
       row.push(new TextCell("##"));
     else
       row.push(new TextCell("  "));
   }
   rows.push(row);
}
console.log(drawTable(rows));*/

function UnderlinedCell(inner){
	this.inner = inner;
}
UnderlinedCell.prototype.minWidth = function(){
	return this.inner.minWidth();
}
UnderlinedCell.prototype.minHeight = function(){
	return this.inner.minHeight()+1;
}
UnderlinedCell.prototype.draw = function(width, height){
	return this.inner.draw(width, height-1).concat([repeat("-", width)]);
}
function dataTable(data){
	var keys = Object.keys(data[0]);
	var headers = keys.map(function(key){
		return new UnderlinedCell(new TextCell(key));
	});
	var body = data.map(function(row){
		return keys.map(function(key){
			var value = row[key];
			if(typeof value == "number"){
				return new RTextCell(String(row[key]));
			}
			return new TextCell(String(row[key]));

		})
	});
	return [headers].concat(body);
}
var pile = {
	elem: ["asd", 123, true, false],
	get height(){
		return this.elem.length;
	},
	set height(val){
		console.log("Can not set value into elem height "+val);
	}
}
/*console.log(pile.height);
pile.height = 100;
console.log(pile.height);
*/
function RTextCell(text){
	TextCell.call(this, text);
}
RTextCell.prototype = Object.create(TextCell.prototype);

RTextCell.prototype.draw = function(width, height){
	var res = [];
	for(var i = 0; i < height; i++){
		var line = this.txt[i] || "";
		res.push(repeat(" ", width - line.length)+line);
	}
	return res;
}
/*var rtextCell = new RTextCell("asd");
console.log(rtextCell.minWidth());*/
var MOUNTAINS = [
  {name: "Kilimanjaro", height: 5895, country: "Tanzania"},
  {name: "Everest", height: 8848, country: "Nepal"},
  {name: "Mount Fuji", height: 3776, country: "Japan"},
  {name: "Mont Blanc", height: 4808, country: "Italy/France"},
  {name: "Vaalserberg", height: 323, country: "Netherlands"},
  {name: "Denali", height: 6168, country: "United States"},
  {name: "Popocatepetl", height: 5465, country: "Mexico"}
];
// console.log(drawTable(dataTable(MOUNTAINS)));
//=====================================================
/*function Vector(x, y){
	this.x = x;
	this.y = y;
}

Object.defineProperty(Vector.prototype, "length", 
	{get: function(){
		return Math.sqrt(this.x * this.x + this.y * this.y);
	}
});

Vector.prototype.plus = function(v1){
	return new Vector(v1.x + this.x, v1.y + this.y);
}
Vector.prototype.minus = function(v1){
	return new Vector(this.x - v1.x, this.y - v1.y);
}
console.log(new Vector(1, 2).plus(new Vector(2, 3)));
// → Vector{x: 3, y: 5}
console.log(new Vector(1, 2).minus(new Vector(2, 3)));
// → Vector{x: -1, y: -1}
console.log(new Vector(3, 4).length);*/
// 5
//==========
/*function StretchCell(inner, width, height){
	this.width = width;
	this.height = height;
	this.inner = inner;
}
StretchCell.prototype.minWidth = function(){
	return this.inner.minWidth() > this.width? this.inner.minWidth() : this.width;
}

StretchCell.prototype.minHeight = function(){
	return this.inner.minHeight() > this.height? this.inner.minHeight() : this.height;
}
StretchCell.prototype.draw = function(){
	return this.inner.draw(this.minWidth(), this.minHeight());
}

var sc = new StretchCell(new TextCell("abc"), 1, 2);
console.log(sc.minWidth());
// → 3
console.log(sc.minHeight());
// → 2
console.log(sc.draw(3, 2));*/
//==========
function intForIterate(arr, action){
	this.arr = arr;
	this.action = action;
}
// var logFive = intForIterate)(

