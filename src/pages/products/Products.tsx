import React, { FC, useCallback, useEffect } from 'react';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import { Navigate } from 'react-router-dom';

import { Product } from 'components';
import { PaginationBlock } from 'components/paginationBlock';
import {
  FIFTEEN_ITEMS_PER_PAGE,
  NINE_ITEMS_PER_PAGE,
  SIX_ITEMS_PER_PAGE,
  THREE_ITEMS_PER_PAGE,
  TWELVE_ITEMS_PER_PAGE,
} from 'components/paginationBlock/constants';
import { SnackBar } from 'components/snackBar';
import { routes } from 'enums';
import { useAppDispatch, useAppSelector } from 'hooks';
import { fetchProducts, setAuthPageMessage } from 'store/reducers';
import {
  selectCurrentPage,
  selectIsAuth,
  selectPageSize,
  selectProducts,
  selectProductsPageMessage,
  selectProductsTotalCount,
} from 'store/selectors';

const pageSizeOptions = [
  THREE_ITEMS_PER_PAGE,
  SIX_ITEMS_PER_PAGE,
  NINE_ITEMS_PER_PAGE,
  TWELVE_ITEMS_PER_PAGE,
  FIFTEEN_ITEMS_PER_PAGE,
];

export const Products: FC = () => {
  const dispatch = useAppDispatch();

  const products = useAppSelector(selectProducts);
  const productsPageMessage = useAppSelector(selectProductsPageMessage);
  const productsTotalCount = useAppSelector(selectProductsTotalCount);
  const currentPage = useAppSelector(selectCurrentPage);
  const pageSize = useAppSelector(selectPageSize);
  const isAuth = useAppSelector(selectIsAuth);

  const productsItems = products.map(({ id, title, price, image }) => {
    return <Product key={id} title={title} image={image} price={price} id={id} />;
  });

  const onPaginationPageChange = (pageNumber: number) => {
    dispatch(fetchProducts({ isAdmin: false, currentPage: pageNumber }));
  };

  const onPaginationPageSizeChange = (pageSize: number) => {
    dispatch(fetchProducts({ isAdmin: false, pageSize, currentPage: 1 }));
  };

  const onSnackBarClose = useCallback(
    (closeValue: null) => {
      dispatch(setAuthPageMessage(closeValue));
    },
    [dispatch],
  );

  useEffect(() => {
    dispatch(fetchProducts({ isAdmin: false }));
  }, [dispatch]);

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
          pageSizeOptions={pageSizeOptions}
        />
      </Box>
      {productsPageMessage && (
        <SnackBar
          message={productsPageMessage.message}
          severity={productsPageMessage.severity}
          autoHideDuration={7000}
          onClose={onSnackBarClose}
        />
      )}
    </Stack>
  );
};
