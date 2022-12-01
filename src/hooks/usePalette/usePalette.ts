import { useTheme } from '@mui/material/styles';

export const usePalette = () => {
  const theme = useTheme();

  return {
    successColor: theme.palette.success.light,
    primaryColor: theme.palette.primary.light,
    warningColor: theme.palette.warning.light,
    errorColor: theme.palette.error.light,
  };
};
