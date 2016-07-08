/* **** Global Variables **** */

//I combined the global variables into one object,
//I'm interested to see how all global variables can be eliminated!

var gameData = {
	playersGuess: undefined,
	winningNumber: generateWinningNumber(),
	guesses: [],
	gameOver: false
};

/* **** Guessing Game Functions **** */

// Generate the Winning Number


function generateWinningNumber(){
	return Math.floor((Math.random() * 100) + 1);
}

// Fetch the Players Guess

function playersGuessSubmission(){
	//set playersGuess to be numeric version of inputted user value
	gameData.playersGuess = +$('input').val();

	checkGuess();

	if(validGuess()) {
		gameData.guesses.push(gameData.playersGuess);
		updateGuessNum();

		//update guess message
		if(!gameData.gameOver){
			guessMessage();
		}
	}
	//clear input
	$('input').val("");
}

//update the number of guesses

function updateGuessNum(){

//if 5 guesses have been used, alert the user that there are no more guesses, end game
	if (gameData.guesses.length === 5){
		$('h1').text('GAME OVER').addClass('gameOver').animate({'font-size': '9rem'});
		gameData.gameOver = true;
		$('input, p, #makeGuess, #hint').fadeOut();
	} else {
		$('#tries').html('<span>' + (5 - gameData.guesses.length) + '</span> Guesses Remaining');
	}
}

// Determine if the next guess should be a lower or higher number

function lowerOrHigher(){
	if(gameData.playersGuess > gameData.winningNumber){
		return "Your guess is too high ";
	} else if (gameData.playersGuess < gameData.winningNumber){
		return "Your guess is too low ";
	}
}

//test the range of the guess to see how close to winningNumber

function rangeCheck(){
	var num;

	if(Math.abs(gameData.winningNumber - gameData.playersGuess) > 50){
		return "and more than 50 digits away from the winning number.";
	} else {
		if(Math.abs(gameData.winningNumber - gameData.playersGuess) <= 5){
			num = 5;
		} else if(Math.abs(gameData.winningNumber - gameData.playersGuess) <= 10){
			num = 10;
		} else if(Math.abs(gameData.winningNumber - gameData.playersGuess) <= 20){
			num = 20;
		} else if(Math.abs(gameData.winningNumber - gameData.playersGuess) <= 50){
			num = 50;
		}
	}
	return "and within " + num + " digits of the winning number.";
}

//generate feedback message

function guessMessage(){
	$('#guessMessage').text(lowerOrHigher() + rangeCheck());

	//display the guess message paragraph tag if needed
	displayParagraph('#guessMessage');
}

// Check if the Player's Guess is the winning number 

function checkGuess(){
	if(gameData.playersGuess === gameData.winningNumber){
		gameData.gameOver = true;
		$('h1').text('You won!').addClass('winnerText').animate({'font-size': '9rem'});
		$('html').addClass('winnerBackground');
		$('input, p, #makeGuess, #hint').fadeOut();
	} else if(gameData.guesses.indexOf(gameData.playersGuess) !== -1){
		$('#alert').text("You've already guessed that number! Try again.");
	} else {
		$('#alert').text("Try again!");
	}

	//display the alert message paragraph tag if needed
	displayParagraph('#alert');
}

// Create a provide hint button that provides additional clues to the "Player"

function provideHint(){
	var newNum1 = Math.floor((Math.random() * 100) + 1);
	var newNum2 = Math.floor((Math.random() * 100) + 1);
	var hints = [newNum1, newNum2, gameData.winningNumber];

	//array order randomization code sourced from https://bost.ocks.org/mike/shuffle/
	var m = hints.length, t, i;
  	// While there remain elements to shuffle…
	while (m) {
    	// Pick a remaining element…
  		i = Math.floor(Math.random() * m--);
    	// And swap it with the current element.
    	t = hints[m];
    	hints[m] = hints[i];
    	hints[i] = t;
  	}	
  	//reveal paragraph for hint, if needed 
  	displayParagraph('#guessMessage');

  	return "Hint: one of these values is the winning number " + hints;
}

// Allow the "Player" to Play Again

function playAgain(){
	$('html').removeClass();
	$('h1').text('Guess a Number').removeClass().animate({'font-size': '5rem'});
	$('input, p, #makeGuess, #hint').fadeIn();
	$('#guessMessage').addClass('hidden');
	$('#alert').addClass('hidden');
	gameData.gameOver = false;
	gameData.guesses = [];
	gameData.winningNumber = generateWinningNumber();
	updateGuessNum();
}

//check if the user input is a valid guess for the game

function validGuess(){
//for guess to be valid, must be in 1-100 range
//guesses must be remaining, is not be a repeat value, and game is not over

	if(gameData.playersGuess > 0 && 
		gameData.playersGuess < 101 && 
		gameData.guesses.length < 5 && 
		gameData.guesses.indexOf(gameData.playersGuess) === -1 &&
		!gameData.gameOver) {

		return true;
	} 
	else {
		return false;
	}
}

//used to display paragraphs that were default- hidden (used for spacing consistency)

function displayParagraph(tag){
	if($(tag).hasClass('hidden')){
		$(tag).removeClass('hidden');
	}
}

/* **** Event Listeners/Handlers ****  */

$(document).ready(function(){
	$("#makeGuess").on("click", function(){
		playersGuessSubmission();
	});

	$('#reset').on('click', function(){
		playAgain();
	});

	$('#hint').on('click', function(){
		$('#guessMessage').text(provideHint());
	});

	$('input').on('keypress', function(event){
   	 	if(event.which === 13) {
    		playersGuessSubmission();
    	}
	});
});
