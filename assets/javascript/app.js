

var panel = $('#quiz-area');
var countStartNumber = 30;


///////////////////////////////////////////////////////////////////////////////

//CLICK EVENTS

///////////////////////////////////////////////////////////////////////////////

$(document).on('click', '#start-over', function(e) {
  game.reset();
});

$(document).on('click', '.answer-button', function(e) {
  game.clicked(e);
});

$(document).on('click', '#start', function(e) {
  $('#subwrapper').prepend('<h2>Time Remaining: <span id="counter-number">30</span> Seconds</h2>');
  game.loadQuestion();
});

///////////////////////////////////////////////////////////////////////////////


//Question set


///////////////////////////////////////////////////////////////////////////////

var questions = [{
  question: "Peter Parker works as a photographer for:",
  answers: ["The Daily Planet", "The Daily Bugle", "The New York Times", "The Rolling Stone"],
  correctAnswer: "The Daily Planet",
  image:"assets/images/toystory.gif"
}, {
  question: "Weasel has worked closely with:",
  answers: ["Cable", "Deadpool", "Captain America", "Iron Man"],
  correctAnswer: "Deadpool",
  image:"assets/images/spicegirls.gif"
}, {
  question: "In Civil War Captain America fought against..",
  answers: ["Iron Man", "Thor", "Namor", "Deadpool"],
  correctAnswer: "Iron Man",
  image:"assets/images/bulls.gif"
}, {
  question: "Dr. Doom went to the same college as",
  answers: ["Tony Stark", "Peter Parker","Reed Richards","Bruce Banner"],
  correctAnswer: "Reed Richards",
  image:"assets/images/nirvanabark.gif"
}, {
  question: "What is commonly believe to be The Black Widow's previous occupation beforebecoming a Russian spy?",
  answers: ["A ballerina", "A military pilot", "A thief", "An athlete"],
  correctAnswer: "A thief",
  image:"assets/images/lionking.gif"
}, {
  question: "What DC comic did the star of Deadpool(2016) also play the lead role in?",
  answers: ["The Flash", "Arrow", "Green Lantern", "Batman"],
  correctAnswer: "Green Lantern",
  image:"assets/images/fresh.gif"
}, {
  question: "What vehicle is the Avengers primary mode of transport?",
  answers: ["A bus", "Quinjet", "The Blackbird", "The Blackhawk"],
  correctAnswer: "Quinjet",
  image:"assets/images/skeeter.gif"
}, {
  question: "The Vision is an android created by:",
  answers: ["Reed Richards", "Tony Stark", "Ultron", "Doctor Doon"],
  correctAnswer: "Mr.Belding",
  image:"assets/images/belding.gif"
 }, {
  question: " Nick Fury has a brother who became the villain:",
  answers: ["Venom", "Viper", "The Red Skull", "Scorpio"],
  correctAnswer: "Viper",
  image:"assets/images/skeeter.gif"
}, {
  question: " Bucky was:",
  answers: ["A member of the X-Men", "Captain America's sidekick", "A supervillain", "An assistant of Bruce Banner"],
  correctAnswer: "Mr.Belding",
  image:"assets/images/belding.gif"
}, {
  question: "What vehicle is the Avengers primary mode of transport?",
  answers: ["Asgardian", "Human", "Alien", "Mutant"],
  correctAnswer: "Quinjet",
  image:"assets/images/skeeter.gif"
}, {
  question: "What is the name of Tony Stark's building that the team uses as head-quarters?",
  answers: ["Camp Hammond", "Iron Tower", "Stark Tower", "S.H.I.E.L.D"],
  correctAnswer: "Stark Tower",
  image:"assets/images/belding.gif" 
}];



var game = {
  questions:questions,
  currentQuestion:0,
  counter:countStartNumber,
  correct:0,
  incorrect:0,
  countdown: function(){
    game.counter--;
    $('#counter-number').html(game.counter);

    if (game.counter === 0){
      console.log('TIME UP');
      game.timeUp();
    }
  },
  loadQuestion: function(){
    timer = setInterval(game.countdown, 1000);
    panel.html('<h2>' + questions[this.currentQuestion].question + '</h2>' );
    for (var i = 0; i<questions[this.currentQuestion].answers.length; i++){
      panel.append('<button class="answer-button" id="button"' + 'data-name="' + questions[this.currentQuestion].answers[i] + '">' + questions[this.currentQuestion].answers[i]+ '</button>');
    }
  },
  nextQuestion: function(){
    game.counter = countStartNumber;
    $('#counter-number').html(game.counter);
    game.currentQuestion++;
    game.loadQuestion();
  },
  timeUp: function (){
    clearInterval(timer);
    $('#counter-number').html(game.counter);

    panel.html('<h2>Out of Time!</h2>');
    panel.append('<h3>The Correct Answer was: ' + questions[this.currentQuestion].correctAnswer);
    panel.append('<img src="' + questions[this.currentQuestion].image + '" />');

    if (game.currentQuestion === questions.length - 1){
      setTimeout(game.results, 3 * 1000);
    } else {
      setTimeout(game.nextQuestion, 3 * 1000);
    }
  },
  results: function() {
    clearInterval(timer);

    panel.html('<h2>All done, heres how you did!</h2>');
    $('#counter-number').html(game.counter);
    panel.append('<h3>Correct Answers: ' + game.correct + '</h3>');
    panel.append('<h3>Incorrect Answers: ' + game.incorrect + '</h3>');
    panel.append('<h3>Unanswered: ' + (questions.length - (game.incorrect + game.correct)) + '</h3>');
    panel.append('<br><button id="start-over">Start Over?</button>');
  },
  clicked: function(e) {
    clearInterval(timer);

    if ($(e.target).data("name") === questions[this.currentQuestion].correctAnswer){
      this.answeredCorrectly();
    } else {
      this.answeredIncorrectly();
    }
  },
  answeredIncorrectly: function() {
    game.incorrect++;
    clearInterval(timer);
    panel.html('<h2>Nope!</h2>');
    panel.append('<h3>The Correct Answer was: ' + questions[game.currentQuestion].correctAnswer + '</h3>');
    panel.append('<img src="' + questions[game.currentQuestion].image + '" />');

    if (game.currentQuestion === questions.length - 1){
      setTimeout(game.results, 3 * 1000);
    } else {
      setTimeout(game.nextQuestion, 3 * 1000);
    }
  },
  answeredCorrectly: function(){
    clearInterval(timer);
    game.correct++;
    panel.html('<h2>Correct!</h2>');
    panel.append('<img src="' + questions[game.currentQuestion].image + '" />');

    if (game.currentQuestion === questions.length - 1){
      setTimeout(game.results, 3 * 1000);
    } else {
      setTimeout(game.nextQuestion, 3 * 1000);
    }
  },
  reset: function(){
    this.currentQuestion = 0;
    this.counter = countStartNumber;
    this.correct = 0;
    this.incorrect = 0;
    this.loadQuestion();
  }
};
