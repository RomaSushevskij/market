import React, { FC, memo, useEffect, useState } from 'react';

import DeleteIcon from '@mui/icons-material/Delete';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import { Accordion, AccordionDetails, AccordionSummary } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import { useTheme } from '@mui/material/styles';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';

import { useAppDispatch } from 'hooks';
import { usePalette } from 'hooks/usePalette/usePalette';
import { DeleteOrderDialog } from 'pages/admin/adminOrdersPanel/deleteOrderDialog';
import { OrderStepper } from 'pages/shoppingList/shoppingListRow/orderStepper';
import { ShoppingListRowProps } from 'pages/shoppingList/shoppingListRow/types';
import { editIsViewedByAdmin } from 'store/reducers/adminOrdersPanel/adminOrdersReducer';
import { toDollars } from 'utils';
import { formatDate } from 'utils/formatDate';
import { formatPieceCount } from 'utils/formatPieceCount';

export const ShoppingListRow: FC<ShoppingListRowProps> = memo(prop => {
  const {
    totalCost,
    orderId,
    orderList,
    orderDate,
    orderStatus,
    productsNumber,
    phone,
    name,
    surname,
    address,
    isAdmin,
    isViewedByAdmin,
  } = prop;

  const dispatch = useAppDispatch();
  const theme = useTheme();
  const { errorColor } = usePalette();
  const primaryColor = theme.palette.primary.main;

  const [isExpanded, setExpanded] = useState<boolean>(false);
  const [accordionBgc, setAccordionBgc] = useState<string>('#ffffff');
  const [isOpenDeleteOrderDialog, setOpenDeleteOrderDialog] = useState(false);

  const formattedDate = formatDate(orderDate);
  const formattedPrice = toDollars.format(totalCost);
  const formattedProductsNumber = formatPieceCount(productsNumber);

  const onAccordionClick = () => {
    setExpanded(!isExpanded);
    if (!isViewedByAdmin && isAdmin) dispatch(editIsViewedByAdmin(orderId));
  };

  useEffect(() => {
    const ms = 150;
    let timerId: ReturnType<typeof setTimeout>;

    if (isExpanded) {
      setAccordionBgc('#fff9e2');
    } else if (!isExpanded && isAdmin && !isViewedByAdmin) {
      timerId = setTimeout(() => {
        setAccordionBgc('rgba(225,245,254,0.6)');
      }, ms);
    } else {
      timerId = setTimeout(() => {
        setAccordionBgc('#ffffff');
      }, ms);
    }

    return () => {
      clearTimeout(timerId);
    };
  }, [isExpanded, isViewedByAdmin]);

  const orderStatusChipLabel =
    orderStatus.state === 'error' ? (
      <span style={{ display: 'flex', alignItems: 'center' }}>
        {orderStatus.step}
        <WarningAmberIcon fontSize="small" sx={{ pl: 1 }} />
      </span>
    ) : (
      orderStatus.step
    );

  const onDeleteOrderClick = () => {
    setOpenDeleteOrderDialog(true);
  };

  const accordionSummaries = orderList.map(
    ({ id, title, price, count }, index, array) => {
      const formattedCount = formatPieceCount(count);

      return (
        <div key={id}>
          <Divider />
          <AccordionDetails
            key={id}
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              padding: '8px',
            }}
          >
            <Typography
              sx={{ mx: 1, color: primaryColor, textDecoration: 'underline' }}
              variant="body2"
            >
              {title}
            </Typography>
            <Typography sx={{ mx: 1 }} variant="body2">
              {formattedCount}
            </Typography>
            <Typography sx={{ mx: 1 }} variant="body2">
              {toDollars.format(price)}
            </Typography>
          </AccordionDetails>
          {index === array.length - 1 && <Divider />}
        </div>
      );
    },
  );

  return (
    <Accordion expanded={isExpanded} sx={{ backgroundColor: accordionBgc }}>
      <AccordionSummary
        expandIcon={
          <ExpandMoreIcon
            color={`${isExpanded ? 'success' : 'primary'}`}
            onClick={onAccordionClick}
            sx={{
              p: 0.5,
              ml: 0.5,
              backgroundColor: `${
                isExpanded ? 'rgba(232,245,233,0.65)' : 'rgba(225,245,254,0.6)'
              }`,
              borderRadius: '50%',
              border: `${
                !isViewedByAdmin && isAdmin ? `1px solid ${primaryColor}` : 'none'
              }`,
            }}
          />
        }
      >
        <Stack
          width={{ sm: '100%' }}
          direction={{ sm: 'row' }}
          alignItems={{ xs: 'flex-start', sm: 'center' }}
          justifyContent="space-between"
          height={{ xs: 150, sm: 'auto' }}
        >
          {!isViewedByAdmin && isAdmin && (
            <Chip size="small" color="primary" sx={{ fontWeight: 'bold' }} label="New" />
          )}
          <Tooltip title={orderId.toUpperCase()}>
            <Typography sx={{ fontWeight: 'bold', color: primaryColor }}>
              {orderId.toUpperCase()}
            </Typography>
          </Tooltip>
          <Typography>{formattedProductsNumber}</Typography>
          <Typography sx={{ fontWeight: 'bold' }}>{formattedPrice}</Typography>
          <Typography sx={{ color: 'text.secondary' }}>{formattedDate}</Typography>
          <Chip
            label={orderStatusChipLabel}
            variant="outlined"
            color={orderStatus.state}
          />
        </Stack>
      </AccordionSummary>
      <Stack sx={{ width: '100%', mb: 2 }}>
        <OrderStepper orderStatus={orderStatus} isAdmin={isAdmin} orderId={orderId} />
        {isAdmin && (
          <Button
            variant="outlined"
            color="error"
            sx={{
              color: errorColor,
              borderColor: errorColor,
              alignSelf: 'center',
              mt: 2,
            }}
            size="small"
            endIcon={<DeleteIcon />}
            onClick={onDeleteOrderClick}
          >
            Delete order
          </Button>
        )}
      </Stack>
      {accordionSummaries}
      <AccordionDetails
        sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
      >
        <Box>
          <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
            Delivery:
          </Typography>
          <Typography variant="body2">{address}</Typography>
          <Typography variant="body2">
            {`${name} `}
            {surname}
          </Typography>
          <Typography variant="body2">{phone}</Typography>
        </Box>
        <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
          {`Total cost: ${formattedPrice}`}
        </Typography>
      </AccordionDetails>
      <DeleteOrderDialog
        orderId={orderId}
        open={isOpenDeleteOrderDialog}
        setOpen={setOpenDeleteOrderDialog}
      />
    </Accordion>
  );
});
