import { OrderType } from 'store/reducers/orders/types';

export type OrderStatus =
  | 'Order confirmation'
  | 'Delivery in progress'
  | 'Delivered'
  | 'Issued'
  | 'Canceled';
export type AdminOrder = {
  orderList: OrderType[];
  orderId: string;
  uid: string;
  name: string;
  surname: string;
  address: string;
  phone: string;
  totalCost: number;
  orderDate: number;
  orderStatus: OrderStatus;
};
export type AdminOrdersInitialState = {
  orders: AdminOrder[];
  pageSize: number;
  currentPage: number;
  ordersTotalCount: number;
};
