# Student Quiz Application — JavaScript Assignment

## 1. Project Goal

Build a complete **Quiz Application for students** using:

- HTML
- CSS
- Bootstrap
- JavaScript
- Local Storage

The application should allow a student to:

1. Register a new account.
2. Sign in with an existing account.
3. Start a quiz.
4. Answer questions.
5. See the final score on a result page.
6. Log out.

Do not use a backend or database for this assignment.

---

## 2. Main Requirements

Your project must include:

- Register page
- Login page
- Quiz page
- Final result page
- Logout feature
- Local Storage for student accounts
- Local Storage for the current logged-in student
- A separate JSON file containing quiz questions
- Questions stored as an **array of objects**
- JavaScript Fetch API to load the quiz questions
- Score calculation
- Basic form validation

---

## 3. Suggested Project Structure

Create your project like this:

```text
quiz-app/
│
├── index.html
├── register.html
├── quiz.html
├── result.html
│
├── css/
│   └── style.css
│
├── js/
│   ├── auth.js
│   ├── quiz.js
│   └── result.js
│
├── data/
│   └── questions.json
│
└── README.md
```

You may change the structure if you want, but keep your code organized.

---

# Part 1 — Register Page

## File

```text
register.html
```

Create a registration form.

The form should contain:

- Full Name
- Email
- Password
- Confirm Password
- Register button

**Hint:** Think about the input fields a registration form normally needs and use clear labels for each one.

## Registration Rules

When the student clicks **Register**:

1. Check that all fields are filled.
2. Check that the email is valid.
3. Check that the password has at least 6 characters.
4. Check that password and confirm password are equal.
5. Check that the email is not already registered.
6. Save the new student in Local Storage.
7. Redirect the student to the login page.

---

## Student Data Format

Store students as an array of objects.

**Hint:** Store students as an array. Each student should be an object containing an id, name, email, and password.

Store the array in Local Storage.

**Hint:** Use one clear Local Storage key for the full list of registered students.

Remember that Local Storage only stores strings.

**Hint:** Local Storage stores strings only, so convert arrays/objects before saving and convert them back after reading.

---

# Part 2 — Login Page

## File

```text
index.html
```

Create a login form containing:

- Email
- Password
- Login button
- Link to Register page

**Hint:** Keep the login form simple: email, password, login button, and a link to the register page.

## Login Requirements

When the student clicks **Login**:

1. Read the students from Local Storage.
2. Search for a student with the entered email.
3. Check if the password is correct.
4. If the data is correct:
   - Save the logged-in student in Local Storage.
   - Redirect the student to `quiz.html`.
5. If the data is incorrect:
   - Show an error message.

**Hint:** Store the currently logged-in student separately from the full students list.

**Hint:** Save the logged-in student in Local Storage after successful authentication.

---

# Part 3 — Protect the Quiz Page

A student should not be able to open:

```text
quiz.html
```

without logging in.

When `quiz.html` loads:

1. Check Local Storage for `currentUser`.
2. If `currentUser` does not exist:
   - Redirect the user to the login page.

**Hint:** When the quiz page loads, check whether a logged-in user exists. If not, redirect to the login page.

---

# Part 4 — Questions Data and Fetch API

## File

```text
data/questions.json
```

Store all quiz questions in a separate JSON file.

Your quiz should contain at least **10 questions**.

The JSON file should contain an array of objects.

**Hint:** The JSON file should contain an array of question objects. Each question should include an id, question text, answer choices, and the index of the correct answer.

`correctAnswer` represents the index of the correct answer.

**Hint:** Use the answer index to identify which choice is correct.

---

## Fetch Requirement

You must use the JavaScript **Fetch API** to load the questions from:

```text
data/questions.json
```

Do not write the full questions array directly inside `quiz.js`.

**Hint:** Use `fetch()` to request the JSON file, convert the response to JavaScript data, then start displaying the quiz. Handle loading errors with either Promise chaining or `async/await`.

---

## Fetch Requirements

Your project must:

1. Use `fetch()` to request the JSON file.
2. Convert the response from JSON into JavaScript data.

3. Save the returned data inside a JavaScript variable.
4. Display the quiz only after the data has loaded.
5. Handle errors using `.catch()` or `try...catch`.
6. Show a useful error message on the page if the questions cannot be loaded.

**Hint:** Show a friendly message inside the page if loading fails.

---

## Important: Use Live Server

Because you are using `fetch()` with a local JSON file, run the project using a local development server.

**Hint:** Run the project with a local development server such as VS Code Live Server instead of opening the HTML file directly.

because browsers may block local Fetch requests.

---

# Part 5 — Quiz Page

## File

```text
quiz.html
```

The quiz page should display:

