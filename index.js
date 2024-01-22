var btnColours = ["green", "red", "yellow", "blue"];
var gamePattern = [];
var userClickPattern =[];
var level = 0;
var started = false;

if(window.matchMedia("(max-width: 480px)").matches){
    $("#level-title").text("Click Play! to Start");
    $(".container").after("<button id='re-start'>Play!</button>");
    $("#re-start").on("click", function () {
        if(!started){
            $("#level-title").text("Level " + level);
            nextSequence();
            started = true;
            $("#re-start").hide();
        }
    });    
}
else {
    $(document).on("keydown", function () {
        if(!started){
            $("#level-title").text("Level " + level);
            nextSequence();
            started = true;
        }
    });
}

$(".btn").on("click", function () {
    var userChosenColour = $(this).attr("id");
    userClickPattern.push(userChosenColour);
    animatePress(userChosenColour);
    playSound(userChosenColour);

    checkAnswer(userClickPattern.length-1);
});

function animatePress(currentColor){
    $("#"+ currentColor).addClass("pressed");
    setTimeout(function () {
        $("#" + currentColor).removeClass("pressed");
    }, 100);

}
function nextSequence(){
    userClickPattern = [];
    level++;
    $("#level-title").text("Level "+level);
    var randomNumber = Math.floor(Math.random()*4);
    gamePattern.push(btnColours[randomNumber]);

    $("#" + btnColours[randomNumber]).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(btnColours[randomNumber]);
}
function playSound(name){
    var audio = new Audio("./sounds/"+name+".mp3");
    audio.play();
}
function checkAnswer(currentLevel){
    if(userClickPattern[currentLevel]==gamePattern[currentLevel]){
        if(userClickPattern.length==gamePattern.length){
            setTimeout(function () {
                nextSequence();
              }, 1000);      
        }
    }
    else{
        playSound("wrong");
        $("body").addClass("game-over");
        if(window.matchMedia("(max-width: 480px)").matches){
            $("#level-title").text("Game Over, Click Play Again! to Restart");
            $("#re-start").show();
            $("#re-start").text("Play Again!");
        }
        else{
            $("#level-title").text("Game Over, Press Any Key to Restart");
        }
        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);
        startOver();
    } 
}
function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
  }
