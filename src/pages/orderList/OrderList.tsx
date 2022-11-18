import React, { FC } from 'react';

import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { OrderItem } from 'components';
import { OrderForm } from 'components/forms';
import { useAppSelector } from 'hooks';
import { selectOrderList, selectOrderTotalCost } from 'store/selectors/orderSelectors';

export const OrderList: FC = () => {
  const orderList = useAppSelector(selectOrderList);
  const orderTotalCost = useAppSelector(selectOrderTotalCost);
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
      {orderTotalCost > 0 ? (
        <>
          <Grid item flexGrow={1}>
            <Stack spacing={2}>{orderItems}</Stack>
            <Typography
              variant="h5"
              component="span"
              borderBottom={1}
              color="primary"
              display="inline-block"
              mt={2}
            >
              TOTAL:
              <Typography
                variant="h5"
                component="span"
                color="primary"
                display="inline-block"
                mt={2}
                fontWeight="bold"
                ml={2}
              >
                {`$ ${orderTotalCost}`}
              </Typography>
            </Typography>
          </Grid>
          <Grid item width={{ xs: '100%', sm: 300 }} mx="auto">
            <Paper sx={{ p: 2 }}>
              <OrderForm />
            </Paper>
          </Grid>
        </>
      ) : (
        <Grid
          container
          minHeight="calc(100vh - 64px)"
          alignItems="center"
          justifyContent="center"
        >
          <Stack direction="row" alignItems="center">
            <Typography variant="h6" component="div" mr={2}>
              Cart is empty
            </Typography>
            <ProductionQuantityLimitsIcon fontSize="large" color="primary" />
          </Stack>
        </Grid>
      )}
    </Grid>
  );
};
