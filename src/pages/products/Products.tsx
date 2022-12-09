import React, { FC, useEffect } from 'react';

import Grid from '@mui/material/Grid';
import { Navigate } from 'react-router-dom';

import { Product } from 'components';
import { routes } from 'enums';
import { useAppDispatch, useAppSelector } from 'hooks';
import { fetchProducts } from 'store/reducers';
import { selectIsAuth, selectProducts } from 'store/selectors';

export const Products: FC = () => {
  const dispatch = useAppDispatch();

  const products = useAppSelector(selectProducts);
  // const productsPageMessage = useAppSelector(selectProductsPageMessage);
  const isAuth = useAppSelector(selectIsAuth);

  const productsItems = products.map(({ id, title, price, image }) => {
    return <Product key={id} title={title} image={image} price={price} id={id} />;
  });

  useEffect(() => {
    dispatch(fetchProducts({ isAdmin: false }));
  }, []);

  if (!isAuth) {
    return <Navigate to={routes.AUTH_PAGE} />;
  }

  return (
    <Grid container spacing={2} justifyContent="space-around" alignItems="stretch">
      {productsItems}
    </Grid>
  );
};
