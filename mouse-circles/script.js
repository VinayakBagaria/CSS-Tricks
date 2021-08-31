const colors = ['#029DAF', '#E5D599', '#FFC219', '#F07C19', '#E32551'];

const height = window.innerHeight;
const width = window.innerWidth;

const svg = document.querySelector('svg');
const circle = svg.querySelector('circle');

svg.setAttribute('viewBox', `0 0 ${width} ${height}`);
svg.setAttribute('width', width);
svg.setAttribute('height', height);
svg.style.cursor = 'pointer';

const size = 40;
const radius = 10;

const xCircles = Math.round(width / size);
const yCircles = Math.round(height / size);
const totalCircles = xCircles * yCircles;

let startY = -size / 2;

function drawCircles() {
  for (let i = 0; i < totalCircles; i += 1) {
    const circle = document.createElementNS(svg.namespaceURI, 'circle');
    svg.appendChild(circle);
    circle.setAttribute('r', radius);
    circle.setAttribute('cx', (i % xCircles) * size);
    const hasReachedStart = i % xCircles === 0;
    if (hasReachedStart) {
      startY += size;
    }
    circle.setAttribute('cy', startY);

    // styles
    circle.setAttribute('fill', `rgb(225, ${i % 225}, 0)`);
    circle.setAttribute('stroke-width', 40);
    circle.setAttribute('stroke-opacity', 0);
    circle.setAttribute('stroke', 'oranged');
    circle.style.transformOrigin = '50% 50%';
    circle.style.opacity = 0.5;
    circle.style.transition = 'all 0.4s ease-out';

    circle.addEventListener('mouseover', () => {
      circle.style.opacity = 1;
      circle.style.transform = 'scale(2)';
    });

    circle.addEventListener('mouseleave', () => {
      circle.style.transition = '0.6s all ease-in';
      setTimeout(() => {
        circle.style.opacity = 0.5;
        circle.style.transform = 'scale(1)';
      }, 600);
    });
  }
}

drawCircles();
