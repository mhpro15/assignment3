var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = 800;
canvas.height = 600;
document.body.appendChild(canvas);

var bgReady = false;
var bgImage = new Image();
bgImage.onload = function () {
  bgReady = true;
};
bgImage.src = "images/background.png";

var bugReady = false;
var bugImage = new Image();
bugImage.onload = function () {
  bugReady = true;
};
bugImage.src = "images/bug2.png";

var bug = {
  x: Math.floor(Math.random() * 760),
  y: Math.floor(Math.random() * 550),
};

let point = 0;

let counter = 2000;

addEventListener("click", (event) => {
  console.log(event.clientX, event.clientY);
  console.log(bug.x, bug.y);
  if (
    event.clientX - bug.x > 0 &&
    event.clientX - bug.x < 100 &&
    event.clientY - bug.y > 0 &&
    event.clientY - bug.y < 80
  ) {
    point += 1;
    counter -= 100;
    requestAnimationFrame(main);
    clearTimeout(timer);
  }
});

var update = function () {
  bug.x = Math.floor(Math.random() * 760) + 1;
  bug.y = Math.floor(Math.random() * 550) + 1;
};

var render = function () {
  if (bgReady) {
    ctx.drawImage(bgImage, 0, 0);
  }

  if (bugReady) {
    ctx.drawImage(bugImage, bug.x, bug.y);
  }

  // Score
  ctx.fillStyle = "rgb(250, 250, 250)";
  ctx.font = "24px Helvetica";
  ctx.textAlign = "left";
  ctx.textBaseline = "top";
  ctx.fillText("Score: " + point, 32, 32);
};

var main = function () {
  var now = Date.now();
  var delta = now - then;

  update();
  render();

  then = now;

  // Request to do this again ASAP
  timer = setTimeout(() => {
    requestAnimationFrame(main);
  }, counter);
};

// Cross-browser support for requestAnimationFrame
var w = window;
requestAnimationFrame =
  w.requestAnimationFrame ||
  w.webkitRequestAnimationFrame ||
  w.msRequestAnimationFrame ||
  w.mozRequestAnimationFrame;
// Let's play this game!
var then = Date.now();
main();
