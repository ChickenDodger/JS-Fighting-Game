const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

canvas.width = 1024;
canvas.height = 576;

const gravity = 0.7;
const ground = canvas.height - 100;

const background = { image: new Image() };
background.image.src = "../assets/img/background.png";

const skeleton = { image: new Image(), x: 900, y: 200 };
skeleton.image.src = "../assets/img/skeleton.png";

const player = {
  position: { x: 100, y: 0 },
  width: 50,
  height: 150,
  speed: { x: 0, y: 0 },
};

function isOnGround(fighter) {
  return fighter.position.y + fighter.height >= ground;
}

const keys = {
  a: false,
  d: false,
};

window.addEventListener("keydown", (e) => {
  switch (e.key) {
    case "w":
      if (isOnGround(player)) {
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

  c.drawImage(background.image, 0, 0, canvas.width, canvas.height);
  c.drawImage(
    skeleton.image,
    0,
    0,
    944 / 8,
    128,
    skeleton.x,
    skeleton.y,
    944 / 8,
    128,
  );

  c.fillStyle = "red";
  c.fillRect(player.position.x, player.position.y, player.width, player.height);

  player.speed.x = 0;
  if (keys.a) {
    player.speed.x -= 4;
  } else if (keys.d) {
    player.speed.x += 4;
  }
  console.log(keys);

  player.speed.y += gravity;
  player.position.y += player.speed.y;
  player.position.x += player.speed.x;

  if (player.position.y + player.speed.y + player.height > ground) {
    player.speed.y = 0;
    player.position.y = ground - player.height;
  }
}

animate();
