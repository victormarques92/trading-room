import { TradeList } from '@/components/TradeList';
import { formatTime } from '@/helpers/formatTime';
import { useTradeStore } from '@/stores/useTradeStore';
import { useMemo } from 'react';

export const OperationsTab = () => {
  const activeOperations = useTradeStore(s => s.activeOperations);

  const tradeData = useMemo(() => {
    return activeOperations.map(op => ({
      type: op.type,
      amount: op.amount,
      description: `Expira às ${formatTime(op.expiresAt)}`,
    }));
  }, [activeOperations]);

  return (
    <TradeList data={tradeData} textEmpty="Nenhuma operação em andamento" />
  );
};
