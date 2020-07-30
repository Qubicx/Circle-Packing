class Bubble {
  constructor(x_, y_, size_) {
    this.pos = createVector(x_,y_)
    this.size = size_;
    this.color = color(random(255), random(255), random(255));
  }
  grow() { //increase the size of a bubble
    this.size++;
  }
  touching(other) { //is this bubble touching other
    return this.pos.dist(other.pos) - this.size / 2 - other.size / 2 <= 0
  }
  touchingAny() { //is this bubble touching anything
    if (this.pos.x + this.size / 2 >= width || this.pos.x - this.size / 2 <= 0 || this.pos.y + this.size / 2 >= height || this.pos.y - this.size / 2 <= 0) {
      return true;
    } else {
      for (let i = 0; i < bubbles.length; i++) {
        if (this.touching(bubbles[i]) && bubbles[i] != (this || ignoring)) {
          return true;
        }
      }
      return false;
    }
  }
  jitter(amount = 3) {
    testBubble.x = this.x + random(-amount, amount);
    testBubble.y = this.y + random(-amount, amount);
    testBubble.size = this.size;
    let touching = false;
    for (let i = 0; i < bubbles.length; i++) {
      if (bubbles[i].touching(testBubble) && bubbles[i] != this) {
        touching = true;
      }
    }
    if (!touching && !(testBubble.x + testBubble.size / 2 >= width || testBubble.x - testBubble.size / 2 <= 0 || testBubble.y + testBubble.size / 2 >= height || testBubble.y - testBubble.size / 2 <= 0)) {
      this.x = testBubble.x;
      this.y = testBubble.y;
      this.size = testBubble.size;
    }
  }
  delete() {
    for (let i = 0; i < bubbles.length; i++) {
      if (bubbles[i] == this) {
        bubbles.splice(i, 1);
      }
    }
  }
  show() {
    fill(this.color);
    ellipse(this.pos.x, this.pos.y, this.size);
  }
}
