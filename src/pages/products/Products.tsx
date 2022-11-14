import React, { FC, useEffect } from 'react';

import Grid from '@mui/material/Grid';

import { Preloader, Product } from 'components';
import { useAppDispatch, useAppSelector } from 'hooks';
import { fetchProducts } from 'store/reducers/products/productsReducer';
import { selectProducts } from 'store/selectors';
import { selectStatus } from 'store/selectors/productsSelectors';

export const Products: FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
  }, []);
  const products = useAppSelector(selectProducts);
  const productsPageStatus = useAppSelector(selectStatus);

  const productsItems = products.map(({ id, title, price, image }) => {
    return <Product key={id} title={title} image={image} price={price} id={id} />;
  });
  const isLoading = productsPageStatus === 'loading';

  return (
    <Grid container spacing={2} justifyContent="space-around">
      {isLoading ? <Preloader /> : productsItems}
    </Grid>
  );
};
