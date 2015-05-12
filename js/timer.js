function showTime () {
	var divClockMins = document.getElementById("clockMins");
	var q1 = document.getElementsByClassName("quarterMin1")[0];
	var q2 = document.getElementsByClassName("quarterMin2")[0];
	var q3 = document.getElementsByClassName("quarterMin3")[0];
	var q4 = document.getElementsByClassName("quarterMin4")[0];
	var q = [q1, q2, q3, q4];
	var qCounter = 0;
	var currentQuarter = q1;
	var limit = 25;
	var sec10 = 0;
	divClockMins.innerText = limit;
	// divClockSec.innerText = sec10;
	var clockInterval = window.setInterval(function () {
		limit --;
		if(sec10 === 0){
			sec10 = 5;
		}else{
			sec10--;
		}
		divClockMins.innerText = limit;
		if(limit === 0){
			window.clearInterval(clockInterval);
			window.clearInterval(clockQuarterInterval);
			divClockMins.style.fontSize = "2em";
			divClockMins.style.color = "red";
			divClockMins.innerText = "Time Is Over, go relax";
		}
	}, 60000);
	var clockQuarterInterval = window.setInterval(function () {
		if(qCounter === 15){
			qCounter = 0;
			if(q.indexOf(currentQuarter) === q.length-1){
				q.forEach(function (element) {
					element.style.opacity = 0;
					currentQuarter = q[0];
				});
			}else{
				currentQuarter = q[q.indexOf(currentQuarter)+1];
			}
		}else{
			currentQuarter.style.opacity = 0.068*qCounter;
			qCounter++;
		}
	}, 1000);


}
showTime();