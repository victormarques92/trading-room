import { TradeList } from '@/components/TradeList';
import { useTradeStore } from '@/stores/useTradeStore';
import { useMemo } from 'react';
import { FaRegCheckCircle, FaRegTimesCircle } from 'react-icons/fa';

export const HistoryTab = () => {
  const history = useTradeStore(s => s.historyOperations);

  const ResultLabel = ({ result }: { result?: 'win' | 'lose' }) => {
    const isWin = result === 'win';

    return (
      <span className="inline-flex items-center gap-1">
        {isWin ? (
          <>
            <FaRegCheckCircle aria-hidden />
            Vitória
          </>
        ) : (
          <>
            <FaRegTimesCircle aria-hidden />
            Derrota
          </>
        )}
      </span>
    );
  };

  const tradeData = useMemo(() => {
    return history.map(op => ({
      type: op.type,
      amount: op.amount,
      description: <ResultLabel result={op.result} />,
    }));
  }, [history]);

  return (
    <TradeList
      data={tradeData}
      descriptionColored
      textEmpty="Nenhuma operação finalizada"
    />
  );
};
