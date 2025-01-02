class bubble {
  constructor() {
    this.pos = createVector(random(0, width), random(0, height));
    this.vel = p5.Vector.random2D();
  }
  update() {
    this.pos.add(this.vel);
    if (
      this.pos.x < 0 ||
      this.pos.x > width ||
      this.pos.y < 0 ||
      this.pos.y > height
    ) {
      this.vel.rotate(PI + 1);
    }
  }
}
