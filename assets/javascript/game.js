// VARIABLES
// ==========================================================================

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

	console.log("Generated " + howMany + " Numbers: " + arrayNumbers);
	return arrayNumbers;
};

function initializeGame() {
	var total = wins = losses = 0;
	var matchNumber = "";
	var howManyCrystals = "";
	var crystalValues = [];
	var crystalColors = [];
};

// MAIN PROCESS
// ==========================================================================

$(document).ready(function() {

	console.log(this);
	var imageColors = ["blue", "green", "red", "yellow"];

	initializeGame();

	total = wins = losses = 0;
	$("#totalScore").text(total);
	
	matchNumber = randomizeBetween(19, 120, 1, true);

	$("#matchNumber").text(matchNumber);

	howManyCrystals = randomizeBetween(3, 6, 1, true);
	crystalValues = randomizeBetween(1, 12, howManyCrystals, true);
	crystalColors = randomizeBetween(0, 3, howManyCrystals, false);

	for (var i = 0; i < howManyCrystals; i++) {

    	// For each iteration, we will create an imageCrystal
    	var crystalButton = $("<button>");
    	var crystalImage = $("<img>");
    	var imageName = "";

    	// First each crystal will be given the class ".crystal-image".
    	// This will allow the CSS to take effect.
    	crystalButton.addClass("crystal");

    	// Each imageCrystal will be given a src link to the crystal image
    	crystalButton.attr("value", i+1);

    	console.log("imageColors[" + crystalColors[i] + "] = " + imageColors[crystalColors[i]]);
    	crystalButton.attr("style", "background: url(assets/images/" + imageColors[crystalColors[i]] + ".png)");

    	// imageName = imageColors[i].concat("", ".png");
    	// console.log("imageName = " + imageName);
    	// crystalImage.attr("src", imageName);

    	// Each imageCrystal will be given a data attribute called data-crystalValue.
    	// This data attribute will be set equal to the array value.
    	crystalButton.attr("data-crystalValue", crystalValues[i]);

    	// Lastly, each crystal image (with all it classes and attributes) will get added to the page.
    	$("#crystals").append(crystalButton);
    }

	// Add an on click listener to all elements that have the class "crystal"
	$(".crystal").on("click", function() {

        // Set the HTML of the #operator to the text of what was clicked
        total += parseInt($(this).attr("data-crystalValue"));
        console.log($(this).attr("data-crystalValue"));
        console.log("total = ", total);

        $("#totalScore").text(total);


        console.log(this);
    });

        $("#wins").text("Wins: " + wins);

    	$("#losses").text("Losses: " + losses);


});