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

    //create objects of shapes
    function getObjects() {
        return descriptors.split('|').map(params => {
            return params.trim().split('/').reduce((object, value) => {
                const paramValues = value.trim().split(':');
                object[paramValues[0].trim()] = paramValues[1].trim();
                return object;
            }, {});
        }).filter(item => {
            // return true item is valid
            return item.hasOwnProperty('shape') && item.hasOwnProperty('center') &&
                (item.shape === 'circle' || item.shape === 'triangle' || item.shape === 'rect');
        }).map(item => {
                // return new item with proper values
                return Object.entries(item).reduce((item, value) => {
                    if (isNaN(value[1])) {
                        if (!isNaN(value[1].split(',')[0]) && !isNaN(value[1].split(',')[1])) {
                            switch (value[0]) {
                                case 'center':
                                    let x = Number(value[1].split(',')[0]);
                                    let y = Number(value[1].split(',')[1]);
                                    item[value[0]] = [x, y];
                                    break;
                                case 'velocity':
                                    let vx = Number(value[1].split(',')[0]);
                                    let vy = Number(value[1].split(',')[1]);
                                    item[value[0]] = [vx, vy];
                                    break;
                            }
                        } else {
                            item[value[0]] = value[1];
                        }
                    } else {
                        item[value[0]] = Number(value[1]);
                    }
                    if (item.hasOwnProperty('velocity') === false) {
                        item['velocity'] = [2, 2];
                    }
                    if (item.hasOwnProperty('color') === false) {
                        item['color'] = '#000000';
                    }
                    switch (value[1]) {
                        case 'circle':
                            if (item.hasOwnProperty('radius') === false) {
                                item['radius'] = 10;
                            }
                            break;
                        case 'rect':
                            if (item.hasOwnProperty('height') === false) {
                                item['height'] = 10;
                            }
                            if (item.hasOwnProperty('width') === false) {
                                item['width'] = 10;
                            }
                            break;
                        case 'triangle':
                            if (item.hasOwnProperty('size') === false) {
                                item['size'] = 10;
                            }
                            break;
                    }
                    return item;
                }, {});
            }
        );
    }


    function draw(context) {
        return getObjects().forEach(item => {
            switch (item.shape) {
                case 'circle':
                    context.beginPath();
                    context.arc(item.x, item.y, item.radius, 0, Math.PI * 2);
                    context.fillStyle = item.color;
                    break;
                case'rect':
                    context.beginPath();
                    context.fillRect(item.x - item.width / 2, item.y - item.height / 2, item.width, item.height);
                    context.fillStyle = item.color;
                    break;
                case 'triangle':
                    const height = item.size * SQRT_3 / 2;
                    const topX = item.x;
                    const topY = item.y - height * 2 / 3;
                    context.beginPath();
                    context.moveTo(topX, topY);
                    context.lineTo(topX + item.size / 2, topY + height);
                    context.lineTo(topX - item.size / 2, topY + height);
                    context.lineTo(topX, topY);
                    context.fillStyle = item.color;
                    break;
            }
        });
    }

    draw(context);

    setInterval(() => {
        getObjects().forEach(item => {
            item.x += item.vx;
            item.y += item.vy;

            if (item.y + item.vy > canvas.height || item.y + item.vy < 0) {
                item.vy = -item.vy;
            }
            if (item.x + item.vx > canvas.width || item.x + item.vx < 0) {
                item.vx = -item.vx;
            }
            draw(context);
        })
    }, 1000 / 60)
};
