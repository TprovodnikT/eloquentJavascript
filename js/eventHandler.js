/*addEventListener("click", function () {
	console.log("that was CLICK!!!")
})*/
var buttonFirst = document.getElementById("firstButton");
console.log(buttonFirst)
function once () {
	buttonFirst.removeEventListener("click", once);
	console.log("Here will be only one time event");
}
buttonFirst.addEventListener("click", once);
var buttonSecond = document.getElementById("secondButton");
secondButton.addEventListener("mousedown", function (event) {
	switch(event.which){
		case 1:
			console.log("left button");
			break;
		case 2:
			console.log("wheel");
			break;
		case 3:
			console.log("right button");
			break;
	}
});
thirdButton = document.getElementById("thirdButton");
clickableParagraph = document.getElementById("clickableParagraph");
thirdButton.addEventListener("mousedown", function (event) {
	console.log("Button listener");
	if(event.which === 3)
		event.stopPropagation();
});
clickableParagraph.addEventListener("mousedown", function () {
	console.log("Paragrapg listener");
});
var buttonContainer = document.getElementById("buttonContainer");
buttonContainer.addEventListener("click", function (event) {
	if(event.target.nodeName === "BUTTON"){
		console.log("clicked on "+ event.target.textContent)
	} else if(event.target.nodeName === "SPAN"){
		console.log("I was lying, that nothing happens, you clicked on span");
	}
});
var link = document.querySelector("a");
link.addEventListener("click", function (event) {
	event.preventDefault();
	console.log("Sorry, but this link is disabled");
})
var colorChange = document.getElementById("changeColor");
document.addEventListener("keydown", function (event) {
	if(event.which === 86){
		colorChange.style.backgroundColor = randomColor();
	}
});
document.addEventListener("keyup", function (event) {
	if(event.which === 86){
		colorChange.style.backgroundColor = "";
	}
});
document.addEventListener("keydown", function (event) {
	if(event.which === 32 && event.ctrlKey){
		document.getElementById("forContinue").innerHTML = "Here we go!!!"
	}
});
/*document.addEventListener("keypress", function (event) {
	console.log(String.fromCharCode(event.charCode));
})*/

function toHex (digit) {
	var res = "";
	var hexPower = 0;
	var tmpDigit = digit;
	while((tmpDigit/16)>1){
		hexPower++;
		tmpDigit /= 16;
	}
	tmpDigit = Math.floor(tmpDigit);
	switch(tmpDigit){
		case 10:
			res += "A";
			break;
		case 11:
			res += "B";
			break;
		case 12:
			res += "C";
			break;
		case 13:
			res += "D";
			break;
		case 14:
			res += "E";
			break;
		case 15:
			res += "F";
			break;
		default:
			res += tmpDigit;
	}
	if(hexPower === 0){
		return res;
	}
	return res += toHex(digit - tmpDigit * Math.pow(16, hexPower));
}
function randomColor () {
	var res = "#";
	return res+toHex(Math.round(Math.random()*256)) + toHex(Math.round(Math.random()*256)) + toHex(Math.round(Math.random()*256));
}
var forDrawing = document.getElementById("forDrawing");
forDrawing.addEventListener("mousedown", function (event) {
	if(event.which === 1){
		console.log(event.layerX)
		console.log(event.layerY)
		var point = document.createElement("div");
		point.className = "dot";
		point.style.top = (event.layerY - 4) + "px";
		point.style.left = (event.layerX - 4) + "px";
		forDrawing.appendChild(point);
	}else if(event.which === 2){
		event.preventDefault();
		// console.log();
		if(event.target.className === "dot"){
			forDrawing.removeChild(event.target);
		}
	}
});

(function () {
	var scalable = document.getElementById("scalable");
	var posX = 0;
	var posY = 0;
	scalable.addEventListener("mousedown", function (event) {
		if(event.which === 1){
			posX = event.layerX;
			posY = event.layerY;
			console.log(posX,posY, "position")
			addEventListener("mousemove", move);
			event.preventDefault();
		}
	});
	function buttonPressed (event) {
		if(event.buttons == null)
			return event.which != 0;
		else
			return event.buttons != 0;
	}
	function move (event) {
		if(!buttonPressed(event)){
			// console.log("msg")
			removeEventListener("mousemove", move);
		}
		else {
			var layerX = event.layerX;
			var layerY = event.layerY;
			var diffWidth = layerX - posX;
			var diffHeight = layerY - posY;
			var scalableOffsetWidth = scalable.offsetWidth;
			var scalableOffsetHeight = scalable.offsetHeight;
			posX = layerX;
			posY = layerY;
			if(scalableOffsetWidth + diffWidth > 40){
				scalable.style.width = (scalableOffsetWidth + diffWidth) +"px";
			}
			if(scalableOffsetHeight + diffHeight > 40){
				scalable.style.height = (scalableOffsetHeight + diffHeight) +"px";
			}

		}
		
	}
})();
(function () {
	var paragraph = document.getElementById("forMouseOverParent");
	function isInside (node, target) {
		while(node != null){
			node = node.parentNode;
			if(target === node)
				return true;
		}
		// for (; node != null; node = node.parentNode)
  //    		if (node == target) return true;
	}
	paragraph.addEventListener("mouseover", function (event) {
		// console.log(event);
		if(!isInside(event.relatedTarget, paragraph)){
			paragraph.style.color = randomColor();
		}
	});
	paragraph.addEventListener("mouseout", function (event) {
		console.log("msg")
		if(!isInside(event.relatedTarget, paragraph)){
			paragraph.style.color = "";
		}
	})
})();

