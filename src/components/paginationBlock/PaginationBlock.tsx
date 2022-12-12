import React, { FC, memo } from 'react';

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
import { PaginationBlockProps } from 'components/paginationBlock/types';

const pageSizes = [FIVE_ITEMS_PER_PAGE, TEN_ITEMS_PER_PAGE, TWENTY_ITEMS_PER_PAGE];

export const PaginationBlock: FC<PaginationBlockProps> = memo(prop => {
  const {
    onPageChange,
    itemsTotalCount,
    onPageSizeChange,
    pageSize,
    currentPage,
    pageSizeOptions,
  } = prop;

  const onPageLimitChange = (event: SelectChangeEvent) => {
    onPageSizeChange(Number(event.target.value));
  };

  const onPageNumberChange = (event: React.ChangeEvent<unknown>, value: number) => {
    onPageChange(value);
  };
  const pageCount = Math.ceil(itemsTotalCount / pageSize);

  const resultPageSizes = pageSizeOptions || pageSizes;

  return (
    <Stack direction="row" justifyContent="center">
      <Pagination
        count={pageCount}
        variant="outlined"
        color="primary"
        shape="rounded"
        onChange={onPageNumberChange}
        page={currentPage}
      />
      <Typography ml={2} mr={1} alignSelf="center" variant="body2">
        Items per page:
      </Typography>
      <Select
        value={String(pageSize)}
        onChange={onPageLimitChange}
        size="small"
        sx={{ p: 0, alignSelf: 'center' }}
        inputProps={{
          sx: { fontSize: 14, p: 0.6 },
        }}
      >
        {resultPageSizes.map(pageSize => (
          <MenuItem key={pageSize} value={pageSize} sx={{ fontSize: 14 }}>
            {pageSize}
          </MenuItem>
        ))}
      </Select>
    </Stack>
  );
});
