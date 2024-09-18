var randomNumber;
var gameArray = [];
var userArray = [];
var userSelection;
var counter = -1;
var clickCounter = 0;
var level = 0;
var started= false;
var soundCount;
var soundObj = {
  sound0: new Audio("./sounds/green.mp3"),
  sound1: new Audio("./sounds/red.mp3"),
  sound2: new Audio("./sounds/yellow.mp3"),
  sound3: new Audio("./sounds/blue.mp3"),
  wrong: new Audio("./sounds/wrong.mp3"),
};

$("body").keypress(function () {
  if(!started){
  generateAndPushRandom();
  $("h1").text("Level "+level)
  $("button").click(function () {
    clickCounter++;
    // Sound-Animation etc
    soundCount = "sound" + $(this).attr("id");
    soundObj[soundCount].play();

    $(this).addClass("flash");
    setTimeout(() => {
      $(this).removeClass("flash");
    }, 200);

    //User button click input#id getting and pushing into an array
    userSelection = Number($(this).attr("id"));

    userArray.push(userSelection);
    
    if (gameArray[counter] == userSelection) {
      console.log(true);
      counter++;
      
      if (clickCounter == gameArray.length) {
        console.log("click counter " + clickCounter);
        statusCheck();
      }
    } else {
      gameOver();
    }
  });
}});

function generateAndPushRandom() {
 started=true;
  randomNumber = Math.floor(Math.random() * 4);
  gameArray.push(randomNumber);
  level++;
  $("#" + randomNumber).animate(
    {
      opacity: 0.25,
    },
    300,
    function () {
      $("#" + randomNumber).animate(
        {
          opacity: 1,
        },
        300
      ); // Animation complete.
    }
  );
  counter++;
  console.log(gameArray);
}
function gameOver() {
  console.log("wrong");
  soundObj.wrong.play();
  $("body").css("background-color", "red");
  setTimeout(()=> {
    $("body").css("background-color", "rgb(0, 0, 53)")
  },400)

  $("h1").html("Game Over. Press F5");
  started=false;
}
function statusCheck() {
  for (i = 0; i < gameArray.length; i++) {
    if (gameArray[i] == userArray[i]) {
      //continue
      console.log("check done.");
      generateAndPushRandom();
      clickCounter = 0;
      counter=0;
      gameArray=[];
      level=0;
      userArray = [];
      $("h1").text("Level "+level)
    }
    else {
      gameOver();
    }
  }
}
function startOver(){

}
