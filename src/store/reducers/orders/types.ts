import { OrderFormValuesType } from 'components/forms/orderForm/types';
import { AdminOrder } from 'store/reducers/adminOrdersPanel/types';
import { ProductType, RequestStatusType } from 'store/reducers/products/types';
import { AlertNotification } from 'types';

export type OrdersInitialState = {
  userOrders: AdminOrder[];
  cartOrderList: OrderType[];
  cartOrderInformation: OrderInformationType;
  ordersPageStatus: RequestStatusType;
  ordersPageMessage: AlertNotification | null;
  ordersTotalCount: number;
  pageSize: number;
  currentPage: number;
};
export type OrderInformationType = Omit<
  OrderFormValuesType,
  'city' | 'street' | 'house' | 'apartment'
> & { totalCost: number; address: string };
export type OrderType = ProductType & { count: number };
export type FetchOrdersThunkArg = {
  currentPage?: number;
  pageSize?: number;
  userId?: string;
};
