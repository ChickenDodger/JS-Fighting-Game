function Sprite({ position, src, totalFrames = 1 }) {
  this.totalFrames = totalFrames;
  this.position = position;

  this.image = new Image();
  this.image.src = src;

  this.framesCurrent = 0;
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
    this.image.width / this.totalFrames,
    this.image.height,
  );
};

Sprite.prototype.animateFrames = function () {
  if (this.framesCurrent < this.totalFrames - 1) {
    this.framesCurrent++;
  } else {
    this.framesCurrent = 0;
  }
};
