// candle color helper function:
function getCandleColor(
  close: number,
  open: number,
  bullColor: string,
  bearColor: string
) {
  if (close > open) return bullColor;
  if (open > close) return bearColor;
  return "black";
}

function drawCandle(
  ctx: CanvasRenderingContext2D,
  upperLeftCornerX: number,
  upperLeftCornerY: number,
  candleWidth: number,
  height: number,
  color: string
) {
  ctx.save();
  ctx.fillStyle = color;
  ctx.fillRect(upperLeftCornerX, upperLeftCornerY, candleWidth, height);
  ctx.restore();
}

export default function drawCandlesticks(
  ctx: CanvasRenderingContext2D,
  gridMin: number,
  gridMax: number,
  canvasActualHeight: number,
  canvasActualWidth: number,
  bullColor: string,
  bearColor: string,
  timeSeries: {
    open: number;
    close: number;
    high: number;
    low: number;
  }[],
  padding: number
) {
  // Plot the candles.
  const gridDifference = gridMax - gridMin;
  let xCounter = 27;

  const drawWicks = (
    coordinateX: number,
    open: number,
    high: number,
    close: number,
    low: number,
    candleColor: string
  ) => {
    let highPriceY =
      canvasActualHeight * ((gridMax - high) / gridDifference) + padding;
    let lowPriceY =
      canvasActualHeight * ((gridMax - low) / gridDifference) + padding;
    let startY, endY;

    if (candleColor === bullColor) {
      startY = close;
      endY = highPriceY;
    } else {
      startY = open;
      endY = highPriceY;
    }

    ctx.save();
    ctx.strokeStyle = "black";
    ctx.beginPath();
    ctx.moveTo(coordinateX + 2.5, startY);
    ctx.lineTo(coordinateX + 2.5, endY);
    ctx.stroke();
    ctx.restore();

    if (candleColor === bullColor) {
      startY = open;
      endY = lowPriceY;
    } else {
      startY = close;
      endY = lowPriceY;
    }

    ctx.save();
    ctx.strokeStyle = "black";
    ctx.beginPath();
    ctx.moveTo(coordinateX + 2.5, startY);
    ctx.lineTo(coordinateX + 2.5, endY);
    ctx.stroke();
    ctx.restore();
  };

  for (let i = 0; i < timeSeries.length; i++) {
    const openPrice = timeSeries[i].open;
    const closePrice = timeSeries[i].close;
    const highPrice = timeSeries[i].high;
    const lowPrice = timeSeries[i].low;
    const candleColor = getCandleColor(
      closePrice,
      openPrice,
      bullColor,
      bearColor
    );
    const closePriceY =
      canvasActualHeight * ((gridMax - closePrice) / gridDifference) + padding;
    const openPriceY =
      canvasActualHeight * ((gridMax - openPrice) / gridDifference) + padding;

    const coordinateX = canvasActualWidth * ((i + 1) / 100) + xCounter;
    const coordinateY = candleColor === undefined ? closePriceY : openPriceY;

    let candleHight;
    if (candleColor === bullColor) {
      candleHight = closePriceY - openPriceY;
    } else if (candleColor === bearColor) {
      candleHight = (openPriceY - closePriceY) * -1;
    } else {
      candleHight = 1;
    }
    candleHight = Number.parseFloat(candleHight.toFixed(1));

    drawCandle(ctx, coordinateX, coordinateY, 5, candleHight, candleColor);
    drawWicks(
      coordinateX,
      openPriceY,
      highPrice,
      closePriceY,
      lowPrice,
      candleColor
    );

    xCounter += 1;
  }
}
