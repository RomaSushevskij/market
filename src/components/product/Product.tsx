import React, { FC, useEffect } from 'react';

import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Button, Chip } from '@mui/material';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

import { ProductPropsType } from './types';

import { useAppDispatch, useAppSelector } from 'hooks';
import {
  addItemToCart,
  calculateOrdersTotalCost,
} from 'store/reducers/orders/ordersReducer';
import { selectorOrderList } from 'store/selectors/orderSelectors';

export const Product: FC<ProductPropsType> = ({ title, price, image, id }) => {
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const orderList = useAppSelector(selectorOrderList);

  const onAddToCartClick = () => {
    dispatch(addItemToCart(id));
  };

  useEffect(() => {
    dispatch(calculateOrdersTotalCost());
  }, [orderList]);

  return (
    <Grid item sx={{ width: 288 }}>
      <Card>
        <CardMedia component="img" sx={{ width: '100%' }} image={image} />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {title}
          </Typography>
          <Chip
            sx={{
              bgcolor: theme.palette.warning.light,
              color: '#ffffff',
              fontWeight: 700,
              fontSize: 14,
            }}
            size="medium"
            label={`$ ${price}`}
          />
        </CardContent>
        <CardActions sx={{ justifyContent: 'flex-end' }}>
          <Button
            color="primary"
            endIcon={<ShoppingCartIcon />}
            onClick={onAddToCartClick}
          >
            Add to cart
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
};
