import React, { FC } from 'react';

import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

import { AddUpdateProductForm } from 'components/admin/adminForms';
import { AddProductDialogProps } from 'pages/admin/productsPanel/addProductDialog/types';

export const AddProductDialog: FC<AddProductDialogProps> = ({ open, setOpen }) => {
  const handleCloseAddProductDialog = () => {
    setOpen(false);
  };

  return (
    <Dialog open={open} onClose={handleCloseAddProductDialog} fullWidth>
      <DialogTitle>Product description</DialogTitle>
      <DialogContent>
        <AddUpdateProductForm onSubmit={handleCloseAddProductDialog} formType="Add" />
      </DialogContent>
    </Dialog>
  );
};
