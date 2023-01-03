import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit';
import firebase from 'firebase/compat';

import { ordersApi, UpdateOrderStatusPayload } from 'api/orders';
import { ADMIN_PANEL_ORDERS_MESSAGES } from 'enums';
import {
  AdminOrder,
  AdminOrdersInitialState,
} from 'store/reducers/adminOrdersPanel/types';
import { fetchOrders } from 'store/reducers/orders/ordersReducer';
import { AlertNotification } from 'types';

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

      return rejectWithValue({ message: code, severity: 'error' });
    }
  },
);

export const editIsViewedByAdmin = createAsyncThunk<
  { orderId: string },
  string,
  { rejectValue: AlertNotification }
>('adminOrders/editIsViewedByAdmin', async (orderId, { rejectWithValue }) => {
  try {
    await ordersApi.editIsViewedByAdmin(orderId);

    return { orderId };
  } catch (e) {
    const { code } = e as firebase.FirebaseError;

    return rejectWithValue({ message: code, severity: 'error' });
  }
});

export const deleteOrder = createAsyncThunk<
  { orderId: string },
  string,
  { rejectValue: AlertNotification }
>('adminOrders/deleteOrder', async (orderId, { rejectWithValue }) => {
  try {
    await ordersApi.deleteOrder(orderId);

    return { orderId };
  } catch (e) {
    const { code } = e as firebase.FirebaseError;

    return rejectWithValue({ message: code, severity: 'error' });
  }
});

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
      .addCase(fetchOrders.fulfilled, (state, { payload }) => {
        const { orders, userId, ordersTotalCount, pageSize, currentPage } = payload;

        if (!userId) {
          state.orders = orders;
          state.currentPage = currentPage;
          state.pageSize = pageSize;
          state.ordersTotalCount = ordersTotalCount;
        }
      })
      .addCase(editOrderStatus.fulfilled, (state, { payload }) => {
        const { updateOrderStatusPayload, adminOrdersPageMessage } = payload;
        const { orderId, orderStatus } = updateOrderStatusPayload;

        state.adminOrdersPageMessage = adminOrdersPageMessage;
        const indexOfCurrentOrder = state.orders.findIndex(
          order => order.orderId === orderId,
        );

        if (indexOfCurrentOrder > -1) {
          state.orders[indexOfCurrentOrder].orderStatus = orderStatus;
        }
      })
      .addCase(deleteOrder.fulfilled, (state, { payload }) => {
        const indexOfCurrentOrder = state.orders.findIndex(
          order => order.orderId === payload.orderId,
        );

        if (indexOfCurrentOrder > -1) state.orders.splice(indexOfCurrentOrder, 1);
      })
      .addCase(editIsViewedByAdmin.fulfilled, (state, { payload }) => {
        const indexOfCurrentOrder = state.orders.findIndex(
          order => order.orderId === payload.orderId,
        );

        if (indexOfCurrentOrder > -1) {
          state.orders[indexOfCurrentOrder].isViewedByAdmin = true;
        }
      })
      .addMatcher(
        isAnyOf(
          fetchOrders.pending,
          editOrderStatus.pending,
          deleteOrder.pending,
          editIsViewedByAdmin.pending,
        ),
        state => {
          state.adminOrdersStatus = 'loading';
        },
      )
      .addMatcher(
        isAnyOf(
          fetchOrders.fulfilled,
          editOrderStatus.fulfilled,
          deleteOrder.fulfilled,
          editIsViewedByAdmin.fulfilled,
        ),
        state => {
          state.adminOrdersStatus = 'succeeded';
        },
      )
      .addMatcher(
        isAnyOf(
          fetchOrders.rejected,
          editOrderStatus.rejected,
          deleteOrder.rejected,
          editIsViewedByAdmin.rejected,
        ),
        (state, { payload }) => {
          state.adminOrdersStatus = 'failed';
          if (payload) state.adminOrdersPageMessage = payload;
        },
      );
  },
});

export const adminOrdersReducer = slice.reducer;
