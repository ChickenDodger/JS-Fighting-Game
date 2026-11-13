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
  offset: { x: 210, y: 120 },
});

const keys = {
  a: false,
  d: false,
};

window.addEventListener("keydown", (e) => {
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
});

function animate() {
  window.requestAnimationFrame(animate);

  background.update();
  skeleton.update();

  c.fillStyle = "red";
  c.fillRect(player.position.x, player.position.y, player.width, player.height);
  player.update();

  player.speed.x = 0;
  if (keys.a) {
    player.speed.x -= 4;
  } else if (keys.d) {
    player.speed.x += 4;
  }
}

animate();
