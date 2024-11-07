document.addEventListener('DOMContentLoaded', function() {
  const nameForm = document.getElementById('name-form');
  const studentNameInput = document.getElementById('student-name');
  const studentNameDisplay = document.getElementById('student-name-display');
  const welcomeScreen = document.getElementById('welcome-screen');
  const quizScreen = document.getElementById('quiz-screen');
  const quiz1Btn = document.getElementById('quiz1-btn');
  const quiz2Btn = document.getElementById('quiz2-btn');

  let studentName = '';

  // Handle form submission
  nameForm.addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form from reloading the page
    studentName = studentNameInput.value.trim();
    if (studentName) {
      studentNameDisplay.textContent = studentName;  // Display the student's name in quiz selection
      welcomeScreen.style.display = 'none';           // Hide the welcome screen
      quizScreen.style.display = 'block';            // Show the quiz selection screen
    } else {
      alert('Please enter your name!');
    }
  });

  // Handle quiz selection
  quiz1Btn.addEventListener('click', function() {
    startQuiz(1);
  });

  quiz2Btn.addEventListener('click', function() {
    startQuiz(2);
  });

  // Start the quiz
  function startQuiz(quizNumber) {
    quizScreen.style.display = 'none';  // Hide quiz selection screen
    loadQuiz(quizNumber);               // Load the selected quiz
  }

  // Load quiz questions (this function should retrieve questions from your API)
  function loadQuiz(quizNumber) {
    // Example quiz data (you can replace this with a fetch call to your static API)
    const quizData = {
      1: [
        { question: 'What is JavaScript?', options: ['Programming Language', 'Animal', 'Food'], answer: 'Programming Language' },
        { question: 'What is the correct syntax for a JavaScript function?', options: ['function()', 'function[]', 'function{}'], answer: 'function()' }
      ],
      2: [
        { question: 'What does HTML stand for?', options: ['HyperText Markup Language', 'HyperTool Markup Language', 'HighText Markup Language'], answer: 'HyperText Markup Language' },
        { question: 'What does CSS stand for?', options: ['Cascading Style Sheets', 'Cascading Syntax Sheets', 'Creative Style Sheets'], answer: 'Cascading Style Sheets' }
      ]
    };

    const questions = quizData[quizNumber];
    const quizView = document.getElementById('quiz-view');
    let currentQuestionIndex = 0;

    // Display the first question
    displayQuestion(questions[currentQuestionIndex]);

    // Handle question navigation
    function displayQuestion(question) {
      const questionContainer = document.createElement('div');
      questionContainer.innerHTML = `
        <h3>${question.question}</h3>
        <ul>
          ${question.options.map(option => `<li><button class="btn btn-light option">${option}</button></li>`).join('')}
        </ul>
      `;
      quizView.innerHTML = '';
      quizView.appendChild(questionContainer);

      // Add event listeners to the options
      const optionButtons = quizView.querySelectorAll('.option');
      optionButtons.forEach(button => {
        button.addEventListener('click', function() {
          const selectedOption = button.textContent;
          if (selectedOption === question.answer) {
            alert('Correct! Well done!');
            currentQuestionIndex++;
            if (currentQuestionIndex < questions.length) {
              displayQuestion(questions[currentQuestionIndex]);
            } else {
              alert(`Congratulations ${studentName}, you've completed the quiz!`);
            }
          } else {
            alert(`Incorrect! The correct answer is: ${question.answer}`);
          }
        });
      });
    }
  }
});
