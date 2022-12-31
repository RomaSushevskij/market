import React, { FC } from 'react';

import LoadingButton from '@mui/lab/LoadingButton';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import { useAppDispatch, useAppSelector } from 'hooks';
import { DeleteOrderDialogProps } from 'pages/admin/adminOrdersPanel/deleteOrderDialog/types';
import { deleteOrder } from 'store/reducers/adminOrdersPanel/adminOrdersReducer';
import { selectAdminOrdersStatus } from 'store/selectors';

export const DeleteOrderDialog: FC<DeleteOrderDialogProps> = prop => {
  const { open, setOpen, orderId } = prop;

  const dispatch = useAppDispatch();

  const adminOrdersStatus = useAppSelector(selectAdminOrdersStatus);

  const handleCloseDeleteProductDialog = () => {
    setOpen(false);
  };

  const onDeleteOrder = async () => {
    const resultAction = await dispatch(deleteOrder(orderId));

    if (deleteOrder.fulfilled.match(resultAction)) {
      setOpen(false);
    }
  };

  return (
    <Dialog open={open} onClose={handleCloseDeleteProductDialog} fullWidth>
      <DialogTitle>Delete order</DialogTitle>
      <DialogContent>
        <DialogContentText>Are you sure you want to delete this order?</DialogContentText>
      </DialogContent>
      <DialogActions sx={{ justifyContent: 'space-around', pb: 2 }}>
        <Button
          variant="outlined"
          color="inherit"
          onClick={handleCloseDeleteProductDialog}
          disabled={adminOrdersStatus === 'loading'}
        >
          Cancel
        </Button>
        <LoadingButton
          variant="outlined"
          color="error"
          onClick={onDeleteOrder}
          loading={adminOrdersStatus === 'loading'}
        >
          Delete
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
};
