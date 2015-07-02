function talksAbout (node, string) {
	if(node.nodeType === document.ELEMENT_NODE){
		for (var i = 0; i < node.childNodes.length; i++) {
			if(talksAbout(node.childNodes[i], string)){
				return true;
			}
		}
		return false;
	} else if(node.nodeType === document.TEXT_NODE) {
		return node.nodeValue.indexOf(string) > -1;
	}
}
// console.log(document.body)
// console.log(talksAbout(document.body, "book"));
// console.log(talksAbout(document.body, "Psycho"));
// console.log(talksAbout(document.body, "asd"));
// var paragraphs = document.body.getElementsByTagName("p");
// document.body.insertBefore(paragraphs[2], paragraphs[0]);
function replaceImages(){
	var images = document.body.getElementsByTagName("img");
	var text;
	for( var i = images.length - 1; i > -1; i--){
		if(images[i].alt){
			images[i].parentNode.replaceChild(document.createTextNode(images[i].alt), images[i]);
		}
	}
}
function elt (type) {
	var node = document.createElement(type);
	for(var i = 1; i< arguments.length; i++){
		var child = arguments[i];
		if(typeof child === "string"){
			child = document.createTextNode(child);
		}
		node.appendChild(child);
	}
	return node;
}
/*document.getElementById("quote").appendChild(
    elt("footer", "—",
        elt("strong", "Karl Popper"),
        ", preface to the second editon of ",
        elt("em", "The Open Society and Its Enemies"),
        ", 1950"));*/
// console.log("msg");
// (function () {
// 	var paras = document.body.getElementsByTagName("p");
// 	Array.prototype.forEach.call(paras, function (el) {
// 		if(el.getAttribute("data-classified") === "secret"){
// 			el.parentNode.removeChild(el);
// 		}
// 	})
// })();
//keywords are regexp
function highlightCode (node, keywords) {
	var text = node.textContent;
	node.textContent = "";
	var pos, match;
	var i = 0;
	while(match = keywords.exec(text)){
		var before = text.slice(pos, match.index);
		console.log(match);
		text = text.slice(match.index+match[0].length);
		node.appendChild(document.createTextNode(before));
		var strong = document.createElement("strong");
		strong.appendChild(document.createTextNode(match[0]));
		node.appendChild(strong);
		pos = keywords.lastIndex;
	}
	var after = text.slice(pos);
	node.appendChild(document.createTextNode(after));
}

function highLightAllCode () {
	var languages = {
		javascript: /\b(return|function|var)\b/
	}
	var allPre = document.body.getElementsByTagName("pre");
	Array.prototype.forEach.call(allPre, function (pre) {
		var language = pre.getAttribute("data-language");
		if(language in languages){
			highlightCode(pre, languages[language]);
		}
	})
}
// highLightAllCode();
function time (name, action) {
	var start = Date.now();
	action();
	console.log(name, (Date.now() - start), "ms");
}
//excercise 3 is here
(function () {
	var lastTime;
	var rollingFigure = document.getElementById("rolling");
	var rollingAround = document.getElementById("satellite");
	var rollingHat = document.getElementById("hat");
	// console.log(rollingFigure);
	var angle = 0;
	function animate (time) {
	if(lastTime != null){
		angle += (time - lastTime) * 0.001;
	}
	lastTime = time;
	rollingFigure.style.top = (Math.sin(angle) * 50)+"px";
	rollingFigure.style.left = (Math.cos(angle) * 200) +"px";

	rollingAround.style.top = (Math.sin(angle) * 50 + Math.sin(angle*3) * 25)+"px";
	rollingAround.style.left = (Math.cos(angle) * 200 + Math.cos(angle*3) * 25) +"px";

	rollingHat.style.top = (-Math.sin(angle) * 50)+"px";
	rollingHat.style.left = (-Math.cos(angle) * 200) +"px";

	requestAnimationFrame(animate);
}
requestAnimationFrame(animate);
})()
// time("stupid", function(){
// 	var target = document.getElementById("one");
// 	while(target.offsetWidth < 2000){
// 		target.appendChild(document.createTextNode("X"));
// 	}
// });
// time("clever", function () {
// 	var target = document.getElementById("two");
// 	target.appendChild(document.createTextNode("XXXXX"));
// 	var total = Math.ceil(2000 / (target.offsetWidth / 5));
// 	for(var i = total; i ; i--){
// 		target.appendChild(document.createTextNode("X"));
// 	}
// })
// excercise 1
var MOUNTAINS = [
  {name: "Kilimanjaro", height: 5895, country: "Tanzania"},
  {name: "Everest", height: 8848, country: "Nepal"},
  {name: "Mount Fuji", height: 3776, country: "Japan"},
  {name: "Mont Blanc", height: 4808, country: "Italy/France"},
  {name: "Vaalserberg", height: 323, country: "Netherlands"},
  {name: "Denali", height: 6168, country: "United States"},
  {name: "Popocatepetl", height: 5465, country: "Mexico"}
];
function buildTable(arr){
	var headers = Object.keys(arr[0]);
	console.log(headers)
	var table = createElementWithTextNode("table");
	var headerRow = createElementWithTextNode("tr");
	headers.forEach(function (header) {
		headerRow.appendChild(createElementWithTextNode("th", header));
	})

	table.appendChild(headerRow);
	arr.forEach(function (el) {
		var row = createElementWithTextNode("tr");
		Object.keys(el).forEach(function (e) {
			var td = createElementWithTextNode("td", el[e]);
			if(typeof el[e] == "number"){
				console.log("msg");
				td.style.textAlign = "right";
			}
			row.appendChild(td);
		});
		table.appendChild(row);
	});
	return table;
}
function createElementWithTextNode (type, text) {
	var el = document.createElement(type);
	if(text)
		el.appendChild(document.createTextNode(text));
	return el;

}
// document.getElementById("tableContainer").appendChild(buildTable(MOUNTAINS));
function byTagName (node, tagName) {
	var res = [];
	function getAllChilds(noda){
		Array.prototype.forEach.call(noda.childNodes, function (child) {
			if(child.nodeType === 1){
				// console.log(child.tagName);
				if(child.childNodes.length != 0){
					getAllChilds(child);
				}
				if(child.tagName === tagName.toUpperCase()){
					res.push(child);
				}
			}
		})
	}
	getAllChilds(node);
	return res;	
}

/*  console.log(byTagName(document.body, "h1").length);
  // → 1
  console.log(byTagName(document.body, "span").length);
  // → 3
  var para = document.querySelector("p");
  console.log(byTagName(para, "span").length);
  // → 2*/
