import { ProductType } from 'store/reducers';

export type ProductRowType = {
  currentProduct: ProductType;
  onUpdateProduct: (product: ProductType) => () => void;
  onDeleteProduct: (product: ProductType) => () => void;
};
