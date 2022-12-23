import React from 'react';

import TaskAlt from '@mui/icons-material/TaskAlt';
import WarningAmber from '@mui/icons-material/WarningAmber';
import { SxProps } from '@mui/material';
import Box from '@mui/material/Box';
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
import { MAX_VALUE_SCREEN_ENDPOINT } from 'pages/shoppingList/shoppingListRow/orderStepper/constants';
import { OrderStatus } from 'store/reducers/adminOrdersPanel/types';

const steps: OrderStatus[] = [
  'Order confirmation',
  'Issued',
  'Delivery in progress',
  'Delivered',
];

type OrderStatusCustom = {
  state: 'success' | 'error';
  step: OrderStatus;
  description?: string;
};

const orderStatus: OrderStatusCustom = {
  state: 'error',
  step: 'Issued',
  description: 'Some error occurred',
};

const OrderStepIconRoot = styled('div')<{ ownerState: { active?: boolean } }>(
  ({ theme, ownerState }) => ({
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
  }),
);

const OrderConnector = styled(StepConnector)(({ theme }) => ({
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
    borderColor: '#d9d9de',
    borderTopWidth: 2,
    borderRadius: 1,
  },
}));

const stepLabelStyle: SxProps<Theme> = {
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
};

const end = 490;
const end1 = 633;
const stepStyle: SxProps<Theme> = theme => ({
  '&.MuiStep-root': {
    [theme.breakpoints.between('xs', end)]: {
      pb: 2,
    },
    [theme.breakpoints.between('sm', end1)]: {
      pb: 4,
    },
    [theme.breakpoints.up(end1)]: {
      pb: 1,
    },
  },
});

const OrderStepIcon = (props: StepIconProps) => {
  const { active, completed, className, error } = props;

  if (completed) {
    return (
      <OrderStepIconRoot ownerState={{ active }} className={className}>
        <TaskAlt className="CustomStepIcon-completedIcon" />
      </OrderStepIconRoot>
    );
  }

  return (
    <OrderStepIconRoot ownerState={{ active }} className={className}>
      {error ? (
        <WarningAmber className="CustomStepIcon-error" />
      ) : (
        <div className="CustomStepIcon-circle" />
      )}
    </OrderStepIconRoot>
  );
};

export const OrderStepper = () => {
  const activeStep = steps.indexOf(orderStatus.step);
  const { errorColor } = usePalette();

  return (
    <Stack justifyContent="center">
      <Box sx={{ margin: '50px 5vw' }}>
        <Stepper activeStep={activeStep} alternativeLabel connector={<OrderConnector />}>
          {steps.map(label => {
            const isError = label === orderStatus.step && orderStatus.state === 'error';

            return (
              <Step key={label} sx={stepStyle}>
                {isError ? (
                  <Tooltip
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
                      sx={stepLabelStyle}
                      StepIconComponent={OrderStepIcon}
                      error={isError}
                    >
                      {label}
                    </StepLabel>
                  </Tooltip>
                ) : (
                  <StepLabel
                    sx={stepLabelStyle}
                    StepIconComponent={OrderStepIcon}
                    error={isError}
                  >
                    {label}
                  </StepLabel>
                )}
              </Step>
            );
          })}
        </Stepper>
      </Box>
    </Stack>
  );
};
