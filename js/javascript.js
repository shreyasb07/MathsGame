var playing = false;
var score;
var action;
var timeLeft;
var correctAnswer;
var wrongAnswer;
//if we click on start
$('.startBtn').on("click",function(){
	if (playing === true) {
		location.reload();		
	}
	else{//not playing
			
			//change mode to playing
			playing = true;
			//set score to 0
			score = 0;
			$('#score').text(score);

			//display timer
			$('#timer').show();

			//set timeLeft to 60
			timeLeft = 60;
			$('#gameOver').hide();
			$('#countDown').val(timeLeft);
			console.log($('#countDown').val());


			//change button to Reset
			$(this).text('Reset');
			
			//Start Countdown
			startCountdown();

			//generate a new Q&A
			generateQA();
		}

		// clicking on answer box
		for (var i =  1; i < 5; i++) 
		{
			$('#box' + i).on("click",function()
			{
				if (playing == true)
				{
					// If Answer is correct
					if ($(this).html() == correctAnswer) 
					{
					// increament score by 1
						score++;
					//display updated score
						$('#score').html(score);
					
						$('#correct').show();
						//$('#correct').toggle();
						setTimeout(function() {
						$('#correct').hide();
						}, 1000);

					//since the answer is correct, get new QA
						generateQA();
					
					}
					else{
							$('#wrong').show();

							setTimeout(function() {
							$('#wrong').hide();
							}, 1000);
						}
				}
			
			})
		}
		
});














//Functions


// Start Counter
function startCountdown(){
		console.log("Start Countdown");
		action = setInterval(function(){
		timeLeft -= 1;
		if (timeLeft == 0) { //gameOver
			stopCountdown();
			$('#gameOver').show();
			$('#gameOver').html("<p> Game Over!</p><p>Your Score is " + score + ".</p>");
			$('#timer').hide();
			playing = false;
			$('.startBtn').text('Start Game!');
			$('.startBtn').show();
		}
	$('#countDown').html(timeLeft);
		}, 1000);
}


// Stop Counter
function stopCountdown(){
	console.log("Stop Countdown");
	clearInterval(action);
}

function generateQA(){
	console.log("generate QA");
	var x = 1 + Math.round(9*Math.random());
	var y = 1 + Math.round(9*Math.random());
	correctAnswer = x * y;

	$('#question').html(x + "*" + y);
	//fill any one box with correct answer.
	var correctPosition = 1 + Math.round(3*Math.random());
	$('#box' + correctPosition).html(correctAnswer);

	// fill other boxes with wrong answers.
	for (var i = 1; i < 5; i++) {
		if (i != correctPosition) {
			//generate a wrong answer.
			var wrongAnswer;
			do{
				wrongAnswer = (1 + Math.round(9*Math.random())) * (1 + Math.round(9*Math.random()));
			}
			while(wrongAnswer == correctAnswer);
			$('#box'+ i).html(wrongAnswer);
		}
	}
}