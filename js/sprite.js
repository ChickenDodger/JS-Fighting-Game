function Sprite({
  position,
  src,
  totalFrames = 1,
  scale = 1,
  offset = { x: 0, y: 0 },
}) {
  this.totalFrames = totalFrames;
  this.position = position;
  this.offset = offset;

  this.image = new Image();
  this.image.src = src;
  this.scale = scale;

  this.framesCurrent = 0;

  this.framesElapsed = 0;
  this.framesHold = 8;
}

Sprite.prototype.draw = function () {
  c.drawImage(
    this.image,
    this.framesCurrent * (this.image.width / this.totalFrames),
    0,
    this.image.width / this.totalFrames,
    this.image.height,
    this.position.x - this.offset.x,
    this.position.y - this.offset.y,
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

Sprite.prototype.update = function () {
  this.draw();
  this.animateFrames();
};

function Fighter({ position, src, totalFrames = 1, scale = 1, speed, offset }) {
  Sprite.call(this, { position, src, totalFrames, scale, offset });

  this.speed = speed;
  this.width = 50;
  this.height = 150;
}
// this is just another way for this fighter object to extend the sprite class
Fighter.prototype = Object.create(Sprite.prototype);
Fighter.prototype.constructor = Fighter;

Fighter.prototype.update = function () {
  this.draw();
  this.animateFrames();

  // movement
  this.position.y += this.speed.y;
  this.position.x += this.speed.x;

  // gravity & ground collision
  if (this.position.y + this.speed.y + this.height > ground) {
    this.speed.y = 0;
    this.position.y = ground - this.height;
  } else {
    this.speed.y += gravity;
  }
};

Fighter.prototype.isOnGround = function () {
  return this.position.y + this.height >= ground;
};
