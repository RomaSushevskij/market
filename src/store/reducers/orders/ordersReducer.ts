import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
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
  reducers: {
    changeOrderItemCount(
      state,
      action: PayloadAction<{ productId: string; changeType: 'add' | 'remove' }>,
    ) {
      const { productId, changeType } = action.payload;
      const { orderList } = state;
      const currentItemInCart = orderList.find(({ id }) => id === productId);

      if (currentItemInCart) {
        switch (changeType) {
          case 'add':
            currentItemInCart.count += 1;
            break;
          case 'remove': {
            if (currentItemInCart.count > 1) {
              currentItemInCart.count -= 1;
              break;
            }
            const currentItemIndex = orderList.indexOf(currentItemInCart);

            if (currentItemIndex > -1) {
              orderList.splice(currentItemIndex, 1);
            }
            break;
          }
          default:
            break;
        }
      }
    },
    calculateOrdersTotalCost(state) {
      const { orderList, orderInformation } = state;

      orderInformation.totalCost = orderList.reduce(
        (sum, { price, count }) => sum + price * count,
        0,
      );
    },
  },
  extraReducers: builder => {
    builder.addCase(addItemToCart.fulfilled, (state, { payload }) => {
      const { products, productId } = payload;
      const { orderList } = state;
      const currentProduct = products.find(({ id }) => id === productId);

      if (currentProduct) {
        const currentItemInCart = orderList.find(({ id }) => id === productId);

        if (currentItemInCart) {
          currentItemInCart.count += 1;
        } else {
          const orderItem: OrderType = { ...currentProduct, count: 1 };

          orderList.push(orderItem);
        }
      }
    });
  },
});

export const ordersReducer = slice.reducer;
export const { changeOrderItemCount, calculateOrdersTotalCost } = slice.actions;
