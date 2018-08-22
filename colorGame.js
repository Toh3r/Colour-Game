//Check js page is connected
console.log("Connected");

//Declare variables
var numSquares = 5;
var colors= [];
var pickedColor;

//Select elements
var squares = document.querySelectorAll(".square");
var colorDisplay = document.getElementById("colorDisplay");
var messageDisplay = document.querySelector("#message");
var h1 = document.querySelector("h1");
var resetButton = document.querySelector("#reset");
var modeButtons = document.querySelectorAll(".mode");

//Call function when page is created
init();

function init(){
	setUpModeButtons();
	setUpSquares();
	reset();
}

function setUpModeButtons(){
	for(var i = 0; i < modeButtons.length; i++){
		//Set up mode button listeners
		modeButtons[i].addEventListener("click", function(){
			//Remove selected class from both buttons
			modeButtons[0].classList.remove("selected");
			modeButtons[1].classList.remove("selected");
			//Then apply it to the clicked button
			this.classList.add("selected");
			//turnary operator (used insted of if/else)
			this.textContent === "Easy" ? numSquares = 2: numSquares = 5;
			reset();
		});
	}
}

function setUpSquares(){
	//Set up square button listeners
	for(var i = 0; i < squares.length; i++){
		//Add listeners to squares
		squares[i].addEventListener("click", function(){
			//Get color of picked square
			var clickedColor = this.style.background;
			//If correct square picked
			if(clickedColor === pickedColor) {
				//Change message diplay
				messageDisplay.textContent = "Correct";
				//Change reset button display
				resetButton.textContent = "Play Again";
				//Change all squares to correct colour
				changeColors(clickedColor);
				h1.style.background = clickedColor;
			} else {
				//Change square to background color
				this.style.background = "#232323";
				messageDisplay.textContent = "Try Again";
			}
		});
	}
}

function reset(){
	//Create numSquares new random colours
	colors = generateRandomColors(numSquares);
	//Slect new correct colour
	pickedColor = pickColor();
	//Change display to correct colour
	colorDisplay.textContent = pickedColor;

	resetButton.textContent = "New Colors";
	//Change colours of the squares
	for(var i = 0; i < squares.length; i++){
		if(colors[i]){
			squares[i].style.display = "block";
			//Add colours to squares
			squares[i].style.background = colors[i];
		} else {
			squares[i].style.display = "none";
		}
	}
	//Change background
	h1.style.background = "steelblue";
	messageDisplay.textContent = "";

}

resetButton.addEventListener("click", function(){
	reset();
});

//Create function to change all colors
function changeColors(color){
	//Change colors of all squares using for loop
	for(var i = 0; i < squares.length; i++) {
		squares[i].style.background = color;
	}
}

//Create function to pick random colour from colors array using math.random()
function pickColor(){
	var random = Math.floor(Math.random() * colors.length);
	//Return random colour from array
	return colors[random];
}

function generateRandomColors(num){
	//Create array
	var arr = [];

	//repeat num times
	for(var i = 0; i <= num; i++){
		//Add random colour to array
		arr.push(randomColor());
	}

	//Return array of random colours
	return arr;
}

function randomColor(){
	//Generate red value
	var r = Math.floor(Math.random() * 256);
	//Generate green value
	var g = Math.floor(Math.random() * 256);
	//Generate blue value
	var b = Math.floor(Math.random() * 256);

	return "rgb(" + r + ", " + g + ", " + b + ")";
}