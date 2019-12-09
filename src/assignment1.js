window.onload = function () {
    const SQRT_3 = Math.sqrt(3);
    const canvas = document.getElementById('mainDrawingCanvas');
    const context = canvas.getContext('2d');

    const descriptors = 'shape:circle/center:120,310/radius:52/velocity:4,2/color:#729|shape :circle/center:120,310/radius:52/velocity:4,2/color:#729  | shape:rect/center:256,128/width:78/height:154/velocity:2,3/color:#abb|shape:triangle/center:340,389/size:64/velocity:7,1/color:#926';

    //shape:circle					//shape :circle
    //center:120,310				//center:120,310
    //radius:52						//radius:52
    //velocity:4,2					//velocity:4,2
    //color:#729					//color:#729

    //shape:rect					//shape:triangle
    //center:256,128				//center:340,389
    //width:78						//size:64
    //height:154					//velocity:7,1
    //velocity:2,3					//color:#926
    //color:#abb

    //create objects from the string
    const shapes = descriptors.split('|').map(params => {
        return params.trim().split('/').reduce((object, value) => {
            const paramValues = value.trim().split(':');
            object[paramValues[0].trim()] = paramValues[1].trim();
            return object;
        }, {});
    }).filter(item => {
        // return valid items
        return item.shape && item.center && (item.shape === 'circle' || item.shape === 'triangle' || item.shape === 'rect');
    });

    function GeneralParameters() {
        return shapes.map(item => {
            this.shape = item.shape;
            this.x = Number(item.center.split(',')[0]);
            this.y = Number(item.center.split(',')[1]);
            this.color = item.color;
            this.vx = Number(item.velocity.split(',')[0]);
            this.vy = Number(item.velocity.split(',')[1]);
            return this;
        });
    }

    function Circle() {
        shapes.filter(item => {
            return item.shape === 'circle';
        }).map(item => {
            GeneralParameters.call(this);

            this.radius = Number(item.radius);
            this.draw = context2d => {
                context2d.beginPath();
                context2d.fillStyle = this.color;
                context2d.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
                context2d.fill();
            }
        });
    }

    function Rect() {
        shapes.filter(item => {
            return item.shape === 'rect';
        }).map(item => {
            GeneralParameters.call(this);
            this.height = Number(item.height);
            this.width = Number(item.width);
            this.draw = context2d => {
                context2d.beginPath();
                context2d.fillStyle = this.color;
                context2d.fillRect(this.x - this.width / 2, this.y - this.height / 2, this.width, this.height);
            }
        });
    }


    function Triangle() {
        shapes.filter(item => {
            return item.shape === 'triangle';
        }).map(item => {
            GeneralParameters.call(this);
            this.size = Number(item.size);
            this.draw = context2d => {
                const height = this.size * SQRT_3 / 2;
                const topX = this.x;
                const topY = this.y - height * 2 / 3;
                context2d.beginPath();
                context2d.fillStyle = this.color;
                context2d.moveTo(topX, topY);
                context2d.lineTo(topX + this.size / 2, topY + height);
                context2d.lineTo(topX - this.size / 2, topY + height);
                context2d.lineTo(topX, topY);
                context2d.fill();
            }
        });
    }

    const parseShapes = shapes.map(item => {
        switch (item.shape) {
            case 'circle':
                return new Circle();
            case 'rect':
                return new Rect();
            case 'triangle':
                return new Triangle();
        }
    });

    setInterval(function () {
        context.clearRect(0, 0, 600, 600);
        parseShapes.forEach(item => {
            item.x += item.vx;
            item.y += item.vy;
            if (item.x + item.vx < 0 || item.x + item.vx > canvas.width) {
                item.vx = -item.vx;
            }
            if (item.y + item.vy < 0 || item.y + item.vy > canvas.height) {
                item.vy = -item.vy;
            }
            item.draw(context);
        });
    }, 1000 / 60);
};