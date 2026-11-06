const currentUser = JSON.parse(localStorage.getItem("currentUser"));

if (!currentUser) {
  window.location.href = "index.html";
}
let questions = [];
let currentQuestionIndex = 0;
let score = 0;
let selectedAnswer = null;
let answers = [];
let timerInterval = null;
let questionDeadline = null;
const QUESTION_TIME = 30;

const studentName = document.getElementById("studentName");
const questionNumber = document.getElementById("questionNumber");
const questionText = document.getElementById("questionText");
const answersContainer = document.getElementById("answersContainer");
const nextBtn = document.getElementById("nextBtn");
const previousBtn = document.getElementById("previousBtn");
const quizMessage = document.getElementById("quizMessage");
const progressBar = document.getElementById("progressBar");
const progressText = document.getElementById("progressText");
const timerElement = document.getElementById("timer");
const PROGRESS_KEY = "quizProgress";
if (currentUser) {
  studentName.textContent = currentUser.name;
}
if (currentUser) {
  studentName.textContent = currentUser.name;
}

function shuffleQuestions(array) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const randomIndex = Math.floor(Math.random() * (i + 1));

    [shuffled[i], shuffled[randomIndex]] = [shuffled[randomIndex], shuffled[i]];
  }

  return shuffled;
}
function saveProgress() {
  const progress = {
    studentId: currentUser.id,
    questions: questions,
    currentQuestionIndex: currentQuestionIndex,
    score: calculateScore(),
    answers: answers,
    questionDeadline: questionDeadline,
  };

  localStorage.setItem(PROGRESS_KEY, JSON.stringify(progress));
}

function calculateScore() {
  let totalScore = 0;
  answers.forEach(function (answer, index) {
    if (answer !== null && answer === questions[index].correctAnswer) {
      totalScore++;
    }
  });
  return totalScore;
}

async function loadQuestions() {
  try {
    const response = await fetch("Data/questions.json");
    if (!response.ok) {
      throw new Error("Failed to load questions");
    }
    const data = await response.json();
    const savedProgress = JSON.parse(localStorage.getItem(PROGRESS_KEY));
    if (savedProgress && savedProgress.studentId === currentUser.id) {
      if (
        Array.isArray(savedProgress.questions) &&
        savedProgress.questions.length > 0 &&
        Array.isArray(savedProgress.answers) &&
        savedProgress.answers.length === savedProgress.questions.length &&
        Number.isInteger(savedProgress.currentQuestionIndex) &&
        savedProgress.currentQuestionIndex >= 0 &&
        savedProgress.currentQuestionIndex < savedProgress.questions.length
      ) {
        questions = savedProgress.questions;
        currentQuestionIndex = savedProgress.currentQuestionIndex;
        answers = savedProgress.answers;
        questionDeadline = savedProgress.questionDeadline;
      } else {
        startNewQuiz(data);
      }
    } else {
      startNewQuiz(data);
    }
    displayQuestion();
  } catch (error) {
    quizMessage.textContent = "Sorry! Questions could not be loaded.";

    quizMessage.className = "alert alert-danger";
    quizMessage.style.display = "block";

    questionText.textContent = "Unable to load quiz.";
    nextBtn.disabled = true;

    console.error(error);
  }
}

function startNewQuiz(data) {
  questions = shuffleQuestions(data);
  currentQuestionIndex = 0;
  answers = new Array(questions.length).fill(null);
  questionDeadline = Date.now() + QUESTION_TIME * 1000;
  saveProgress();
}

function displayQuestion() {
  const currentQuestion = questions[currentQuestionIndex];

  if (!currentQuestion) return;

  quizMessage.style.display = "none";

  questionNumber.textContent = `Question ${currentQuestionIndex + 1} of ${questions.length}`;

  questionText.textContent = currentQuestion.question;
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  progressBar.style.width = `${progress}%`;
  progressText.textContent = `${Math.round(progress)}%`;
  previousBtn.disabled = currentQuestionIndex === 0;
  nextBtn.textContent =
    currentQuestionIndex === questions.length - 1 ? "Finish Quiz" : "Next";
  answersContainer.innerHTML = "";

  currentQuestion.options.forEach(function (option, index) {
    const answerButton = document.createElement("button");

    answerButton.className = "answer-option";
    answerButton.textContent = option;
    if (answers[currentQuestionIndex] === index) {
      answerButton.classList.add("selected");
    }

    answerButton.addEventListener("click", function () {
      selectAnswer(index, answerButton);
    });

    answersContainer.appendChild(answerButton);
  });
  nextBtn.disabled = answers[currentQuestionIndex] === null;
  startTimer();
}

function selectAnswer(index, selectedButton) {
  answers[currentQuestionIndex] = index;
  const allButtons = document.querySelectorAll(".answer-option");
  allButtons.forEach(function (button) {
    button.classList.remove("selected");
  });
  selectedButton.classList.add("selected");
  nextBtn.disabled = false;
  saveProgress();
}

function startTimer() {
    clearInterval(timerInterval);
    if (!questionDeadline) {
        questionDeadline = Date.now() + QUESTION_TIME * 1000;
    }
    if (Date.now() >= questionDeadline) {
        goToNextQuestion();
        return;
    }
    updateTimer();
    timerInterval = setInterval(function() {
        updateTimer();
    }, 250);
}

function updateTimer() {
  const remainingTime = Math.max(
    0,
    Math.ceil((questionDeadline - Date.now()) / 1000),
  );
  timerElement.textContent = remainingTime;
  if (remainingTime <= 0) {
    clearInterval(timerInterval);
    goToNextQuestion();
  }
}

function goToNextQuestion() {
  clearInterval(timerInterval);
  if (currentQuestionIndex < questions.length - 1) {
    currentQuestionIndex++;
    questionDeadline = Date.now() + QUESTION_TIME * 1000;
    saveProgress();
    displayQuestion();
  } else {
    finishQuiz();
  }
}
nextBtn.addEventListener("click", function () {
  if (selectedAnswer === null) {
    quizMessage.textContent = "Please select an answer first.";
    quizMessage.className = "alert alert-warning";
    quizMessage.style.display = "block";
    return;
  }
  goToNextQuestion();
});

previousBtn.addEventListener("click", function () {
  if (currentQuestionIndex > 0) {
    clearInterval(timerInterval);
    currentQuestionIndex--;
    questionDeadline = Date.now() + QUESTION_TIME * 1000;
    saveProgress();
    displayQuestion();
  }
});

function finishQuiz() {
  clearInterval(timerInterval);
  const finalScore = calculateScore();
  const quizResult = {
    attemptId: Date.now(),
    studentId: currentUser.id,
    studentName: currentUser.name,
    score: finalScore,
    totalQuestions: questions.length,
    percentage: Math.round((finalScore / questions.length) * 100),
    date: new Date().toISOString(),
  };
  localStorage.setItem("quizScore", JSON.stringify(quizResult));
  localStorage.removeItem(PROGRESS_KEY);
  window.location.href = "result.html";
}

if (currentUser) {
  loadQuestions();
}
