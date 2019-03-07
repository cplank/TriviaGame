//When the website loads, there's a button that says "start"
//The user will have 20 seconds to answer each questions. 
//If the user gets the answer correct, Sardonyx appears to congratulate them and give a fun fact. 
//If the user gets the answer wrong, the correct answer is highlighted
//If the user doesn't answer before time is up, Sardonyx appears and says "Time's out!" 
//and correct answer will be highlighted 
//There are 15 questions. At the end the game-board changes to say how many questions the user got
//wrong and right. 

// function startGame() {
//     $("#start-button").on("click", function () {
//         setTimeout($("#sardonyx").attr("<img src='assets/images/Sardonyx_PNG.png' width='100%'></img>"), 5000)
//     })
// }

//Let's make some variables

let gameBoard;
let questions;
let guesses;
let timeLeft = 30;
let correctCount = 0;
let wrongCount = 0;



//Game-board interactions 
$("#start-button").on("click", startTimer);


function startTimer() {
    let timer = setInterval(countDown, 1000);
}
//This counts down from 30 seconds.
function countDown() {

    if (timeLeft === 0) {
        clearTimeout(timer);
        console.log("You're out of time")
    } else {
        $("#timer").html("<h1> 00:" + timeLeft + "</h1>");
        timeLeft--;
    }
}

//Making classes
class Question {
    constructor(answers, question, correctAnswer) {
        this.answers = answers;
        this.question = question;
        this.correctAnswer = correctAnswer;
    }
    writeToPage() {
        $("#question-display").html(this.question)
        $("#guess-one").html(this.answers[0])
        $("#guess-two").html(this.answers[1])
        $("#guess-three").html(this.answers[2])
        $("#guess-four").html(this.answers[3])
        $("#correct-display").text(correctCount);
        $("#wrong-display").text(wrongCount);
    }

}

const question1 = new Question(["Perl", "Garnet", "Amethyst", "Lapis Lazuli"], "Which gem has wings?", "Lapis Lazuli");

const question2 = new Question(["Ruby + Sapphire", "Steven + Amythest", "Rose Quartz + Perl", "Lapis Lazuli + Peridot"], "Which fusion is Smokey Quartz?", "Steven + Amythest")

question1.writeToPage();

let arr = [];
for (let i = 0; i < 3; i++) {
    console.log(arr[i]);

}


