function Fighter({
  position,
  src,
  totalFrames = 1,
  scale = 1,
  speed,
  offset,
  sprites,
  attackBox = { offset: {}, width: 0, height: 0 },
}) {
  Sprite.call(this, { position, src, totalFrames, scale, offset });

  this.speed = speed;
  this.width = 50;
  this.height = 150;

  this.isAttacking = false;

  this.attackBox = {
    offset: attackBox.offset,
    width: attackBox.width,
    height: attackBox.height,
    position: {
      x: this.position.x,
      y: this.position.y, // defining the position here
    },
  };

  this.sprites = sprites;
  for (const key in this.sprites) {
    // get the sprites object from the main and for each key - ie idle/run etc -
    // create an image based off the link passed in sprites inside main
    this.sprites[key].image = new Image();
    this.sprites[key].image.src = this.sprites[key].src;
  }
}
// this is just another way for this fighter object to extend the sprite class
Fighter.prototype = Object.create(Sprite.prototype);
Fighter.prototype.constructor = Fighter;

Fighter.prototype.update = function () {
  this.draw();
  this.animateFrames();

  // using the position down here
  this.attackBox.position.x = this.position.x + this.attackBox.offset.x;
  this.attackBox.position.y = this.position.y + this.attackBox.offset.y;

  if (this.isAttacking) {
    c.fillStyle = "green";
    c.fillRect(
      this.attackBox.position.x,
      this.attackBox.position.y,
      this.attackBox.width,
      this.attackBox.height,
    );
  }

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

Fighter.prototype.attack = function () {
  this.isAttacking = true;
};

Fighter.prototype.switchSprite = function (sprite) {
  switch (sprite) {
    case "idle":
      if (this.image !== this.sprites.idle.image) {
        this.image = this.sprites.idle.image;
        this.totalFrames = this.sprites.idle.totalFrames;
        this.framesCurrent = 0;
      }
      break;

    case "run":
      if (this.image !== this.sprites.run.image) {
        this.image = this.sprites.run.image;
        this.totalFrames = this.sprites.run.totalFrames;
        this.framesCurrent = 0;
      }
      break;
  }
};
