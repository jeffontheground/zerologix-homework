"use client";

import { useEffect, useRef } from "react";
import Canvas from "./Canvas";

export default function Chart({
  timeSeries,
  symbol,
}: {
  timeSeries: { high: number; low: number; close: number; open: number }[];
  symbol: string;
}) {
  const refCanvas = useRef<HTMLCanvasElement>(null);
  const refChart = useRef<Canvas>();

  useEffect(() => {
    if (!refCanvas.current) return;

    refChart.current = new Canvas(refCanvas.current, {
      padding: 10,
      gridScale: 5,
      gridColor: "#DBDBDB",
      bullColor: "#3D92FA",
      bearColor: "#FB6C64",
    });
    refChart.current.render();
  }, []);

  useEffect(() => {
    if (!refChart.current) return;

    refChart.current.updateData({ timeSeries, symbol });
    refChart.current.render();
  }, [timeSeries, symbol]);

  return <canvas ref={refCanvas} width={700} height={350} />;
}
