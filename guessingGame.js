/* **** Global Variables **** */
// try to elminate these global variables in your project, these are here just to start.

var playersGuess;
var winningNumber = generateWinningNumber();
var guesses = [];
var gameOver = false;

/* **** Guessing Game Functions **** */

// Generate the Winning Number

function generateWinningNumber(){
	return Math.floor((Math.random() * 100) + 1);
}

// Fetch the Players Guess

function playersGuessSubmission(){
	//set playersGuess to be numeric version of inputted user value
	playersGuess = +$('input').val();

	checkGuess();

	if(validGuess()) {
		guesses.push(playersGuess);
		updateGuessNum();
	}

	//clear input
	$('input').val("");
}

//update the number of guesses

function updateGuessNum(){

//if 5 guesses have been used, alert the user that there are no more guesses, end game
	if (guesses.length === 5){
		$('#tries').text("Sorry! You've used up all of your guesses.");
		gameOver = true;
	} else {
		$('#tries').find('span').text(5 - guesses.length);
	}
}

// Determine if the next guess should be a lower or higher number

function lowerOrHigher(){
	if(playersGuess > winningNumber){
		return "Too high!";
	} else if (playersGuess < winningNumber){
		return "Too low!";
	}
}

// Check if the Player's Guess is the winning number 

function checkGuess(){
	if(gameOver){
		
	}
	else if(playersGuess === winningNumber){
		$('#alert').text("You got it right! What a smartypants!");
		gameOver = true;
	} else if(guesses.indexOf(playersGuess) !== -1){
		$('#alert').text("You've already guessed that number! Try again.");
	} else {
		$('#alert').text("Try again!");
	}
}

// Create a provide hint button that provides additional clues to the "Player"

function provideHint(){
	// add code here
}

// Allow the "Player" to Play Again

function playAgain(){
	// add code here
}

function validGuess(){
//for guess to be valid, must be in 1-100 range
//guesses must be remaining, is not be a repeat value, and game is not over

	if(playersGuess > 0 && 
		playersGuess < 101 && 
		guesses.length < 5 && 
		guesses.indexOf(playersGuess) === -1 &&
		!gameOver) {

		return true;
	} 
	else {
		return false;
	}
}


/* **** Event Listeners/Handlers ****  */

$("#makeGuess").on("click", function(){
	playersGuessSubmission();
});

