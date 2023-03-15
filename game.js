let level = 0;
const buttonColors = ["red", "blue", "green", "yellow"];
let gamepattern = [];
let userClickedPattern = [];
const nextSequence = function () {
  const randomNumber = Math.trunc(Math.random() * 4);
  const randomChosenColor = buttonColors[randomNumber];
  gamepattern.push(randomChosenColor);
  $(`#${randomChosenColor}`).fadeOut(100).fadeIn(100);
  playSound(randomChosenColor);
  level++;
  $("h1").text(`Level ${level}`);
  userClickedPattern = [];
};
document.addEventListener("keypress", nextSequence);

$(".btn").click(function () {
  const userChosenColor = this.id;
  console.log(userChosenColor);
  userClickedPattern.push(userChosenColor);
  playSound(userChosenColor);
  animatePress(userChosenColor);
  checkAnswer(userClickedPattern.length - 1);
});

const playSound = function (name) {
  const sound = new Audio(`./sounds/${name}.mp3`);
  sound.play();
};

const animatePress = function (currentColour) {
  $(`#${currentColour}`).addClass("pressed");
  setTimeout(function () {
    $(`#${currentColour}`).removeClass("pressed");
  }, 100);
};
function checkAnswer(currentLevel) {
  //3. Write an if statement inside checkAnswer() to check if the most recent user answer is the same as the game pattern. If so then log "success", otherwise log "wrong".
  if (gamepattern[currentLevel] === userClickedPattern[currentLevel]) {
    console.log("success");

    //4. If the user got the most recent answer right in step 3, then check that they have finished their sequence with another if statement.
    if (userClickedPattern.length === gamepattern.length) {
      //5. Call nextSequence() after a 1000 millisecond delay.
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    $("body").css("background-color", "red");
    setTimeout(function () {
      $("body").css("background-color", "#011F3F");
    }, 200);
    $("h1").text("Game Over, Press Any Key to Restart");
    startOver();
    playSound("wrong");
  }
}
function startOver() {
  level = 0;
  gamepattern = [];
  userClickedPattern = [];
}
