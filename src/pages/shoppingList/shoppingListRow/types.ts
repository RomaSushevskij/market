import { OrderType } from 'store/reducers';
import { OrderStatus } from 'store/reducers/adminOrdersPanel/types';

export type ShoppingListRowProps = {
  orderId: string;
  productsNumber: number;
  totalCost: number;
  orderDate: number;
  orderStatus: OrderStatus;
  orderList: OrderType[];
  phone: string;
  name: string;
  surname: string;
  address: string;
  isAdmin: boolean;
  isViewedByAdmin: boolean;
};