(function () {
	var body = document.body;
	addEventListener("scroll", function () {
		// console.log("max");
		var progressBar = document.querySelector(".progressBar > div");
		// var height = body.offsetHeight;
		var max = body.scrollHeight - innerHeight;
		// console.log("max", (pageYOffset / max * 100))
		progressBar.style.height = (pageYOffset / max * 100 - 3) + "%";
	});
	
})();
(function () {
	var inputs = document.querySelectorAll("p > input");
	var pForHelp = document.querySelector("#help");
	for(var i = 0; i < inputs.length; i++){
		inputs[i].addEventListener("focus", function (event) {
			var help = event.target.getAttribute("data-help")
			if(help){
				pForHelp.textContent = help;
			}
		});
		inputs[i].addEventListener("blur", function (event) {
			var help = event.target.getAttribute("data-help")
			if(help){
				pForHelp.textContent = "";
			}
		});
	}
	
	// inputs.addEventListener("blur")
})();
var squareWorker = new Worker("js/test.js");
squareWorker.addEventListener("message", function (event) {
	console.log("The worker respond:", event.data);
});
// squareWorker.postMessage(10);
// squareWorker.postMessage(9);
// squareWorker.postMessage(5);
setTimeout(function () {
	document.querySelector("#timeout").style.background = "#3D991F";
}, 2000);
/*var bompTimer = setTimeout(function () {
	console.log("Booom");
}, 500);
if(Math.random() < 0.5){
	console.log("Defused");
	clearTimeout(bompTimer);
}*/
/*(function () {
	var ticks = 0;
	var clock = setInterval(function () {
		console.log("ticks", ticks++);
		if(ticks > 10){
			clearInterval(clock);
			console.log("stop");
		}
	}, 200);
})();*/
(function (arguments) {
	var textarea = document.querySelector("textarea");
	// console.log(textarea);
	var timeout;
	textarea.addEventListener("keydown", function (event) {
		clearTimeout(timeout);
		timeout = setTimeout(function() {
			console.log("you stopped");
		}, 500);

	})
})();
function displayCoords (event) {
	document.querySelector("#forMouseCoords").textContent = "mouse is on " + event.pageX + " " + event.pageY;
}
(function () {
	var sheduled, lastEvent;
	addEventListener("mousemove", function (event) {
		lastEvent = event;
		if(!sheduled){
			scheduled = true;
			setTimeout(function() {
				scheduled = false;
				displayCoords(lastEvent);
			}, 1000);
		}
	})
})();
//Excercises
// First:
(function () {
	var input = document.querySelector("#firstIn");
	// console.log(input)
	var prohibited = ["X", "W", "Q", "x", "w", "q"];
	input.addEventListener("keypress", function (event) {
		console.log(String.fromCharCode(event.charCode))
		// console.log(event.charCode)
		if(prohibited.indexOf(String.fromCharCode(event.charCode)) != -1){
			console.log("msg")
			event.preventDefault();
		}
	})
})();
(function () {
	var badUsage = "badusage";
	var length = badUsage.length;
	var onView = [];
	var counter = 0;
	var lastEvent;
	addEventListener("mousemove", function (event) {
		// console.log(event);
		if(!lastEvent){
			lastEvent = event;
		}
		if(calcDist(lastEvent.pageX, lastEvent.pageY, event.pageX, event.pageY) > 20){
			// console.log("msg")
			if(onView.length === length){
				document.body.removeChild(onView[0]);
				onView.shift();
			}
			if(counter === length){
				counter = 0;
			}
			var div = document.createElement("div");
			div.className = "afterPointer";
			div.style.background = randomColor();
			div.appendChild(document.createTextNode(badUsage[counter]));
			div.style.top = event.pageY +"px";
			div.style.left = event.pageX +"px";
			onView.push(div);
			// console.log(onView);
			document.body.appendChild(div);
			lastEvent = event;
			counter ++;
		}
	})
})
// ();
function calcDist (lx, ly, x, y) {
	return Math.sqrt((lx - x) * (lx - x) + (ly - y) * (ly - y));
}
function asTabs(node) {
	var buttons = [];
	var tabName, previousTab, button, textContainer;
	Array.prototype.forEach.call(node.querySelectorAll("*"), function (el) {
		tabName = el.getAttribute("data-tabname");
		if(tabName){
			node.removeChild(el);
			button = document.createElement("button");
			button.appendChild(document.createTextNode(tabName));
			buttons.push(button);
		}
	});
	console.log(buttons)
	// textContainer.appendChild(document.createTextNode())
	textContainer = document.createElement("div");
	buttons.forEach(function (el) {
		node.appendChild(el)
		el.addEventListener("click", function (event) {
			if(previousTab){
				previousTab.style.background = "";
			}
			event.target.style.background = "blue";
			textContainer.textContent = el.textContent + " tab";
			previousTab = event.target;
		})
	})
	node.appendChild(textContainer);

}
asTabs(document.querySelector("#wrapper"));