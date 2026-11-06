const currentUser = JSON.parse(localStorage.getItem("currentUser"));

if (!currentUser) {
  window.location.href = "index.html";
}
let questions = [];
let currentQuestionIndex = 0;
let score = 0;
let selectedAnswer = null;

const studentName = document.getElementById("studentName");

const questionNumber = document.getElementById("questionNumber");

const questionText = document.getElementById("questionText");

const answersContainer = document.getElementById("answersContainer");

const nextBtn = document.getElementById("nextBtn");

const quizMessage = document.getElementById("quizMessage");

const progressBar = document.getElementById("progressBar");

const progressText = document.getElementById("progressText");

if (currentUser) {
  studentName.textContent = currentUser.name;
}

async function loadQuestions() {
  try {
    const response = await fetch("Data/questions.json");
    if (!response.ok) {
      throw new Error("Failed to load questions.");
    }
    questions = await response.json();
    displayQuestions();
  } catch (error) {
    quizMessage.textContent =
      "Sorry! Questions could not be loaded. Please try again.";

    quizMessage.className = "alert alert-danger";

    quizMessage.style.display = "block";

    questionText.textContent = "Unable to load quiz.";

    nextBtn.disabled = true;

    console.error(error);
  }
}

function displayQuestion() {
  const currentQuestion = questions[currentQuestionIndex];
  selectedAnswer = null;
  nextBtn.disabled = true;
  quizMessage.style.display = "none";
  questionNumber.textContent = `Question ${currentQuestionIndex + 1} of ${questions.length}`;
  questionText.textContent = currentQuestion.question;
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  progressBar.style.width = `${progress}%`;

  progressText.textContent = `${Math.round(progress)}%`;
  answersContainer.innerHTML = "";
  currentQuestion.options.forEach(function (option, index) {
    const answerButton = document.createElement("button");
    answerButton.className = "answer-option";
    answerButton.textContent = option;
    answerButton.dataset.index = index;
    answerButton.addEventListener("click", function () {
      selectAnswer(index, answerButton);
    });
    answersContainer.appendChild(answerButton);
  });
}

function selectAnswer(index, selectedButton) {
  selectedAnswer = index;
  const allButtons = document.querySelectorAll(".answer-option");
  allButtons.forEach(function (button) {
    button.classList.remove("selected");
  });
  selectedButton.classList.add("selected");
  nextBtn.disabled = false;
}

nextBtn.addEventListener("click", function () {
  if (selectedAnswer === null) {
    quizMessage.textContent = "Please select an answer first.";
    quizMessage.className = "alert alert-warning";
    quizMessage.style.display = "block";

    return;
  }

  const currentQuestion = questions[currentQuestionIndex];
  if (selectedAnswer === currentQuestion.correctAnswer) {
    score++;
  }

  currentQuestionIndex++;

  if (currentQuestionIndex < questions.length) {
    displayQuestion();
  } else {
    finishQuiz();
  }
});



function finishQuiz() {
    const quizResult = {

        studentId: currentUser.id,
        studentName: currentUser.name,
        score: score,
        totalQuestions: questions.length

    };
    localStorage.setItem("quizScore", JSON.stringify(quizResult));
    window.location.href = "result.html";

}
loadQuestions();