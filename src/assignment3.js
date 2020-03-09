const BALL_COUNT = 100;
const INITIAL_SCORE = 10;
const SCORE_MULTIPLIED = 1.6;
const EXPLOSION_RADIUS = 20;
const EXPLOSION_FADE_TIME = 3000;
const EXPLODING_TIME = 500;
const BALL_SPEED = 10;
const FPS = 60; //frames per second

window.onload = function () {
    const canvas = document.getElementById('mainDrawingCanvas');
    const resetButton = document.getElementById('resetButton');
    resetButton.onclick = () => {
        context.clearRect(0, 0, canvas.width, canvas.height);
        explodedBallsArray = [];
        gameState = false;
        drawBalls();
    };
    const scoreSpan = document.getElementById('scoreSpan');
    const context = canvas.getContext('2d');
    let gameState = false;
    let explodedBallsArray = [];
    let ballsArray = [];

    // draw BALL_COUNT of balls
    if (!gameState) {
        drawBalls();
    }

    function drawBalls() {
        for (let i = 0; i < BALL_COUNT; i += 1) {
            ballsArray[i] = new Ball();
        }
    }


    //animate balls
    let animateBallsInterval = setInterval(() => {
        context.clearRect(0, 0, canvas.width, canvas.height);
        ballsArray.forEach(item => {
            item.x += item.vx * BALL_SPEED / FPS;
            item.y += item.vy * BALL_SPEED / FPS;

            if (item.x > canvas.width - item.radius || item.x - item.radius < 0) {
                item.vx = -item.vx;
            }
            if (item.y > canvas.height - item.radius || item.y - item.radius < 0) {
                item.vy = -item.vy;
            }
            item.draw(context);
        });

        explodedBallsArray.forEach(explodedBalls => {
            explodedBalls.draw();
        });
        if (gameState && explodedBallsArray.length === 0) {
            clearInterval(animateBallsInterval);
            context.clearRect(0, 0, canvas.width, canvas.height);
            gameState = false;
        }

    }, 1000 / FPS);


    canvas.addEventListener('click', event => {
        if (!gameState) {
            gameState = true;
        } else {
            return;
        }
        const x = event.offsetX;
        const y = event.offsetY;
        startChainReaction(x, y);
    }, false);

    function startChainReaction(x, y) {
        let firstExplosion = new Ball();
        firstExplosion.x = x;
        firstExplosion.y = y;
        explodedBallsArray.push(firstExplosion);
        explosion(firstExplosion, EXPLODING_TIME);
        fadeColor(firstExplosion, EXPLOSION_FADE_TIME);
        gameState = true;
    }

    explodedBallsArray.forEach(explodedBall => {
    });


    //explosions
    setInterval(() => {
        explodedBallsArray.forEach(explodedBall => {
            const ex = explodedBall.x;
            const ey = explodedBall.y;
            const eRadius = explodedBall.radius;
            ballsArray.forEach(ball => {
                const {x, y, radius} = ball;
                const distanceSQ = (x - ex) * (x - ex) + (y - ey) * (y - ey);
                const radiusSum = radius + eRadius;
                if (distanceSQ < radiusSum * radiusSum) {
                    explosion(ball, EXPLODING_TIME);
                    fadeColor(ball, EXPLOSION_FADE_TIME);
                    explodedBallsArray.push(ball);
                    ballsArray.splice(ballsArray.indexOf(ball), 1);
                }
            })
        });
        explodedBallsArray = explodedBallsArray.filter(item => item.color.substr(7, 2) !== '00');
    }, 1000 / FPS);


    //draw a ball
    function Ball() {
        this.radius = 10;
        this.x = Math.random() * (canvas.width - this.radius);
        if (this.x < this.radius) {
            this.x = this.radius;
        }
        this.y = Math.random() * (canvas.height - this.radius);
        if (this.y < this.radius) {
            this.y = this.radius;
        }
        this.vx = Math.random() * 2 * BALL_SPEED - BALL_SPEED;
        // random number between +/- BALL_SPEED
        this.vy = Math.sqrt(BALL_SPEED * BALL_SPEED - this.vx * this.vx) * (Math.round(Math.random()) * 2 - 1);
        // (square root of ball speed - vx) * (+/- 1)
        this.color = '#' + Math.random().toString(16).substr(2, 6) + 'ff';
        this.draw = () => {
            context.beginPath();
            context.fillStyle = this.color;
            context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            context.fill();
        };
    }
}
;

//state of balls at the explosion moment
function explosion(circle, duration) {
    let startTime = new Date().getTime();

    let explosionInterval = setInterval(() => {
        let now = new Date().getTime();
        circle.radius = circle.radius + (EXPLOSION_RADIUS - circle.radius) * (now - startTime) / duration;
        if (circle.radius === EXPLOSION_RADIUS) {
            clearInterval(explosionInterval);
        }
    }, 1000 / FPS)
}

//fade color
function fadeColor(circle, duration) {
    let startTime = new Date().getTime();
    let startOpacityVal = parseInt(circle.color.substring(7), 16);

    let fadeInterval = setInterval(() => {
        let now = new Date().getTime();
        let value = startOpacityVal - startOpacityVal * (now - startTime) / duration;
        let opacity = Math.round(value);
        if (opacity < 0) {
            opacity = 0;
        }
        opacity = opacity.toString(16);
        if (opacity.length === 1) {
            opacity = '0' + opacity;
        }
        if (opacity.toString() === '00') {
            clearInterval(fadeInterval);
        }
        circle.color = circle.color.substring(0, 7) + opacity;
    }, 1000 / FPS);
}