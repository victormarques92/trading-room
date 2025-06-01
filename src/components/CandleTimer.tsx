'use client';

import { useEffect, useRef, useState } from 'react';

interface CandleTimerProps {
  duration?: number; // segundos
}

export const CandleTimer = ({ duration = 60 }: CandleTimerProps) => {
  const [timeLeft, setTimeLeft] = useState(duration);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setTimeLeft(duration);

    intervalRef.current = setInterval(() => {
      setTimeLeft(prev => (prev > 0 ? prev - 1 : duration));
    }, 1000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [duration]);

  const progress = duration > 0 ? ((duration - timeLeft) / duration) * 100 : 0;

  return (
    <div className="mt-4 w-full">
      <div className="mb-1 flex justify-between text-sm text-zinc-400">
        <span>Próxima vela em:</span>
        <span>{timeLeft}s</span>
      </div>

      <div className="h-2 w-full overflow-hidden rounded bg-zinc-700">
        <div
          className="h-full bg-blue-500 transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};
