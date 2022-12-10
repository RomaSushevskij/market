import React, { FC, memo } from 'react';

import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Chip from '@mui/material/Chip';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { OrderItemPropsType } from './types';

import { useAppDispatch } from 'hooks';
import { usePalette } from 'hooks/usePalette/usePalette';
import { changeOrderItemCount } from 'store/reducers';
import { toDollars } from 'utils';

export const OrderItem: FC<OrderItemPropsType> = memo(
  ({ title, price, image, count, id }: OrderItemPropsType) => {
    const { warningColor } = usePalette();
    const dispatch = useAppDispatch();

    const formattedPrice = toDollars.format(price);

    const onChangeOrdersCount = (action: 'add' | 'remove') => {
      return () => {
        if (action === 'add')
          dispatch(changeOrderItemCount({ productId: id, changeType: 'add' }));
        if (action === 'remove')
          dispatch(changeOrderItemCount({ productId: id, changeType: 'remove' }));
      };
    };

    return (
      <Card sx={{ p: 1 }}>
        <Stack direction="row" alignItems="center">
          <CardMedia component="img" sx={{ width: '120px' }} image={image} />
          <CardContent sx={{ px: { xs: 0, sm: 1 } }}>
            <Stack alignItems="flex-start">
              <Typography gutterBottom variant="h6" component="div">
                {title}
              </Typography>
              <Chip
                sx={{
                  bgcolor: warningColor,
                  color: '#ffffff',
                  fontWeight: 700,
                  fontSize: 14,
                }}
                size="medium"
                label={formattedPrice}
              />
            </Stack>
          </CardContent>
          <CardActions sx={{ ml: 'auto' }}>
            <Stack
              minWidth={{ xs: 100, sm: 120 }}
              direction="row"
              alignItems="center"
              justifyContent="space-between"
            >
              <IconButton color="primary" onClick={onChangeOrdersCount('remove')}>
                <RemoveIcon />
              </IconButton>
              <Typography variant="h5" component="p">
                {count}
              </Typography>
              <IconButton color="primary" onClick={onChangeOrdersCount('add')}>
                <AddIcon />
              </IconButton>
            </Stack>
          </CardActions>
        </Stack>
      </Card>
    );
  },
);
