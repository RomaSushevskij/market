import React, { FC, useMemo, useState } from 'react';

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

import { useAppDispatch } from 'hooks';
import { addItemToCart } from 'store/reducers/orders/ordersReducer';

export const Product: FC<ProductPropsType> = ({ title, price, image, id }) => {
  const theme = useTheme();
  const dispatch = useAppDispatch();

  const [isHoverCard, setHoverCard] = useState(false);

  const onAddToCartClick = () => {
    dispatch(addItemToCart(id));
  };
  const onCardMouseMove = () => {
    setHoverCard(true);
  };
  const onCardMouseOut = () => {
    setHoverCard(false);
  };
  const hoverElevationValue = 10;
  const elevationValue = useMemo(() => {
    return isHoverCard ? hoverElevationValue : 1;
  }, [isHoverCard]);

  return (
    <Grid item sx={{ width: 288 }}>
      <Card
        elevation={elevationValue}
        onMouseMove={onCardMouseMove}
        onMouseOut={onCardMouseOut}
      >
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
            sx={{ fontWeight: 'bold' }}
          >
            Add to cart
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
};
