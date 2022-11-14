import React, { FC } from 'react';

import { Stack } from '@mui/material';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

import productImage from 'assets/images/product.png';
import { OrderItem } from 'components';
import { OrderForm } from 'components/forms';

export const OrderList: FC = () => {
  // testing data
  const arrayLength = 3;
  const oneHundredDollars = 100;
  const productsItems = new Array(arrayLength).fill(1).map((el, index) => {
    return (
      <OrderItem
        key={el + 1}
        title="Product name"
        image={productImage}
        price={(index + el) * oneHundredDollars}
        id={index + el}
      />
    );
  });

  return (
    <Grid container spacing={2}>
      <Grid item flexGrow={1}>
        <Stack spacing={2}>{productsItems}</Stack>
        <Typography
          variant="h5"
          component="span"
          borderBottom={1}
          color="primary"
          fontWeight="bold"
          display="inline-block"
          marginTop={2}
        >
          TOTAL: 600$
        </Typography>
      </Grid>
      <Grid item width={{ xs: '100%', sm: 300 }} mx="auto">
        <Paper sx={{ p: 2 }}>
          <OrderForm />
        </Paper>
      </Grid>
    </Grid>
  );
};
