import React, { ChangeEvent, FC, useState } from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';

import { ManageOrderDialogProps } from 'pages/admin/adminOrdersPanel/manageOrderDialog/types';
import { orderDeliverySteps } from 'pages/shoppingList/shoppingListRow/orderStepper';
import {
  OrderStatusStateType,
  OrderStepStatus,
} from 'store/reducers/adminOrdersPanel/types';

export const ManageOrderDialog: FC<ManageOrderDialogProps> = prop => {
  const { open, setOpen } = prop;

  const [statusType, setStatusType] = React.useState<OrderStatusStateType>('success');
  const [statusStep, setStatusStep] =
    React.useState<OrderStepStatus>('Order confirmation');
  const [statusDescription, setStatusDescription] = useState('');

  const handleClose = () => {
    setOpen(false);
  };

  const onStatusTypeChange = (event: ChangeEvent<HTMLInputElement>) => {
    setStatusType(event.target.value as OrderStatusStateType);
  };

  const onStatusStepChange = (event: ChangeEvent<HTMLInputElement>) => {
    setStatusStep(event.target.value as OrderStepStatus);
  };

  const onStatusDescriptionChange = (event: ChangeEvent<HTMLInputElement>) => {
    setStatusDescription(event.target.value);
  };

  const onEditStatusClick = () => {
    if (statusType === 'error') {
      console.log({
        state: statusType,
        step: statusStep,
        description: statusDescription,
      });

      return;
    }
    console.log({
      state: statusType,
      step: statusStep,
    });
  };

  const menuSteps = orderDeliverySteps.map(step => {
    return (
      <MenuItem key={step} value={step}>
        {step}
      </MenuItem>
    );
  });

  return (
    <Dialog open={open} onClose={handleClose} fullWidth>
      <DialogTitle>Edit order</DialogTitle>
      <DialogContent>
        <DialogContentText>Change order status:</DialogContentText>
        <Box
          noValidate
          component="form"
          sx={{
            m: 'auto',
            width: 'fit-content',
          }}
        >
          <FormControl sx={{ mt: 2, minWidth: 120 }}>
            <Stack direction={{ sm: 'row' }}>
              <Stack sx={{ mr: { sm: 2 } }}>
                <TextField
                  sx={{ mb: 2 }}
                  select
                  autoFocus
                  value={statusType}
                  onChange={onStatusTypeChange}
                  label="Status type"
                  inputProps={{
                    name: 'order-status-type',
                    id: 'order-status-type',
                  }}
                >
                  <MenuItem value="success">Success</MenuItem>
                  <MenuItem value="error">Error</MenuItem>
                </TextField>
                <TextField
                  sx={{ mb: { xs: 2, sm: 0 }, minWidth: '200px' }}
                  autoFocus
                  select
                  value={statusStep}
                  onChange={onStatusStepChange}
                  label="Status step"
                  inputProps={{
                    name: 'order-status-step',
                    id: 'order-status-step',
                  }}
                >
                  {menuSteps}
                </TextField>
              </Stack>
              {statusType === 'error' && (
                <TextField
                  id="order-status-description"
                  label="Order status description"
                  multiline
                  value={statusDescription}
                  onChange={onStatusDescriptionChange}
                  rows={4}
                />
              )}
            </Stack>
          </FormControl>
        </Box>
      </DialogContent>
      <DialogActions sx={{ justifyContent: 'space-around', pb: 2 }}>
        <Button variant="outlined" color="inherit" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="outlined" color="error" onClick={onEditStatusClick}>
          Edit
        </Button>
      </DialogActions>
    </Dialog>
  );
};
