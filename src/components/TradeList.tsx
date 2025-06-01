import { formatPrice } from '@/helpers/formatPrice';
import clsx from 'clsx';

interface DataProps {
  type: 'buy' | 'sell';
  amount: number;
  description: string | React.ReactNode;
}

interface Props {
  data: DataProps[];
  textEmpty: string;
  descriptionColored?: boolean;
}

interface TradeItemProps extends DataProps {
  descriptionColored?: boolean;
}

const TradeItem = ({
  type,
  amount,
  description,
  descriptionColored,
}: TradeItemProps) => {
  const typeColor = type === 'buy' ? 'text-green-400' : 'text-red-400';

  return (
    <li
      role="listitem"
      className="flex items-center justify-between rounded bg-zinc-700 p-2 text-sm"
    >
      <span className={clsx('flex-1 font-semibold uppercase', typeColor)}>
        {type}
      </span>

      <span className="w-28 flex-1 text-left">{formatPrice(amount)}</span>

      <span
        className={clsx(
          'flex flex-auto flex-nowrap items-center justify-end gap-1 text-right text-gray-300',
          descriptionColored && typeColor,
        )}
      >
        {description}
      </span>
    </li>
  );
};

export const TradeList = ({ data, textEmpty, descriptionColored }: Props) => {
  if (data.length === 0) {
    return (
      <div className="p-3 text-center text-sm text-zinc-400 italic">
        {textEmpty}
      </div>
    );
  }

  return (
    <ul role="list" className="max-h-96 space-y-2 overflow-y-auto p-3">
      {data.map((item, index) => (
        <TradeItem
          key={`${item.type}-${index}`}
          {...item}
          descriptionColored={descriptionColored}
        />
      ))}
    </ul>
  );
};
