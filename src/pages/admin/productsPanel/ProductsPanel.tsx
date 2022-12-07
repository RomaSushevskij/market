import React, { FC, useCallback, useEffect, useState } from 'react';

import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Dialog, DialogContent, DialogTitle } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Tooltip from '@mui/material/Tooltip';

import { AddProductForm } from 'components/admin/adminForms';
import { SnackBar } from 'components/snackBar';
import { useAppDispatch, useAppSelector } from 'hooks';
import { usePalette } from 'hooks/usePalette/usePalette';
import {
  deleteProduct,
  fetchProducts,
  setAdminProductsPageMessage,
} from 'store/reducers';
import { selectProducts } from 'store/selectors';
import {
  selectAdminProductsPageMessage,
  selectAdminProductsStatus,
} from 'store/selectors/adminProductsPanelSelectors';

export const ProductsPanel: FC = () => {
  const dispatch = useAppDispatch();

  const products = useAppSelector(selectProducts);
  const adminProductsPageMessage = useAppSelector(selectAdminProductsPageMessage);
  const adminProductsStatus = useAppSelector(selectAdminProductsStatus);

  const { primaryColor, errorColor } = usePalette();

  const [isOpenAddProductDialog, setOpenAddProductDialog] = useState(false);

  const onDeleteProductClick = (id: string) => () => {
    dispatch(deleteProduct(id));
  };

  const productsItems = products.map(({ id, title, price, image }) => {
    return (
      <TableRow key={id}>
        <TableCell>
          <Tooltip
            title={
              <Avatar
                src={image}
                alt="productImage"
                variant="square"
                sx={{ width: 250, height: 250 }}
              />
            }
            followCursor
            componentsProps={{
              tooltip: {
                sx: {
                  bgcolor: 'transparent',
                },
              },
            }}
          >
            <Avatar
              src={image}
              alt="productImage"
              variant="square"
              sx={{ width: 50, height: 50 }}
            />
          </Tooltip>
        </TableCell>
        <TableCell>{title}</TableCell>
        <TableCell>{price}</TableCell>
        <TableCell align="center">
          <Tooltip title="Edit product">
            <IconButton
              sx={{ color: primaryColor }}
              disabled={adminProductsStatus === 'loading'}
            >
              <EditIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete product">
            <IconButton sx={{ color: errorColor }} onClick={onDeleteProductClick(id)}>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </TableCell>
      </TableRow>
    );
  });

  const onAddProductClick = () => {
    setOpenAddProductDialog(true);
  };

  const handleClose = () => {
    setOpenAddProductDialog(false);
  };

  const onSnackBarClose = useCallback((closeValue: null) => {
    dispatch(setAdminProductsPageMessage(closeValue));
  }, []);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <>
      <Stack>
        <TableContainer component={Paper}>
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
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          sx={{ mt: 2, bgcolor: primaryColor, alignSelf: 'end' }}
          onClick={onAddProductClick}
        >
          Add product
        </Button>
      </Stack>
      <Dialog open={isOpenAddProductDialog} onClose={handleClose} fullWidth>
        <DialogTitle>Product description</DialogTitle>
        <DialogContent>
          <AddProductForm onSubmit={handleClose} />
        </DialogContent>
      </Dialog>
      {adminProductsPageMessage && (
        <SnackBar
          message={adminProductsPageMessage.message}
          severity={adminProductsPageMessage.severity}
          autoHideDuration={7000}
          onClose={onSnackBarClose}
        />
      )}
    </>
  );
};
