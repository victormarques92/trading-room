import clsx from 'clsx';
import { PropsWithChildren } from 'react';

interface Props {
  className?: string;
}

export const BoxRounded = ({
  children,
  className,
}: PropsWithChildren<Props>) => {
  return (
    <div className={clsx('w-full rounded-md bg-zinc-800 p-4', className)}>
      {children}
    </div>
  );
};
