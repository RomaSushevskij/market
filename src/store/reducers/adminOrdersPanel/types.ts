import { OrderType } from 'store/reducers/orders/types';
import { RequestStatusType } from 'store/reducers/products/types';
import { AlertNotification } from 'types';

export type OrderStepStatus =
  | 'Order confirmation'
  | 'Delivery in progress'
  | 'Delivered'
  | 'Issued';
export type OrderStatusStateType = 'success' | 'error';
export type OrderStatus = {
  state: OrderStatusStateType;
  step: OrderStepStatus;
  description?: string;
};
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
  productsNumber: number;
  isViewedByAdmin: boolean;
};
export type AdminOrdersInitialState = {
  orders: AdminOrder[];
  pageSize: number;
  currentPage: number;
  ordersTotalCount: number;
  adminOrdersPageMessage: AlertNotification | null;
  adminOrdersStatus: RequestStatusType;
};
