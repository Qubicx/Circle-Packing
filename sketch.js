let bubbles = [];
let mouse = {
  size: 20
}
let testBubble = {
  size: 1
}
let maxBubbles = 2;

function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();
  mouse.pos = createVector(-1, -1);
  testBubble.pos = createVector(-1, -1);
}

function draw() {
  background(220);
  //grow any bubble that isn't touching anything
  for (let i = bubbles.length - 1; i >= 0; i--) {
    if (!bubbles[i].touchingAny()) {
      bubbles[i].grow();
    }
    bubbles[i].show();
  }
  //add bubbles if there aren't too many
  if (bubbles.length < maxBubbles) {
    testBubble.pos.set(random(width), random(height));
    testBubble.size = 1;
    let touching = 0;
    for (let i = bubbles.length - 1; i >= 0; i--) {
      if (bubbles[i].touching(testBubble)) {
        touching++;
      }
    }
    if (touching == 0) {
      bubbles.push(new Bubble(testBubble.pos.x, testBubble.pos.y, 1));
    }
  }
}

function popBubbles() {
  mouse.pos.set(mouseX, mouseY);
  for (let i = bubbles.length - 1; i >= 0; i--) {
    if (bubbles[i].touching(mouse)) {
      bubbles.splice(i, 1);
    }
  }
}

function touchStarted() {
  popBubbles();
}

function touchMoved() {
  popBubbles();
  return false;
}
