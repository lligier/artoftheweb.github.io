let numCols = 10;
let numRows = 10;
let squares = [];
let activeSquareIndex = 0; // Index of the currently active square
let lastFillTime = 0;
let fillIntervalMs = (1000 * 60) / 77;
let song;
let amplitude;
let lowerThreshold = 0.1;
let canvasSize;
let filledSquares = 0;
let playing=false;
let exampleButton; 
let playButton;

// PITCH VARIABLE SETUP
let audioContext;
const model_url =
  "https://cdn.jsdelivr.net/gh/ml5js/ml5-data-and-models/models/pitch-detection/crepe/";
const keyRatio = 0.58;
const scale = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
let currentNote = "";
let colors = [];

function preload() {
  song = loadSound('bruno.mp3');
}

function playSongAndDraw() {
  if (!playing) {
    exampleButton.textContent = "Pause Example"; 
    if (song.isPlaying()) {
      song.playMode('restart');
      song.play(song.pauseTime);
    } else {
      song.play();
    }
    playing = true;
  } else {
    exampleButton.textContent = "Play Example"; // Update button text
    song.pause(); // Pause the song
    playing = false;
  }
}
document.addEventListener("DOMContentLoaded", function () {
  exampleButton = document.querySelector(".exampleButton");
  exampleButton.addEventListener("click", playSongAndDraw);
  
   playButton = document.querySelector(".playButton");
  playButton.addEventListener("click", startDrawing);
});

function startDrawing() {
  if (!playing) {
    playButton.textContent = "Pause Yours";
    playing = true;
    loop(); 
  } else {
    playButton.textContent = "Play Yours"; 
    playing = false;
    noLoop(); 
  }
}

function setup() {
  let canvasContainer = document.getElementById("container");
  let containerWidth = canvasContainer.offsetWidth; // Get container width
  let containerHeight = canvasContainer.offsetHeight; // Get container height

  // Choose the smaller dimension to ensure a square canvas
  let canvasSize = Math.min(containerWidth, containerHeight);
  
  let canvas = createCanvas(canvasSize, canvasSize);
  canvas.parent("container");
  
    let squareSize = canvasSize / numCols;


  //   PICKUP PITCH FROM MIC
  mic = new p5.AudioIn();
  mic.start(startPitch);
  function startPitch() {
    pitch = ml5.pitchDetection(model_url, audioContext, mic.stream, modelLoaded);
  }

  // GET VOLUME
  amplitude = new p5.Amplitude();
  amplitude.setInput(mic);
  audioContext = getAudioContext();


  for (let col = 0; col < numCols; col++) {
    for (let row = 0; row < numRows; row++) {
      let posX = col * squareSize;
      let posY = row * squareSize;
      let size = squareSize;
      squares.push({ x: posX, y: posY, size: size, color: color(255) });
    }
  }
  shuffle(squares, true);

  //Change the colorMode to HSB
  colorMode(HSB);

}
//Load the model and get the pitch
function modelLoaded() {
  getPitch();
}


// Draw on the canvas
let whiteSquaresRemaining = squares.filter(square => square.color === color(255)).length;
let allWhiteSquaresFilled = false;

function fillWhiteSquares() {
  for (let i = 0; i < squares.length; i++) {
    let square = squares[i];
    if (whiteSquaresRemaining > 0 && square.color === color(255)) {
      fill(square.color);
      rect(square.x, square.y, square.size, square.size);
      whiteSquaresRemaining--; // Decrease the count of white squares remaining
    } else if (whiteSquaresRemaining === 0) {
      allWhiteSquaresFilled = true;
      console.log("All white squares filled");
      break; // Exit the loop once all white squares are filled
    }
  }
}

function fillColoredSquares() {
  for (let i = 0; i < squares.length; i++) {
    let square = squares[i];
    fill(square.color);
    rect(square.x, square.y, square.size, square.size);
  }
}

function draw() {
  noStroke();
  background(255);
  let level = amplitude.getLevel();

  let mappedColor;
  print("Note: " + currentNote + ", Vol: " + level);

if(playing) {
  if (!allWhiteSquaresFilled) {
    fillWhiteSquares();
  } else {
    fillColoredSquares();
  }
}
  // Check if it's time to fill the next square
  let currentTime = millis();
  if (currentTime - lastFillTime >= fillIntervalMs && filledSquares < squares.length) {
    activeSquareIndex++;
    if (activeSquareIndex >= squares.length) {
      activeSquareIndex = 0;
    }
    lastFillTime = currentTime;
  }
}

//Get the pitch, find the closest note and set the fill color
function getPitch() {
  pitch.getPitch(function (err, frequency) {
    if (frequency) {
      midiNum = freqToMidi(frequency);
      currentNote = scale[midiNum % 12];

      // Check if the note has a '#' 
      let isSharp = currentNote.includes('#');
      if (isSharp) {
        squares[activeSquareIndex].color = color(218, 84, 80);
      } else {
        squares[activeSquareIndex].color = color(41,49,98);
      }
    }
    getPitch(); 
  });
}
