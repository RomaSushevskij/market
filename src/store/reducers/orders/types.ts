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
};
export type OrderInformationType = Omit<
  OrderFormValuesType,
  'city' | 'street' | 'house' | 'apartment'
> & { totalCost: number; address: string };
export type OrderType = ProductType & { count: number };
