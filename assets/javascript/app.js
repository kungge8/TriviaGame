var TIMERJS = {
	trivia: [
		["Question 1: Which hero does 'Finger of Death' belong to?","Lion","Luna","Lina","Lich","Lion"],
		["Question 2: How much gold does 'Force Staff' cost?","1000","3150","2250","4900","2250"],
		["Question 3: How much damage does a 'Sacred Relic' give?","20","40","60","80","60"],
		["Question 4: How much evasion does Phantom Assassin's 'Blur' provide?","10%/25%/40%/65%","20%/30%/40%/50%","15%/20%/25%/30%","15%/25%/35%/45%","20%/30%/40%/50%"],
		["Question 5: What is the mana cost of 'Mystic Flare'?","300/550/800","200/400/600","200/500/800","150/400/650","300/550/800"],
		["Question 6: What is the chance of getting a 4x Multicast with Multicast level 2?","5%","0%","2.5%","10%","0%"],
		["Question 7: What does DotA stand for?","Defense of the Atheists","Defenders of the Asylum","Dont overthink that Analogy","Defense of the Ancients","Defense of the Ancients"],
		["Question 8: Which hero summons boars?","Beastmaster","Boarmaster","Brewmaster","Huntmaster","Beastmaster"],
		["Question 9: What is the range of 'Blink Dagger'?","1150","1200","1250","1300","1200"],
		["Question 10: How much damage does 'Dagon 5' do?","800","900","850","750","800"]],
	qCorrect: 0,
	qWrong: 0,
	qTimer: 0,
	timer: null,
	currQuestion: 0,
	qDisplay: $("#qDisplay"),
	timerDisplay: $("#timerDisplay"),
	rA1: $('input[id=A1'),
	A1: $('label[for=A1]'),
	rA2: $('input[id=A2'),
	A2: $('label[for=A2]'),
	rA3: $('input[id=A3'),
	A3: $('label[for=A3]'),
	rA4: $('input[id=A4'),
	A4: $('label[for=A4]'),
	mainButton: $('#aSubmit'),
	pAns:[],
	initialize: function (){
		console.log("initialize entered");
		TIMERJS.qCorrect = 0;
		TIMERJS.qWrong = 0;
		TIMERJS.currQuestion = 0;
		TIMERJS.pAns = [];
		$(".tleft").text("Hit the button to start the DotA 2 quiz! You'll have 30 seconds per question and 10 questions to answer!");
		TIMERJS.mainButton.text("Start Quiz!");
		TIMERJS.mainButton.on("click", TIMERJS.start);
		TIMERJS.timerDisplay.html("&nbsp;");
		$(".qButton").hide();
		$(".tleft").show();		
	},
	start: function(){
		TIMERJS.qDisplay.empty();
		TIMERJS.writeQuestion(TIMERJS.currQuestion);
		$(".qButton").show();
		TIMERJS.mainButton.off();
		TIMERJS.mainButton.on('click', TIMERJS.submit);
		TIMERJS.mainButton.text("SUBMIT!");
	},
	writeQuestion: function (){
		console.log("writeQuestion entered");
		//console.log(this);
		if (TIMERJS.currQuestion >= 10){
			TIMERJS.gameOver();
		} else {
			console.log("writeQuestion entered");
			$(".tleft").text("TIME LEFT");
			$(".qButton").show();
			$("label").show();
			$("#aSubmit").show();
			TIMERJS.qTimer = 30;
			TIMERJS.timerDisplay.text("30");
			clearInterval(TIMERJS.timer);
			TIMERJS.timer = setInterval(TIMERJS.questionTimer, 1000);
			TIMERJS.qDisplay.text(TIMERJS.trivia[TIMERJS.currQuestion][0]);
			TIMERJS.A1.html(TIMERJS.trivia[TIMERJS.currQuestion][1]);
			TIMERJS.rA1.attr("v", TIMERJS.trivia[TIMERJS.currQuestion][1]);
			TIMERJS.A2.html(TIMERJS.trivia[TIMERJS.currQuestion][2]);
			TIMERJS.rA2.attr("v", TIMERJS.trivia[TIMERJS.currQuestion][2]);
			TIMERJS.A3.html(TIMERJS.trivia[TIMERJS.currQuestion][3]);
			TIMERJS.rA3.attr("v", TIMERJS.trivia[TIMERJS.currQuestion][3]);
			TIMERJS.A4.html(TIMERJS.trivia[TIMERJS.currQuestion][4]);
			TIMERJS.rA4.attr("v", TIMERJS.trivia[TIMERJS.currQuestion][4]);
		}
	},
	submit: function (){
		let temp = $('input[type=radio][name=qAns]:checked').attr("v");
		console.log("submit entered");
		// console.log(temp);
		if (temp == undefined){
			alert("Select something!");
			return;
		} else if (temp === TIMERJS.trivia[TIMERJS.currQuestion][5]){
			TIMERJS.qCorrect++;
			// console.log("Right! " + TIMERJS.qCorrect);
			temp = 1;
		} else {
			TIMERJS.qWrong++;
			// console.log("Wrong! " + TIMERJS.qWrong);
			temp = 2;
		}
		//clearInterval(TIMERJS.timer);
		// TIMERJS.pAns.push(temp);
		//console.log(TIMERJS.pAns);
		$("input[type=radio]").removeAttr("checked");
		TIMERJS.qOver(temp);
		// TIMERJS.writeQuestion();
	},
	qOver: function (b){
		console.log("qOver entered");
		$(".qButton").hide();
		$("label").hide();
		$("#aSubmit").hide();
		$(".tleft").text("TIME UNTIL NEXT QUESTION");
		clearInterval(TIMERJS.timer);
		TIMERJS.qTimer = 5;
		TIMERJS.timerDisplay.text("5");
		TIMERJS.timer = setInterval(TIMERJS.tensecTimer, 1000);
		if (b === 3){
			TIMERJS.qDisplay.text("Time ran out! Correct answer was: " + TIMERJS.trivia[TIMERJS.currQuestion][5]);
		} else if (b === 1){
			TIMERJS.qDisplay.text("You got it right!");
		} else {
			TIMERJS.qDisplay.text("You got it wrong! Correct answer was: " + TIMERJS.trivia[TIMERJS.currQuestion][5]);
		}
		TIMERJS.currQuestion++;
	},
	gameOver: function (){
		console.log("gameOver entered");
		clearInterval(TIMERJS.timer);
		TIMERJS.timerDisplay.text("Done!");
		TIMERJS.qDisplay.text("Game Over! You got " + TIMERJS.qCorrect + " right and " + (TIMERJS.qWrong - 9) + " wrong!");
		$(".aCenter").hide();
		$(".tleft").hide();
	},
	tensecTimer: function(){
		console.log("tensecTimer");
		TIMERJS.qTimer--;
		if (TIMERJS.qTimer === 0){
			clearInterval(TIMERJS.timer);
			TIMERJS.writeQuestion();	
		} else {
			TIMERJS.timerDisplay.text(TIMERJS.qTimer);
		}
	},
	questionTimer: function (){
		console.log("questionTimer entered");
		//console.log(this);
		TIMERJS.qTimer--;
		if (TIMERJS.qTimer === 0){
			clearInterval(TIMERJS.timer);
			TIMERJS.qOver(3);
		} else {
			TIMERJS.timerDisplay.text(TIMERJS.qTimer);
		}
	}
}

console.log("JS ENTERED");
TIMERJS.initialize();