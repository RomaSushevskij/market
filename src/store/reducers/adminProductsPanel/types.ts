import {ProductType, RequestStatusType} from 'store/reducers/products/types';
import { AlertNotification } from 'types';

export type AdminPanelProductsInitialState = {
  adminProductsStatus: RequestStatusType;
  adminProductsPageMessage: AlertNotification | null;
  adminProductsTotalCount: number;
  adminPageSize: number;
  adminCurrentPage: number;
};

export type ReturnedPostThunk = {
  adminProductsPageMessage: AlertNotification;
  newProduct: ProductType;
};
