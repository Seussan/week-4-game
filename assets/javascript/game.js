
$(document).ready(function() {
	// VARIABLES
	// ==========================================================================
	var wins = losses = 0;
	var howManyCrystals = "";
	var crystalValues = [];
	var crystalColors = [];
	var matchNumber = 0;
	var currentScore = 0;
	var imageColors = ["blue", "green", "red", "yellow", "aquamarine", "diamond", "purple", "pink"];
	var firstTime = true;

	// FUNCTIONS
	// ==========================================================================

	// The randomizeBetween function returns an (optionally) unique set of random 
	// numbers between min and max (inclusive).
	//		- howMany determines the number of numbers generated.
	//		- unique uses true and false to generate only unique numbers.
	//	 Used to generate number(s) for:
	// 		- Random number to match: between 19 and 120 (inclusive).
	// 		- Crystals: between 1 and 12 (inclusive).
	//		- Number of Crystals on the board and their colors.

	function randomizeBetween(min, max, howMany, unique) {

		var arrayNumbers = [];
		var randomNumber;

		while(arrayNumbers.length < howMany){

			randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;

			if (unique) {
				if(arrayNumbers.indexOf(randomNumber) > -1)
					continue;
			}

			arrayNumbers[arrayNumbers.length] = randomNumber;
		};

		// console.log("Generated " + howMany + " Numbers: " + arrayNumbers);
		return arrayNumbers;
	};

	function generateCrystalButtons() {

		for (var i = 0; i < howManyCrystals; i++) {

    		// For each iteration, we will create an crystalButton
    		var crystalButton = $("<button>");

    		// First each crystalButton will be given the class ".crystal".
    		// This will allow the CSS to take effect.
    		crystalButton.addClass("crystal");

    		// Each crystalButton will be assigned a crystal image at random.
    		crystalButton.attr("value", i+1);
    		// console.log("imageColors[" + crystalColors[i] + "] = " + imageColors[crystalColors[i]]);
    		crystalButton.attr("style", "background: url(assets/images/" + imageColors[crystalColors[i]] + ".jpg)");

    		// Each crystalButton will be given a data attribute called data-crystalValue.
    		// This data attribute will be set equal to the array value.
    		crystalButton.attr("data-crystalValue", crystalValues[i]);

    		// Lastly, each crystalButton (with all it classes and attributes) will get added to the page.
    		$("#crystals").append(crystalButton);
    	}
    };

    function initializeGame() {

    	matchNumber = 0;
    	currentScore = 0;

    	$("#totalScore").text(currentScore);
    	$("#wins").text("Wins: " + wins);
    	$("#losses").text("Losses: " + losses);

    	matchNumber = randomizeBetween(19, 120, 1, true);

    	$("#matchNumber").text(matchNumber);

    	$('#crystals').empty();

    	howManyCrystals = randomizeBetween(4, 8, 1, true);
    	crystalValues = randomizeBetween(1, 12, howManyCrystals, true);
    	crystalColors = randomizeBetween(0, 7, howManyCrystals, true);

    	generateCrystalButtons();
    };

	// MAIN PROCESS
	// ==========================================================================

	function newGame() {

		// console.log(this);

		initializeGame();

		// Add an on click listener to all elements that have the class "crystal"
		$(".crystal").on("click", function() {

        	// Set the value of the crystal in the data portion of the object.
        	currentScore += parseInt($(this).attr("data-crystalValue"));
        	// console.log($(this).attr("data-crystalValue"));

        	$("#totalScore").text(currentScore);
        	// console.log("currentScore = ", currentScore);
        	// console.log("matchNumber = ", parseInt(matchNumber));

        	if (currentScore === parseInt(matchNumber)){
        		wins++;
        		$("#wins").text("Wins: " + wins);
        		// console.log("You Win!!")
        		newGame();
        	}
        	else if (currentScore > parseInt(matchNumber)){
        		losses++;
        		$("#losses").text("Losses: " + losses);
        		// console.log("You Lose!")
        		newGame();
        	}

        });

	}

	newGame();

});