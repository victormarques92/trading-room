export type OrderTypeDTO = 'buy' | 'sell';

export interface OrderDTO {
  amount: number;
  createdAt: string;
  id: string;
  type: OrderTypeDTO;
}
