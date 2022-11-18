import { OrderFormValuesType } from 'components/forms/orderForm/types';
import { ProductType } from 'store/reducers/products/types';

export type OrderInformationType = OrderFormValuesType & { totalCost: number };
export type OrderType = ProductType & { count: number };
