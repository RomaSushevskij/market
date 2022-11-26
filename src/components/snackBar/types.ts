import { AlertColor } from '@mui/material/Alert/Alert';

export type SnackBarPropsType = {
  autoHideDuration?: number | null;
  severity: AlertColor;
  message: string | null;
  onClose: (value: null) => void;
};
