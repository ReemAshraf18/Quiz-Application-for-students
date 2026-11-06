const currentUser = JSON.parse(localStorage.getItem("currentUser"));
if (!currentUser) {
  window.location.href = "index.html";
}
const quizResult = JSON.parse(localStorage.getItem("quizScore"));
if (!currentUser || !quizResult || quizResult.studentId !== currentUser.id) {
  window.location.href = "quiz.html";
}
const resultName = document.getElementById("resultName");
const finalScore = document.getElementById("finalScore");
const percentage = document.getElementById("percentage");
const resultStatus = document.getElementById("resultStatus");
const historyContainer = document.getElementById("historyContainer");
const tryAgainBtn = document.getElementById("tryAgainBtn");
if (quizResult && currentUser) {
  resultName.textContent = quizResult.studentName;
  finalScore.textContent = `${quizResult.score} / ${quizResult.totalQuestions}`;
  percentage.textContent = `${quizResult.percentage}%`;
  if (quizResult.percentage >= 50) {
    resultStatus.textContent = "Congratulations! You Passed.";
    resultStatus.className = "alert alert-success";
  } else {
    resultStatus.textContent = "Sorry! You Failed. Try Again.";
    resultStatus.className = "alert alert-danger";
  }
}
function saveResultHistory() {
  let history = JSON.parse(localStorage.getItem("resultHistory")) || [];
  const alreadySaved = history.some(function (item) {
    return item.attemptId === quizResult.attemptId;
  });

  if (!alreadySaved) {
    const newAttempt = {
      attemptId: quizResult.attemptId,
      studentId: quizResult.studentId,
      studentName: quizResult.studentName,
      score: quizResult.score,
      totalQuestions: quizResult.totalQuestions,
      percentage: quizResult.percentage,
      date: quizResult.date,
    };
    history.push(newAttempt);
    localStorage.setItem("resultHistory", JSON.stringify(history));
  }
}
function displayHistory() {
  const history = JSON.parse(localStorage.getItem("resultHistory")) || [];
  const studentHistory = history.filter(function (item) {
    return item.studentId === currentUser.id;
  });
  historyContainer.innerHTML = "";
  if (studentHistory.length === 0) {
    historyContainer.textContent = "No previous attempts found.";
    return;
  }
  const table = document.createElement("table");
  table.className = "table table-striped table-bordered";
  const thead = document.createElement("thead");
  thead.innerHTML = `
        <tr>
            <th>Date</th>
            <th>Score</th>
            <th>Percentage</th>
            <th>Status</th>
        </tr>
    `;
  const tbody = document.createElement("tbody");
  // Show newest attempts first
  studentHistory.reverse().forEach(function (attempt) {
    const row = document.createElement("tr");
    const dateCell = document.createElement("td");
    const scoreCell = document.createElement("td");
    const percentageCell = document.createElement("td");
    const statusCell = document.createElement("td");
    dateCell.textContent = new Date(attempt.date).toLocaleString();
    scoreCell.textContent = `${attempt.score} / ${attempt.totalQuestions}`;
    percentageCell.textContent = `${attempt.percentage}%`;
    statusCell.textContent = attempt.percentage >= 50 ? "Pass" : "Fail";
    statusCell.className =
      attempt.percentage >= 50 ? "text-success fw-bold" : "text-danger fw-bold";
    row.appendChild(dateCell);
    row.appendChild(scoreCell);
    row.appendChild(percentageCell);
    row.appendChild(statusCell);
    tbody.appendChild(row);
  });
  table.appendChild(thead);
  table.appendChild(tbody);
  historyContainer.appendChild(table);
}
tryAgainBtn.addEventListener("click", function () {
  localStorage.removeItem("quizScore");
  localStorage.removeItem("quizProgress");
  window.location.href = "quiz.html";
});
if (quizResult && currentUser) {
  saveResultHistory();
  displayHistory();
}
