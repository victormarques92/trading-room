'use client';

import { useScript } from '@/hooks/useScript';
import { useEffect, useRef } from 'react';

interface TradingViewWidgetProps {
  symbol?: string;
  interval?: string;
  theme?: 'light' | 'dark';
}

export const TradingViewWidget = ({
  symbol = 'BINANCE:BTCUSDT',
  interval = '1',
  theme = 'dark',
}: TradingViewWidgetProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const status = useScript('https://s3.tradingview.com/tv.js');

  useEffect(() => {
    if (status === 'ready' && (window as any).TradingView) {
      new (window as any).TradingView.widget({
        container_id: 'tv_chart_container',
        autosize: true,
        symbol,
        interval,
        timezone: 'Etc/UTC',
        theme,
        style: '1',
        locale: 'br',
        toolbar_bg: '#f1f3f6',
        enable_publishing: false,
        hide_side_toolbar: false,
      });
    }
  }, [status, symbol, interval, theme]);

  return (
    <div
      id="tv_chart_container"
      ref={containerRef}
      className="h-96 w-full lg:h-[calc(100vh_-_152px)]"
    />
  );
};
