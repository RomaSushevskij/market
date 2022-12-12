import { OrderType } from 'store/reducers/orders/types';

export type AdminOrder = {
  orderList: OrderType[];
  name: string;
  surname: string;
  address: string;
  phone: string;
  totalCost: number;
};
