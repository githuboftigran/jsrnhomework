window.onload = function() {
  const canvas = document.getElementById('mainDrawingCanvas');
  const context = canvas.getContext('2d');

  const descriptors = 'shape:circle  / center:120,310/radius:52/velocity:4,2/color:#729|shape:rect/center:256,128/width:78/height:154/velocity:2,3/color:#abb|shape:triangle/center:340,389/length:64/velocity:7,1/color:#926';

  let tempArray =  descriptors.split('|');
  let arrayDescriptors = tempArray.map(function(item) { // splitting array to single shapes
    return item.split('/');
  });

  arrayDescriptors.forEach(function(element, index) {
   let newArray =  arrayDescriptors[index].map(function(item) { // splitting shapes properties
      return item.split(':')
    });
    let obj = Object.assign(...newArray.map(([key, val]) => ({[key.trim()]: val.trim()}))); // convert array to Associative Array (...) and array to object
    if (obj.shape === 'rect') {
      context.beginPath();
      context.fillStyle = obj.color;
      context.fillRect(obj.center.split(',')[0], obj.center.split(',')[1], obj.width, obj.height);
    }
     else if(obj.shape === 'circle'){
      context.beginPath();
      context.fillStyle = obj.color;
      context.arc(obj.center.split(',')[0], obj.center.split(',')[1], obj.radius, 0, 2 * Math.PI);
      context.fill();
    }
     else if (obj.shape === 'triangle'){
      context.beginPath();
      context.fillStyle = obj.color;
      context.moveTo(obj.center.split(',')[0], obj.center.split(',')[1]);
      context.lineTo(10, obj.center.split(',')[1] - obj.length ); // i know that is wrong ))
      context.lineTo(10,(obj.center.split(',')[1] - obj.length)/2); // its too
      context.fill();
    }
      else {
      context.font = "30px Arial";
      context.strokeText("Yesiminch", 10, 50);
    }
  });
};
