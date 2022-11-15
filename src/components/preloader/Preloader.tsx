import { FC, memo } from 'react';

import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import { useTheme } from '@mui/material/styles';

export const Preloader: FC = memo(() => {
  const theme = useTheme();

  return (
    <Box minHeight="calc(100vh - 64px)" display="flex" alignItems="center">
      <CircularProgress sx={{ color: theme.palette.primary.light }} />
    </Box>
  );
});
