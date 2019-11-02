const edge = [600, 600]; //canvas edge
const startPos = [0, 0];
let deltaX = -3;            // move step
let deltaY = -3;
window.onload = function() {
  const canvas = document.getElementById('mainDrawingCanvas');
  const context = canvas.getContext('2d');
  const descriptors = 'center:120,310/radius:52/velocity:4,2/color:#729|shape:circle  / center:120,310/radius:52/velocity:4,2/color:#729|shape:rect/center:256,128/width:78/height:154/velocity:2,3/color:#abb|shape:triangle/center:340,389/length:64/velocity:7,1/color:#926';

  const arrayDescriptors = descriptors.trim().split('|').map(function(descString) {
    return descString.trim().split('/').reduce(function(acc, prop){
      const keyValue = prop.trim().split(':');
      acc[keyValue[0].trim()] = keyValue[1].trim();
      return acc;
    }, {});
  });

  const filteredDescs = arrayDescriptors.filter(function(item){
    return item.center && item.shape;
  });

  filteredDescs.forEach(function(item) {

    Object.entries(item).reduce(function (acc, entry) {
      if(!isNaN(entry[1])) {
        acc[entry[0]] = Number(entry[1]);
      }

      const parts = entry[1].split(',');
      if (parts.length === 2 && !isNaN(parts[0]) && !isNaN(parts[1])) {
        acc[entry[0]] = {x: Number(parts[0]), y: Number(parts[1])};
      }

      switch (acc.shape) {
        case 'rect':
          acc.draw = function(context) {
            context.beginPath();
            context.fillStyle = this.color;
            context.fillRect(this.center.x, this.center.y, this.width, this.height);
          }
          break;
        case 'circle':
          acc.draw = function(context) {
            context.beginPath();
            context.fillStyle = this.color;
            context.arc(this.center.x, this.center.y, this.radius, 0, 2 * Math.PI);
            context.fill();
          }
          break;
        case 'triangle':

          break;
      }
      return acc;
    }, item);
  });

   setInterval(function() {
     context.clearRect(0,0, 600, 600);
     filteredDescs.forEach(function(item){
       item.draw && item.draw(context);

       item.center.x += item.velocity.x;
       item.center.y += item.velocity.y;
       if (item.center.x < 0 || item.center.x > canvas.width) {
         item.velocity.x = -item.velocity.x;
       }
       if (item.center.y < 0 || item.center.y > canvas.height) {
         item.velocity.y = -item.velocity.y;
       }
     });
   }, 1000 / 60);
};
