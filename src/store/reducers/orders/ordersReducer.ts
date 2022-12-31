import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import firebase from 'firebase/compat';

import { ordersApi } from 'api/orders';
import { AUTH_PAGE_MESSAGES } from 'enums';
import { editOrderStatus } from 'store/reducers/adminOrdersPanel/adminOrdersReducer';
import { AdminOrder } from 'store/reducers/adminOrdersPanel/types';
import {
  OrderInformationType,
  OrdersInitialState,
  OrderType,
} from 'store/reducers/orders/types';
import { ProductType } from 'store/reducers/products/types';
import { AppStateType } from 'store/types';
import { AlertNotification } from 'types';
import { reduceErrorMessage } from 'utils';

export const addItemToCart = createAsyncThunk<
  { products: ProductType[]; productId: string },
  string,
  { state: AppStateType; rejectValue: string }
>('orders/addItemToCart', async (productId: string, { rejectWithValue, getState }) => {
  const state: AppStateType = getState();
  const { products } = state.products;

  try {
    return {
      products,
      productId,
    };
  } catch (e) {
    const { message } = e as AxiosError;

    return rejectWithValue(message);
  }
});

export const addOrder = createAsyncThunk<
  void,
  Omit<OrderInformationType, 'totalCost'>,
  { rejectValue: AlertNotification }
>(
  'orders/addOrder',
  async (
    customerInformation: Omit<OrderInformationType, 'totalCost'>,
    { getState, rejectWithValue },
  ) => {
    try {
      const state = getState() as AppStateType;
      const { cartOrderList } = state.orders;
      const { uid } = state.auth;

      const cartOrderInformation = {
        ...customerInformation,
        totalCost: state.orders.cartOrderInformation.totalCost,
      };
      const orderDate = new Date().getTime();

      if (uid) {
        const productsNumber = cartOrderList.reduce((sum, { count }) => sum + count, 0);
        const finalOrder: Omit<AdminOrder, 'orderId'> = {
          ...cartOrderInformation,
          orderList: cartOrderList,
          uid,
          orderDate,
          orderStatus: { state: 'success', step: 'Order confirmation' },
          productsNumber,
          isViewedByAdmin: false,
        };
        const id = await ordersApi.addOrder(finalOrder);

        console.log(id);
      }
    } catch (e) {
      const { code } = e as firebase.FirebaseError;
      const notificationMessage = reduceErrorMessage(code as AUTH_PAGE_MESSAGES);

      return rejectWithValue({ message: notificationMessage, severity: 'error' });
    }
  },
);

export const fetchOrders = createAsyncThunk<
  { orders: AdminOrder[]; userId: string | undefined },
  string | undefined,
  { rejectValue: AlertNotification }
  // eslint-disable-next-line default-param-last
>('orders/fetchOrdersForUser', async (userId, { rejectWithValue }) => {
  try {
    const orders = await ordersApi.fetchOrders(userId);
    const sortingByDateOrders = orders.sort((order1, order2) => {
      return order2.orderDate - order1.orderDate;
    });

    return { orders: sortingByDateOrders, userId };
  } catch (e) {
    const { code } = e as firebase.FirebaseError;
    const notificationMessage = reduceErrorMessage(code as AUTH_PAGE_MESSAGES);

    return rejectWithValue({ message: notificationMessage, severity: 'error' });
  }
});

const slice = createSlice({
  name: 'orders',
  initialState: {
    userOrders: [] as AdminOrder[],
    cartOrderList: [] as OrderType[],
    cartOrderInformation: {
      name: '',
      surname: '',
      address: '',
      phone: '',
      totalCost: 0,
    } as OrderInformationType,
    ordersPageStatus: 'idle',
    ordersPageMessage: null,
  } as OrdersInitialState,
  reducers: {
    changeOrderItemCount(
      state,
      action: PayloadAction<{ productId: string; changeType: 'add' | 'remove' }>,
    ) {
      const { productId, changeType } = action.payload;
      const { cartOrderList } = state;
      const currentItemInCart = cartOrderList.find(({ id }) => id === productId);

      if (currentItemInCart) {
        if (changeType === 'add') {
          currentItemInCart.count += 1;

          return;
        }
        if (currentItemInCart.count > 1) {
          currentItemInCart.count -= 1;

          return;
        }
        const currentItemIndex = cartOrderList.indexOf(currentItemInCart);

        if (currentItemIndex > -1) {
          cartOrderList.splice(currentItemIndex, 1);
        }
      }
    },
    calculateOrdersTotalCost(state) {
      const { cartOrderList, cartOrderInformation } = state;

      cartOrderInformation.totalCost = cartOrderList.reduce(
        (sum, { price, count }) => sum + price * count,
        0,
      );
    },
    generateAnOrder(
      state,
      action: PayloadAction<{ customerInformation: OrderInformationType }>,
    ) {
      const { customerInformation } = action.payload;
      const { cartOrderList } = state;

      state.cartOrderInformation = {
        ...customerInformation,
        totalCost: state.cartOrderInformation.totalCost,
      };

      const finalOrder = { ...state.cartOrderInformation, cartOrderList };

      console.log(finalOrder);
    },
    setOrderList(state, action: PayloadAction<{ orderList: OrderType[] }>) {
      state.cartOrderList = action.payload.orderList;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(addItemToCart.fulfilled, (state, { payload }) => {
        const { products, productId } = payload;
        const currentProduct = products.find(({ id }) => id === productId);

        if (currentProduct) {
          const currentItemInCart = state.cartOrderList.find(
            ({ id }) => id === productId,
          );

          if (currentItemInCart) {
            currentItemInCart.count += 1;
          } else {
            const orderItem: OrderType = { ...currentProduct, count: 1 };

            state.cartOrderList.push(orderItem);
          }
        }
      })
      .addCase(fetchOrders.pending, state => {
        state.ordersPageStatus = 'loading';
      })
      .addCase(fetchOrders.fulfilled, (state, { payload }) => {
        state.ordersPageStatus = 'succeeded';
        const { orders, userId } = payload;

        if (userId) state.userOrders = orders;
      })
      .addCase(fetchOrders.rejected, (state, { payload }) => {
        state.ordersPageStatus = 'failed';
        if (payload) state.ordersPageMessage = payload;
      })
      .addCase(addOrder.pending, state => {
        state.ordersPageStatus = 'loading';
      })
      .addCase(addOrder.fulfilled, state => {
        state.ordersPageStatus = 'succeeded';
        state.cartOrderList = [];
      })
      .addCase(addOrder.rejected, (state, { payload }) => {
        state.ordersPageStatus = 'failed';
        if (payload) state.ordersPageMessage = payload;
      })
      .addCase(editOrderStatus.fulfilled, (state, { payload }) => {
        const { updateOrderStatusPayload } = payload;
        const { orderId, orderStatus } = updateOrderStatusPayload;

        const indexOfCurrentOrder = state.userOrders.findIndex(
          order => order.orderId === orderId,
        );

        if (indexOfCurrentOrder > -1) {
          state.userOrders[indexOfCurrentOrder].orderStatus = orderStatus;
        }
      });
  },
});

export const ordersReducer = slice.reducer;
export const {
  changeOrderItemCount,
  calculateOrdersTotalCost,
  generateAnOrder,
  setOrderList,
} = slice.actions;
