var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;


$(document).on("keydown",function(){
if(!started){
  $("h1").html("Level "+ level);
nextSequence();
started = true;  
}
});

function checkAnswer(currentLevel){

    if (userClickedPattern[currentLevel]===gamePattern[currentLevel]){
        console.log("success");
        if (userClickedPattern.length === gamePattern.length){
            setTimeout(function(){
                nextSequence();
            },1000);
        }
    }else{
        console.log("wrong");
        var audio = new Audio("./wrong.mp3");
        audio.play();
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);
        $("h1").text("Game Over, Press Any Key to Restart");
        startOver();
    }

}

function startOver(){
    level = 0;
    started = false;
    gamePattern = [];

}


function nextSequence() {
    userClickedPattern = [];
    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    $("#"+randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
    console.log(gamePattern);

    level++;
    $("h1").html("Level "+level);

}

$(".btn").on("click",function(){
    var userChosenColour = this.id;
    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);
    animatePress(userChosenColour);

    console.log(userClickedPattern);

    checkAnswer((userClickedPattern.length)-1);
    
    });


    function playSound(name){
        var audio = new Audio(name +".mp3");
        audio.play();
    }

    function animatePress(currentColour){
        $("#"+currentColour).addClass("pressed");
        setTimeout(function() {
            $("#"+currentColour).removeClass("pressed");
          }, 100);
    }