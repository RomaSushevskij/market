import { AlertColor } from '@mui/material/Alert/Alert';

export type AlertNotification = {
  message: string | null;
  severity: AlertColor;
};
