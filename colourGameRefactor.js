let numberOfSquares = 6;
let colours = [];
let colourPicked;
let h1 = document.querySelector("h1");
let colourDisplay = document.getElementById("colourDisplay");
let messageDisplay = document.querySelector("#message");
let squares = document.querySelectorAll(".square");
let resetButton = document.querySelector("#reset");
let modeButtons = document.querySelectorAll(".mode")

init();

function init() {
	// mode buttons event listeners
	setupModeButtons();

	// setup squares
	setupSquares();
	reset();
}

function setupModeButtons() {
	for(let i = 0; i < modeButtons.length; i++) {
		modeButtons[i].addEventListener("click", function() {
			modeButtons[0].classList.remove("selected");	
			modeButtons[1].classList.remove("selected");	
			this.classList.add("selected");

			this.textContent === "Easy" ? numberOfSquares = 3: numberOfSquares = 6; 
			reset()
		})
	}
}

function setupSquares() {
	for(let i = 0; i < squares.length; i++ ) {
		// add click listeners to squares
		squares[i].addEventListener("click", function() {
			// grab clicked colour rgb value
			let clickedColour = this.style.backgroundColor;
			// correct
			if(clickedColour === colourPicked) {
				messageDisplay.textContent = "Correct!!";
				changeColour(clickedColour);
				h1.style.backgroundColor = colourPicked;
				resetButton.textContent = "Play Again!"
			}
			// incorrect
			else {
				this.style.backgroundColor = "rgb(79, 74, 70)";
				messageDisplay.textContent = "Wrong, Try Again Please";
			}
		})
	}
}

// reset (refactor) function
function reset() {
	// generate all new colours
	colours = generateRandomColours(numberOfSquares);

	// pick a new random colour
	colourPicked = pickColour();

	//change colourDisplay to picked colour
	colourDisplay.textContent = colourPicked;

	// change colours of sqaures
	for(let i = 0; i < squares.length; i++) {
		if(colours[i]) {
			squares[i].style.display = "block";
			squares[i].style.backgroundColor = colours[i];
		} else {
			squares[i].style.display = "none";
		}
	}
	h1.style.backgroundColor = "rgb(234, 53, 69)";
	resetButton.textContent = "New colours"
	messageDisplay.textContent = "";	
} 

// reset colours button logic
resetButton.addEventListener("click", function() {
	reset();
})

// Change colour of all squares function
function changeColour(colour) {
	// loop through all squares
	for(let i = 0; i < squares.length; i++) {
		// change colour of all squares
		squares[i].style.backgroundColor = colour;
	}

}

// pickColour function
function pickColour() {
	let random = Math.floor(Math.random() * colours.length);
	return colours[random];
}

function generateRandomColours(num) {
	// make an array
	let arr = [];
	// repeat num times
	for(let i = 0; i < num; i++) {
		// get random colour and push to arr
		arr.push(randomColour());
	}
	// return that array
	return arr;
}

function randomColour() {
	// pick a red form 0 - 255
	let r  = Math.floor(Math.random() * 256);
	// pick a green form 0 - 255
	let g  = Math.floor(Math.random() * 256);
	// pick a blue form 0 - 255
	let b  = Math.floor(Math.random() * 256);

	// return rgb values in a string
	return `rgb(${r}, ${g}, ${b})`
}
