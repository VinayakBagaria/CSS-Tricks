const colors = ['#029DAF', '#E5D599', '#FFC219', '#F07C19', '#E32551'];

const gravity = 0.04;

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
  const p = new Particle(i);
  particles.push(p);
}

class Particle {
  circle;
  x;
  y;
  accelX;
  accelY;
  randomIndicator;

  constructor(i) {
    const circle = document.createElementNS(svg.namespaceURI, 'circle');
    svg.appendChild(circle);
    circle.setAttribute('r', (5 * Math.random() + 5) / 2);
    circle.setAttribute('fill', colors[i % colors.length]);
    this.circle = circle;
    this.reset();
  }

  reset() {
    this.x = width / 2;
    this.y = height / 2;
    this.randomIndicator = 0.5 + Math.random() * 0.5;
    // So accelX will either be +ve or -ve
    this.accelX = -2 + Math.random() * 4;
    this.accelY = Math.random() * -3;
  }

  update() {
    if (this.randomIndicator - 0.005 > 0) {
      this.randomIndicator -= 0.005;
    } else {
      this.reset();
    }
    this.accelY += gravity;
    this.x += this.accelX;
    this.y += this.accelY;
    this.circle.setAttribute('cx', this.x);
    this.circle.setAttribute('cy', this.y);
  }
}

function loop() {
  particles.forEach((particle) => particle.update());
  requestAnimationFrame(loop);
}

initParticles();
requestAnimationFrame(loop);
