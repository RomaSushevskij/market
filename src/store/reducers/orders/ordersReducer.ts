import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

import { ordersApi } from 'api/orders';
import { OrderFormValuesType } from 'components/forms/orderForm/types';
import { AdminOrder } from 'store/reducers/adminOrdersPanel/types';
import {
  OrderInformationType,
  OrdersInitialState,
  OrderType,
} from 'store/reducers/orders/types';
import { ProductType } from 'store/reducers/products/types';
import { AppStateType } from 'store/types';

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

export const addOrder = createAsyncThunk(
  'orders/addOrder',
  async (customerInformation: OrderFormValuesType, { getState }) => {
    const state = getState() as AppStateType;
    const { cartOrderList } = state.orders;
    const { uid } = state.auth;

    const cartOrderInformation = {
      ...customerInformation,
      totalCost: state.orders.cartOrderInformation.totalCost,
    };
    const orderDate = new Date().getTime();

    if (uid) {
      const finalOrder: Omit<AdminOrder, 'orderId'> = {
        ...cartOrderInformation,
        orderList: cartOrderList,
        uid,
        orderDate,
        orderStatus: 'Order confirmation',
      };
      const id = await ordersApi.addOrder(finalOrder);

      console.log(id);
    }
  },
);

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
      action: PayloadAction<{ customerInformation: OrderFormValuesType }>,
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
    builder.addCase(addItemToCart.fulfilled, (state, { payload }) => {
      const { products, productId } = payload;
      const currentProduct = products.find(({ id }) => id === productId);

      if (currentProduct) {
        const currentItemInCart = state.cartOrderList.find(({ id }) => id === productId);

        if (currentItemInCart) {
          currentItemInCart.count += 1;
        } else {
          const orderItem: OrderType = { ...currentProduct, count: 1 };

          state.cartOrderList.push(orderItem);
        }
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
