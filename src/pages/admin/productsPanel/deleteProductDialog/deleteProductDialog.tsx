import React, { FC } from 'react';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import { useAppDispatch, useAppSelector } from 'hooks';
import { DeleteProductDialogProps } from 'pages/admin/productsPanel/deleteProductDialog/types';
import { deleteProduct } from 'store/reducers';
import { selectAdminProductsStatus } from 'store/selectors/adminProductsPanelSelectors';

export const DeleteProductDialog: FC<DeleteProductDialogProps> = ({
  open,
  setOpen,
  activeProduct,
}) => {
  const dispatch = useAppDispatch();

  const adminProductsStatus = useAppSelector(selectAdminProductsStatus);

  const handleCloseDeleteProductDialog = () => {
    setOpen(false);
  };

  const onDeleteProduct = async () => {
    const resultAction = await dispatch(deleteProduct(activeProduct.id));

    if (deleteProduct.fulfilled.match(resultAction)) {
      setOpen(false);
    }
  };

  return (
    <Dialog open={open} onClose={handleCloseDeleteProductDialog} fullWidth>
      <DialogTitle>Delete</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Are you sure you want to delete this product?
        </DialogContentText>
      </DialogContent>
      <DialogActions sx={{ justifyContent: 'space-around' }}>
        <Button
          variant="outlined"
          color="inherit"
          onClick={handleCloseDeleteProductDialog}
          disabled={adminProductsStatus === 'loading'}
        >
          Cancel
        </Button>
        <Button
          variant="outlined"
          color="error"
          onClick={onDeleteProduct}
          disabled={adminProductsStatus === 'loading'}
        >
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};
