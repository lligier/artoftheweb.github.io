// BACKGROUND VARIABLES
let orgBgColor = "#87CEB7";
let colors = ['#ff0000', '#00ff00', '#0000ff'];
let currentColorIndex = 0; 
let colorChangeDirection = 1; 
let backgroundChangeInterval;
let scrollingTextInterval;

// CIRCLE VARIABLE
let img; 
let centerX,centerY; 
let startTime;

// METRONOME VARIABLES 
let angle = 0;
let direction = 1;

// // alarm play time
let duration = 30*1000; // 57 sec //DEMO WITH THIS 
let duration1 = 18*1000; // 18 sec

// IDs
let backgroundId;

// PRELOAD FUNCTION
function preload() {
  img=document.getElementById('movingImage');
  alarm = loadSound('alarm.mp3')
  firstAlarm = loadSound('firstSound.mp3');
}

// SETUP
function setup() {
  
  // Start met stick direction
  setInterval(changeDirection, 113);
  
  // Start moving the image every second
  setInterval(moveImage, 1000);
  
  // start sound
  soundCues();
}

// DRAW FUNCTION
function draw() {
  let stick = document.getElementById('met-stick');
  stick.style.transform = "rotate(" + angle + "deg)";
  angle = angle + direction;
}

// SOUND FUNCTIONS 

function soundCues() {
  
  // playSound(); // DEMO WITH THIS 
  // setInterval(playSound, 250000);  // play every 25 mins 
  
  // playFirstSound();
  // setInterval(playFirstSound,200000); //play every 20 mins
}

function playFirstSound() {
  
  if (firstAlarm.isLoaded()) {    
    firstAlarm.play();
    startText();
    firstAlarm.onended(stopText);

  } else {
    console.error('Sound file is not loaded yet');
  }
}

  
function playSound() {
  
  if (alarm.isLoaded()) {
    
    // delay 2 second for changing background color
    setTimeout(startBackgroundChange, 13000);  
    
    // play sound for only 20 sec
    var start = Date.now();
    var elapsed = Date.now() - start;
    
    alarm.play();
    
    setTimeout(() => {
    
      // timesup -- stop sound playing and background changing...
      alarm.stop();
      stopBackgroundChange();  
      
    }, duration);
    
  } else {
    console.error('Sound file is not loaded yet');
  }
}

//FLASHING BACKGROUND
function changeBackground() {
  
  // Changing background color
  currentColorIndex = (currentColorIndex + 1) % colors.length;
  document.body.style.backgroundColor = colors[currentColorIndex]; 
  
  // scrolling text board
  let textContainer = document.getElementById('text-container');
  let textBoard = document.getElementById('text-board');
  textBoard.className =  "scrolling-text"; 
  textBoard.style.display =  "block";  
  textContainer.style.display =  "block";  
  
}

function startBackgroundChange() {
  backgroundId = setInterval(changeBackground,1000);
}

function stopBackgroundChange() {
  
  clearInterval(backgroundId);
  
  document.body.style.backgroundColor = orgBgColor;
  
  let textContainer = document.getElementById('text-container');
  let textBoard = document.getElementById('text-board');
  textBoard.className =  ""; 
  textBoard.style.display =  "none";  
  textContainer.style.display =  "none"; 
}

function startText() {
    let textContainer1 = document.getElementById('text-container');
    let textBoard1 = document.getElementById('text-board1');
    textBoard1.className =  "scrolling-text"; 
    textBoard1.style.display =  "block";  
    textContainer1.style.display =  "block";  
  
}

function stopText() {
    let textContainer1 = document.getElementById('text-container1');
    let textBoard1 = document.getElementById('text-board1');
    textBoard1.className =  "scrolling-text"; 
    textBoard1.style.display =  "none";  
    textContainer1.style.display =  "none";  
  
}

// METRONOME MOVES 
function changeDirection() {
  if (angle >= 30) {
    direction = -1;
  } else if (angle <= -30) {
    direction = 1;
  }
}

// TIME STARTS HERE
function updatedTime() {
  
  var hrElem = document.getElementById('hour1');
  var minElem = document.getElementById('minute1');
  var secElem = document.getElementById('second1');

  var current = new Date();
  // console.log(current);
  var hours = current.getHours()%12; 
  var minutes = current.getMinutes();
  var seconds = current.getSeconds();

  // Add a zero before the time if the hours, minutes, and seconds are less than 10 
  if (hours < 10) {
    hours = "0" + hours;
  }

  if (minutes < 10) {
    minutes = "0" + minutes; 
  }

  if (seconds < 10) {
    seconds = "0" + seconds;
  }
  
  hrElem.innerHTML=hours;
  minElem.innerHTML=minutes;
  secElem.innerHTML=seconds;
}

// PROGRESS CIRCLE 
function moveImage() {
  let now = new Date();
  let hour = now.getHours();
  let minute = now.getMinutes();
  let second = now.getSeconds();
  let totalSeconds = hour * 3600 + minute * 60 + second;
  let angle = map(totalSeconds, 0, 3600, -90, 270);

  angle = radians(angle);
  
  let circleElement = document.getElementById('circle1');
  let circleRect = circleElement.getBoundingClientRect();
  let centerX = circleRect.left + circleRect.width / 2;
  let centerY = circleRect.top + circleRect.height / 2;
  let circleRadius = circleRect.width / 2;
  
  let imageWidth = img.offsetWidth; 
  let imageHeight = img. offsetHeight;
  
  let x = centerX - imageWidth / 2 + circleRadius * Math.cos(angle);
  let y = centerY - imageHeight / 2 + circleRadius * Math.sin(angle);


  // Set the position of the image
  img.style.left = x + 'px';
  img.style.top = y + 'px';
  
}

// Call the function
updatedTime();
setInterval(updatedTime, 1000);

