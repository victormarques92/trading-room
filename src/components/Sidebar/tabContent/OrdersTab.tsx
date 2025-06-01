import { TradeList } from '@/components/TradeList';
import { useTradeStore } from '@/stores/useTradeStore';
import { useMemo } from 'react';

export const OrdersTab = () => {
  const scheduledOrders = useTradeStore(s => s.scheduledOrders);

  const tradeData = useMemo(() => {
    return scheduledOrders.map(order => ({
      type: order.type,
      amount: order.amount,
      description: `Entrada: ${new Date(order.targetTimestamp).toLocaleTimeString('pt-BR')}`,
    }));
  }, [scheduledOrders]);

  return <TradeList data={tradeData} textEmpty="Nenhuma ordem programada" />;
};
