const { PI, sin, asin, pow, min } = Math;

const EASINGS = [
  (x: number) => x,
  (x: number) => pow(x, 3),
  (x: number) => (1 / PI) * asin(2 * x - 1) + 0.5,
  (x: number) => pow(sin((PI / 2) * x), 2),
  (x: number) => x * (2 - x),
  (x: number) => 1 - sin(PI / (2 * (1 - x))) * pow(1 - x, 2),
];

const ALMOST1 = 0.9999999999;
const TICKER = 0.01;
const NEXT_ANIMATION_WAIT = 1500;
const LINE_WIDTH = 4;

const count = EASINGS.length;

const DI = 800;

function funcToMath(functionExp: string) {
  return functionExp
    .replace('x => ', 'y =')
    .replace(/pow\((.+\)), 2\)/g, '$1²')
    .replace(/pow\(([^ ]+), 2\)/g, '$1²')
    .replace(/pow\((.+), 2\)/g, '($1)²')
    .replace(/pow\((.+\)), 3\)/g, '$1³')
    .replace(/pow\(([^ ]+), 3\)/g, '$1³')
    .replace(/pow\((.+), 3\)/g, '($1)³');
}

class Canvas {
  color: string;
  div: HTMLDivElement;
  ctx: CanvasRenderingContext2D;
  ease: (x: number) => number;
  inset: number;
  y: number;
  di: number;
  prevX: number;
  p: HTMLParagraphElement;

  constructor(easeFunction: (x: number) => number, ratio: number) {
    this.color = `hsl(${ratio * 360}deg, 100%, 70%)`;
    this.div = document.createElement('div');
    this.p = document.createElement('p');
    this.p.style.color = this.color;
    const cvs = document.createElement('canvas');
    this.div.appendChild(cvs);
    this.div.appendChild(this.p);
    cvs.width = cvs.height = DI;
    this.inset = DI * 0.2;
    this.di = DI - this.inset * 2;
    this.ctx = cvs.getContext('2d');
    this.ctx.lineWidth = LINE_WIDTH;
    this.ctx.strokeStyle = this.color;
    this.ease = easeFunction;
    this.reset();
  }

  reset() {
    this.y = 0;
    this.prevX = 0;
    this.ctx.clearRect(0, 0, DI, DI);
  }

  point(n: number) {
    return n * this.di + this.inset;
  }

  drawInitialLine(x: number) {
    this.ctx.beginPath();
    this.ctx.moveTo(this.point(this.prevX), this.point(0));
    this.ctx.lineTo(this.point(x), this.point(0));
    this.ctx.strokeStyle = 'rgba(255,255,255,0.5)';
    this.ctx.stroke();
  }

  drawEasingLine(newX: number, newY: number) {
    this.ctx.beginPath();
    this.ctx.moveTo(this.point(this.prevX), this.point(1 - this.y));
    this.ctx.lineTo(this.point(newX), this.point(1 - newY));
    this.ctx.strokeStyle = this.color;
    this.ctx.stroke();
  }

  tick(newX: number) {
    const newY = this.ease(newX);

    this.drawInitialLine(newX);
    this.drawEasingLine(newX, newY);

    this.p.innerHTML = `${funcToMath(
      this.ease.toString()
    )}<br />y = ${newY.toFixed(4)}`;

    this.y = newY;
    this.prevX = newX;
  }
}

let canvases: Array<Canvas> = [];

function init() {
  canvases = EASINGS.map((eachEasing, index) => {
    const canvas = new Canvas(eachEasing, index / count);
    document.querySelector('section').appendChild(canvas.div);
    return canvas;
  });
}

function run() {
  let x = 0;

  function loop() {
    x = min(ALMOST1, x + TICKER);
    canvases.forEach((canvas) => canvas.tick(x));
    // When we reach almost 1, reset the canvas and start RAF again
    if (x >= ALMOST1) {
      setTimeout(() => {
        canvases.forEach((canvas) => canvas.reset());
        loop();
      }, NEXT_ANIMATION_WAIT);
      x = 0;
    } else {
      requestAnimationFrame(loop);
    }
  }
  loop();
}

init();
run();
