addEventListener("message", function (event) {
	postMessage(event.data * event.data);
})
/*console.log("msg");

function toRad (degree) {
	// console.log(degree * Math.PI)
	return degree * Math.PI / 1800 * 10;
}
function getDistance (lnA, ltA, lnB, ltB) {
	var longA = toRad(lnA);
	var latitA = toRad(ltA);

	var longB = toRad(lnB);
	var latitB = toRad(ltB);

	var x = (longB - longA) * Math.cos((latitA + latitB) / 2);
	var y = latitB - latitA;
	var d = Math.sqrt(x * x + y * y) * radius;
	return d;
}

function getDistFromPreDefPoint (ltA, ltB) {
	return getDistance(LON, LAT, ltA, ltB);
}
// console.log(toRad(3));

var longA = toRad(3.879483);
var latitA = toRad(43.608177);
console.log("longA", longA);
console.log("latitA", latitA);

var longB = toRad(3.87952263361082);
var latitB = toRad(43.6071285339217);

console.log("longB", longB);
console.log("latitB", latitB);

var radius = 6371;

var x = (longB - longA) * Math.cos((latitA + latitB) / 2);
var y = latitB - latitA;
var d = Math.sqrt(x * x + y * y) * radius;

var dM = Math.acos(Math.cos(latitA) * Math.cos(latitB) * Math.cos(longA - longB) + Math.sin(latitA) * Math.sin(latitB)) * radius;
console.log(d);
console.log(dM);
var surfPoints = [];
function closestPoint (pointX, pointY) {
	var dist = surfPoints.map(function (el) {
		return Math.square((pointX - el.land_x) * (pointX - el.land_x) + (pointY - el.land_Y) * (pointY - el.land_Y));
	});
	var midDist = dist[0];
	return dist.reduce(function (el) {
		return Math.min(minDist, el);
	})
}*/