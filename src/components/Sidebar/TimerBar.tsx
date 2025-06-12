'use client';

import { useUiStore } from '@/stores/useUiStore';
import { useCallback, useEffect, useRef, useState } from 'react';

const getSecondsUntilNextDuration = (duration: number) => {
  const now = new Date();
  const totalSeconds = now.getMinutes() * 60 + now.getSeconds();

  return duration - (totalSeconds % duration);
};

export const TimerBar = () => {
  const duration = useUiStore(s => s.candleDuration);
  const [secondsLeft, setSecondsLeft] = useState(0);
  const [isClient, setIsClient] = useState(false);
  const animationFrameId = useRef<number>(null);

  useEffect(() => {
    setIsClient(true);
    setSecondsLeft(getSecondsUntilNextDuration(duration));
  }, [duration]);

  const updateTimer = useCallback(() => {
    setSecondsLeft(getSecondsUntilNextDuration(duration));

    animationFrameId.current = requestAnimationFrame(() => {
      const now = new Date();
      if (now.getMilliseconds() < 50) {
        // Sincroniza próximo tick no início do próximo segundo
        setSecondsLeft(getSecondsUntilNextDuration(duration));
      }
      updateTimer();
    });
  }, [duration]);

  useEffect(() => {
    if (!isClient) return;

    updateTimer();

    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [duration, updateTimer, isClient]);

  const progress = ((duration - secondsLeft) / duration) * 100;
  const minutes = Math.floor(secondsLeft / 60);
  const seconds = Math.floor(secondsLeft % 60);

  if (!isClient) {
    return (
      <div className="mb-4">
        <div className="mb-1 flex justify-between text-sm text-zinc-400">
          <span>BTC/USDT</span>
          <span>--:--</span>
        </div>

        <div className="h-2 w-full overflow-hidden rounded bg-zinc-700">
          <div
            className="h-full bg-green-500 transition-all duration-500"
            style={{ width: '0%' }}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="mb-4">
      <div className="mb-1 flex justify-between text-sm text-zinc-400">
        <span>BTC/USDT</span>
        <span>{minutes === 0 ? `${seconds}s` : `${minutes}:${seconds}s`}</span>
      </div>

      <div className="h-2 w-full overflow-hidden rounded bg-zinc-700">
        <div
          className="h-full bg-green-500 transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};
