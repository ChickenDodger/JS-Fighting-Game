const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

canvas.width = 1024;
canvas.height = 576;

const gravity = 0.7;
const ground = canvas.height - 100;

const player = {
  position: { x: 100, y: 0 },
  width: 50,
  height: 150,
  speed: { x: 0, y: 0 },
};

// function to check the player is on the ground and can only jump then

const isOnGround = (fighter) => {
  return fighter.position.y + fighter.height >= ground;
};

// adding jump
window.addEventListener("keydown", (e) => {
  if (e.key === "w" && isOnGround(player)) {
    player.speed.y -= 15;
  }
});

const animate = () => {
  window.requestAnimationFrame(animate);
  c.fillStyle = "black";
  c.fillRect(0, 0, canvas.width, canvas.height);

  c.fillStyle = "red";
  c.fillRect(player.position.x, player.position.y, player.width, player.height);

  player.speed.y += gravity;
  player.position.y += player.speed.y;

  if (player.position.y + player.speed.y + player.height > ground) {
    player.speed.y = 0;
    player.position.y = ground - player.height;
  }
};

animate();
