//TANONG AT CHOICES
const questions = [
    {
        question: "1. In Greek mythology, who is the god of the sea?",
        choices: ["A) Zeus", "B) Poseidon", "C) Apollo", "D) Hermes"],
        correctAnswer: "B) Poseidon"
    },
    {
        question: "2. What is the capital city of Canada?",
        choices: ["A) Vancouver", "B) Toronto", "C) Ottawa", "D) Montreal"],
        correctAnswer: "C) Ottawa"
    },
    {
        question: "3. What is the largest organ in the human body?",
        choices: ["A) Large Intestine", "B) Skin", "C) Bone", "D) Brain"],
        correctAnswer: "B) Skin"
    },
    {
        question: "4. What is the largest mammal on Earth?",
        choices: ["A) Elephant", "B) Hippopotamus", "C) Giraffe", "D) Blue Whale"],
        correctAnswer: "D) Blue Whale"
    },
    {
        question: "5. What is the currency of Brazil?",
        choices: ["A) Real", "B) Peso", "C) Rupee", "D) Baht"],
        correctAnswer: "A) Real"
    }
];

// VARIABLES
let currentQuestionIndex = 0;
let timer;
let selectedChoiceIndex = null;
let correctAnswers = 0;
let quizSubmitted = false;

// FUNTCION TO UPDATE CONTENT
function updateQuizContent() {
    const currentQuestion = questions[currentQuestionIndex];

    // Update TEXT QUESTION
    document.getElementById("tanong").textContent = currentQuestion.question;

    
    const choiceElements = document.querySelectorAll(".choice");
    choiceElements.forEach((element, index) => {
        element.textContent = quizSubmitted ? "" : currentQuestion.choices[index];
        element.classList.remove("selected", "correct", "incorrect");
    });

    // Update text on the Next/Submit button
    const nextButton = document.getElementById("nextbtn");
    if (currentQuestionIndex === questions.length - 1) {
        nextButton.textContent = "Submit";
    } else {
        nextButton.textContent = "Next";
    }
}

// Function TO START THE TIMER
function startTimer() {
    let timeLeft = 20;

    timer = setInterval(() => {
        document.getElementById("time").textContent = timeLeft;
        document.getElementById("timer-s").textContent = "s";

        // MAGIGING RED ANG TIMER IF, TIME REMAIN IS 5
        if (timeLeft <= 5) {
            document.getElementById("time").classList.add("red-text");
            document.getElementById("timer-s").classList.add("red-text");
        }

        if (timeLeft === 0) {
            clearInterval(timer);
            handleNextQuestion();
        }

        timeLeft--;
    }, 1000);
}

// TIMER RESET
function resetTimer() {
    clearInterval(timer);
    document.getElementById("time").textContent = "20";
    document.getElementById("time").classList.remove("red-text");
    document.getElementById("timer-s").classList.remove("red-text");
    startTimer();
}

// Function to handle the next question or quiz completion
function handleNextQuestion() {
    if (quizSubmitted) {
        if (document.getElementById("nextbtn").textContent === "Restart") {
            restartQuiz();
        } else {
            showCorrectAnswers();
        }
        return;
    }

    // Check if a choice is selected
    if (selectedChoiceIndex !== null) {
        const choiceElements = document.querySelectorAll(".choice");
        choiceElements[selectedChoiceIndex].classList.remove("selected");

        // Get user's answer and correct answer
        const userAnswer = choiceElements[selectedChoiceIndex].textContent;
        const correctAnswer = questions[currentQuestionIndex].correctAnswer;

        // Check if the user's answer is correct
        if (userAnswer === correctAnswer) {
            console.log("Correct! You are a true quiz master.");
            correctAnswers++;
            showAlert("YOUR ANSWER IS CORRECT!");
            choiceElements[selectedChoiceIndex].classList.add("selected", "correct");
        } else {
            console.log("Incorrect!");
            showAlert("INCORRECT. The correct answer is: " + correctAnswer);
            choiceElements[selectedChoiceIndex].classList.add("selected", "incorrect");

            const correctIndex = questions[currentQuestionIndex].choices.findIndex(choice => choice === correctAnswer);
            choiceElements[correctIndex].classList.add("correct");
        }
    }

    // Move to the next question or end the quiz
    if (currentQuestionIndex < questions.length - 1) {
        currentQuestionIndex++;
        selectedChoiceIndex = null;
        updateQuizContent();
        resetTimer();
    } else {
        const totalScore = correctAnswers;
        const totalQuestions = questions.length;

        const resultHTML = `Quiz completed! You got ${totalScore} out of ${totalQuestions} questions.`;
        document.getElementById("tanong").innerHTML = resultHTML;

        document.getElementById("nextbtn").textContent = "Restart";
        quizSubmitted = true;
        clearInterval(timer);

        // Clear choice elements
        const choiceElements = document.querySelectorAll(".choice");
        choiceElements.forEach((element) => {
            element.textContent = "";
        });
    }
}

function showCorrectAnswers() {
    console.log("Viewing Answers...");
}

// QUIZ RESTART
function restartQuiz() {
    currentQuestionIndex = 0;
    selectedChoiceIndex = null;
    correctAnswers = 0;
    quizSubmitted = false;
    updateQuizContent();
    startTimer();
}

// ALERT
function showAlert(message) {
    alert(message);
}

// Add click event listeners to choice elements
const choiceElements = document.querySelectorAll(".choice");
choiceElements.forEach((element, index) => {
    element.addEventListener("click", function () {
        // Ignore clicks if the quiz is already submitted
        if (quizSubmitted) {
            return;
        }

        // Highlight the selected choice
        choiceElements.forEach((choice) => {
            choice.classList.remove("selected");
        });
        element.classList.add("selected");
        selectedChoiceIndex = index;
    });
});

document.getElementById("nextbtn").addEventListener("click", function () {
    handleNextQuestion();
});

updateQuizContent();
startTimer();
