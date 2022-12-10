import { ProductType } from 'store/reducers';
import { RequestStatusType } from 'store/reducers/products/types';
import { AppStateType } from 'store/types';
import { AlertNotification } from 'types';

export const selectProducts = (state: AppStateType): ProductType[] =>
  state.products.products;
export const selectProductsPageStatus = (state: AppStateType): RequestStatusType =>
  state.products.status;
export const selectProductsPageMessage = (
  state: AppStateType,
): AlertNotification | null => state.products.productsPageMessage;
export const selectProductsTotalCount = (state: AppStateType): number =>
  state.products.productsTotalCount;
export const selectCurrentPage = (state: AppStateType): number =>
  state.products.currentPage;
export const selectPageSize = (state: AppStateType): number => state.products.pageSize;
