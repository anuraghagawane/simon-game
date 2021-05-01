
var gamePattern = [];

var userClickedColor = [];

var buttonColor = ["red", "blue", "green", "yellow"];

var level = 0;

var started = false;

function nextSequence(){

  var randomNumber = Math.floor(Math.random()*4);

  var randomChoosenColor = buttonColor[randomNumber];

  gamePattern.push(randomChoosenColor);

  $("#"+ randomChoosenColor).fadeOut(100).fadeIn(100);

  level++;
  $("h1").text("level " + level);

  playSound(randomChoosenColor);

}


$(".btn").on("click", function (){

  var userChoosenColor = $(this).attr("id");
  userClickedColor.push(userChoosenColor);
  playSound(userChoosenColor);
  animate(userChoosenColor);
  checkAnswer(userClickedColor.length-1);
})

function playSound(color){
  var audio = new Audio("./sounds/"+color+".mp3");
  audio.play();
}

function animate(currentColor){
  $("#"+currentColor).addClass("pressed");

  setTimeout(function (){
    $("#"+currentColor).removeClass("pressed");
  },100);
}

$(".start").click(function(){

  if(!started){
    $(".start").hide();
  $("h1").text("level " + level);
  setTimeout(nextSequence,500);
  started = true;
}
})

function checkAnswer(currentLevel){

  if(gamePattern[currentLevel] === userClickedColor[currentLevel]){
    console.log('success');
    if(gamePattern.length===userClickedColor.length){
    setTimeout(nextSequence,1000);
    userClickedColor=[];
  }
  }

  else{
    var wrong = new Audio("./sounds/wrong.mp3");
    wrong.play();
    $(".start").show();
    $("body").addClass("game-over");
    $("h1").text("Game-Over, Press Restart!");
    $(".start").text("Restart");

    setTimeout(function (){
      $("body").removeClass("game-over");
    },100);
    startover();
    }


}

function startover(){
  console.log("startover");
  level= 0;
  gamePattern = [];
  userClickedColor = [];
  started= false;
  // $(".start").text("Start");
}
