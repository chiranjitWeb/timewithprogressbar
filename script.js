// script.js

const questions = [
  "What is 24 x 34?",
  "What is the capital of France?",
  "Solve 5 + 7",
  "What is the largest planet?",
  "Who wrote 'To Kill a Mockingbird'?",
  "What is the speed of light?",
  "What is 15 / 3?",
  "Name a primary color.",
  "What is the square root of 64?",
  "Who painted the Mona Lisa?"
];

let currentQuestionIndex = 0;
let timeLeft = 30; // 50 minutes in seconds
let timerInterval;

const timerElement = document.getElementById('timer');
const timerCircle = document.getElementById('timer-circle');
const questionElement = document.getElementById('question');
const progressSteps = document.querySelectorAll('.progress-step');
const circleCircumference = 2 * Math.PI * 45; // 2πr where r is the radius of the circle

//console.log(circleCircumference);

function startTimer() {
  timerElement.textContent = formatTime(timeLeft);
  timerCircle.style.strokeDashoffset = '0';
  timerInterval = setInterval(() => {
    timeLeft--;
    timerElement.textContent = formatTime(timeLeft);
    updateCircleProgress(timeLeft);

    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      timerElement.textContent = "00:00";
      timerCircle.style.strokeDashoffset = `${circleCircumference}`;
      setTimeout(nextQuestion, 1000); // Wait for 1 second before going to next question
    }
  }, 1000);
}

function resetTimer() {
  clearInterval(timerInterval);
  timeLeft = 30; // Reset to 50 minutes
  startTimer();
}

function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  //console.log(minutes);
  const remainingSeconds = seconds % 60;
  //console.log(remainingSeconds);
  return `${minutes}:${remainingSeconds < 10 ? '0' + remainingSeconds : remainingSeconds}`;
}

function updateCircleProgress(timeLeft) {
  //console.log(timeLeft);
  const progress = timeLeft / 30; // Calculate the remaining progress
   //console.log(progress);
  const offset = circleCircumference * (1 - progress); // Calculate the stroke dash offset
  //console.log(offset);
  timerCircle.style.strokeDashoffset = offset;
}

function showQuestion(index) {
  questionElement.textContent = questions[index];
  //console.log(questionElement.textContent);
}

function activateStep(stepIndex) {
  progressSteps.forEach((step, index) => {
    if (index <= stepIndex) {
      step.classList.add('active');
    } else {
      step.classList.remove('active');
    }
  });
}

function nextQuestion() {
  if (currentQuestionIndex < questions.length - 1) {
    currentQuestionIndex++;
    showQuestion(currentQuestionIndex);
    activateStep(currentQuestionIndex);
    resetTimer();
  } else {
    clearInterval(timerInterval);
    alert("Quiz completed!");
    // Additional actions can be taken here, such as showing results
  }
}

window.onload = () => {
  showQuestion(currentQuestionIndex);
  activateStep(currentQuestionIndex);
  startTimer();
};

// Example of progressing to the next step manually (e.g., through a button click)
document.getElementById('next-button').onclick = nextQuestion;
