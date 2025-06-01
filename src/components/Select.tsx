import clsx from 'clsx';
import React, { SelectHTMLAttributes } from 'react';
import { FaChevronDown } from 'react-icons/fa';

interface OptionProps {
  value: number;
  label: string;
}

interface Props
  extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'onChange' | 'value'> {
  label?: string;
  options?: OptionProps[];
  value: number;
  onChange: (value: number) => void;
}

export const Select: React.FC<Props> = ({
  className,
  label,
  options,
  value,
  onChange,
}) => {
  return (
    <div className={clsx('mb-4', className)}>
      {label && (
        <label className="mb-1 block text-sm text-zinc-400">{label}</label>
      )}

      <div className="relative">
        <FaChevronDown className="absolute top-1/2 right-2 -translate-y-1/2 transform text-xs text-white" />

        <select
          className="w-full appearance-none rounded bg-zinc-700 p-2 text-white"
          onChange={e => onChange && onChange(Number(e.target.value))}
          value={value}
        >
          {options?.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};
