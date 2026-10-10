function Sprite({ position, src, totalFrames = 1, scale = 1 }) {
  this.totalFrames = totalFrames;
  this.position = position;

  this.image = new Image();
  this.image.src = src;
  this.scale = scale;

  this.framesCurrent = 0;

  this.framesElapsed = 0;
  this.framesHold = 5;
}

Sprite.prototype.draw = function () {
  c.drawImage(
    this.image,
    this.framesCurrent * (this.image.width / this.totalFrames),
    0,
    this.image.width / this.totalFrames,
    this.image.height,
    this.position.x,
    this.position.y,
    (this.image.width / this.totalFrames) * this.scale,
    this.image.height * this.scale,
  );
};

Sprite.prototype.animateFrames = function () {
  this.framesElapsed++;
  if (this.framesElapsed % this.framesHold === 0) {
    if (this.framesCurrent < this.totalFrames - 1) {
      this.framesCurrent++;
    } else {
      this.framesCurrent = 0;
    }
  }
};
