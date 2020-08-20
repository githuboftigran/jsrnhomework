const ANGLE = 24;
const FRACTION = 0.98;
const COUNT = 25;
const SIZE = 120;

const COLORS = [0xff0000, 0xff7f00, 0xffff00, 0x00ff00, 0x00ff00, 0x99ccff, 0x99ccff, 0x0000ff, 0x0000ff, 0x0000ff, 0xcc00ff, 0xcc00ff, 0xcc00ff, 0xcc00ff, 0xcc00ff, 0xcc00ff, ];
//const COLORS = [0x00afff, 0x0000ff, 0xff0000, 0xff0000];
//const COLORS = [0xff0000, 0x0000ff, 0x00ffff];
//const COLORS = [0x0000ff, 0xff0000];

const SQ32 = Math.sqrt(3) / 2;

const interpolateColor = (colors, position) => {
  const scaledPosition = position * (colors.length - 1);
  const startColor = colors[Math.floor(scaledPosition)];
  const endColor = colors[Math.ceil(scaledPosition)];
  const fraction = scaledPosition - Math.floor(scaledPosition);
  const sRed = (startColor >>> 16) & 0xff;
  const sGreen = (startColor >>> 8) & 0xff;
  const sBlue = startColor & 0xff;

  const eRed = (endColor >>> 16) & 0xff;
  const eGreen = (endColor >>> 8) & 0xff;
  const eBlue = endColor & 0xff;

  const rRed = Math.round(sRed + (eRed - sRed) * fraction);
  const rGreen = Math.round(sGreen + (eGreen - sGreen) * fraction);
  const rBlue = Math.round(sBlue + (eBlue - sBlue) * fraction);

  console.log('########################');
  console.log(startColor.toString(16), endColor.toString(16), fraction);
  console.log(rRed.toString(16), rGreen.toString(16), rBlue.toString(16));

  return (rRed << 16) | (rGreen << 8) | rBlue;
};

const drawHex = (size, center, color, context) => {
  const {cx, cy} = center;
  context.beginPath();
  context.strokeStyle = color;
  context.lineWidth = 1;
  context.moveTo(cx, cy - size);
  context.lineTo(cx + SQ32 * size, cy - size / 2);
  context.lineTo(cx + SQ32 * size, cy + size / 2);
  context.lineTo(cx, cy + size);
  context.lineTo(cx - SQ32 * size, cy + size / 2);
  context.lineTo(cx - SQ32 * size, cy - size / 2);
  context.lineTo(cx, cy - size);
  context.stroke();
};

const drawPattern = (center, size, count, angle, fraction, context) => {
  context.save();
  const {cx, cy} = center;
  for(let i = 0; i < count; i += 1) {
    const alpha = Math.floor(255 - 255 * 0 / count);

    const color = interpolateColor(COLORS, i / count);
    const colorStr = color.toString(16);
    let colorWithAlpha = `${colorStr}${alpha < 16 ? '0' : ''}${alpha.toString(16)}`;
    if (colorWithAlpha.length < 8) {
      colorWithAlpha = '0'.repeat(8 - colorWithAlpha.length) + colorWithAlpha;
    }
    drawHex(size, center, `#${colorWithAlpha}`, context);
    context.translate(cx, cy);
    context.rotate(angle);
    context.translate(-cx, -cy);
    size *= fraction;
  }
  context.restore();
};

window.onload = function() {
  const canvas = document.getElementById('mainDrawingCanvas');
  const resetButton = document.getElementById('resetButton');
  const scoreSpan = document.getElementById('scoreSpan');

  const context = canvas.getContext('2d');
  const { width, height } = canvas;
  context.fillStyle = 'black';
  context.fillRect(0, 0, width, height);

  let center = { cx: SIZE, cy: 10 + SIZE };
  drawPattern(center, SIZE, COUNT, 1, FRACTION, context);
  center = { cx: 3 * SIZE, cy: 10 +  SIZE };
  drawPattern(center, SIZE, COUNT, 2, FRACTION, context);
  center = { cx: 5 * SIZE, cy: 10 + SIZE };
  drawPattern(center, SIZE, COUNT, 3, FRACTION, context);
  center = { cx: 7 * SIZE, cy: 10 + SIZE };
  drawPattern(center, SIZE, COUNT, 22, FRACTION, context);
  center = { cx: 9 * SIZE, cy: 10 + SIZE };
  drawPattern(center, SIZE, COUNT, 23, FRACTION, context);

  center = { cx: SIZE, cy: 30 + 3 * SIZE };
  drawPattern(center, SIZE, 40, 1, FRACTION, context);
  center = { cx: 3 * SIZE, cy: 30 +  3 * SIZE };
  drawPattern(center, SIZE, 40, 2, FRACTION, context);
  center = { cx: 5 * SIZE, cy: 30 + 3 * SIZE };
  drawPattern(center, SIZE, 40, 3, FRACTION, context);
  center = { cx: 7 * SIZE, cy: 30 + 3 * SIZE };
  drawPattern(center, SIZE, 40, 22, FRACTION, context);
  center = { cx: 9 * SIZE, cy: 30 + 3 * SIZE };
  drawPattern(center, SIZE, 40, 23, FRACTION, context);

  center = { cx: SIZE, cy: 50 + 5 * SIZE };
  drawPattern(center, SIZE, 40, 1, 0.98, context);
  center = { cx: 3 * SIZE, cy: 50 + 5 * SIZE };
  drawPattern(center, SIZE, 40, 2, 0.983, context);
  center = { cx: 5 * SIZE, cy: 50 + 5 * SIZE };
  drawPattern(center, SIZE, 40, 3, 0.986, context);
  center = { cx: 7 * SIZE, cy: 50 + 5 * SIZE };
  drawPattern(center, SIZE, 40, 22, 0.989, context);
  center = { cx: 9 * SIZE, cy: 50 + 5 * SIZE };
  drawPattern(center, SIZE, 40, 23, 0.992, context);
};
