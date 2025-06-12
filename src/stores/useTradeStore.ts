import { v4 as uuidv4 } from 'uuid';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Operation {
  takeProfit: any;
  stopLoss: any;
  currentPrice: any;
  entryPrice: any;
  exitPrice: any;
  profitLoss: any;
  amount: number;
  createdAt: string;
  expiresAt: number;
  id: string;
  result?: 'win' | 'lose';
  type: 'buy' | 'sell';
}

export interface ScheduledOrder {
  price: any;
  amount: number;
  createdAt: string;
  id: string;
  targetTimestamp: number;
  type: 'buy' | 'sell';
}

type TradeStore = {
  balance: number;
  activeOperations: Operation[];
  historyOperations: Operation[];
  scheduledOrders: ScheduledOrder[];

  placeOperation: (
    type: 'buy' | 'sell',
    amount: number,
    duration: number,
  ) => void;
  placeScheduledOrder: (
    type: 'buy' | 'sell',
    amount: number,
    delaySec: number,
  ) => void;
  activateScheduledOrders: () => void;
  checkExpirations: () => void;
};

export const useTradeStore = create<TradeStore>()(
  persist(
    (set, get) => ({
      balance: 10000,
      activeOperations: [],
      historyOperations: [],
      scheduledOrders: [],

      // Coloca uma operação imediata
      placeOperation: (type, amount, duration) => {
        const now = Date.now();
        const expiresAt = now + duration * 1000;

        const newOp: Operation = {
          id: uuidv4(),
          type,
          amount,
          createdAt: new Date().toLocaleTimeString('pt-BR'),
          expiresAt,
          currentPrice: undefined,
          entryPrice: undefined,
          exitPrice: undefined,
          profitLoss: undefined,
          takeProfit: undefined,
          stopLoss: undefined,
        };

        set(state => ({
          activeOperations: [...state.activeOperations, newOp],
        }));
      },

      // Agendamento para a próxima vela
      placeScheduledOrder: (type, amount, delaySec) => {
        const now = Date.now();
        const targetTimestamp = now + delaySec * 1000;

        const newOrder: ScheduledOrder = {
          id: uuidv4(),
          type,
          amount,
          targetTimestamp,
          createdAt: new Date().toLocaleTimeString('pt-BR'),
          price: undefined,
        };

        set(state => ({
          scheduledOrders: [...state.scheduledOrders, newOrder],
        }));
      },

      // Ativa ordens programadas (chamada a cada minuto)
      activateScheduledOrders: () => {
        const now = Date.now();
        const { scheduledOrders } = get();

        const toActivate = scheduledOrders.filter(
          o => o.targetTimestamp <= now,
        );
        const stillPending = scheduledOrders.filter(
          o => o.targetTimestamp > now,
        );

        const activeOps: Operation[] = toActivate.map(o => ({
          id: uuidv4(),
          type: o.type,
          amount: o.amount,
          createdAt: new Date().toLocaleTimeString('pt-BR', {
            hour12: false,
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
          }),
          expiresAt: now + 60 * 1000, // duração fixa de 1 min (pode melhorar)
          entryPrice: 0,
          currentPrice: 0,
          exitPrice: 0,
          profitLoss: 0,
          takeProfit: 0,
          stopLoss: 0,
        }));

        set(state => ({
          scheduledOrders: stillPending,
          activeOperations: [...state.activeOperations, ...activeOps],
        }));
      },

      // Finaliza operações que venceram e atualiza saldo
      checkExpirations: () => {
        const now = Date.now();
        const { activeOperations } = get();

        const completed: Operation[] = [];
        const stillActive: Operation[] = [];

        activeOperations.forEach(op => {
          if (op.expiresAt <= now) {
            const result = Math.random() < 0.5 ? 'win' : 'lose';
            completed.push({ ...op, result });
          } else {
            stillActive.push(op);
          }
        });

        set(state => {
          const balanceChange = completed.reduce((total, op) => {
            return total + (op.result === 'win' ? op.amount * 0.9 : -op.amount);
          }, 0);

          return {
            activeOperations: stillActive,
            historyOperations: [...state.historyOperations, ...completed],
            balance: state.balance + balanceChange,
          };
        });
      },
    }),
    {
      name: 'trade-storage',
    },
  ),
);
