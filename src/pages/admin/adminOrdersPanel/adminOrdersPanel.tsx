import React, { FC } from 'react';

import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

import { OrderStepper } from 'pages/shoppingList/shoppingListRow/orderStepper';

export const AdminOrdersPanel: FC = () => {
  return (
    <Box>
      <Paper>
        <Typography sx={{ p: 2 }} variant="h6" component="div">
          Orders
        </Typography>
        <OrderStepper
          orderStatus={{ state: 'success', step: 'Order confirmation' }}
          isAdmin
        />
      </Paper>
    </Box>
  );
};
