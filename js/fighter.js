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
  this.health = 100; // defined health here

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
  if (!this.dead) this.animateFrames();

  // using the position down here
  this.attackBox.position.x = this.position.x + this.attackBox.offset.x;
  this.attackBox.position.y = this.position.y + this.attackBox.offset.y;

  // movement
  this.position.y += this.speed.y;
  this.position.x += this.speed.x;

  // gravity & ground collision
  if (this.position.y + this.speed.y + this.height >= ground) {
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
  this.switchSprite("attack");
};

Fighter.prototype.takeHit = function () {
  this.health -= 20;
  if (this.health <= 0) {
    this.switchSprite("death");
  } else {
    this.switchSprite("takeHit");
  }
};

Fighter.prototype.switchSprite = function (sprite) {
  // attack guard
  if (
    this.image === this.sprites.attack.image &&
    this.framesCurrent < this.sprites.attack.totalFrames - 1
  )
    return;

  // take hit guard
  if (
    this.image === this.sprites.takeHit.image &&
    this.framesCurrent < this.sprites.takeHit.totalFrames - 1
  )
    return;

  // death guard
  if (this.image === this.sprites.death.image) {
    if (this.framesCurrent === this.sprites.death.totalFrames - 1) {
      this.dead = true;
    }
    return;
  }

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

    case "jump":
      if (this.image !== this.sprites.jump.image) {
        this.image = this.sprites.jump.image;
        this.totalFrames = this.sprites.jump.totalFrames;
        this.framesCurrent = 0;
      }
      break;

    case "fall":
      if (this.image !== this.sprites.fall.image) {
        this.image = this.sprites.fall.image;
        this.totalFrames = this.sprites.fall.totalFrames;
        this.framesCurrent = 0;
      }
      break;

    case "attack":
      if (this.image !== this.sprites.attack.image) {
        this.image = this.sprites.attack.image;
        this.totalFrames = this.sprites.attack.totalFrames;
        this.framesCurrent = 0;
      }
      break;

    case "takeHit":
      if (this.image !== this.sprites.takeHit.image) {
        this.image = this.sprites.takeHit.image;
        this.totalFrames = this.sprites.takeHit.totalFrames;
        this.framesCurrent = 0;
      }
      break;

    case "death":
      if (this.image !== this.sprites.death.image) {
        this.image = this.sprites.death.image;
        this.totalFrames = this.sprites.death.totalFrames;
        this.framesCurrent = 0;
      }
      break;
  }
};
