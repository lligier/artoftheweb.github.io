const playButton = document.getElementById('playbutton');
const wrapper = document.getElementById('wrapper');
const findOutButton = document.getElementById('findoutbutton');
const questionScreen = document.getElementById('questionScreen');
const answerScreen = document.getElementById('answerScreen');
const ball = document.getElementById('ball');

playButton.addEventListener('click', function() {
    if (!wrapper.classList.contains('slide-out')) {
        getQuestion();
        // If the wrapper is not already sliding out, transition to the question screen
        wrapper.classList.add('slide-out');
        playButton.textContent = "FIND OUT"; // Change the text of the button
        questionScreen.classList.add('slide-in');
    } else if (questionScreen.classList.contains('slide-in') && !answerScreen.classList.contains('slide-in')) {
        askMagic8Ball(); 

        // If the question screen is sliding in and the answer screen is not sliding in, transition to the answer screen
        questionScreen.classList.remove('slide-in');
        answerScreen.classList.add('slide-in');
        playButton.textContent = "PLAY AGAIN";
    } else {
        // If the answer screen is sliding in, transition back to the wrapper
        answerScreen.classList.remove('slide-in');
        wrapper.classList.remove('slide-out');
        playButton.textContent = "LET'S PLAY";
        ball.classList.remove('shake');
    }
});


// User presses the button and when they do,
// the ball will shake and it will respond with 1 of 4 responses randomly
const questions = [
  "Will __________ get better this year?",
  "Will I find __________?",
  "Will __________ work out for me?",
  "Will __________ happen in my life this year?",
  "Will __________ go well for me?",
  "Is it a good idea to invest in __________ right now?",
  "Will I overcome __________ and find peace/happiness?",
  "Is now the time to pursue my dream of __________?",
  "Will I meet someone special who __________?",
  "Should I indulge in a spontaneous trip to __________?",
  "Is it beneficial for me to relocate to __________ for better opportunities?",
  "Will my creative project about __________ be well-received?",
  "Is it a good time to invest in __________ property?",
  "Will my financial situation improve, allowing me to __________?",
  "Is pursuing further education in __________ the right step for me?",
  "Is there a job offer for me related to my skills in __________?",
  "Should I take a leap of faith and pursue my passion for __________?",

];

const answers = [
  "Yes, definitely.",
  "Absolutely Not.",
  "It's...possible.",
  "Unreliable.. try again.",
];

function getQuestion() {
  // get random question
  var ques = questions[Math.floor(Math.random() * questions.length)];

  var quesBoxElem = document.getElementById("questions");
  var inputHTML =
    '<form><input type="text" id="questionInput" placeholder="Fill blank..."></form>';
    ques = ques.replace("__________", inputHTML);
  quesBoxElem.innerHTML = ques;
}


function askMagic8Ball() {


var inputField = document.getElementById("questionInput");
var ansElem = document.getElementById("answers");

//   Check if input field is empty
  if (inputField.value === "") {
    ansElem.innerHTML = "Fill in the blank to determine your prophecy";
    ansElem.classList.add("error-message");
  } else {
    ball.classList.add("shake");
    ansElem.classList.remove("error-message");
    ansElem.innerHTML = "";
    setTimeout(function() {
        var ans = answers[Math.floor(Math.random() * answers.length)];
        ansElem.innerHTML = ans;
    }, 1500); 
}
}