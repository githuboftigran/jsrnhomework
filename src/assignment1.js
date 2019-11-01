let edge = [600, 600]; //canvas edge
let startPos = [0, 0];
let deltaX = -3;            // move step
let deltaY = -3;
window.onload = function() {
  const canvas = document.getElementById('mainDrawingCanvas');
  const context = canvas.getContext('2d');
  const descriptors = 'shape:circle  / center:120,310/radius:52/velocity:4,2/color:#729|shape:rect/center:256,128/width:78/height:154/velocity:2,3/color:#abb|shape:triangle/center:340,389/length:64/velocity:7,1/color:#926';

  let tempArray =  descriptors.split('|');
  let arrayDescriptors = tempArray.map(function(item) {                 // splitting array to single shapes
    return item.split('/');
  });

  arrayDescriptors.forEach(function(element, index) {
   let newArray =  arrayDescriptors[index].map(function(item) {           // splitting shapes properties
      return item.split(':')
    });
    let obj = Object.assign(...newArray.map(([key, val]) => ({[key.trim()]: val.trim()}))); // convert array to Associative Array (...), convert array to object and clear spaces
    if (obj.shape === 'rect') {
      context.beginPath();
      context.fillStyle = obj.color;
      context.fillRect(obj.center.split(',')[0], obj.center.split(',')[1], obj.width, obj.height);
      drawRect(obj.center.split(',')[0],obj.center.split(',')[1],obj.width, obj.height, obj.color );
    }
     else if(obj.shape === 'circle'){
      context.beginPath();
      context.fillStyle = obj.color;
      context.arc(obj.center.split(',')[0], obj.center.split(',')[1], obj.radius, 0, 2 * Math.PI);
      context.fill();
      drawArc(obj.center.split(',')[0], obj.center.split(',')[1], obj.radius, obj.color);

    }
     else if (obj.shape === 'triangle'){ //TODO
      context.beginPath();
      context.fillStyle = obj.color;
      context.moveTo(obj.center.split(',')[0], obj.center.split(',')[1]);
      context.lineTo(10, obj.center.split(',')[1] - obj.length );
      context.lineTo(10,(obj.center.split(',')[1] - obj.length)/2);
      context.fill();
    }
  });


   function drawRect(startPos1, startPos2, rectWidth, rectHeight, color) {
       let x = parseInt(startPos1);
       let y = parseInt(startPos2);
       x += deltaX;
       y += deltaY;
       context.fillStyle = color;
       context.fillRect(x, y, rectWidth, rectHeight);
       if (x < startPos[0] ||  x > edge[0])  deltaX = -deltaX;
       if (y < startPos[1] ||  y > edge[1])  deltaY = -deltaY;
       setTimeout(function() {
           drawRect(x, y, rectWidth, rectHeight, color);
       }, 60)

   }
   function drawArc(startPos1, startPos2, radius, arcColor) {
       context.save();
       let x = parseInt(startPos1);
       let y = parseInt(startPos2);
       context.beginPath();
       x += deltaX;
       y += deltaY;
       context.clearRect(0,0, 600, 600); // clear previous positions
       context.arc(x, y, radius, 0, 2 * Math.PI);
       context.fillStyle = arcColor;
       context.fill();
       context.restore();
       if (x < startPos[0] ||  x > edge[0])  deltaX = -deltaX;
       if (y < startPos[1] ||  y > edge[1])  deltaY = -deltaY;
       setTimeout(function() {
           drawArc(x, y, radius, arcColor);
       }, 60)
   }
};
