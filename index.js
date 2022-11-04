//save colors in an array
//create array to save pattern also

let gamePattern=[];
let userClickedPattern=[];
let buttonColours=["red","blue","green","yellow"];
let level=0;
let gameStarted=false;

//starting game

$(document).on("keypress",function (){
    if(!gameStarted){
        $("#level-title").text("Level " + level);
        nextSequence();
        gameStarted=true;
    }
});

//create a fuction to generate random number
function nextSequence(){

    userClickedPattern=[];
    //generate random number
    
    level++; 
    $("#level-title").text("Level "+level);
   
    let newRandomNumber=Math.floor((Math.random()*4));
    //generate random color
    let randomChosenColour=buttonColours[newRandomNumber];
    //store it to gamePaattern
    gamePattern.push(randomChosenColour);
    
    //animation
    $("#"+ randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    //playing sound
    playSound(randomChosenColour);
}

function checkAnswer(currentLevel){
    //if user clicked the same color as in gamePattern
    if(gamePattern[currentLevel]===userClickedPattern[currentLevel]){

        //ifgmaePattern length same as user click pattern call nextsequence after 1 second
        if(gamePattern.length===userClickedPattern.length){
            setTimeout(function(){
                nextSequence();
            },1000);
        }
    }
    //if its not same then play wrong sound and call function gameover
    else{
        playSound("wrong");
        gameOver();
    }
}

function handler(){
    let userChosenColour=$(this).attr("id");

    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    //check ans for last clicked color
    checkAnswer(userClickedPattern.length-1);
}
//when user clicks a btn
$(".btn").on("click",handler);

//playing sound according each color(name)
function playSound(name){
    let audio=new Audio("sounds/"+name+".mp3");
    audio.play();
}

function animatePress(currenColour){
    $("#"+currenColour).addClass("pressed");

    setTimeout(function (){
        $("#"+currenColour).removeClass("pressed");
    },100)
}

function gameOver(){
    
    $("body").addClass("game-over");

    setTimeout(function (){
        $("body").removeClass("game-over");
    },200)

    $("#level-title").text("Game Over, Press Any Key to Restart");
    gameStarted=false;
    level=0;
    gamePattern=[];
}