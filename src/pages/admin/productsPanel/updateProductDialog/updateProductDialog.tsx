import React, { FC } from 'react';

import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

import { AddUpdateProductForm } from 'components/admin/adminForms';
import { UpdateProductDialogProps } from 'pages/admin/productsPanel/updateProductDialog/typex';

export const UpdateProductDialog: FC<UpdateProductDialogProps> = ({
  open,
  setOpen,
  activeProduct,
}) => {
  const handleCloseUpdateProductDialog = () => {
    setOpen(false);
  };

  return (
    <Dialog open={open} onClose={handleCloseUpdateProductDialog} fullWidth>
      <DialogTitle>Product description</DialogTitle>
      <DialogContent>
        <AddUpdateProductForm
          onSubmit={handleCloseUpdateProductDialog}
          activeProduct={activeProduct}
          formType="Update"
        />
      </DialogContent>
    </Dialog>
  );
};
