import { AddProductDialogProps } from 'pages/admin/adminProductsPanel/addProductDialog';
import { ProductType } from 'store/reducers';

export type UpdateProductDialogProps = AddProductDialogProps & {
  activeProduct: ProductType;
};
