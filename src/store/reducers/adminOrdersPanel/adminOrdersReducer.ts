import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import firebase from 'firebase/compat';

import { ordersApi, UpdateOrderStatusPayload } from 'api/orders';
import { ADMIN_PANEL_ORDERS_MESSAGES, AUTH_PAGE_MESSAGES } from 'enums';
import {
  AdminOrder,
  AdminOrdersInitialState,
} from 'store/reducers/adminOrdersPanel/types';
import { fetchOrders } from 'store/reducers/orders/ordersReducer';
import { AlertNotification } from 'types';
import { reduceErrorMessage } from 'utils';

export const editOrderStatus = createAsyncThunk<
  {
    updateOrderStatusPayload: UpdateOrderStatusPayload;
    adminOrdersPageMessage: AlertNotification;
  },
  UpdateOrderStatusPayload,
  { rejectValue: AlertNotification }
>(
  'adminOrders/editOrderStatus',
  async (updateOrderStatusPayload, { rejectWithValue }) => {
    try {
      await ordersApi.editOrderStatus(updateOrderStatusPayload);

      const adminOrdersPageMessage: AlertNotification = {
        message: ADMIN_PANEL_ORDERS_MESSAGES.ORDER_STATUS_UPDATED_SUCCESSFULLY,
        severity: 'success',
      };

      return { updateOrderStatusPayload, adminOrdersPageMessage };
    } catch (e) {
      const { code } = e as firebase.FirebaseError;
      const notificationMessage = reduceErrorMessage(code as AUTH_PAGE_MESSAGES);

      return rejectWithValue({ message: notificationMessage, severity: 'error' });
    }
  },
);

const slice = createSlice({
  name: 'adminOrders',
  initialState: {
    orders: [] as AdminOrder[],
    pageSize: 5,
    currentPage: 1,
    ordersTotalCount: 0,
    adminOrdersStatus: 'idle',
    adminOrdersPageMessage: null,
  } as AdminOrdersInitialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchOrders.pending, state => {
        state.adminOrdersStatus = 'loading';
      })
      .addCase(fetchOrders.fulfilled, (state, { payload }) => {
        const { orders, userId } = payload;

        state.adminOrdersStatus = 'succeeded';
        if (!userId) state.orders = orders;
      })
      .addCase(fetchOrders.rejected, (state, { payload }) => {
        state.adminOrdersStatus = 'failed';
        if (payload) state.adminOrdersPageMessage = payload;
      })
      .addCase(editOrderStatus.pending, state => {
        state.adminOrdersStatus = 'loading';
      })
      .addCase(editOrderStatus.fulfilled, (state, { payload }) => {
        const { updateOrderStatusPayload, adminOrdersPageMessage } = payload;
        const { orderId, orderStatus } = updateOrderStatusPayload;

        state.adminOrdersStatus = 'succeeded';
        state.adminOrdersPageMessage = adminOrdersPageMessage;
        const indexOfCurrentOrder = state.orders.findIndex(
          order => order.orderId === orderId,
        );

        if (indexOfCurrentOrder !== -1) {
          state.orders[indexOfCurrentOrder].orderStatus = orderStatus;
        }
      })
      .addCase(editOrderStatus.rejected, (state, { payload }) => {
        state.adminOrdersStatus = 'failed';
        if (payload) state.adminOrdersPageMessage = payload;
      });
  },
});

export const adminOrdersReducer = slice.reducer;
