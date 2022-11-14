import React, { FC } from 'react';

import Grid from '@mui/material/Grid';

import productImage from '../../assets/images/product.png';

import { Product } from 'components';

export const Products: FC = () => {
  // testing data
  const arrayLength = 6;
  const oneHundredDollars = 100;
  const productsItems = new Array(arrayLength).fill(1).map((el, index) => {
    return (
      <Product
        key={el + 1}
        title="Some product"
        image={productImage}
        price={(index + el) * oneHundredDollars}
        id={index + el}
      />
    );
  });

  return (
    <Grid container spacing={2} justifyContent="space-around">
      {productsItems}
    </Grid>
  );
};
