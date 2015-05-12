/*var weekDay = function () {
	var days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
	return {
		name: function(number) {return days[number];},
		number: function (day) {return days.indexOf(day);}
	}
}(); */
// (function () {
// 	console.log("asd");
// })();
// (function (exports) {
// 	var days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
// 	exports.name = function (number) {
// 		return days[number];
// 	}
// 	exports.number = function (day) {
// 		return days.indexOf(day);
// 	}
// });
/*function readFile (arguments) {
	return null;
}
var require = function (name) {
	if(name in require.cache){
		return require.cache[name];
	}
	var code = new Function("exports", readFile(name));
	// var code = new Function("exports");
	var exports = {};
	code(exports);
	require.cache.push(exports);
	return exports;
}*/
// console.log(require("weekDay").number("Friday"));
// console.log(weekDay.number("Wednesday"));
// console.log(weekDay.name(1));
(function (exports) {
	exports.months = ["January", "February", "March",
					"April", "May", "June",
					"July", "August", "September",
					"October", "November", "December"];
	exports.name = function (num) {
		return exports.months[num];
	}
	exports.number = function (name) {
		return exports.months.indexOf(name);
	}

})(this.month = {});

console.log(month.name(2));
// → March
console.log(month.number("November"));
// → 10