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
});

const enemy = new Fighter({
  position: { x: canvas.width - 200, y: 0 },
  speed: { x: 0, y: 0 },
  src: "../assets/img/Huntress/Idle.png",
  totalFrames: 8,
  scale: 2.5,
  offset: { x: 215, y: 100 },
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

  player.speed.x = 0;
  if (keys.a) {
    player.speed.x -= 4;
  } else if (keys.d) {
    player.speed.x += 4;
  }

  enemy.speed.x = 0;
  if (keys.left) {
    enemy.speed.x -= 4;
  } else if (keys.right) {
    enemy.speed.x += 4;
  }
}

animate();
