//Let's make some variables! Fun story - I originally made way more variables than this 
//and didn't need them!

let questions = [];
let timeLeft = 20;
let correctCount = 0;
let wrongCount = 0;
let intervalId;
let questionCounter = 0;

//Start button onclick - when the start button is clicked, the timer starts, the button hides(which continues
//to be my hack for not being able to push a button twice!) and the first question is written to the page. 
$("#start-button").on("click", startTimer);
$('#start-button').click(function () {
    $(this).hide();
    question1.writeToPage();
});

//Timer NONSENSE. I had a hard time with the timers. The startTimer function calls the clearInterval method
//(which I did a lot of silly things with before I realized it was a method of the window) which clears
//the timer. This is done before setting the interval so you can't start the timer multiple times.
function startTimer() {
    clearInterval(intervalId);
    //setInterval is a method that calls the function decrement and a parameter in milliseconds. It
    //continue to call decrement until clearInterval is called. The value returned by setInterval is 
    //stored in intervalID and used as the parameter for clearInterval.
    intervalId = setInterval(decrement, 1000);
}

//This function decreases timeLeft by one. Since I wanted to display a preceeding 0 when the timer
//got to single digits, I added an if statement. If timeLeft is less than 10, then display an extra 0
//before timeLeft. Otherwise, just display it without. Surprisingly, this tiny bit of code broke my game
// A LOT when I firt as I was trying to figure out how to make it work. 
function decrement() {

    timeLeft--;
    if (timeLeft < 10) {
        $("#timer").html("<h1> 00:" + "0" + timeLeft + "</h1>")
    } else {
        $("#timer").html("<h1> 00:" + timeLeft + "</h1>")
    }

    //Another if statement. If timeLeft equals 0, call the stopTimer function (below). In order to move to the
    //next question, I needed to know which question we were on. Here, this refers to the window, but I needed
    //to be able to access the my questions and know which question we were on. So the variable me contains
    //the array questions, which contains multiple objects that are instances of the
    //class, Question, at the index of questionCounter. 
    if (timeLeft === 0) {
        stopTimer();
        console.log(this)
        let me = questions[questionCounter]
        //Increases wrong counter by one and displays on the page using jQuery
        wrongCount++
        $("#wrong-display").text(wrongCount)
        //correctAnswer is an object inside each instance of the class Question, so again me was needed here in 
        //order to access that. removeClass is removing the class that makes the button blue and replacing
        //it with the class that makes the button red. stopTimer is called so the timer stops running down.
        //the sardonyx id is replaced with a new image  
        me.correctAnswer.removeClass("btn-outline-primary").addClass("btn-danger")
        stopTimer()
        $("#sardonyx").attr("src", "assets/images/SardonyxTimeOut_PNG.png")
        //This setTimeout is another method of the window. Here it calls the function three seconds (below)
        //and the parameter of three seconds. When setTimeout calls threeSeconds, the window counts three
        //three seconds.
        setTimeout(threeSeconds, 1000 * 3)

        function threeSeconds() {
            //When the three seconds is up, the sardonyx image is replaced, the class that makes correctAnswer
            //(again having to use me here) is removed and replaced with the class that makes the button blue.
            //questionCoutner increases, the page is reset (takeOffPage is created below).
            $("#sardonyx").attr("src", "assets/images/Sardonyx_PNG.png")
            me.correctAnswer.removeClass("btn-danger").addClass("btn-outline-primary")
            questionCounter++
            me.takeOffPage()

            //Because questionCounter increased above, I couldn't use me here unless I redefined it. Instead,
            //I called the method writeToPage directly on questions[questionCounter] so it always moves onto the
            //the correct question. timeLeft returns to 21 (20 moved to fast so it looked like 19), and startTimer
            //is called.
            questions[questionCounter].writeToPage()
            timeLeft = 21;
            startTimer()

        }
    }
}

//stopTimer clears intervalId
function stopTimer() {
    clearInterval(intervalId);
}

//Making the class. The class Question has a constructor (which is a method that creates and initializes 
//objects created within the class) that sets answers, question, and correctAnswer. I realized down the line
//it would have made more sense to have that order be question, answers, correctAnswer, but it was too late.
class Question {
    constructor(answers, question, correctAnswer) {
        this.answers = answers;
        this.question = question;
        this.correctAnswer = correctAnswer;
    }

    //This function handles all of the changing of the HTML elements using jQuery. Each index of the array
    //answers is assigned to a button with a unique id. 
    writeToPage() {
        $("#question-display").html(this.question)
        $("#guess-one").html(this.answers[0])
        $("#guess-two").html(this.answers[1])
        $("#guess-three").html(this.answers[2])
        $("#guess-four").html(this.answers[3])
        $("#correct-display").text(correctCount);
        $("#wrong-display").text(wrongCount);

        // Hold onto your butts! This is where things get weird...

        //Inside the onclick function, this refers to the button that is being clicked. Which means 
        //I can't use this to reference the correctAnswer button. So I have to declare this outside 
        //of the onclick function. My reading tells me this is called a closure. It sort of wrecked my day,
        //but I have to admit it's handy. I feel like everything after that is pretty self explanatory
        //(and also used up above in decrement)
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
                if (questionCounter === 15) {
                    me.endOfGame()
                }
                me.takeOffPage()
                questions[questionCounter].writeToPage()
                timeLeft = 21;
                startTimer()
            }

        });

        //Oh look! Now this actually refers to the object I want it to (question). So no closure is needed.
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
                if (questionCounter === 15) {
                    me.endOfGame()
                }
                me.takeOffPage()
                questions[questionCounter].writeToPage()
                timeLeft = 21;
                startTimer()
            }
        });
    }

    //This function hides the timer box, the question display, the guesses box, and replaces
    //the sardonyx image.
    endOfGame() {
        $("#timer-box").hide()
        $("#question-display").hide()
        $(".guesses-box").hide()
        $("#sardonyx").attr("src", "assets/images/SardonyxEnd_PNG.png")

    }

    //clears any onclicks and returns correctAnswer to blue.
    takeOffPage() {
        $(".btn").off("click")
        this.correctAnswer.removeClass("btn-danger").addClass("btn-outline-primary")

    }

}

//Instances!! Each question is a new instance of the class Question, which we know takes answers, question, and correctAnswers.
//Figuring out how to target the correctAnswer when I needed to highlight it was a puzzle! At first I had a 
//string, but then I would have needed to compare that string to each index to figure out which button was
//holding the correctAnswer. So instead I hard coded the jQuery object (in this case the button) in directly. 
//Worked great!!
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