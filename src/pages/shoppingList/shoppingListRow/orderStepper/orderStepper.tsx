import React, { FC, useMemo, useState } from 'react';

import EditIcon from '@mui/icons-material/Edit';
import TaskAlt from '@mui/icons-material/TaskAlt';
import WarningAmber from '@mui/icons-material/WarningAmber';
import { SxProps } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Step from '@mui/material/Step';
import StepConnector from '@mui/material/StepConnector';
import stepConnectorClasses from '@mui/material/StepConnector/stepConnectorClasses';
import { StepIconProps } from '@mui/material/StepIcon';
import StepLabel from '@mui/material/StepLabel';
import Stepper from '@mui/material/Stepper';
import { styled, Theme } from '@mui/material/styles';
import Tooltip from '@mui/material/Tooltip';

import { usePalette } from 'hooks/usePalette/usePalette';
import { ManageOrderDialog } from 'pages/admin/adminOrdersPanel/manageOrderDialog';
import { MAX_VALUE_SCREEN_ENDPOINT } from 'pages/shoppingList/shoppingListRow/orderStepper/constants';
import { OrderStepperProps } from 'pages/shoppingList/shoppingListRow/orderStepper/types';
import { OrderStepStatus } from 'store/reducers/adminOrdersPanel/types';

export const orderDeliverySteps: OrderStepStatus[] = [
  'Order confirmation',
  'Issued',
  'Delivery in progress',
  'Delivered',
];

const OrderStepIconRoot = styled('div')<{
  ownerState: { active?: boolean };
  isAdmin: boolean;
}>(({ theme, ownerState }) => ({
  display: 'flex',
  height: 22,
  alignItems: 'center',
  color: '#d9d9de',
  ...(ownerState.active && {
    color: theme.palette.success.light,
  }),
  '& .CustomStepIcon-completedIcon': {
    color: theme.palette.success.light,
    zIndex: 1,
    fontSize: 26,
  },
  '& .CustomStepIcon-circle': {
    width: 8,
    height: 8,
    borderRadius: '50%',
    backgroundColor: 'currentColor',
  },
  '& .CustomStepIcon-error': {
    fontSize: 26,
    color: theme.palette.error.light,
  },
}));

export const OrderConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 10,
    left: `calc(-50% + 20px)`,
    right: 'calc(50% + 20px)',
    [`&.${stepConnectorClasses.active}`]: {
      [theme.breakpoints.between('xs', MAX_VALUE_SCREEN_ENDPOINT)]: {
        left: `calc(-50% + 20px)`,
        right: 'calc(50% + 10px)',
      },
    },
    [`&.${stepConnectorClasses.disabled}`]: {
      [theme.breakpoints.between('xs', MAX_VALUE_SCREEN_ENDPOINT)]: {
        left: `calc(-50% + 10px)`,
        right: 'calc(50% + 10px)',
      },
    },
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: theme.palette.success.light,
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: theme.palette.success.light,
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    borderColowr: '#d9d9de',
    borderTopWidth: 2,
    borderRadius: 1,
  },
}));

export const getStepLabelStyle = (): SxProps<Theme> => ({
  '& .MuiStepLabel-label': {
    fontSize: { xs: '11px', sm: '14px' },
    position: 'absolute',
    left: '50%',
    transform: 'translateX(-50%)',
    fontWeight: '100',
    '&.Mui-disabled, &.Mui-active, &.Mui-completed': {
      fontWeight: '100',
      mt: 1,
    },
    '&.Mui-disabled': {
      color: '#b4b4bb',
    },
  },
});

const screenEndPoint1 = 490;
const screenEndPoint2 = 633;

export const stepStyle: SxProps<Theme> = theme => ({
  '&.MuiStep-root': {
    [theme.breakpoints.between('xs', screenEndPoint1)]: {
      pb: 2,
    },
    [theme.breakpoints.between('sm', screenEndPoint2)]: {
      pb: 4,
    },
    [theme.breakpoints.up(screenEndPoint2)]: {
      pb: 1,
    },
  },
});

export const OrderStepIcon = (props: StepIconProps, isAdmin: boolean) => {
  const { active, completed, className, error } = props;

  if (completed) {
    return (
      <OrderStepIconRoot ownerState={{ active }} className={className} isAdmin={isAdmin}>
        <TaskAlt className="CustomStepIcon-completedIcon" />
      </OrderStepIconRoot>
    );
  }

  return (
    <OrderStepIconRoot ownerState={{ active }} className={className} isAdmin={isAdmin}>
      {error ? (
        <WarningAmber className="CustomStepIcon-error" />
      ) : (
        <div className="CustomStepIcon-circle" />
      )}
    </OrderStepIconRoot>
  );
};

export const OrderStepper: FC<OrderStepperProps> = prop => {
  const { orderStatus, isAdmin, orderId } = prop;
  const { errorColor } = usePalette();

  const [isEditDialogOpen, setEditDialogOpen] = useState(false);

  const activeStep = useMemo(() => {
    if (orderStatus.step === 'Delivered') {
      return orderDeliverySteps.length;
    }

    return orderDeliverySteps.indexOf(orderStatus.step);
  }, [orderStatus]);

  const onStepStatusClick = () => {
    setEditDialogOpen(true);
  };

  return (
    <Stack justifyContent="center">
      <Box sx={{ mt: 1, mb: 4 }}>
        <Stepper activeStep={activeStep} alternativeLabel connector={<OrderConnector />}>
          {orderDeliverySteps.map(label => {
            const isError = label === orderStatus.step && orderStatus.state === 'error';

            return (
              <Step key={label} sx={stepStyle}>
                {isError ? (
                  <Tooltip
                    placement="top"
                    title={orderStatus.description}
                    componentsProps={{
                      tooltip: {
                        sx: {
                          bgcolor: errorColor,
                        },
                      },
                    }}
                  >
                    <StepLabel
                      sx={getStepLabelStyle()}
                      StepIconComponent={props => OrderStepIcon(props, isAdmin)}
                      error={isError}
                    >
                      {label}
                    </StepLabel>
                  </Tooltip>
                ) : (
                  <StepLabel
                    sx={getStepLabelStyle()}
                    StepIconComponent={props => OrderStepIcon(props, isAdmin)}
                    error={isError}
                  >
                    {label}
                  </StepLabel>
                )}
              </Step>
            );
          })}
        </Stepper>
        {isAdmin && (
          <ManageOrderDialog
            open={isEditDialogOpen}
            setOpen={setEditDialogOpen}
            orderId={orderId}
          />
        )}
      </Box>
      {isAdmin && (
        <Button
          size="small"
          variant="outlined"
          sx={{ alignSelf: 'center', mt: 2 }}
          onClick={onStepStatusClick}
          endIcon={<EditIcon />}
        >
          Edit order status
        </Button>
      )}
    </Stack>
  );
};
