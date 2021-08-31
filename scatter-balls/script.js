const colors = ['#029DAF', '#E5D599', '#FFC219', '#F07C19', '#E32551'];

const height = window.innerHeight;
const width = window.innerWidth;

const initialX = width / 2;
const initialY = height / 2;

const svg = document.querySelector('svg');
const circle = svg.querySelector('circle');

svg.setAttribute('viewBox', `0 0 ${width} ${height}`);
svg.setAttribute('width', width);
svg.setAttribute('height', height);

const particles = [];

function initParticles() {
  for (let i = 0; i < 200; i += 1) {
    setTimeout(() => {
      createParticle(i);
    }, 20 * i);
  }
}

function createParticle(i) {
  const size = 5 * Math.random() + 5;
  const color = colors[i % colors.length];
  // So accelX will either be +ve or -ve
  const accelX = -2 + Math.random() * 4;
  const accelY = Math.random() * -3;
  const p = new Particle(initialX, initialY, accelX, accelY, size, color);
  particles.push(p);
}

class Particle {
  circle;
  x;
  y;
  accelX;
  accelY;

  constructor(x, y, accelX, accelY, size, color) {
    const circle = document.createElementNS(svg.namespaceURI, 'circle');
    svg.appendChild(circle);
    circle.setAttribute('r', size / 2);
    circle.setAttribute('fill', color);
    this.circle = circle;
    this.x = x;
    this.y = y;
    this.accelX = accelX;
    this.accelY = accelY;
  }

  update() {
    this.x += this.accelX;
    this.y += this.accelY;
    this.circle.setAttribute('cx', this.x);
    this.circle.setAttribute('cy', this.y);
  }
}

function loop() {
  particles.forEach((eachP) => eachP.update());
  requestAnimationFrame(loop);
}

initParticles();
requestAnimationFrame(loop);
