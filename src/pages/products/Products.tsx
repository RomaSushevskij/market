import React, { FC, useEffect } from 'react';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import { Navigate } from 'react-router-dom';

import { Product } from 'components';
import { PaginationBlock } from 'components/paginationBlock';
import { routes } from 'enums';
import { useAppDispatch, useAppSelector } from 'hooks';
import { fetchProducts } from 'store/reducers';
import {
  selectCurrentPage,
  selectIsAuth,
  selectPageSize,
  selectProducts,
  selectProductsTotalCount,
} from 'store/selectors';

export const Products: FC = () => {
  const dispatch = useAppDispatch();

  const products = useAppSelector(selectProducts);
  const productsTotalCount = useAppSelector(selectProductsTotalCount);
  const currentPage = useAppSelector(selectCurrentPage);
  const pageSize = useAppSelector(selectPageSize);
  const isAuth = useAppSelector(selectIsAuth);

  const productsItems = products.map(({ id, title, price, image }) => {
    return <Product key={id} title={title} image={image} price={price} id={id} />;
  });

  useEffect(() => {
    dispatch(fetchProducts({ isAdmin: false }));
  }, [dispatch]);

  const onPaginationPageChange = (pageNumber: number) => {
    dispatch(fetchProducts({ isAdmin: false, currentPage: pageNumber }));
  };

  const onPaginationPageSizeChange = (pageSize: number) => {
    dispatch(fetchProducts({ isAdmin: false, pageSize, currentPage: 1 }));
  };

  if (!isAuth) {
    return <Navigate to={routes.AUTH_PAGE} />;
  }

  return (
    <Stack>
      <Grid container spacing={2} justifyContent="space-around" alignItems="stretch">
        {productsItems}
      </Grid>
      <Box marginY={4}>
        <PaginationBlock
          onPageChange={onPaginationPageChange}
          onPageSizeChange={onPaginationPageSizeChange}
          itemsTotalCount={productsTotalCount}
          pageSize={pageSize}
          currentPage={currentPage}
        />
      </Box>
    </Stack>
  );
};
