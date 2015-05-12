"use strict"
console.log(/abc/.test("asdabc"));
console.log(/abc/.test("asdabx"));
console.log(/[1234567890]/.test("in 1990"));
console.log(/[0-9]/.test("in 1990"));

var datetime = /\d\d-\d\d\-\d\d\d\d \d\d:\d\d/;
console.log(datetime.test("01-01-2001 01:01"));
console.log(datetime.test("a1-01-2001 01:01"));

var notBinary = /[^01]/;
console.log("notBinary");
console.log(notBinary.test("00010010100101"));
console.log(notBinary.test("00020010100101"));

console.log("plus");
console.log(/'\d+'/.test("'123'"));
console.log(/'\d+'/.test("''"));

console.log(/'\d*'/.test("'123'"));
console.log(/'\d*'/.test("''"));

console.log("neighbour");
var neighbour = /neighbou?r/;
console.log(neighbour.test("neighbour"));
console.log(neighbour.test("neighbor"));

console.log("newDateTime");
var newDateTime = /\d{1,2}-\d{1,2}-\d{4} \d{1,2}:\d{2}/
console.log(newDateTime.test("01-01-2001 1:01"));
console.log("Cartoon cry");
var cartoonCry = /boo+(hoo+)+/i;
console.log(cartoonCry.test("Boohoooohoohooo"));
console.log("Grouping subexpression");
var match = /\d+/.exec("one two 100");
console.log(match);
console.log(match.index);
console.log("one two 100".match(/\d+/));
console.log("Quoted text");
console.log(/'([^']*)'/.exec("quoted text is 'hello'"));
console.log(/bad(ly)?/.exec("bad"));
console.log(/(\d)+/.exec("123"));
console.log(/cat/.test("concatenate"));
console.log(/cat\b/.test("concatenate"));
var animalCount = /\b\d+ (pig|chicken|cow)s?\b/;
console.log(animalCount.test("15 pigs"));
console.log(animalCount.test("15 pigchickens"));
console.log("Binary or decimal or hexadecimal");
var regBinOrDecOrHex = /\b([01]+b|\d+|[\da-f]+h)\b/;
console.log(regBinOrDecOrHex.test("01b"));
console.log(regBinOrDecOrHex.test("h"));
console.log(regBinOrDecOrHex.test("10"));
console.log("Replace");
console.log("Borobudur".replace(/[ou]/, "a"));
console.log("Borobudur".replace(/[ou]/g, "a"));
console.log("Hopper, Grace\nMcCarthy, John\nRitchie, Dennis"
	.replace(/\b(\w+), (\w+)\b/g, "$2 $1"));
var stock = "1 lemon, 2 cabbages, and 101 eggs";
function minusOne(match, amount, unit) {
	console.log(amount);
	amount --;
	if (amount === "no"){
		return amount + units;
	}
	if(!amount){
		return "no" + " " + unit;
	}
	if(amount === 1){
		return amount + " " + unit.slice(0, unit.length-1);
	}
}
console.log(stock.replace(/(\d+) (\w+)\b/g, minusOne));
var stripComments = function(str){
	var res = str.replace(/(\/\/.+)|(\/\*[^]*?\*\/)/g, "")
	return res;
};


console.log(stripComments("1 + /* 2 */3"));
// → 1 + 3
console.log(stripComments("x = 10;// ten!"));
// → x = 10;
console.log(stripComments("1 /* a */+/* b */ 1"));
// → 1  1
var name = "Harry";
name = "dea+hl[]rd";
var str = "The dea+hl[]rd has a scar on his mouse";
var name = name.replace(/[^(\w\d)]/g, "\\$&");
var reg = new RegExp("\\b"+name+"\\b", "gi");
console.log(str.replace(reg, "Joker"));

console.log("regular expression with some control");
var reg = /y/g;
var xy = "xxxyxxxyxy";
reg.lastIndex = 4;
var match = reg.exec(xy);
console.log(match.index);
console.log(reg.lastIndex);

