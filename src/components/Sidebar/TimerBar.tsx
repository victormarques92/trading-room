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
  const [secondsLeft, setSecondsLeft] = useState(() =>
    getSecondsUntilNextDuration(duration),
  );

  const animationFrameId = useRef<number>(null);

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
    updateTimer();

    return () => {
      if (animationFrameId.current)
        cancelAnimationFrame(animationFrameId.current);
    };
  }, [duration, updateTimer]);

  const progress = ((duration - secondsLeft) / duration) * 100;

  return (
    <div className="mb-4">
      <div className="mb-1 flex justify-between text-sm text-zinc-400">
        <span>BTC/USDT</span>
        <span>{secondsLeft}s</span>
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
