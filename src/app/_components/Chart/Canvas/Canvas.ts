import drawSymbol from "./drawSymbol";
import drawGrid from "./drawGrid";
import drawCandlesticks from "./drawCandlesticks";

type Option = {
  padding: number;
  gridScale: number;
  gridColor: string;
  bullColor: string;
  bearColor: string;
};

type OhlcData = {
  symbol: string;
  timeSeries: {
    open: number;
    high: number;
    low: number;
    close: number;
  }[];
};

export default class Canvas {
  private readonly ctx: CanvasRenderingContext2D;
  private readonly option: Option;
  private data: OhlcData = { symbol: "", timeSeries: [] };

  constructor(canvasEl: HTMLCanvasElement, option: Option) {
    this.ctx = canvasEl.getContext("2d") as CanvasRenderingContext2D;
    this.option = option;
  }

  public updateData(data: OhlcData) {
    this.data = data;
  }

  public render() {
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);

    const [gridMin, gridMax] = (() => {
      const prices = this.data.timeSeries.flatMap(
        ({ open, close, high, low }) => [open, close, high, low]
      );
      // determine Maximum value of price on Y axis:
      // We want the lowest/highest price from our list of prices first:
      const min = Math.min(...prices);
      const max = Math.max(...prices);
      // round up the above min and max grid markers so that we can use that number for plotting our grid.
      // rounded to the nearest determined scale.
      return [
        Math.round(min / this.option.gridScale) * this.option.gridScale,
        Math.round(max / this.option.gridScale) * this.option.gridScale,
      ];
    })();

    const canvasActualHeight = this.ctx.canvas.height - this.option.padding * 2;
    const canvasActualWidth = this.ctx.canvas.width;

    drawSymbol(this.ctx, this.data.symbol);

    drawGrid(
      this.ctx,
      this.option.padding,
      this.option.gridColor,
      this.option.gridScale,
      gridMin,
      gridMax,
      canvasActualHeight
    );

    drawCandlesticks(
      this.ctx,
      gridMin,
      gridMax,
      canvasActualHeight,
      canvasActualWidth,
      this.option.bullColor,
      this.option.bearColor,
      this.data.timeSeries,
      this.option.padding
    );
  }
}
