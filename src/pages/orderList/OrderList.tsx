import React, { FC } from 'react';

import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { OrderItem } from 'components';
import { OrderForm } from 'components/forms';
import { useAppSelector } from 'hooks';
import { selectorOrderList } from 'store/selectors/orderSelectors';

export const OrderList: FC = () => {
  const orderList = useAppSelector(selectorOrderList);
  const orderItems = orderList.map(({ id, title, image, price, count }) => {
    return (
      <OrderItem
        key={id}
        title={title}
        image={image}
        price={price}
        id={id}
        count={count}
      />
    );
  });

  return (
    <Grid container spacing={2}>
      <Grid item flexGrow={1}>
        <Stack spacing={2}>{orderItems}</Stack>
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
