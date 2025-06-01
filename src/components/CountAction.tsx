import React from 'react';
import { FiMinus, FiPlus } from 'react-icons/fi';

interface CountActionProps {
  value: number;
  onChange: (value: number) => void;
  className?: string;
  label?: string;
  prefix?: string;
  suffix?: string;
  min?: number;
  max?: number;
}

export const CountAction: React.FC<CountActionProps> = ({
  className,
  label,
  value,
  onChange,
  prefix,
  suffix,
  min = 0,
  max,
}) => {
  const handleDecrement = () => {
    const newValue = Math.max(min, value - 1);
    onChange(newValue);
  };

  const handleIncrement = () => {
    const newValue = max !== undefined ? Math.min(max, value + 1) : value + 1;
    onChange(newValue);
  };

  const isDecrementDisabled = value <= min;
  const isIncrementDisabled = max !== undefined && value >= max;

  return (
    <div className={className}>
      {label && (
        <label className="mb-1 block text-sm text-zinc-400">{label}</label>
      )}

      <div className="flex items-center rounded bg-zinc-700 px-2 py-1">
        <button
          onClick={handleDecrement}
          className="flex h-8 w-8 items-center justify-center rounded-full bg-zinc-600 text-xl transition-colors duration-200 hover:bg-zinc-500 disabled:opacity-50"
          disabled={isDecrementDisabled}
          aria-label="Diminuir valor"
          title={isDecrementDisabled ? 'Valor mínimo atingido' : 'Diminuir'}
        >
          <FiMinus />
        </button>

        <span className="flex-1 text-center text-base font-medium text-white">
          {prefix}
          {value}
          {suffix}
        </span>

        <button
          onClick={handleIncrement}
          className="flex h-8 w-8 items-center justify-center rounded-full bg-zinc-600 text-xl transition-colors duration-200 hover:bg-zinc-500 disabled:opacity-50"
          disabled={isIncrementDisabled}
          aria-label="Aumentar valor"
          title={isIncrementDisabled ? 'Valor máximo atingido' : 'Aumentar'}
        >
          <FiPlus />
        </button>
      </div>
    </div>
  );
};