console.log("bad thing of global(\\g)");
var dig = /\d+/g;
console.log(dig.exec("digit in 1 asda 1"));
console.log(dig.exec("digit in 1"),"because of lastindex didn't reset");
console.log("digit in 1 asda 1".match(dig), "global change behaviour of match");

var input = "Строчка с 3 числами в ней... 42 и 88.";
var numReg = /\b[\d]+\b/g;
var match;
while(match = numReg.exec(input)){
	console.log("Found", match[0], "on", match.index);
	// console.log("found",match[1], "on",match.index)
}
var iniStr = "searchengine=http://www.google.com/search?q=$1\n"+
"spitefulness=9.7\n"+
"\n"+
"; перед комментариями ставится точка с запятой\n"+
"; каждая секция относится к отдельному врагу\n"+
"[larry]\n"+
"fullname=Larry Doe\n"+
"type=бычара из детсада\n"+
"website=http://www.geocities.com/CapeCanaveral/11451\n"+
"\n"+
"[gargamel]\n"+
"fullname=Gargamel\n"+
"type=злой волшебник\n"+
"outputdir=/home/marijn/enemies/gargamel";
//parse ini file
console.log("=====parse ini file");
function parseIniFile (str) {
	var currentSection = {name: null, field:[]};
	var res=[];
	res.push(currentSection);
	var match;
	str.split(/\r?\n/).forEach(function (line) {
		if(/\^s*;[^]+/.test(line)){
			return;
		}
		if(match = line.match(/^(\w+)\=(.*)/)){
			currentSection.field.push({name: match[1], value: match[2]});
			return;
		}
		if(match = line.match(/^\[(\w+)\]$/)){
			console.log(match);
			currentSection = {name: match[1], field:[]};
			res.push(currentSection);
		}
	});
	return res;
}
console.log(parseIniFile(iniStr));
//Home word-break: 
verify(/ca(r|t)/,
       ["my car", "bad cats"],
       ["camper", "high art"]);

verify(/pr?op/,
       ["pop culture", "mad props"],
       ["plop"]);

verify(/ferr(et|y|ari)/,
       ["ferret", "ferry", "ferrari"],
       ["ferrum", "transfer A"]);

verify(/\w*ious$|\s/,
       ["how delicious", "spacious room"],
       ["ruinous", "consciousness"]);

verify(/\s\;|\.|\:|\,/,
       ["bad punctuation ."],
       ["escape the dot"]);

verify(/\w{7,}/,
       ["hottentottententen"],
       ["no", "hotten totten tenten"]);

verify(/(^|\s)[^e]+?($|\s)/,
       ["red platypus", "wobbling nest"],
       ["earth bed", "learning ape"]);

function verify(regexp, yes, no) {
  // Ignore unfinished exercises
  if (regexp.source == "...") return;
  yes.forEach(function(s) {
    if (!regexp.test(s))
      console.log("Не нашлось '" + s + "'");
  });
  no.forEach(function(s) {
    if (regexp.test(s)){
    	console.log(s.match(regexp))
      console.log("Неожиданное вхождение '" + s + "'");}
  });
}

var string = "asdas 'asdsada asdasd asd' don't\n'asdasdsa'".replace(/(^|\s)(')|(')($|\s)/g, "\"");
console.log(string);

var number = /^(\+|\-)?((\.?[\d])|([\d]+\.))([\d]+)?(e(\-|\+)?[\d]+)?$/i;

// Tests:
["1", "-1", "+15", "1.55", ".5", "5.", "1.3e2", "1E-4",
 "1e+12"].forEach(function(s) {
  if (!number.test(s))
    console.log("Не нашла '" + s + "'");
});
["1a", "+-1", "1.2.3", "1+1", "1e4.5", ".5.", "1f5",
 "."].forEach(function(s) {
  if (number.test(s))
    console.log("Неправильно принято '" + s + "'");
});