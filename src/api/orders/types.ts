import { AdminOrder } from 'store/reducers/adminOrdersPanel/types';

export type AddOrderPayload = Omit<AdminOrder, 'orderId'>;
