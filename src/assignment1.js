window.onload = function () {
    const canvas = document.getElementById('mainDrawingCanvas');
    const context = canvas.getContext('2d');
    const canvasWidth = canvas.clientWidth;
    const canvasHeight = canvas.clientHeight;
    const FPS = 60;

    const extendObject = function (parent, child) {
        return Object.assign({}, parent, child);
    };

    const defaultShape = {
        color: "#000",
        vx: 2,
        vy: 2,
        moveDX: function (deltaT) {
            this.x += this.vx * deltaT;
            this.y += this.vy * deltaT;
            if (this.intersectHorizontalWalls()) this.vx = -1 * this.vx;
            if (this.intersectVerticalWalls()) this.vy = -1 * this.vy;
        },
    };

    const defaultCircle = extendObject(defaultShape, {
        shape: "circle",
        radius: "20",
        intersectHorizontalWalls: function () {
            return this.x + this.radius > canvasWidth || this.x - this.radius < 0
        },
        intersectVerticalWalls: function () {
            return this.y + this.radius > canvasHeight || this.y - this.radius < 0
        },
        draw: function () {
            context.beginPath();
            context.fillStyle = this.color;
            context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
            context.fill();
        },
    });

    const defaultRect = extendObject(defaultShape, {
        shape: "rect",
        width: 20,
        height: 20,
        intersectHorizontalWalls: function () {
            return this.x + this.width / 2 > canvasWidth || this.x - this.width / 2 < 0
        },
        intersectVerticalWalls: function () {
            return this.y + this.height / 2 > canvasHeight || this.y - this.height / 2 < 0
        },
        draw: function () {
            context.fillStyle = this.color;
            context.fillRect(this.x - this.width / 2, this.y - this.height / 2, this.width, this.height);
        },
    });
    const defaultTriangle = extendObject(defaultShape, {
        shape: "triangle",
        length: 20,
        intersectHorizontalWalls: function () {
            return this.x - this.length / 2 <= 0 || this.x + this.length / 2 >= canvasWidth
        },
        intersectVerticalWalls: function () {
            return this.x - 2 * (Math.sqrt(3) / 2) * this.length / 3 <= 0 || this.x + (Math.sqrt(3) / 2) * this.length / 3 >= canvasHeight
        },
        draw: function () {
            const height = this.length * (Math.sqrt(3) / 2);
            context.fillStyle = this.color;
            context.beginPath();
            context.moveTo(this.x, this.y - 2 * height / 3);
            context.lineTo(this.x + this.length / 2, this.y + height / 3);
            context.lineTo(this.x - this.length / 2, this.y + height / 3);
            context.closePath();
            context.fill();
        },
    });

    const getDefaultShapeObject = function (shapeNameString) {
        switch (shapeNameString) {
            case "rect":
                return extendObject(defaultRect, {});
            case "triangle":
                return extendObject(defaultTriangle, {});
            case "circle":
                return extendObject(defaultCircle, {});
            default:
                return null;
        }
    };

    const descriptors = 'shape:circle/center:120,310/radius:52/velocity:4,2/color:#729|shape:rect/center:256,128/width:78/height:154/velocity:2,3/color:#abb|shape:triangle/center:340,389/length:64/velocity:7,1/color:#926';
    const shapeObjectsArray = [];
    const shapesStrings = descriptors.replace(/\s/g, '').split('|');

    shapesStrings.forEach(function (shapeString) {
        let shapeAttrs = shapeString.split('/');
        let shape = shapeAttrs.find(function (element) {
            return element.startsWith("shape:")
        }).substring(6); //6 is length of "shape:"

        const shapeObject = getDefaultShapeObject(shape);
        if (shapeObject === null) return;

        shapeAttrs.forEach(function (attrsString) {
            let attrs = attrsString.split(":");
            if (attrs[0] === "center") {
                shapeObject["x"] = parseFloat(attrs[1].split(",")[0]);
                shapeObject["y"] = parseFloat(attrs[1].split(",")[1]);
                return;
            }
            if (attrs[0] === "velocity") {
                shapeObject["vx"] = parseFloat(attrs[1].split(",")[0]);
                shapeObject["vy"] = parseFloat(attrs[1].split(",")[1]);
                return;
            }
            shapeObject[attrs[0]] = isNaN(parseFloat(attrs[1])) ? attrs[1] : parseFloat(attrs[1]);
        });

        if (shapeObject["x"] === "" || shapeObject["y"] === "" || isNaN(shapeObject["x"]) || isNaN(shapeObject["y"])) return;
        shapeObjectsArray.push(shapeObject);
    });
    window.setInterval(function () {

        context.clearRect(0, 0, canvasWidth, canvasHeight);
        shapeObjectsArray.forEach(element => {
            element.draw();
            element.moveDX(1000 / FPS)
        });
    }, 1000 / FPS);

};
