document.addEventListener('DOMContentLoaded', function () {
    const quizContainer = document.getElementById('quiz-container');
    let currentQuestionIndex = 0;
    let score = 0;
    const totalQuestions = 5;
    let questions = [];
    const name = 'Student'; // You can change this to any name or get it dynamically later

    // Handlebars templates
    const nameTemplateSource = document.getElementById('name-template').innerHTML;
    const questionTemplateSource = document.getElementById('question-template').innerHTML;
    const feedbackTemplateSource = document.getElementById('feedback-template').innerHTML;

    const nameTemplate = Handlebars.compile(nameTemplateSource);
    const questionTemplate = Handlebars.compile(questionTemplateSource);
    const feedbackTemplate = Handlebars.compile(feedbackTemplateSource);

    // Display the welcome page with the name
    function displayWelcomePage() {
        const context = { name: name };
        const html = nameTemplate(context);
        quizContainer.innerHTML = html;

        // Event listener to start quiz
        const startButton = document.getElementById('start-quiz');
        startButton.addEventListener('click', startQuiz);
    }

    // Fetch questions and start the quiz
    async function startQuiz() {
        try {
            // Simulating fetch from an API (you can replace with real API later)
            questions = await fetchQuizData();
            displayQuestion(questions[currentQuestionIndex]);
        } catch (error) {
            console.error('Error fetching quiz data:', error);
        }
    }

    // Function to fetch quiz data (for this example, we'll simulate static data)
    async function fetchQuizData() {
        return [
            {
                question: "What is 2 + 2?",
                options: ["2", "4", "6", "8"],
                correctAnswer: "4",
                feedbackMessage: "Basic math question."
            },
            {
                question: "Which language is this quiz built with?",
                options: ["Python", "JavaScript", "Ruby", "C++"],
                correctAnswer: "JavaScript",
                feedbackMessage: "The quiz is built using JavaScript!"
            },
            {
                question: "What does 'DOM' stand for in web development?",
                options: ["Document Object Model", "Data Object Model", "Document Operation Mode", "Data Operation Model"],
                correctAnswer: "Document Object Model",
                feedbackMessage: "DOM stands for Document Object Model."
            },
            {
                question: "Which company created JavaScript?",
                options: ["Microsoft", "Google", "Mozilla", "Netscape"],
                correctAnswer: "Netscape",
                feedbackMessage: "JavaScript was created by Netscape."
            },
            {
                question: "Which HTML tag is used to define an internal style sheet?",
                options: ["<script>", "<style>", "<link>", "<meta>"],
                correctAnswer: "<style>",
                feedbackMessage: "The <style> tag is used for internal styles."
            }
        ];
    }

    // Function to display a question
    function displayQuestion(question) {
        const context = {
            question: question.question,
            options: question.options,
            currentQuestionIndex: currentQuestionIndex + 1,
            totalQuestions: totalQuestions
        };
        const html = questionTemplate(context);
        quizContainer.innerHTML = html;

        // Event listener for selecting an answer
        const optionButtons = document.querySelectorAll('.option-btn');
        optionButtons.forEach(button => {
            button.addEventListener('click', (event) => handleAnswer(event.target.innerText, question.correctAnswer, question.feedbackMessage));
        });
    }

    // Function to handle answer selection
    function handleAnswer(selectedAnswer, correctAnswer, feedbackMessage) {
        const isCorrect = selectedAnswer === correctAnswer;
        score += isCorrect ? 1 : 0;

        // Show feedback after the answer is selected
        const context = {
            correct: isCorrect,
            feedbackMessage: feedbackMessage,
            correctAnswer: correctAnswer
        };
        const html = feedbackTemplate(context);
        quizContainer.innerHTML = html;

        // Event listener to move to the next question
        const nextButton = document.getElementById('next-question');
        nextButton.addEventListener('click', nextQuestion);
    }

    // Function to move to the next question
    function nextQuestion() {
        if (currentQuestionIndex < totalQuestions - 1) {
            currentQuestionIndex++;
            displayQuestion(questions[currentQuestionIndex]);
        } else {
            displayResults();
        }
    }

    // Function to display the quiz results
    function displayResults() {
        const passMessage = score >= (totalQuestions * 0.8) ? `Congratulations ${name}! You passed the quiz!` : `Sorry ${name}, you failed the quiz.`;
        const context = { passMessage: passMessage, score: score, totalQuestions: totalQuestions };
        quizContainer.innerHTML = `<h3>${context.passMessage}</h3><p>Your Score: ${context.score} / ${context.totalQuestions}</p><button onclick="window.location.reload()" class="btn btn-primary">Retake Quiz</button>`;
    }

    // Start by displaying the welcome page
    displayWelcomePage();
});
