import { FC, forwardRef, memo, SyntheticEvent, useEffect } from 'react';

import MuiAlert, { AlertProps } from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';

import { SnackBarPropsType } from 'components/snackBar/types';

const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export const SnackBar: FC<SnackBarPropsType> = memo(prop => {
  const { severity, autoHideDuration, message, onClose } = prop;

  const handleClose = (event?: SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    onClose(null);
  };

  useEffect(() => {
    return () => {
      onClose(null);
    };
  }, []);

  return (
    <Snackbar
      open={message !== null}
      autoHideDuration={autoHideDuration}
      onClose={handleClose}
    >
      <Alert
        onClose={handleClose}
        variant="filled"
        severity={severity}
        sx={{ width: '100%' }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
});
