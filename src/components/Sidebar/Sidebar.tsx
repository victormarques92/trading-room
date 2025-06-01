'use client';

import { useTradeStore } from '@/stores/useTradeStore';
import { useCallback, useEffect } from 'react';
import { TimerBar } from './TimerBar';
import { TradeControls } from './TradeControls';
import { TradeTabs } from './TradeTabs';

export const Sidebar = () => {
  const { checkExpirations, activateScheduledOrders } =
    useTradeStore.getState();

  const handleTick = useCallback(() => {
    const now = new Date();

    checkExpirations();

    if (now.getSeconds() === 0) {
      activateScheduledOrders();
    }
  }, [checkExpirations, activateScheduledOrders]);

  useEffect(() => {
    const intervalId = setInterval(handleTick, 1000);

    return () => clearInterval(intervalId);
  }, [handleTick]);

  return (
    <aside className="w-full flex-shrink-0 lg:w-[320px]">
      <TimerBar />
      <TradeControls />
      <TradeTabs />
    </aside>
  );
};
