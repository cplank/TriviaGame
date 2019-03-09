# TriviaGame
A 15 question Steven Universe trivia game

## Description ##
This trivia game was made using JavaScript and jQuery. Players start the game and have 20 seconds to 
answer questions. There are 15 questions total. If the player picks the correct answer, Sardonyx will 
congratulate them before moving onto the next question. If the player gets the question wrong, Sardonyx
let's them know before moving onto the next question. Sardonyx shows the player their score once all questions
have been answered.

This game uses:

* jQuery 
* Bootstrap 4.3
* JavaScript
* Classes
* Timers

## Basics ##

This game uses one class, Question, to capture the answers, question, and correctAnswer of each question players need to answer. jQuery function change out the image, highlight the correct answer, and handle the onclicks for the buttons. A few JavaScript functions handle the timers -- decrement decreases the interval and timeOut controls how long an image stays on the screen. startTimer sets the interval and clearTimer clears it.

Several methods handle the question transition, arrangement, and counters:

* writeToPage() This function handles all of the changing of the HTML elements using jQuery. Each index of the array answers is assigned to a button with a unique id. Also handles:
* * Determining if an answer is correct or incorrect
* * Increaes correct or incorrect counter
* * Evaluates if the game is over (is it the last question)

* endOfGame() Runs if the last question has been answered. Hides all HTML elements except the score and changes the Sardonyx image

* takeOffPage() Clears the page of onclicks and returns all buttons to blue

## Roadmap ##

There was a lot I wanted to do with this game! Music, more animations, a sneaky trick question that would show a fun Steven Universe gif. I think music would help this a  lot so maybe I'll add that some day. 

## Shout Outs ##
Steven Universe is a great show! Rebecca Sugar did such a great job creating a show about a boy who is at all times empathetic, strong, funny, sweet, and powerful. (Spoiler: this has the answer to one of my questions!)