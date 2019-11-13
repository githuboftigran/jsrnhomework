window.onload = function() {
  const canvas = document.getElementById('mainDrawingCanvas');
  const resetButton = document.getElementById('resetButton');
  const scoreSpan = document.getElementById('scoreSpan');

  const context = canvas.getContext('2d');

  canvas.addEventListener('click', event => {
    const x = event.offsetX;
    const y = event.offsetY;
  }, false);

  resetButton.onclick = () => {

  }
};
