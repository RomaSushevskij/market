import { AdminOrder, OrderStatus } from 'store/reducers/adminOrdersPanel/types';

export type AddOrderPayload = Omit<AdminOrder, 'orderId'>;
export type UpdateOrderStatusPayload = { orderId: string; orderStatus: OrderStatus };
