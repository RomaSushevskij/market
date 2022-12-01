import { FC, memo } from 'react';

import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';

import { usePalette } from 'hooks/usePalette/usePalette';

export const Preloader: FC = memo(() => {
  const { primaryColor } = usePalette();

  return (
    <Box minHeight="100vh" display="flex" alignItems="center">
      <CircularProgress sx={{ color: primaryColor }} />
    </Box>
  );
});
