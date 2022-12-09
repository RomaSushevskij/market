import { AddProductDialogProps } from 'pages/admin/productsPanel/addProductDialog';
import { ProductType } from 'store/reducers';

export type UpdateProductDialogProps = AddProductDialogProps & {
  activeProduct: ProductType;
};
