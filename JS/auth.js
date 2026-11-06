//regiteration Form

const registerForm = document.getElementById("registerForm");
if (registerForm) {
  registerForm.addEventListener("submit", function (event) {
    event.preventDefault();
    const name = document.getElementById("fullName").value.trim();
    const email = document.getElementById("registerEmail").value.trim();
    const password = document.getElementById("registerPassword").value;
    const confirmPassword = document.getElementById("confirmPassword").value;
    const message = document.getElementById("registerMessage");
    function showRegisterMessage(text, type) {
      message.textContent = text;
      message.className = `alert alert-${type} message`;
      message.style.display = "block";
    }
    if (!name || !email || !password || !confirmPassword) {
      showRegisterMessage("Please Fill in all Fields!", "danger");
      return;
    }
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      showRegisterMessage("Please Enter a valid email", "danger");
      return;
    }
    if (password.length < 6) {
      showRegisterMessage("Password must be at least 6 characters.", "danger");
      return;
    }
    if (password != confirmPassword) {
      showRegisterMessage("Passwords Do Not Match!", "danger");
      return;
    }
    let students = JSON.parse(localStorage.getItem("students")) || [];
    const existingStudent = students.find(function (student) {
      return student.email.toLowerCase() === email.toLowerCase();
    });
    if (existingStudent) {
      showRegisterMessage("This email is already registered!", "danger");
      return;
    }
    const newStudent = {
      id: Date.now(),
      name: name,
      email: email,
      password: password,
    };
    students.push(newStudent);
    localStorage.setItem("students", JSON.stringify(students));
    showRegisterMessage("Account Created Successfully!", "success");
    setTimeout(function () {
      window.location.href = "index.html";
    }, 1000);
  });
}

//login Form

const loginForm = document.getElementById("loginForm");
if (loginForm) {
  loginForm.addEventListener("submit", function (event) {
    event.preventDefault();
    const email = document.getElementById("loginEmail").value.trim();
    const password = document.getElementById("loginPassword").value;
    const message = document.getElementById("loginMessage");
    function showLoginMessage(text, type) {
      message.textContent = text;
      message.className = `alert alert-${type} message`;
      message.style.display = "block";
    }
    if (!email || !password) {
      showLoginMessage("Please Enter Email and Password!", "danger");
      return;
    }
    const students = JSON.parse(localStorage.getItem("students")) || [];
    const student = students.find(function (item) {
      return item.email.toLowerCase() === email.toLowerCase();
    });
    if(!student)
    {
        showLoginMessage("Email is not Registered!", "danger");
        return;
    }
    if(student.password !==password)
    {
        showLoginMessage("Incorrect Password!", "danger");
        return;
    }
    const currentUser = {
        id: student.id,
        name: student.name,
        email: student.email
    };
    localStorage.setItem("currentUser", JSON.stringify(currentUser));
    window.location.href = "quiz.html";
  });
}


//logout

const logoutButton = document.getElementById("logoutBtn");
if(logoutButton)
{
    logoutButton.addEventListener("click", function(){
        localStorage.removeItem("currentUser");
        window.location.href = "index.html";
    })
}
