"use client";

import { useMemo, useState } from "react";
import { Chart, Toolbar } from "./_components";
import { getOhlcData } from "@/api";

export default function Home() {
  const [count, setCount] = useState(500);
  const { timeSeries, symbol } = useMemo(() => {
    const data = getOhlcData();
    return {
      timeSeries: data.timeSeries.slice(-1 * count),
      symbol: data.symbol,
    };
  }, [count]);

  return (
    <main className="flex min-h-screen items-center justify-center p-24">
      <div className="p-4">
        <Toolbar
          onPlusClick={() => setCount((prev) => prev + 1)}
          onMinusClick={() => setCount((prev) => prev - 1)}
        />
      </div>
      <div className="p-4">
        <div className="bg-white rounded-lg shadow-lg p-4">
          <div className="border border-black border-solid">
            <Chart timeSeries={timeSeries} symbol={symbol} />
          </div>
        </div>
      </div>
    </main>
  );
}