- Student name
- Question number
- Question text
- Answer buttons or radio buttons
- Next button
- Quiz progress

**Hint:** Show the student name, current question number, question text, answer choices, and a Next button.

---

## Quiz Logic

**Hint:** Keep one variable for the current question position and another for the score.

**Hint:** Use the current question index to read one object from the questions array.

When the student selects an answer:

1. Get the selected answer.
2. Compare it with `correctAnswer`.
3. If it is correct, increase the score.

**Hint:** Increase the score only when the selected answer is correct.

Then go to the next question.

**Hint:** Move forward by increasing the current question index.

---

# Part 6 — Next Question

When the student clicks **Next**:

1. Make sure the student selected an answer.
2. Check if the answer is correct.
3. Update the score if needed.
4. Increase `currentQuestionIndex`.
5. Display the next question.

If there are no more questions:

1. Save the final score.
2. Redirect the student to `result.html`.

**Hint:** Save the final score before moving to the result page.

---

# Part 7 — Result Page

## File

```text
result.html
```

The result page should display:

- Student name
- Final score
- Total number of questions
- Percentage
- Pass or Fail message
- Try Again button
- Logout button

**Hint:** The result page should clearly show the student name, score, percentage, status, and action buttons.

---

## Calculate Percentage

**Hint:** Calculate the percentage by dividing the score by the total number of questions and multiplying by 100.

**Hint:** Test your percentage calculation with a simple score and total to make sure it is correct.

---

# Part 8 — Pass or Fail

**Hint:** Use a condition to decide whether the student passed or failed. A 50% passing mark is acceptable.

**Hint:** Show a clear success or retry message based on the final percentage.

---

# Part 9 — Try Again

When the student clicks **Try Again**:

1. Reset the old quiz score.
2. Redirect the student to `quiz.html`.
3. Start the quiz from question 1.

**Hint:** Remove the old score before starting the quiz again.

---

# Part 10 — Logout

Add a Logout button.

When the student clicks Logout:

1. Remove `currentUser` from Local Storage.
2. Redirect to the login page.

**Hint:** Logout should remove only the current session user and then return to the login page.

Do not delete the full students list.

The registered student should still be able to log in later.

---

# Part 11 — Validation

Your application should display useful error messages.

**Hint:** Write short, specific validation messages for empty fields, invalid credentials, duplicate accounts, password issues, and missing answer selections.

Do not use only `alert()` for everything.

Try to show errors inside the page.

**Hint:** Reserve an element in the page where validation errors can be displayed.

---

# Part 12 — Bootstrap and CSS Design

Bootstrap is a **required part of this assignment**.

You must use Bootstrap to build the main layout and style common UI elements.

Use Bootstrap for:

- Responsive containers
- Grid system
- Forms
- Input fields
- Buttons
- Cards
- Alerts
- Spacing utilities
- Typography
- Responsive layout

**Hint:** Explore Bootstrap classes for containers, grids, cards, forms, buttons, alerts, spacing, and text alignment.

You should still create your own:

```text
css/style.css
```

Use your custom CSS only for extra styling that Bootstrap does not already provide.

Your application should have:

- Centered quiz container
- Clear buttons
- Good spacing
- Readable text
- Different style for errors
- Responsive layout for mobile
- Hover effects where appropriate

You do not need an advanced design.

Focus first on making the JavaScript work correctly.

## Bootstrap Requirement

Include Bootstrap in every page that needs styling.

You may use the Bootstrap CDN.

Your pages should use Bootstrap components instead of building every style manually.

**Hint:** Use Bootstrap layout classes to center forms and Bootstrap form/button classes to style the controls.

The final project should still have a small custom CSS file for your own design improvements.

---

# Part 13 — JavaScript Files

## `auth.js`

Responsible for:

- Register
- Login
- Local Storage users
- Current user
- Logout

---

## `data/questions.json`

Responsible for:

- Question data
- Answer choices
- Correct answer indexes

The file must contain a JSON array of question objects.

---

## `quiz.js`

Responsible for:

- Fetching questions from `data/questions.json`
- Converting the response using `response.json()`
- Handling Fetch errors
- Displaying questions
- Selecting answers
- Moving to next question
- Calculating score
- Saving final score

---

## `result.js`

Responsible for:

- Reading the final score
- Displaying student information
- Calculating percentage
- Displaying Pass or Fail

---

# Part 13.5 — Required Bootstrap Skills

Your project should demonstrate that you can use Bootstrap correctly.

You should use:

- `container`
- Bootstrap Grid
- Responsive columns
- Bootstrap forms
- Bootstrap buttons
- Bootstrap cards
- Bootstrap alerts
- Spacing utilities
- Responsive utility classes where useful

