import React, { FC, memo, useState } from 'react';

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

export const OrderItem: FC<OrderItemPropsType> = memo(({ title, price, image }) => {
  const theme = useTheme();
  const [ordersCount, setOrdersCount] = useState<number>(1);

  const onChangeOrdersCount = (action: 'add' | 'remove') => {
    return () => {
      switch (action) {
        case 'add':
          setOrdersCount(ordersCount + 1);
          break;
        case 'remove':
          setOrdersCount(ordersCount - 1);
          break;
        default:
          break;
      }
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
              {ordersCount}
            </Typography>
            <IconButton color="primary" onClick={onChangeOrdersCount('add')}>
              <AddIcon />
            </IconButton>
          </Stack>
        </CardActions>
      </Stack>
    </Card>
  );
});
