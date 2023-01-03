import React, { FC, memo } from 'react';

import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';

export const ProgressBar: FC = memo(() => {
  return (
    <Box
      sx={{
        width: '100vw',
        position: 'fixed',
        top: { xs: '56px', sm: '64px' },
        left: 0,
        zIndex: 1,
      }}
    >
      <LinearProgress />
    </Box>
  );
});
