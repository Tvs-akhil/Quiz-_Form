const quizData = [
    {
        question: "What is the capital of France?",
        answers: {
            a: "Berlin",
            b: "Madrid",
            c: "Paris",
            d: "Rome"
        },
        correct: "c"
    },
    {
        question: "Who is the current US president?",
        answers: {
            a: "Donald Trump",
            b: "Joe Biden",
            c: "Barack Obama",
            d: "George Bush"
        },
        correct: "b"
    },
    {
        question: "What is 2 + 2?",
        answers: {
            a: "3",
            b: "4",
            c: "5",
            d: "6"
        },
        correct: "b"
    },
    {
        question: "Which planet is known as the Red Planet?",
        answers: {
            a: "Earth",
            b: "Venus",
            c: "Mars",
            d: "Jupiter"
        },
        correct: "c"
    }
];

let currentSlide = 0;
let userAnswers = [];

const quizContainer = document.getElementById('quiz');
const resultsContainer = document.getElementById('results');
const nextButton = document.getElementById('next');
const previousButton = document.getElementById('previous');
const submitButton = document.getElementById('submit');

function buildQuiz() {
    const output = [];

    quizData.forEach((currentQuestion, questionIndex) => {
        const answers = [];

        for (letter in currentQuestion.answers) {
            answers.push(
                `<label>
                    <input type="radio" name="question${questionIndex}" value="${letter}">
                    ${letter}: ${currentQuestion.answers[letter]}
                </label>`
            );
        }

        output.push(
            `<div class="slide">
                <div class="question">${currentQuestion.question}</div>
                <div class="answers">${answers.join('')}</div>
            </div>`
        );
    });

    quizContainer.innerHTML = output.join('');
}

function showResults() {
    const answerContainers = quizContainer.querySelectorAll('.answers');
    let numCorrect = 0;

    quizData.forEach((currentQuestion, questionIndex) => {
        const answerContainer = answerContainers[questionIndex];
        const selector = `input[name=question${questionIndex}]:checked`;
        const userAnswer = (answerContainer.querySelector(selector) || {}).value;

        if (userAnswer === currentQuestion.correct) {
            numCorrect++;
            answerContainers[questionIndex].style.color = 'green';
        } else {
            answerContainers[questionIndex].style.color = 'red';
        }
    });

    resultsContainer.innerHTML = `You got ${numCorrect} out of ${quizData.length} correct!`;
}

function showSlide(n) {
    const slides = document.querySelectorAll('.slide');
    slides[currentSlide].classList.remove('active-slide');
    slides[n].classList.add('active-slide');
    currentSlide = n;

    if (currentSlide === 0) {
        previousButton.style.display = 'none';
    } else {
        previousButton.style.display = 'inline-block';
    }

    if (currentSlide === slides.length - 1) {
        nextButton.style.display = 'none';
        submitButton.style.display = 'inline-block';
    } else {
        nextButton.style.display = 'inline-block';
        submitButton.style.display = 'none';
    }
}

function showNextSlide() {
    showSlide(currentSlide + 1);
}

function showPreviousSlide() {
    showSlide(currentSlide - 1);
}

buildQuiz();

const slides = document.querySelectorAll('.slide');
showSlide(0);

submitButton.addEventListener('click', showResults);
nextButton.addEventListener('click', showNextSlide);
previousButton.addEventListener('click', showPreviousSlide);
