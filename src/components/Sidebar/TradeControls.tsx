'use client';

import { formatPrice } from '@/helpers/formatPrice';
import { useTradeStore } from '@/stores/useTradeStore';
import { useUiStore } from '@/stores/useUiStore';
import { useCallback, useState } from 'react';
import toast from 'react-hot-toast';
import {
  FaArrowRotateRight,
  FaArrowTrendDown,
  FaArrowTrendUp,
} from 'react-icons/fa6';
import { BoxRounded } from '../BoxRounded';
import { Button } from '../Button';
import { CountAction } from '../CountAction';
import { Select } from '../Select';

const CANDLE_DURATION_OPTIONS = [
  { value: 60, label: '1 minuto' },
  { value: 120, label: '2 minutos' },
  { value: 300, label: '5 minutos' },
];

type OperationType = 'buy' | 'sell';

export const TradeControls = () => {
  const [amount, setAmount] = useState(10);
  const [minutes, setMinutes] = useState(1);

  const placeOperation = useTradeStore(s => s.placeOperation);
  const placeScheduledOrder = useTradeStore(s => s.placeScheduledOrder);

  const candleDuration = useUiStore(s => s.candleDuration);
  const setCandleDuration = useUiStore(s => s.setCandleDuration);

  const validateAmount = useCallback(() => {
    if (amount <= 0 || isNaN(amount)) {
      toast.error('Valor inválido. Por favor, insira um número positivo.');
      return false;
    }

    return true;
  }, [amount]);

  const handleInstantOrder = useCallback(
    (type: OperationType) => {
      if (!validateAmount()) return;

      placeOperation(type, amount, minutes * 60);

      toast.success(`Ordem de ${type} criada para ${minutes} minuto(s).`);
    },
    [amount, minutes, placeOperation, validateAmount],
  );

  const handleScheduledOrder = useCallback(
    (type: OperationType) => {
      if (!validateAmount()) return;

      placeScheduledOrder(type, amount, candleDuration);

      toast.success(`Ordem programada de ${type} para a próxima vela.`);
    },
    [amount, candleDuration, placeScheduledOrder, validateAmount],
  );

  return (
    <BoxRounded className="mb-4">
      <Select
        label="Duração da vela"
        value={candleDuration}
        onChange={setCandleDuration}
        options={CANDLE_DURATION_OPTIONS}
      />

      <CountAction
        label="Tempo da operação"
        value={minutes}
        onChange={setMinutes}
        suffix="min"
        className="mb-4"
      />

      <CountAction
        label="Valor (US$)"
        value={amount}
        onChange={setAmount}
        prefix="$"
        className="mb-4"
      />

      <div className="mb-3 flex justify-between text-sm text-zinc-400">
        <span>
          Lucro: <span className="text-green-400">90%</span>
        </span>

        <span>
          Receita:{' '}
          <span className="text-green-400">{formatPrice(amount * 0.9)}</span>
        </span>
      </div>

      <div className="flex min-w-40 flex-wrap gap-2">
        <Button onClick={() => handleInstantOrder('buy')} variant="buy">
          COMPRAR <FaArrowTrendDown />
        </Button>

        <Button onClick={() => handleInstantOrder('sell')} variant="sell">
          VENDER <FaArrowTrendUp />
        </Button>

        <Button
          onClick={() => handleScheduledOrder('buy')}
          variant="scheduled-buy"
        >
          Programar Compra <FaArrowRotateRight />
        </Button>

        <Button
          onClick={() => handleScheduledOrder('sell')}
          variant="scheduled-sell"
        >
          Programar Venda <FaArrowRotateRight />
        </Button>
      </div>
    </BoxRounded>
  );
};
