import { AlertNotification } from 'types';

export type FetchProductsThunkArg = {
  currentPage?: number;
  pageSize?: number;
  isAdmin: boolean;
};

export type ProductType = {
  title: string;
  image: string;
  price: number;
  id: string;
};
export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed';

export type ProductsInitialState = {
  products: ProductType[];
  status: RequestStatusType;
  productsPageMessage: AlertNotification | null;
  productsTotalCount: number;
  pageSize: number;
  currentPage: number;
};
