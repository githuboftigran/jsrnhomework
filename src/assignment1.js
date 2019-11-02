const validShapes = ['triangle', 'circle', 'rect'];
const sin60 = Math.sqrt(3) / 2;

window.onload = function () {
    const canvas = document.getElementById('mainDrawingCanvas');
    const context = canvas.getContext('2d');
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    const figures = ('shape:circle/center:120,310/radius:100/velocity:1,2/color:#64ba' +
        '|shape:rect/center:256,128/width:78/height:154/velocity:2,3/color:#338a' +
        '|shape:triangle/center:340,389/length:180/velocity:7,1/color:#19a6' +
        '|shape:circle/center:500,500/radius:70/velocity:-4,-6/color:#b1ba' +
        '|shape:rect/center:200,128/width:100/height:84/velocity:2,-4/color:#344a' +
        '|shape:triangle/center:340,389/length:150/velocity:7,10/color:#49f6')
        .split(' ').join('').split('|').map((value) => parseFigure(value))
        .filter((value) => value && value.containsX(width) && value.containsY(height));
    window.setInterval(function () {
        context.clearRect(0, 0, canvas.width, canvas.height);
        figures.forEach((value) => {
            value.draw(context);
            value.center[0] += value.velocity[0];
            value.center[1] += value.velocity[1];
            value.checkIfContainsAndChangeDirection(width, height);
        });
    }, 50 / 3);
};

function parseFigure(string) {
    const figure = {
        color: '#000',
        velocity: [2, 2],
        changeDirection: function (index) {
            this.velocity[index] = -this.velocity[index];
        },
        checkIfContainsAndChangeDirection: function (width, height) {
            if (!this.containsX(width)) {
                this.changeDirection(0);
            }
            if (!this.containsY(height)) {
                this.changeDirection(1);
            }
        },
    };
    string.split('/').forEach((value) => {
        const pair = value.split(':');
        figure[pair[0]] = pair[0] === 'shape' || pair[0] === 'color' ? pair[1] : pair[1].includes(',') ?
            pair[1].split(',').map((stringValue) => parseInt(stringValue)) : parseInt(pair[1]);
    });
    if (!validShapes.includes(figure.shape) || figure.center === undefined) {
        return false;
    }
    addSpecifics(figure);
    return figure;
}

function addSpecifics(figure) {
    switch (figure.shape) {
        case 'triangle':
            if (figure.length === undefined) {
                figure.length = 10;
            }
            figure.draw = function (context) {
                context.fillStyle = this.color;
                const height = sin60 * this.length;
                context.beginPath();
                context.moveTo(this.center[0], this.center[1] - 2 * height / 3);
                context.lineTo(this.center[0] + this.length / 2, this.center[1] + height / 3);
                context.lineTo(this.center[0] - this.length / 2, this.center[1] + height / 3);
                context.closePath();
                context.fill();
            };
            figure.containsX = function (width) {
                return !(this.center[0] - this.length / 2 <= 0 || this.center[0] + this.length / 2 >= width);
            };
            figure.containsY = function (height) {
                return !(this.center[1] - 2 * sin60 * this.length / 3 <= 0 || this.center[1] + sin60 * this.length / 3 >= height);
            };
            break;
        case 'rect':
            if (figure.width === undefined) {
                figure.width = 10;
            }
            if (figure.height === undefined) {
                figure.height = 10;
            }
            figure.draw = function (context) {
                context.fillStyle = this.color;
                context.fillRect(this.center[0] - (this.width / 2), this.center[1] - (this.height / 2), this.width, this.height);
            };
            figure.containsX = function (width) {
                return !(this.center[0] - this.width / 2 <= 0 || this.center[0] + this.width / 2 >= width);
            };
            figure.containsY = function (height) {
                return !(this.center[1] - this.height / 2 <= 0 || this.center[1] + this.height / 2 >= height);
            };
            break;
        case 'circle':
            if (figure.radius === undefined) {
                figure.radius = 10;
            }
            figure.draw = function (context) {
                context.beginPath();
                context.fillStyle = this.color;
                context.arc(this.center[0], this.center[1], this.radius, 0, Math.PI * 2);
                context.fill();
            };
            figure.containsX = function (width) {
                return !(this.center[0] - this.radius <= 0 || this.center[0] + this.radius >= width);
            };
            figure.containsY = function (height) {
                return !(this.center[1] - this.radius <= 0 || this.center[1] + this.radius >= height);
            };
            break;
    }
}
