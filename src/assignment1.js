const validShapes = ['triangle', 'circle', 'rect'];
const TRIANGLE = 0;
const CIRCLE = 1;
const RECT = 2;
const SHAPE_INDEX = 0;
const sin60 = Math.sqrt(3) / 2;

window.onload = function () {
    const canvas = document.getElementById('mainDrawingCanvas');
    const context = canvas.getContext('2d');
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    const figures = ('shape:circle/center:120,310/radius:100/velocity:1,2/color:#64b1' +
        '|shape:rect/center:256,128/width:78/height:154/velocity:2,3/color:#3381' +
        '|shape:triangle/center:340,389/length:180/velocity:7,1/color:#19a1' +
        '|shape:circle/center:500,500/radius:70/velocity:-4,-6/color:#b1b1' +
        '|shape:rect/center:200,128/width:100/height:84/velocity:3,-5/color:#3441' +
        '|shape:triangle/center:340,389/length:150/velocity:7,10/color:#49f1')
        .replace(/\s/g, '').split('|').map(value => parseFigure(value))
        .filter(value => value && value.containsX(width) && value.containsY(height));
    window.setInterval(function () {
        context.clearRect(0, 0, width, height);
        figures.forEach(figure => {
            figure.draw(context);
            figure.move(width, height);
        });
    }, 50 / 3);
};

//note: the first param should be shape for better code :)
function parseFigure(descriptor) {
    const params = descriptor.split('/');
    const pair = params.splice(SHAPE_INDEX, 1)[0].split(':');
    if (pair[0] !== 'shape') {
        return;
    }
    let figure;
    switch (pair[1]) {
        case validShapes[TRIANGLE]:
            figure = new Triangle(params);
            break;
        case validShapes[RECT]:
            figure = new Rect(params);
            break;
        case validShapes[CIRCLE]:
            figure = new Circle(params);
            break;
        default:
            return;
    }
    if (!figure.center) {
        return;
    }
    return figure;
}

function Shape(params) {
    this.color = '#000';
    this.velocity = [2, 2];
    this.changeDirection = index => {
        this.velocity[index] = -this.velocity[index];
    };
    this.move = (width, height) => {
        this.center[0] += this.velocity[0];
        this.center[1] += this.velocity[1];
        if (!this.containsX(width)) {
            this.changeDirection(0);
        }
        if (!this.containsY(height)) {
            this.changeDirection(1);
        }
    };
    params.forEach(value => {
        const pair = value.split(':');
        this[pair[0]] = pair[0] === 'color' ? pair[1] : pair[1].includes(',') ?
            pair[1].split(',').map(stringValue => parseInt(stringValue)) : parseInt(pair[1]);
    });
}

function Circle(params) {
    this.shape = validShapes[CIRCLE];
    this.radius = 10;
    this.draw = context => {
        context.beginPath();
        context.fillStyle = this.color;
        context.arc(this.center[0], this.center[1], this.radius, 0, Math.PI * 2);
        context.fill();
    };
    this.containsX = width => {
        return !(this.center[0] - this.radius <= 0 || this.center[0] + this.radius >= width);
    };
    this.containsY = height => {
        return !(this.center[1] - this.radius <= 0 || this.center[1] + this.radius >= height);
    };
    Shape.call(this, params);
}

function Rect(params) {
    this.shape = validShapes[RECT];
    this.width = 10;
    this.height = 10;

    this.draw = context => {
        context.fillStyle = this.color;
        context.fillRect(this.center[0] - (this.width / 2), this.center[1] - (this.height / 2), this.width, this.height);
    };
    this.containsX = width => {
        return !(this.center[0] - this.width / 2 <= 0 || this.center[0] + this.width / 2 >= width);
    };
    this.containsY = height => {
        return !(this.center[1] - this.height / 2 <= 0 || this.center[1] + this.height / 2 >= height);
    };
    Shape.call(this, params);
}

function Triangle(params) {
    this.shape = validShapes[TRIANGLE];
    this.length = 10;
    this.draw = context => {
        context.fillStyle = this.color;
        const height = sin60 * this.length;
        context.beginPath();
        context.moveTo(this.center[0], this.center[1] - 2 * height / 3);
        context.lineTo(this.center[0] + this.length / 2, this.center[1] + height / 3);
        context.lineTo(this.center[0] - this.length / 2, this.center[1] + height / 3);
        context.closePath();
        context.fill();
    };
    this.containsX = width => {
        return !(this.center[0] - this.length / 2 <= 0 || this.center[0] + this.length / 2 >= width);
    };
    this.containsY = height => {
        return !(this.center[1] - 2 * sin60 * this.length / 3 <= 0 || this.center[1] + sin60 * this.length / 3 >= height);
    };
    Shape.call(this, params);
}
