import { AddProductDialogProps } from 'pages/admin/adminProductsPanel/addProductDialog';

export type DeleteProductDialogProps = AddProductDialogProps & {
  productId: string;
};
