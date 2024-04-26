let numCols=10;
let numRows = 10;
let squares = [];
let activeSquareIndex = 0; // Index of the currently active square
let lastFillTime = 0;
let fillIntervalMs = (1000 * 60) / 77;
let song;
let amplitude;
let lowerThreshold = 0.1;
let canvasSize;
let filledSquares=0;

// PITCH VARIABLE SETUP
let audioContext;
const model_url =
  "https://cdn.jsdelivr.net/gh/ml5js/ml5-data-and-models/models/pitch-detection/crepe/";
const keyRatio = 0.58;
const scale = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
let currentNote = "";
let colors = [];

function preload() {
  song = loadSound('bruno.mp3', loaded);
}

function setup() {
  let canvasContainer = document.getElementById("container");
  canvasSize = Math.min(window.innerWidth, window.innerHeight) * 0.8;
  let squareSize = canvasSize / numCols;

  let canvas = createCanvas(canvasSize, canvasSize);
  canvas.parent("container");

  
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
  song.play();


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
function draw() {
  noStroke();
  background(255);
  let level = amplitude.getLevel();
  let brightness = map(level, 0, 1, 50, 100); 

  let mappedColor;
  print("Note: " + currentNote + ", Vol: " + level);



  // Draw squares
  for (let i = 0; i < squares.length; i++) {
    let square = squares[i];
    fill(square.color);
    rect(square.x, square.y, square.size, square.size);
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
        squares[activeSquareIndex].color = color(240, 48, 36);
      } else {
        squares[activeSquareIndex].color = color(350, 25, 100); 
      }
    }
    getPitch(); // Keep listening for pitch changes
  });
}