import clsx from 'clsx';
import { ButtonHTMLAttributes, PropsWithChildren } from 'react';

type ButtonVariant = 'buy' | 'sell' | 'scheduled-buy' | 'scheduled-sell';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant: ButtonVariant;
}

const variantStyles: Record<ButtonVariant, string> = {
  buy: 'bg-green-500 text-black hover:bg-green-600',
  sell: 'bg-red-500 text-white hover:bg-red-600',
  'scheduled-buy': 'bg-yellow-500 text-black hover:bg-yellow-600',
  'scheduled-sell': 'bg-yellow-700 text-white hover:bg-yellow-800',
};

export const Button = ({
  children,
  variant,
  className,
  ...rest
}: PropsWithChildren<ButtonProps>) => {
  return (
    <button
      {...rest}
      className={clsx(
        'inline-flex flex-1 items-center justify-center gap-2 rounded px-4 py-2 text-base font-bold text-nowrap shadow transition-transform duration-75 active:scale-[0.98]',
        variantStyles[variant],
        className,
      )}
    >
      {children}
    </button>
  );
};
