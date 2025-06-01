'use client';

import { TradingViewWidget } from './TradingViewWidget';

export const TradingViewChart = () => {
  return (
    <div className="w-full flex-1 rounded-md bg-zinc-800 p-2 xl:sticky xl:top-10">
      <TradingViewWidget />
    </div>
  );
};