At least one page should use the Bootstrap Grid system.

**Hint:** Use responsive Bootstrap columns so the layout changes properly on mobile, tablet, and desktop.

Try to avoid writing CSS for things that Bootstrap already provides.

---

# Part 14 — Required JavaScript Concepts

Try to use the following concepts in your project:

- Variables
- `const`
- `let`
- Functions
- Arrays
- Objects
- `if / else`
- Loops
- Array methods
- DOM selection
- DOM events
- `addEventListener`
- Template literals
- Local Storage
- `JSON.stringify()`
- `JSON.parse()`
- Fetch API
- `fetch()`
- `response.json()`
- Promises
- `.then()`
- `.catch()`
- `async/await` or Promise chaining
- `try...catch`
- `window.location.href`

**Hint:** Useful array methods for this project include methods for searching, checking, transforming, and looping through arrays.

---

# Part 15 — Minimum Questions

Add at least **10 questions**.

Suggested topics:

- HTML
- CSS
- JavaScript
- Web Development
- Programming Basics

**Hint:** Mix easy and medium questions and make sure every question has one clearly correct answer.

---

# Part 16 — Application Flow

Your project should follow this flow:

```text
Register
   ↓
Login
   ↓
Quiz
   ↓
Answer Question
   ↓
Next Question
   ↓
Finish Quiz
   ↓
Result Page
   ↓
Try Again OR Logout
```

---

# Part 17 — Local Storage Data

By the end of the project, your Local Storage may contain:

```text
students
currentUser
quizScore
```

**Hint:** Use separate Local Storage keys for users, the active session, and the quiz result. Remember to convert objects and arrays when saving and reading them.

---

# Part 18 — Bonus Challenges

Complete these only after the main project works.

### Bonus 1 — Timer

Give the student:

```text
30 seconds
```

for every question.

---

### Bonus 2 — Random Questions

Display the questions in a random order.

**Hint:** JavaScript has a built-in method that can help you generate random values and shuffle question order.

---

### Bonus 3 — Previous Button

Add:

```text
Previous
```

so the student can return to the previous question.

---

### Bonus 4 — Save Quiz Progress

If the student refreshes the page, continue from the current question.

Store:

```text
currentQuestionIndex
score
```

in Local Storage.

---

### Bonus 5 — Result History

Save every quiz result.

**Hint:** For result history, store each attempt as an object containing student information, score, total questions, percentage, and date.

Store results in an array.


---

# Part 20 — Testing Checklist

Before submitting, test the following.

## Bootstrap

- [ ] Bootstrap is included in the project.
- [ ] Bootstrap is used on all main pages.
- [ ] Forms use Bootstrap classes.
- [ ] Buttons use Bootstrap classes.
- [ ] At least one page uses the Bootstrap Grid system.
- [ ] The layout is responsive on mobile.
- [ ] Custom CSS is used only for additional styling.

## Registration

- [ ] User can create an account.
- [ ] Empty fields show errors.
- [ ] Password confirmation works.
- [ ] Duplicate email is rejected.
- [ ] User data is saved in Local Storage.

## Login

- [ ] Correct email and password work.
- [ ] Wrong password shows an error.
- [ ] Unknown email shows an error.
- [ ] Logged-in user is saved as `currentUser`.

## Fetch and Quiz Data

- [ ] Questions are stored in `data/questions.json`.
- [ ] Questions are not hardcoded directly inside `quiz.js`.
- [ ] `fetch()` is used to load the questions.
- [ ] `response.json()` is used to convert the response.
- [ ] Fetch errors are handled.
- [ ] A useful error message appears if questions cannot be loaded.
- [ ] The project works when opened with Live Server.

## Quiz

- [ ] Questions appear correctly.
- [ ] Answers appear correctly.
- [ ] Student cannot continue without selecting an answer.
- [ ] Next button works.
- [ ] Score increases only for correct answers.
- [ ] All questions can be completed.

## Result

- [ ] Student name appears.
- [ ] Score appears.
- [ ] Total questions appear.
- [ ] Percentage is correct.
- [ ] Pass/Fail message is correct.
- [ ] Try Again works.
- [ ] Logout works.

## Security / Page Access

- [ ] A user who is not logged in cannot open the quiz page.
- [ ] A user who is not logged in cannot open the result page.

---

# Final Assignment

Build the full application from start to finish.

Your final website must contain these pages:

```text
Register Page
Login Page
Quiz Page
Result Page
```



## Final Challenge

When the project is finished, a student should be able to:

```text
Register
→ Login
→ Start Quiz
→ Answer 10 Questions
→ Finish Quiz
→ See Final Score
→ Try Again or Logout
```

Good luck!
