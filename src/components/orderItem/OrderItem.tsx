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
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

import { OrderItemPropsType } from 'components/orderItem/types';
import { useAppDispatch } from 'hooks';
import { changeOrderItemCount } from 'store/reducers/orders/ordersReducer';

export const OrderItem: FC<OrderItemPropsType> = memo(
  ({ title, price, image, count, id }: OrderItemPropsType) => {
    const theme = useTheme();
    const dispatch = useAppDispatch();

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
        <Stack direction={{ xs: 'column', sm: 'row' }} alignItems="center">
          <CardMedia
            component="img"
            sx={{ width: { xs: '254px', sm: '120px' } }}
            image={image}
          />
          <CardContent>
            <Stack alignItems={{ xs: 'center', sm: 'flex-start' }}>
              <Typography gutterBottom variant="h6" component="div">
                {title}
              </Typography>
              <Chip
                sx={{
                  bgcolor: theme.palette.warning.light,
                  color: '#ffffff',
                  fontWeight: 700,
                  fontSize: 14,
                }}
                size="medium"
                label={`$ ${price}`}
              />
            </Stack>
          </CardContent>
          <CardActions sx={{ ml: { sm: 'auto' } }}>
            <Stack
              minWidth={120}
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
