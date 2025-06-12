'use client';

import { useScript } from '@/hooks/useScript';
import { useTradeStore } from '@/stores/useTradeStore';
import { useUiStore } from '@/stores/useUiStore';
import { useEffect, useRef } from 'react';

interface TradingViewWidgetProps {
  symbol?: string;
  theme?: 'light' | 'dark';
}

export const TradingViewWidget = ({
  symbol = 'BINANCE:BTCUSDT',
  theme = 'dark',
}: TradingViewWidgetProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetRef = useRef<any>(null);
  const chartRef = useRef<any>(null);
  const status = useScript('https://s3.tradingview.com/tv.js');
  const candleDuration = useUiStore(s => s.candleDuration);
  const activeOperations = useTradeStore(s => s.activeOperations);
  const scheduledOrders = useTradeStore(s => s.scheduledOrders);
  const historyOperations = useTradeStore(s => s.historyOperations);

  const getInterval = (seconds: number) => {
    return String(seconds / 60);
  };

  const updateMarkers = () => {
    if (!chartRef.current) return;

    try {
      const chart = chartRef.current;
      if (!chart || typeof chart.createShape !== 'function') {
        console.warn('Chart não está pronto ainda');
        return;
      }

      if (typeof chart.removeAllShapes === 'function') {
        chart.removeAllShapes();
      }

      scheduledOrders.forEach(order => {
        chart.createShape(
          { time: order.targetTimestamp / 1000 },
          {
            shape: order.type === 'buy' ? 'arrow_up' : 'arrow_down',
            text: `Ordem ${order.type === 'buy' ? 'Compra' : 'Venda'} Pendente\nPreço: ${order.price}\nExpira: ${new Date(order.targetTimestamp).toLocaleTimeString()}`,
            overrides: {
              color: order.type === 'buy' ? '#22c55e' : '#ef4444',
              textColor: '#ffffff',
              fontSize: 12,
              backgroundColor: 'rgba(0, 0, 0, 0.7)',
              padding: 8,
              borderRadius: 4,
            },
          },
        );
      });

      activeOperations.forEach(op => {
        let createdTimestamp: number | null = null;
        if (typeof op.createdAt === 'number') {
          createdTimestamp = Math.floor(op.createdAt / 1000);
        } else if (typeof op.createdAt === 'string') {
          const date = new Date(op.createdAt);
          if (!isNaN(date.getTime())) {
            createdTimestamp = Math.floor(date.getTime() / 1000);
          }
        }
        if (typeof createdTimestamp === 'number' && !isNaN(createdTimestamp)) {
          chart.createShape(
            { time: createdTimestamp },
            {
              shape: op.type === 'buy' ? 'arrow_up' : 'arrow_down',
              text: `Abertura ${op.type === 'buy' ? 'Compra' : 'Venda'}\nPreço: ${op.entryPrice}\nStop: ${op.stopLoss}\nAlvo: ${op.takeProfit}`,
              overrides: {
                color: '#2563eb',
                textColor: '#ffffff',
                fontSize: 12,
                backgroundColor: 'rgba(0, 0, 0, 0.7)',
                padding: 8,
                borderRadius: 4,
              },
            },
          );
        }
        chart.createShape(
          { time: op.expiresAt / 1000 },
          {
            shape: op.type === 'buy' ? 'arrow_up' : 'arrow_down',
            text: `Expiração ${op.type === 'buy' ? 'Compra' : 'Venda'}\nPreço: ${op.currentPrice}\nResultado: ${op.result || 'Pendente'}`,
            overrides: {
              color: '#f59e42',
              textColor: '#ffffff',
              fontSize: 12,
              backgroundColor: 'rgba(0, 0, 0, 0.7)',
              padding: 8,
              borderRadius: 4,
            },
          },
        );
      });

      historyOperations.forEach(op => {
        chart.createShape(
          { time: op.expiresAt / 1000 },
          {
            shape: op.type === 'buy' ? 'arrow_up' : 'arrow_down',
            text: `Operação ${op.type === 'buy' ? 'Compra' : 'Venda'} ${op.result === 'win' ? 'Ganhou' : 'Perdeu'}\nPreço: ${op.currentPrice}\nResultado: ${op.result === 'win' ? 'Ganho' : 'Perda'}`,
            overrides: {
              color: op.result === 'win' ? '#22c55e' : '#ef4444',
              textColor: '#ffffff',
              fontSize: 12,
              backgroundColor: 'rgba(0, 0, 0, 0.7)',
              padding: 8,
              borderRadius: 4,
            },
          },
        );
      });
    } catch (error) {
      console.error('Erro ao atualizar marcadores:', error);
    }
  };

  useEffect(() => {
    if (status === 'ready' && window.TradingView) {
      widgetRef.current = new window.TradingView.widget({
        container_id: 'tv_chart_container',
        autosize: true,
        symbol,
        interval: getInterval(candleDuration),
        timezone: 'Etc/UTC',
        theme,
        style: '1',
        locale: 'br',
        toolbar_bg: '#f2f6f1',
        enable_publishing: false,
        hide_side_toolbar: false,
        onReady: () => {
          if (widgetRef.current) {
            widgetRef.current.onChartReady(() => {
              chartRef.current = widgetRef.current.activeChart();
              updateMarkers();
            });
          }
        },
      });
    }
  }, [status, symbol, candleDuration, theme]);

  useEffect(() => {
    if (chartRef.current) {
      updateMarkers();
    }
  }, [activeOperations, scheduledOrders, historyOperations]);

  return (
    <div
      id="tv_chart_container"
      ref={containerRef}
      className="h-96 w-full lg:h-[calc(100vh_-_152px)]"
    />
  );
};
