import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

import { OrderInformationType, OrderType } from 'store/reducers/orders/types';
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

const slice = createSlice({
  name: 'orders',
  initialState: {
    orderList: [] as OrderType[],
    orderInformation: {
      name: '',
      surname: '',
      address: '',
      phone: '',
      totalCost: 0,
    } as OrderInformationType,
  },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(addItemToCart.fulfilled, (state, { payload }) => {
      const { products, productId } = payload;
      const { orderList, orderInformation } = state;
      const currentProduct = products.find(({ id }) => id === productId);

      if (currentProduct) {
        const currentItemInCart = orderList.find(({ id }) => id === productId);

        if (currentItemInCart) {
          currentItemInCart.count += 1;
        } else {
          const orderItem: OrderType = { ...currentProduct, count: 1 };

          orderList.push(orderItem);
        }
        orderInformation.totalCost = orderList.reduce(
          (sum, { price, count }) => sum + price * count,
          0,
        );
      }
    });
  },
});

export const ordersReducer = slice.reducer;
