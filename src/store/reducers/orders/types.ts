import { OrderFormValuesType } from 'components/forms/orderForm/types';
import { AdminOrder } from 'store/reducers/adminOrdersPanel/types';
import { ProductType } from 'store/reducers/products/types';

export type OrdersInitialState = {
  userOrders: AdminOrder[];
  cartOrderList: OrderType[];
  cartOrderInformation: OrderInformationType;
};
export type OrderInformationType = OrderFormValuesType & { totalCost: number };
export type OrderType = ProductType & { count: number };
