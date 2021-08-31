const height = window.innerHeight;
const width = window.innerWidth;

const svg = document.querySelector('svg');
const circle = svg.querySelector('circle');

svg.setAttribute('viewBox', `0 0 ${width} ${height}`);
svg.setAttribute('width', width);
svg.setAttribute('height', height);

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

  circle.setAttribute('cx', x);
  circle.setAttribute('cy', y);
  requestAnimationFrame(loop);
}

requestAnimationFrame(loop);
