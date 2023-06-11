export default function drawSymbol(
  ctx: CanvasRenderingContext2D,
  symbol: string
) {
  ctx.save();
  ctx.fillStyle = "#ebeff4";
  ctx.font = "bold 100px Arial";
  ctx.fillText(symbol, 200, ctx.canvas.height / 2);
  ctx.restore();
}
