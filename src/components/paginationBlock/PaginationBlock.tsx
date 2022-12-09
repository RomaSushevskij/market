import React, { FC, useState } from 'react';

import MenuItem from '@mui/material/MenuItem';
import Pagination from '@mui/material/Pagination';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import {
  FIVE_ITEMS_PER_PAGE,
  TEN_ITEMS_PER_PAGE,
  TWENTY_ITEMS_PER_PAGE,
} from 'components/paginationBlock/constants';

const pageSizes = [FIVE_ITEMS_PER_PAGE, TEN_ITEMS_PER_PAGE, TWENTY_ITEMS_PER_PAGE];

export const PaginationBlock: FC = () => {
  const [pageSize, setPageSize] = useState(pageSizes[0]);

  const handleChange = (event: SelectChangeEvent) => {
    setPageSize(Number(event.target.value));
  };

  return (
    <Stack direction="row" justifyContent="center">
      <Pagination count={10} variant="outlined" color="primary" shape="rounded" />
      <Typography ml={2} mr={1} alignSelf="center" variant="body2">
        Items per page:
      </Typography>
      <Select
        value={String(pageSize)}
        onChange={handleChange}
        size="small"
        sx={{ p: 0, alignSelf: 'center' }}
        inputProps={{
          sx: { fontSize: 14, p: 0.6 },
        }}
      >
        {pageSizes.map(pageSize => (
          <MenuItem key={pageSize} value={pageSize} sx={{ fontSize: 14 }}>
            {pageSize}
          </MenuItem>
        ))}
      </Select>
    </Stack>
  );
};
