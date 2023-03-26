
// Start Section
let start = document.querySelector('#start');


// Guide Section
let guide = document.querySelector('#guide');
let exit = document.querySelector('#exit');
let continueBtn = document.querySelector('#continue');

// Quiz Section
let quiz = document.querySelector('#quiz');
let time = document.querySelector('#time');


// Question Section
let questionNum = document.querySelector('#question-num');
let questionText = document.querySelector('#question-text');

// Multiple Choice Options
let option1 = document.querySelector('#option1');
let option2 = document.querySelector('#option2');
let option3 = document.querySelector('#option3');
let option4 = document.querySelector('#option4');

// correct and next buttons
let nextQuestion = document.querySelector('#next-question');

// HUD Section
let questionCounter = document.querySelector('#a-question-d');
let scoreText = document.querySelector('#a-score-d');

// Result Section
let points = document.querySelector('#points');

let restart = document.querySelector('#start-again');
let highscore = document.querySelector('#high-score');


// High Score Section
let clear = document.querySelector('#clear');
let returnStart = document.querySelector('#returnstart');
let submit = document.querySelector('#submitbut');
let username = document.querySelector('#username');
let finalscore = 0;
points.innerHTML = finalscore;
const mostRecentScore = localStorage.getItem('mostRecentScore');

const highscorelist = JSON.parse(localStorage.getItem("highscores")) || [];
console.log(highscorelist);
const hsl = document.getElementById('high-score-name');





// Get all H4 from quiz section
let choiceQuestion = Array.from (document.getElementsByClassName('choice-q'));
console.log("Choice Question Array:");
console.log(choiceQuestion);

let acceptingAnswers = true;

let index = 0;
let timer = 30;
let interval = 0;

// total points
let correct = 0;

// stores Answer Value
let userAnswer = undefined;



// START QUIZ
start.addEventListener('click', () => {
    start.style.display = 'none';
    guide.style.display = 'block';
  
});

// EXIT QUIZ
exit.addEventListener('click', () => {
    guide.style.display = 'none';
    start.style.display = 'block';
});
// Create timer for quiz
function countdownTimer() {
    timer = 30;
    var timerf = setInterval(function(){
        document.getElementById('time').innerHTML=timer;
        timer--;
        if (timer < 0) {
            clearInterval(timerf);
            document.getElementById('time').innerHTML="";
            if (quiz.style.display == 'block'){
                quiz.style.display = 'none';
                result.style.display = 'block';
            }
        }
    }, 1000);
}
// Load Questions
let loadQuestions = () => {
    questionText.innerHTML = index + 1 + ". " + multiplechoicequestions[index].question;
    option1.innerHTML = multiplechoicequestions[index].choice1;
    option2.innerHTML = multiplechoicequestions[index].choice2;
    option3.innerHTML = multiplechoicequestions[index].choice3;
    option4.innerHTML = multiplechoicequestions[index].choice4;
    questionCounter.innerText = `${index+1}/5`;
    scoreText.innerText = `${finalscore}`;
}

// Score Calculation

scoreCalc = num => {
    if (index == 4) {
        finalscore = num*timer;
    } else {
    finalscore = num+20;
    }
    return finalscore
}

// Check Answer

choiceQuestion.forEach(choice => {
    choice.addEventListener('click', e => {
        console.log(e.target);

        if (!acceptingAnswers) return;

        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset['number'];
        console.log(selectedAnswer, multiplechoicequestions[index].answer);
        let classToApply = 'incorrect';
        if (selectedAnswer == multiplechoicequestions[index].answer) {
            classToApply = 'correct';

            scoreCalc(finalscore);
        }
        else {
            timer = timer - 3;
        }
        selectedChoice.classList.add(classToApply);

        
        setTimeout(() => {
            selectedChoice.classList.remove(classToApply);
        }, 1000);
        
    });
});




// Continue QUIZ
continueBtn.addEventListener('click', () => {
    guide.style.display = 'none';
    quiz.style.display = 'block';

    interval = setInterval(timer, 1000);
    loadQuestions();
    countdownTimer();
});

// Next Question
nextQuestion.addEventListener('click', () => {
    index++;
    // questionCounter.innerText = index + "/5";
    if (index < 5){
        loadQuestions(index);
        acceptingAnswers = true;
    }
    else {
        quiz.style.display = 'none';
        result.style.display = 'block';
        points.innerHTML = finalscore;
    }
});

// Highscore Screen

submit.addEventListener('click', () => {
    console.log('submit');
    result.style.display = 'none';
    highscore.style.display = 'block';

    const score = {
        score: finalscore,
        name: username.value
    };
    highscorelist.push(score);
    
    highscorelist.sort((a,b) => {
        return b.score - a.score;
    });
    highscorelist.splice(10);
    localStorage.setItem("highscores", JSON.stringify(highscorelist));
    console.log(highscorelist);

    hsl.innerHTML =
    highscorelist.map(score => {
        return `<li class ="hs">${score.name}  ...........  ${score.score}</li>`;
        }).join("");

});

// Add Highscores


// Restart Button

restart.addEventListener('click', () => {
    console.log('restart');
    result.style.display = 'none';
    start.style.display = 'block';
    index = 0;  
    timer = 0;
    finalscore = 0;
    acceptingAnswers = true;
    points.innerHTML = finalscore;
});


clear.addEventListener('click', () => {
    localStorage.clear();
    console.log('clear');
});

returnStart.addEventListener('click', () => {
    console.log('returnstart');
    highscore.style.display = 'none';
    start.style.display = 'block';
    index = 0;  
    timer = 0;
    finalscore = 0;
    acceptingAnswers = true;
    points.innerHTML = finalscore;
});
