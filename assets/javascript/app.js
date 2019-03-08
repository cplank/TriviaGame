
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
let questions = []; //question9, question10, question11, question12, question13, question14, question15];
let guesses;
let timeLeft = 20;
let correctCount = 0;
let wrongCount = 0;
let intervalId;
let questionCounter = 0;

//Game-board interactions 
$("#start-button").on("click", startTimer);
$('#start-button').click(function () {
    $(this).hide();
    question1.writeToPage();
});

//Timer NONSENSE
function startTimer() {
    clearInterval(intervalId);
    intervalId = setInterval(decrement, 1000);
}

function decrement() {

    timeLeft--;
    if (timeLeft < 10) {
        $("#timer").html("<h1> 00:" + "0" + timeLeft + "</h1>")
    } else {
        $("#timer").html("<h1> 00:" + timeLeft + "</h1>")
    }

    if (timeLeft === 0) {
        stopTimer();
        console.log("Time's up!!")

    }
}

function stopTimer() {
    clearInterval(intervalId);
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


        //Inside the onclick function, this refers to the button that is being clicked. Which means I can't use this 
        //to reference the correctAnswer button. So I have to declare this outside of the onclick function. 
        let me = this;
        $(".btn").on("click", function () {
            wrongCount++
            console.log("You got it wrong")
            $("#wrong-display").text(wrongCount)
            me.correctAnswer.attr("class", "btn btn-lg btn-block btn-danger")
            stopTimer()
            setTimeout(twoSeconds, 1000 * 2)
            function twoSeconds() {
                questionCounter++
                questions[questionCounter].writeToPage()
                startTimer()
            }

        });

        this.correctAnswer.off("click");
        this.correctAnswer.on("click", function () {
            correctCount++
            console.log("You got it right")
            $("#correct-display").text(correctCount)
            stopTimer()
            $("#sardonyx").hide()
            setTimeout(threeSeconds, 1000 * 3);
            function threeSeconds() {
                $("#sardonyx").show()
                questionCounter++
                questions[questionCounter].writeToPage()
                timeLeft = 21;
                startTimer()
            }
        });
    }

    takeOffPage() {
        $(".btn").off("click")
        this.correctAnswer.attr("class", "btn btn-lg btn-block btn-outline-primary")

    }

}

const question1 = new Question(["Perl", "Garnet", "Amethyst", "Lapis Lazuli"], "Which gem has wings?", $("#guess-four"))

const question2 = new Question(["Ruby + Sapphire", "Steven + Amythest", "Rose Quartz + Perl", "Lapis Lazuli + Peridot"], "Which fusion is Smokey Quartz?", $("#guess-two"))

const question3 = new Question(["Steven One", "Steven Two", "Steven Three", "Steven Four"], "Which member of Steven and the Stevens is the handsome one?", $("#guess-one"))

const question4 = new Question(["Definitely not", "Destiny is a fact, there is no believe", "I have to when it's right in front of me", "I am destiny"], "Do you believe in destiny?", $("#guess-three"))

const question5 = new Question(["Baking", "Magic", "Doughnuts", "Sadie"], "What is Lars' secret passion?", $("#guess-one"))

const question6 = new Question(["Vidalia", "Sour Cream", "Onion", "Barb"], "Which one of these people isn't related to the others?", $("#guess-four"))

const question7 = new Question(["Sneeples in Beach City", "Keep Beach City Weird", "Alien Tracker", "Best brooding places in Beach City"], "What is the name of Ronaldo's prestigous blog?", $("#guess-two"))

const question8 = new Question(["The Cluster", "Trash Piles", "Meep Morps", "Van Gogh"], "What do Peridot and Lapis call their art creations?", $("#guess-three"))

questions = [question1, question2, question3, question4, question5, question6, question7, question8];