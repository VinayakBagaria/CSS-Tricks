const height = window.innerHeight;
const width = window.innerWidth;

const ball = document.querySelector('.ball');
let x = 100;
let y = 100;

let xSpeed = 2;
let ySpeed = 2.5;

function loop() {
  x += xSpeed;
  y += ySpeed;

  if (x > width || x < 0) {
    xSpeed *= -1;
  }

  if (y > height || y < 0) {
    ySpeed *= -1;
  }

  ball.style.transform = `translate(${x}px, ${y}px)`;
  requestAnimationFrame(loop);
}

requestAnimationFrame(loop);
