//Let's make some variables! Fun story - I originally made way more variables than this 
//and didn't need them!

let questions = [];
let timeLeft = 20;
let correctCount = 0;
let wrongCount = 0;
let intervalId;
let questionCounter = 0;

//Start button onclick - when the start button is clicked, the timer is started and then the 
//
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
        let me = questions[questionCounter]
        wrongCount++
        $("#wrong-display").text(wrongCount)
        me.correctAnswer.removeClass("btn-outline-primary").addClass("btn-danger")
        stopTimer()
        $("#sardonyx").attr("src", "assets/images/SardonyxTimeOut_PNG.png")
        setTimeout(threeSeconds, 1000 * 3)
        function threeSeconds() {
            $("#sardonyx").attr("src", "assets/images/Sardonyx_PNG.png")
            me.correctAnswer.removeClass("btn-danger").addClass("btn-outline-primary")
            questionCounter++
            me.takeOffPage()
            questions[questionCounter].writeToPage()
            timeLeft = 21;
            startTimer()

        }
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
            me.correctAnswer.removeClass("btn-outline-primary").addClass("btn-danger")
            stopTimer()
            $("#sardonyx").attr("src", "assets/images/SardonyxWrong_PNG.png")
            setTimeout(threeSeconds, 1000 * 3)
            function threeSeconds() {
                $("#sardonyx").attr("src", "assets/images/Sardonyx_PNG.png")
                me.correctAnswer.removeClass("btn-danger").addClass("btn-outline-primary")
                questionCounter++
                if (questionCounter === 3) {
                    console.log("Game is Over")
                }
                me.takeOffPage()
                questions[questionCounter].writeToPage()
                timeLeft = 21;
                startTimer()
            }

        });

        this.correctAnswer.off("click");
        this.correctAnswer.on("click", function () {
            correctCount++
            console.log("You got it right")
            $("#correct-display").text(correctCount)
            stopTimer()
            $("#sardonyx").attr("src", "assets/images/SardonyxCorrect_PNG.png")
            setTimeout(threeSeconds, 1000 * 3);
            function threeSeconds() {
                $("#sardonyx").attr("src", "assets/images/Sardonyx_PNG.png")
                questionCounter++
                if (questionCounter === 3) {
                    me.endOfGame()
                }
                me.takeOffPage()
                questions[questionCounter].writeToPage()
                timeLeft = 21;
                startTimer()
            }
        });
    }

    endOfGame() {
        $("#timer-box").hide()
        $("#question-display").hide()
        $(".guesses-box").hide()
        $("#sardonyx").attr("src", "assets/images/SardonyxEnd_PNG.png")

    }

    takeOffPage() {
        $(".btn").off("click")
        this.correctAnswer.removeClass("btn-danger").addClass("btn-outline-primary")

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

const question9 = new Question(["Veruca Salt", "Roberta Sweet", "Rebecca Sugar", "Stacy Confection"], "Who created Steven Universe?", $("#guess-three"))

const question10 = new Question(["Spirit Morph Saga", "A Series of Convienent Events", "The Cloud Catcher Chornicles", "Tail of Two Kitties"], "What's the name of Connie's favorite book series?", $("#guess-one"))

const question11 = new Question(["Mr. Smiley", "The Fry Family", "The Fish-Stew Family", "The Pizza Family"], "Who owns Fish Stew Pizza?", $("#guess-four"))

const question12 = new Question(["Blue Diamond", "Yellow Diamond", "Pink Diamond", "White Diamond"], "Which Diamond built the human zoo?", $("#guess-one"))

const question13 = new Question(["Sadie and the Cool Kids", "White Diamond", "Sadie Killer", "Ms. Miller"], "What is Sadie's stage name?", $("#guess-three"))

const question14 = new Question(["Cookie Cat", "Lion Licker", "Pumpkin", "Watermelon Steven"], "Who's a refugee of an interstellar war?", $("#guess-one"))

const question15 = new Question(["Through the banana stands", "In the Coconut Mines", "Inventing wheelchairs for snakes", "Back room hands of Go-Fish"], "How did Tiger Millionare make his money?", $("#guess-two"))

questions = [question1, question2, question3, question4, question5, question6, question7, question8, question9, question10, question11, question12, question13, question14, question15];