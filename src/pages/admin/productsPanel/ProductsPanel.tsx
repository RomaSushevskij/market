import React, { FC, useCallback, useEffect, useState } from 'react';

import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
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

import { AddUpdateProductForm } from 'components/admin/adminForms';
import { SnackBar } from 'components/snackBar';
import { useAppDispatch, useAppSelector } from 'hooks';
import { usePalette } from 'hooks/usePalette/usePalette';
import {
  deleteProduct,
  fetchProducts,
  ProductType,
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
  const [isOpenUpdateProductDialog, setOpenUpdateProductDialog] = useState(false);
  const [isOpenDeleteProductDialog, setOpenDeleteProductDialog] = useState(false);
  const [activeProduct, setActiveProduct] = useState<ProductType>({} as ProductType);

  const onDeleteIconClick = (product: ProductType) => () => {
    setOpenDeleteProductDialog(true);
    setActiveProduct(product);
  };

  const onDeleteProduct = async () => {
    const resultAction = await dispatch(deleteProduct(activeProduct.id));

    if (deleteProduct.fulfilled.match(resultAction)) {
      setOpenDeleteProductDialog(false);
    }
  };

  const onUpdateProductClick = (product: ProductType) => () => {
    setOpenUpdateProductDialog(true);

    setActiveProduct(product);
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
              onClick={onUpdateProductClick({ id, title, price, image })}
            >
              <EditIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete product">
            <IconButton
              sx={{ color: errorColor }}
              onClick={onDeleteIconClick({ ...activeProduct, id })}
              disabled={adminProductsStatus === 'loading'}
            >
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

  const handleCloseAddProductDialog = () => {
    setOpenAddProductDialog(false);
  };

  const handleCloseUpdateProductDialog = () => {
    setOpenUpdateProductDialog(false);
  };

  const handleCloseDeleteProductDialog = () => {
    setOpenDeleteProductDialog(false);
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
      <Dialog
        open={isOpenAddProductDialog}
        onClose={handleCloseAddProductDialog}
        fullWidth
      >
        <DialogTitle>Product description</DialogTitle>
        <DialogContent>
          <AddUpdateProductForm onSubmit={handleCloseAddProductDialog} formType="Add" />
        </DialogContent>
      </Dialog>
      <Dialog
        open={isOpenUpdateProductDialog}
        onClose={handleCloseUpdateProductDialog}
        fullWidth
      >
        <DialogTitle>Product description</DialogTitle>
        <DialogContent>
          <AddUpdateProductForm
            onSubmit={handleCloseUpdateProductDialog}
            activeProduct={activeProduct}
            formType="Update"
          />
        </DialogContent>
      </Dialog>
      <Dialog
        open={isOpenDeleteProductDialog}
        onClose={handleCloseDeleteProductDialog}
        fullWidth
      >
        <DialogTitle>Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this product?
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ justifyContent: 'space-around' }}>
          <Button
            variant="outlined"
            color="inherit"
            onClick={handleCloseDeleteProductDialog}
            disabled={adminProductsStatus === 'loading'}
          >
            Cancel
          </Button>
          <Button
            variant="outlined"
            color="error"
            onClick={onDeleteProduct}
            disabled={adminProductsStatus === 'loading'}
          >
            Delete
          </Button>
        </DialogActions>
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
