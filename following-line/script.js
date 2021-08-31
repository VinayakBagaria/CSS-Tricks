const svg = document.querySelector('svg');
const pol = svg.querySelector('polyline');

const height = window.innerHeight;
const width = window.innerWidth;

svg.setAttribute('viewBox', `0 0 ${width} ${height}`);
svg.setAttribute('width', width);
svg.setAttribute('height', height);

const halvedW = width / 2;
const halvedH = height / 2;

pol.setAttribute(
  'points',
  `${halvedW} ${halvedH} ${halvedW + 40} ${halvedH + 200}`
);

document.onmousemove = (event) => {
  pol.setAttribute(
    'points',
    `${halvedW} ${halvedH} ${event.clientX} ${event.clientY}`
  );
};
