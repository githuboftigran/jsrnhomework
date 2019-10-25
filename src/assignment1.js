window.onload = function() {
  const canvas = document.getElementById('mainDrawingCanvas');
  const context = canvas.getContext('2d');

  let x;
  let y;
  let color;
  let xspeed;
  let yspeed;



  x = Math.floor(Math.random() * canvas.height);
  y = Math.floor(Math.random() * canvas.height);
  color = ["red","green","blue","black","grey","pink"];
  xspeed = 5;
  yspeed = 5;




  window.requestAnimationFrame(function loop() {

    context.clearRect(0, 0, canvas.width, canvas.height);
    context.fillRect(x, y, 100, 100);
    x = x + xspeed;
    y = y + yspeed;

    if (x + 100 >= canvas.width) {
      context.fillStyle = color[Math.floor(Math.random() * 5)];
      xspeed = -xspeed;
      x = canvas.width - 100;

    } else if (x <= 0) {
      xspeed = -xspeed;
      x = 0;
      context.fillStyle = color[Math.floor(Math.random() * 5)];
    }
    if (y + 100 >= canvas.height) {
      yspeed = -yspeed;
      y = canvas.height - 100;
      context.fillStyle = color[Math.floor(Math.random() * 5)];
    } else if (y <= 0) {
      yspeed = -yspeed;
      y = 0;
      context.fillStyle = color[Math.floor(Math.random() * 5)];
    }
    window.requestAnimationFrame(loop)
  })

};
