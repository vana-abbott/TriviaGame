$(document).ready(function(){
    $("#remaining-time").hide();
    $("#start").on('click', trivia.startGame);
    $(document).on('click' , '.option', trivia.guessChecker);
    
  })
//   This is to set the score, timer, and get the timer counting
  var trivia = {
    timer: 25,
    timerOn: false,
    timerId : '',
    correct: 0,
    incorrect: 0,
    unanswered: 0,
    currentSet: 0,

    // questions options and answers data
    questions: {
      q1: "What is the capital of South Korea?",
      q2: "What is the traditional costume for South Korea?",
      q3: "What is Korean's dynasty era called? ",
      q4: "What is the national sport of South Korea?",
      q5: "What is the Korean alphabet called?",
      q6: "Which video game was the most popular in South Korea?",
      q7: "What is South Korea's alcoholic bevarage?",
    },
    options: {
      q1: ["Seoul", "Busan" ,"Daegu" , "Gimpo"],
      q2: ["Kimono", "Qipao" , "Kilt" , "Hanbok"],
      q3: ["Qing" , "Meiji" , "Ninko" , "Joseon"],
      q4: ["ping-pong", "karate", "taekwondo" , "Soccer"],
      q5: ["hangul","hancha","pinyin","katakana"],
      q6: ["DOTA", "Starcraft" ,"Rocket League" , "Fortnite"],
      q7: ["Sake", "Soju", "Maekju" ,"Maotai"]
    },
    answers: {
      q1: "Seoul",
      q2: "Hanbok",
      q3:  "Joseon",
      q4: "taekwondo",
      q5: "hangul",
      q6: "Starcraft",
      q7: "Soju",
    },
    // Below is the start game method functon beginning at first, also showing questions, results, and showing timer 
    // JQuery
    startGame: function(){
      trivia.currentSet = 0;
      trivia.correct = 0;
      trivia.incorrect = 0;
      trivia.unanswered = 0;
      clearInterval(trivia.timerId);
      
      $('#game').show();
  
      $('#remaining-time').show();
      
      $('#results').html('');
      
      $('#timer').text(trivia.timer);
      
      $('#start').hide();
      
      trivia.nextQuestion();
      
    },
    // Realized I need to proceed with next questions so I made the following below to continue the questions
    // Remember to create a if/else to prevent timer speeding up
    nextQuestion : function(){
      
      trivia.timer = 10;
       $('#timer').removeClass('last-seconds');
      $('#timer').text(trivia.timer);
      
      if(!trivia.timerOn){
        trivia.timerId = setInterval(trivia.timerRunning, 1000);
      }
      
      var questionContent = Object.values(trivia.questions)[trivia.currentSet];
      $('#question').text(questionContent);
      
      var questionOptions = Object.values(trivia.options)[trivia.currentSet];
      
      $.each(questionOptions, function( key){
        $('#options').append($('<button class="option btn btn-info btn-lg">'+key+'</button>'));
      })
      
    },
// Below is a function if user runs out of time
    timerRunning : function(){
      if(trivia.timer > -1 && trivia.currentSet < Object.keys(trivia.questions).length){
        $('#timer').text(trivia.timer);
        trivia.timer--;
          if(trivia.timer === 4){
            $('#timer').addClass('last-seconds');
          }
      }
      // If the timer has run out of time (in the index it should be -1 since it's tech 0 seconds we will alert the user)//
      // we also have to add the wrong count too // 
      else if(trivia.timer === -1){
        trivia.unanswered++;
        trivia.result = false;
        clearInterval(trivia.timerId);
        resultId = setTimeout(trivia.guessResult, 1000);
        $('#results').html('<h3>Out of time! The answer was '+ Object.values(trivia.answers)[trivia.currentSet] +'</h3>');
      }
      // if all the questions have been shown end the game, show results
      else if(trivia.currentSet === Object.keys(trivia.questions).length){
        
        // Now we have to display results// 
        $('#results')
          .html('<h3>Thank you for playing!</h3>'+
          '<p>Correct: '+ trivia.correct +'</p>'+
          '<p>Incorrect: '+ trivia.incorrect +'</p>'+
          '<p>Unaswered: '+ trivia.unanswered +'</p>'+
          '<p>Please play again!</p>');
        
        $('#game').hide();
        
        $('#start').show();
      }
      
    },
    
    // This method is to compare the user's guess to the correct answer
    guessChecker : function() {
      
      // timer ID for gameResult setTimeout
      var resultId;
      
      var currentAnswer = Object.values(trivia.answers)[trivia.currentSet];
      
      if($(this).text() === currentAnswer){
        $(this).addClass('btn-success').removeClass('btn-info');
        
        trivia.correct++;
        clearInterval(trivia.timerId);
        resultId = setTimeout(trivia.guessResult, 1000);
        $('#results').html('<h3>Correct Answer!</h3>');
      }
      else{
        $(this).addClass('btn-danger').removeClass('btn-info');
        
        trivia.incorrect++;
        clearInterval(trivia.timerId);
        resultId = setTimeout(trivia.guessResult, 1000);
        $('#results').html('<h3>Better luck next time! '+ currentAnswer +'</h3>');
      }
      
    },

    // Added to prevent user from cheating// 
    guessResult : function(){
      trivia.currentSet++;
    
      $('.option').remove();
      $('#results h3').remove();
      
      trivia.nextQuestion();
       
    }
  
  }