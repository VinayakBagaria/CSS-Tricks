var PI = Math.PI, sin = Math.sin, asin = Math.asin, pow = Math.pow, min = Math.min;
var EASINGS = [
    function (x) { return x; },
    function (x) { return pow(x, 3); },
    function (x) { return (1 / PI) * asin(2 * x - 1) + 0.5; },
    function (x) { return pow(sin((PI / 2) * x), 2); },
    function (x) { return x * (2 - x); },
    function (x) { return 1 - sin(PI / (2 * (1 - x))) * pow(1 - x, 2); },
];
var ALMOST1 = 0.9999999999;
var count = EASINGS.length;
var DI = 800;
function funcToMath(functionExp) {
    return functionExp
        .replace('x => ', 'y =')
        .replace(/pow\((.+\)), 2\)/g, '$1²')
        .replace(/pow\(([^ ]+), 2\)/g, '$1²')
        .replace(/pow\((.+), 2\)/g, '($1)²')
        .replace(/pow\((.+\)), 3\)/g, '$1³')
        .replace(/pow\(([^ ]+), 3\)/g, '$1³')
        .replace(/pow\((.+), 3\)/g, '($1)³');
}
var Canvas = /** @class */ (function () {
    function Canvas(easeFunction, ratio) {
        this.color = "hsl(" + ratio * 360 + "deg, 100%, 70%)";
        this.div = document.createElement('div');
        this.p = document.createElement('p');
        this.p.style.color = this.color;
        var cvs = document.createElement('canvas');
        this.div.appendChild(cvs);
        this.div.appendChild(this.p);
        cvs.width = cvs.height = DI;
        this.inset = DI * 0.2;
        this.di = DI - this.inset * 2;
        this.ctx = cvs.getContext('2d');
        this.ctx.lineWidth = 4;
        this.ctx.strokeStyle = this.color;
        this.ease = easeFunction;
        this.reset();
    }
    Canvas.prototype.reset = function () {
        this.y = 0;
        this.prevX = 0;
        this.ctx.clearRect(0, 0, DI, DI);
    };
    Canvas.prototype.point = function (n) {
        return n * this.di + this.inset;
    };
    Canvas.prototype.drawInitialLine = function (x) {
        this.ctx.beginPath();
        this.ctx.moveTo(this.point(this.prevX), this.point(0));
        this.ctx.lineTo(this.point(x), this.point(0));
        this.ctx.strokeStyle = 'rgba(255,255,255,0.5)';
        this.ctx.stroke();
    };
    Canvas.prototype.drawEasingLine = function (newX, newY) {
        this.ctx.beginPath();
        this.ctx.moveTo(this.point(this.prevX), this.point(1 - this.y));
        this.ctx.lineTo(this.point(newX), this.point(1 - newY));
        this.ctx.strokeStyle = this.color;
        this.ctx.stroke();
    };
    Canvas.prototype.tick = function (newX) {
        var newY = this.ease(newX);
        this.drawInitialLine(newX);
        this.drawEasingLine(newX, newY);
        this.p.innerHTML = funcToMath(this.ease.toString()) + "<br />y = " + newY.toFixed(4);
        this.y = newY;
        this.prevX = newX;
    };
    return Canvas;
}());
var canvases = [];
function init() {
    canvases = EASINGS.map(function (eachEasing, index) {
        var canvas = new Canvas(eachEasing, index / count);
        document.querySelector('section').appendChild(canvas.div);
        return canvas;
    });
}
function run() {
    var x = 0;
    function loop() {
        x = min(ALMOST1, x + 0.01);
        canvases.forEach(function (canvas) { return canvas.tick(x); });
        if (x >= ALMOST1) {
            setTimeout(function () {
                canvases.forEach(function (canvas) { return canvas.reset(); });
                loop();
            }, 1500);
            x = 0;
        }
        else {
            requestAnimationFrame(loop);
        }
    }
    loop();
}
init();
run();
