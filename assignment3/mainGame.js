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
  x: 400,
  y: 300,
};

let point = 0;

let speed = 1;

let moveX = (moveY = 1);

addEventListener("click", (event) => {
  console.log(event.clientX, event.clientY);
  console.log(bug.x, bug.y);
  if (
    event.clientX - bug.x > 0 &&
    event.clientX - bug.x < 100 &&
    event.clientY - bug.y > 0 &&
    event.clientY - bug.y < 80
  ) {
    randomDir();
    point += 1;
    speed += 1;
  }
});

let randomDir = (edge) => {
  let num1 = parseInt(Math.random() * 2);
  let num2 = parseInt(Math.random() * 2);
  if (edge === "x") {
    if (moveY == 0) {
      moveY = 1;
    }
    if (num1 == 0) {
      moveX = 0;
      if (bug.x <= speed) bug.x += speed;
      else {
        bug.x -= speed;
      }
    } else {
      moveX = moveX * -1;
    }

    if (num2 != 0) {
      moveY = moveY * -1;
    }
  } else if (edge === "y") {
    if (moveX == 0) {
      moveX = 1;
    }
    if (num1 == 0) {
      moveY = 0;
      if (bug.y <= speed) bug.y += speed;
      else {
        bug.y -= speed;
      }
    } else {
      moveY = moveY * -1;
    }

    if (num2 != 0) {
      moveX = moveX * -1;
    }
  } else {
    if (num1 == 0) {
      moveX = moveX * -1;
    }
    if (num2 == 0) {
      moveY = moveY * -1;
    }
  }
  bug.x += moveX * speed;
  bug.y += moveY * speed;
};

var update = function () {
  if (bug.x <= speed || bug.x >= canvas.width - 60 - speed) {
    randomDir("x");
  }

  if (bug.y <= speed || bug.y >= canvas.height - 60 - speed) {
    randomDir("y");
  }
  console.log(moveX, moveY);
  bug.x += moveX * speed;
  bug.y += moveY * speed;
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

  update(delta / 1000);
  render();

  then = now;

  // Request to do this again ASAP
  requestAnimationFrame(main);
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
