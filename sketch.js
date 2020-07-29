let bubbles = [];
let mouse = {
  x: -1,
  y: -1,
  size: 20
}
let testBubble = {
  x: -1,
  y: -1,
  size: 1
}
let maxBubbles = 75;

function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();
}

function draw() {
  background(220);
  mouse.x = mouseX;
  mouse.y = mouseY;
  //grow any bubble that isn't touching anything
  for (let i = bubbles.length - 1; i >= 0; i--) {
    if (!bubbles[i].touchingAny()) {
      bubbles[i].grow();
    }
    bubbles[i].jitter(3);
    bubbles[i].show();
  }
  //add bubbles if there aren't too many
  if (bubbles.length < maxBubbles) {
    testBubble.x = random(width);
    testBubble.y = random(height);
    testBubble.size = 1;
    let touching = 0;
    for (let i = bubbles.length - 1; i >= 0; i--) {
      if (bubbles[i].touching(testBubble)) {
        touching++;
      }
    }
    if (touching == 0) {
      bubbles.push(new Bubble(testBubble.x, testBubble.y, 1));
    }
  }
}

function mouseDragged() {
  mouse.x = mouseX;
  mouse.y = mouseY;
  for (let i = bubbles.length - 1; i >= 0; i--) {
    if (bubbles[i].touching(mouse)) {
      bubbles.splice(i, 1);
    }
  }
}
