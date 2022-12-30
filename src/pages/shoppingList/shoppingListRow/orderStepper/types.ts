import { OrderStatus } from 'store/reducers/adminOrdersPanel/types';

export type OrderStepperProps = {
  orderStatus: OrderStatus;
  isAdmin: boolean;
  orderId: string;
};
