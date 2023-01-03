import { FetchProductsPayload } from 'api/products';
import { AdminOrder, OrderStatus } from 'store/reducers/adminOrdersPanel/types';

export type AddOrderPayload = Omit<AdminOrder, 'orderId'>;
export type UpdateOrderStatusPayload = { orderId: string; orderStatus: OrderStatus };
export type FetchOrdersPayload = FetchProductsPayload & { userId: string | undefined };
