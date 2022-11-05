import React, { FC } from 'react';

import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Button, Chip } from '@mui/material';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

import { ProductPropsType } from './types';

export const Product: FC<ProductPropsType> = ({ title, sale, image }) => {
  return (
    <Card sx={{ width: 300, margin: '20px' }}>
      <CardMedia component="img" height="max-content" image={image} />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Chip color="success" label={`${sale} $`} variant="outlined" />
      </CardContent>
      <CardActions style={{ justifyContent: 'flex-end' }}>
        <Button
          color="secondary"
          variant="outlined"
          endIcon={<ShoppingCartIcon />}
          size="small"
        >
          Add to cart
        </Button>
      </CardActions>
    </Card>
  );
};
