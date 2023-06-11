function drawLine(
  ctx: CanvasRenderingContext2D,
  startX: number,
  startY: number,
  endX: number,
  endY: number,
  color: string
) {
  ctx.save();
  ctx.strokeStyle = color;
  ctx.beginPath();
  ctx.moveTo(startX, startY);
  ctx.lineTo(endX, endY);
  ctx.stroke();
  ctx.restore();
}

export default function drawGrid(
  ctx: CanvasRenderingContext2D,
  padding: number,
  gridColor: string,
  gridScale: number,
  gridMin: number,
  gridMax: number,
  canvasActualHeight: number
) {
  const axisInterval = (gridMax - gridMin) / gridScale;
  let gridValue = gridMin;
  let counter = 0;
  while (gridValue <= gridMax) {
    const gridY = canvasActualHeight * (1 - counter / axisInterval) + padding;
    drawLine(ctx, 0, gridY, ctx.canvas.width, gridY, gridColor);

    // writing grid markers
    ctx.save();
    ctx.fillStyle = "grey";
    ctx.font = "bold 10px Arial";
    ctx.fillText(`${gridValue.toFixed(2)}`, 0, gridY - 2);
    ctx.restore();

    gridValue += gridScale;
    counter += 1;
  }
}
