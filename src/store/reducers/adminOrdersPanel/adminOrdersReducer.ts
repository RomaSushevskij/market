import { createSlice } from '@reduxjs/toolkit';

import {
  AdminOrder,
  AdminOrdersInitialState,
} from 'store/reducers/adminOrdersPanel/types';

const slice = createSlice({
  name: 'adminOrders',
  initialState: {
    orders: [] as AdminOrder[],
    pageSize: 5,
    currentPage: 1,
    ordersTotalCount: 0,
  } as AdminOrdersInitialState,
  reducers: {},
});

export const adminOrdersReducer = slice.reducer;
