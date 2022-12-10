import React, { FC, useMemo, useState } from 'react';

import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import { ProductPropsType } from './types';

import { useAppDispatch } from 'hooks';
import { usePalette } from 'hooks/usePalette/usePalette';
import { addItemToCart } from 'store/reducers';
import { toDollars } from 'utils';

export const Product: FC<ProductPropsType> = ({ title, price, image, id }) => {
  const { warningColor } = usePalette();
  const dispatch = useAppDispatch();

  const hoverElevationValue = 10;
  const formattedPrice = toDollars.format(price);

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

  const elevationValue = useMemo(() => {
    return isHoverCard ? hoverElevationValue : 1;
  }, [isHoverCard]);

  return (
    <Grid item sx={{ width: { xs: '96vw', sm: 288 } }}>
      <Card
        elevation={elevationValue}
        onMouseMove={onCardMouseMove}
        onMouseOut={onCardMouseOut}
        sx={{ width: '100%', height: '100%' }}
      >
        <CardMedia width="100%" component="img" sx={{ width: '100%' }} image={image} />
        <CardContent>
          <Typography gutterBottom variant="h6" component="div" fontSize={16}>
            {title}
          </Typography>
          <Chip
            sx={{
              bgcolor: warningColor,
              color: '#ffffff',
              fontWeight: 700,
              fontSize: 14,
            }}
            size="medium"
            label={formattedPrice}
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
