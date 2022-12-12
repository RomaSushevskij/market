import { createSlice } from '@reduxjs/toolkit';

import { AdminOrder } from 'store/reducers/adminOrdersPanel/types';

const slice = createSlice({
  name: 'adminOrders',
  initialState: {
    orders: [] as AdminOrder[],
  },
  reducers: {},
});

export const adminOrdersReducer = slice.reducer;
