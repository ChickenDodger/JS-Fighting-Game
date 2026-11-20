const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

canvas.width = 1024;
canvas.height = 576;

const gravity = 0.7;
const ground = canvas.height - 96;

const background = new Sprite({
  position: { x: 0, y: 0 },
  src: "../assets/img/background.png",
});

const skeleton = new Sprite({
  position: { x: 900, y: 200 },
  src: "../assets/img/skeleton.png",
  totalFrames: 8,
  scale: 1.5,
});

const player = new Fighter({
  position: { x: 100, y: 0 },
  speed: { x: 0, y: 0 },
  src: "../assets/img/King/Idle.png",
  totalFrames: 8,
  scale: 2.5,
  offset: { x: 215, y: 120 },
  attackBox: {
    width: 100,
    height: 50,
    offset: { x: 100, y: 50 },
  },
  sprites: {
    idle: { src: "../assets/img/King/Idle.png", totalFrames: 8 },
    run: { src: "../assets/img/King/Run.png", totalFrames: 8 },
    jump: { src: "../assets/img/King/Jump.png", totalFrames: 2 },
    fall: { src: "../assets/img/King/Fall.png", totalFrames: 2 },
    attack: { src: "../assets/img/King/Attack1.png", totalFrames: 4 },
    takeHit: { src: "../assets/img/King/Take Hit.png", totalFrames: 4 },
    death: { src: "../assets/img/King/Death.png", totalFrames: 6 },
  },
});

const enemy = new Fighter({
  position: { x: canvas.width - 200, y: 0 },
  speed: { x: 0, y: 0 },
  src: "../assets/img/Huntress/Idle.png",
  totalFrames: 8,
  scale: 2.5,
  offset: { x: 215, y: 100 },
  attackBox: {
    width: 100,
    height: 50,
    offset: { x: -100, y: 50 },
  },
  sprites: {
    idle: { src: "../assets/img/Huntress/Idle.png", totalFrames: 8 },
    run: { src: "../assets/img/Huntress/Run.png", totalFrames: 8 },
    jump: { src: "../assets/img/Huntress/Jump.png", totalFrames: 2 },
    fall: { src: "../assets/img/Huntress/Fall.png", totalFrames: 2 },
    attack: { src: "../assets/img/Huntress/Attack1.png", totalFrames: 4 },
    takeHit: { src: "../assets/img/Huntress/Take Hit.png", totalFrames: 3 },
    death: { src: "../assets/img/Huntress/Death.png", totalFrames: 6 },
  },
});

const keys = {
  a: false,
  d: false,
  left: false,
  right: false,
};

window.addEventListener("keydown", (e) => {
  // player 1 WASD
  switch (e.key) {
    case "w":
      if (player.isOnGround()) {
        player.speed.y -= 20;
      }
      break;

    case "a":
      keys.a = true;
      break;

    case "d":
      keys.d = true;
      break;

    case " ":
      player.attack();
      break;
  }

  // enemy arrow keys
  switch (e.key) {
    case "ArrowUp":
      if (enemy.isOnGround()) {
        enemy.speed.y -= 20;
      }
      break;

    case "ArrowLeft":
      keys.left = true;
      break;

    case "ArrowRight":
      keys.right = true;
      break;

    case "ArrowDown":
      enemy.attack();
      break;
  }
});

window.addEventListener("keyup", (e) => {
  switch (e.key) {
    case "a":
      keys.a = false;
      break;

    case "d":
      keys.d = false;
      break;
  }

  // enemy
  switch (e.key) {
    case "ArrowLeft":
      keys.left = false;
      break;

    case "ArrowRight":
      keys.right = false;
      break;
  }
});

function animate() {
  window.requestAnimationFrame(animate);

  background.update();
  skeleton.update();

  c.fillStyle = "red";
  c.fillRect(player.position.x, player.position.y, player.width, player.height);
  player.update();
  enemy.update();

  // player
  player.speed.x = 0;
  if (keys.a) {
    player.speed.x -= 4;
    player.switchSprite("run"); // call switchSprite when moving left
  } else if (keys.d) {
    player.speed.x += 4; // call switchSprite when moving right
    player.switchSprite("run");
  } else {
    player.switchSprite("idle"); // if neither, fallback to the idle sprite
  }

  if (player.speed.y < 0) {
    player.switchSprite("jump");
  } else if (player.speed.y > 0) {
    player.switchSprite("fall");
  }

  // enemy
  enemy.speed.x = 0;
  if (keys.left) {
    enemy.speed.x -= 4;
    enemy.switchSprite("run");
  } else if (keys.right) {
    enemy.speed.x += 4;
    enemy.switchSprite("run");
  } else {
    enemy.switchSprite("idle");
  }

  if (enemy.speed.y < 0) {
    enemy.switchSprite("jump");
  } else if (enemy.speed.y > 0) {
    enemy.switchSprite("fall");
  }

  if (player.isAttacking && player.framesCurrent === 2) {
    enemy.takeHit();
    player.isAttacking = false;
  }
  if (player.isAttacking && player.framesCurrent === 4) {
    player.isAttacking = false;
  }

  if (enemy.isAttacking && enemy.framesCurrent === 2) {
    player.takeHit();
    enemy.isAttacking = false;
  }
  if (enemy.isAttacking && enemy.framesCurrent === 4) {
    enemy.isAttacking = false;
  }
}

animate();
