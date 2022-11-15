import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

import { OrderType } from 'store/reducers/orders/types';
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
    },
  },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(addItemToCart.fulfilled, ({ orderList }, { payload }) => {
      const { products, productId } = payload;
      const currentProduct = products.find(({ id }) => id === productId);

      if (currentProduct) {
        const orderItem: OrderType = { ...currentProduct, count: 0 };

        orderList.push(orderItem);
      }
    });
  },
});

export const ordersReducer = slice.reducer;
