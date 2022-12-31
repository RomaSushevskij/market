import React, { FC, useCallback, useEffect, useState } from 'react';

import AddIcon from '@mui/icons-material/Add';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Navigate } from 'react-router-dom';

import { AddProductDialog } from './addProductDialog';
import { DeleteProductDialog } from './deleteProductDialog';
import { UpdateProductDialog } from './updateProductDialog';

import { PaginationBlock } from 'components/paginationBlock';
import { SnackBar } from 'components/snackBar';
import { adminRoutes } from 'enums';
import { useAppDispatch, useAppSelector } from 'hooks';
import { usePalette } from 'hooks/usePalette/usePalette';
import { ProductRow } from 'pages/admin/adminProductsPanel/productRow/productRow';
import { fetchProducts, ProductType } from 'store/reducers';
import { setAdminProductsPageMessage } from 'store/reducers/adminProductsPanel';
import { selectProducts } from 'store/selectors';
import { selectIsAdminAuth } from 'store/selectors/adminAuthSelectors';
import {
  selectAdminCurrentPage,
  selectAdminPageSize,
  selectAdminProductsPageMessage,
  selectAdminProductsStatus,
  selectAdminProductsTotalCount,
} from 'store/selectors/adminProductsPanelSelectors';

export const AdminProductsPanel: FC = () => {
  const dispatch = useAppDispatch();

  const products = useAppSelector(selectProducts);
  const adminProductsPageMessage = useAppSelector(selectAdminProductsPageMessage);
  const adminProductsTotalCount = useAppSelector(selectAdminProductsTotalCount);
  const adminProductsStatus = useAppSelector(selectAdminProductsStatus);
  const adminPageSize = useAppSelector(selectAdminPageSize);
  const adminCurrentPage = useAppSelector(selectAdminCurrentPage);
  const isAdminAuth = useAppSelector(selectIsAdminAuth);

  const { primaryColor } = usePalette();

  const [isOpenAddProductDialog, setOpenAddProductDialog] = useState(false);
  const [isOpenUpdateProductDialog, setOpenUpdateProductDialog] = useState(false);
  const [isOpenDeleteProductDialog, setOpenDeleteProductDialog] = useState(false);
  const [activeProduct, setActiveProduct] = useState<ProductType>({} as ProductType);

  const isLoadingPage = adminProductsStatus === 'loading';

  const onAddProductClick = () => {
    setOpenAddProductDialog(true);
  };

  const onDeleteIconClick = (product: ProductType) => () => {
    setOpenDeleteProductDialog(true);
    setActiveProduct(product);
  };

  const onUpdateProductClick = (product: ProductType) => () => {
    setOpenUpdateProductDialog(true);

    setActiveProduct(product);
  };

  const onPaginationPageChange = (pageNumber: number) => {
    dispatch(fetchProducts({ isAdmin: true, currentPage: pageNumber }));
  };

  const onPaginationPageSizeChange = (pageSize: number) => {
    dispatch(fetchProducts({ isAdmin: true, pageSize, currentPage: 1 }));
  };

  const onSnackBarClose = useCallback(
    (closeValue: null) => {
      dispatch(setAdminProductsPageMessage(closeValue));
    },
    [dispatch],
  );

  useEffect(() => {
    dispatch(fetchProducts({ isAdmin: true }));
  }, [dispatch]);

  if (!isAdminAuth) {
    return <Navigate to={adminRoutes.AUTH_PAGE} />;
  }

  const productsItems = products.map(product => {
    return (
      <ProductRow
        key={product.id}
        currentProduct={product}
        onUpdateProduct={onUpdateProductClick}
        onDeleteProduct={onDeleteIconClick}
      />
    );
  });

  return (
    <>
      {!!products.length && (
        <>
          <Stack>
            <Box position="relative">
              {isLoadingPage && (
                <Skeleton
                  sx={{ height: '100%', width: '100%', position: 'absolute', zIndex: 1 }}
                  animation="wave"
                  variant="rounded"
                />
              )}
              <TableContainer
                component={Paper}
                sx={{ borderBottomLeftRadius: 0, borderBottomRightRadius: 0 }}
              >
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Image</TableCell>
                      <TableCell>Title</TableCell>
                      <TableCell>Price</TableCell>
                      <TableCell align="center">Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>{productsItems}</TableBody>
                </Table>
              </TableContainer>
              <Paper
                sx={{
                  borderTopLeftRadius: 0,
                  borderTopRightRadius: 0,
                  p: 1,
                }}
              >
                <PaginationBlock
                  onPageChange={onPaginationPageChange}
                  itemsTotalCount={adminProductsTotalCount}
                  pageSize={adminPageSize}
                  currentPage={adminCurrentPage}
                  onPageSizeChange={onPaginationPageSizeChange}
                />
              </Paper>
            </Box>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              sx={{ mt: 2, bgcolor: primaryColor, alignSelf: 'end' }}
              onClick={onAddProductClick}
              disabled={isLoadingPage}
            >
              Add product
            </Button>
          </Stack>
          <AddProductDialog
            open={isOpenAddProductDialog}
            setOpen={setOpenAddProductDialog}
          />
          <UpdateProductDialog
            open={isOpenUpdateProductDialog}
            setOpen={setOpenUpdateProductDialog}
            activeProduct={activeProduct}
          />
          <DeleteProductDialog
            open={isOpenDeleteProductDialog}
            setOpen={setOpenDeleteProductDialog}
            productId={activeProduct.id}
          />
          {adminProductsPageMessage && (
            <SnackBar
              message={adminProductsPageMessage.message}
              severity={adminProductsPageMessage.severity}
              autoHideDuration={7000}
              onClose={onSnackBarClose}
            />
          )}
        </>
      )}{' '}
    </>
  );
};
