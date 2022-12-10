import React, { FC, memo } from 'react';

import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Tooltip from '@mui/material/Tooltip';

import { useAppSelector } from 'hooks';
import { usePalette } from 'hooks/usePalette/usePalette';
import { ProductRowType } from 'pages/admin/productsPanel/productRow/types';
import { selectAdminProductsStatus } from 'store/selectors/adminProductsPanelSelectors';
import { toDollars } from 'utils';

export const ProductRow: FC<ProductRowType> = memo(prop => {
  const { currentProduct, onUpdateProduct, onDeleteProduct } = prop;
  const { title, price, image, id } = currentProduct;
  const { primaryColor, errorColor } = usePalette();

  const adminProductsStatus = useAppSelector(selectAdminProductsStatus);

  const formattedPrice = toDollars.format(price);

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
      <TableCell>{formattedPrice}</TableCell>
      <TableCell align="center">
        <Tooltip title="Edit product">
          <IconButton
            sx={{ color: primaryColor }}
            disabled={adminProductsStatus === 'loading'}
            onClick={onUpdateProduct({ id, title, price, image })}
          >
            <EditIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Delete product">
          <IconButton
            sx={{ color: errorColor }}
            onClick={onDeleteProduct({ id, title, price, image })}
            disabled={adminProductsStatus === 'loading'}
          >
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      </TableCell>
    </TableRow>
  );
});
