import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

import { productsAPI } from 'api/products/todosAPI';
import { ProductType, RequestStatusType } from 'store/reducers/products/types';

export const fetchProducts = createAsyncThunk<
  { products: ProductType[] },
  void,
  { rejectValue: string }
>('products/fetchProducts', async (_, { rejectWithValue }) => {
  try {
    const { data } = await productsAPI.fetchProducts();
    const { products } = data;

    return { products };
  } catch (e) {
    const { message } = e as AxiosError;

    return rejectWithValue(message);
  }
});

const slice = createSlice({
  name: 'products',
  initialState: {
    products: [] as ProductType[],
    status: 'idle' as RequestStatusType,
    productsPageMessage: '' as string | undefined,
    productsTotalCount: 0,
    pageSize: 6,
    currentPage: 1,
  },
  reducers: {},
  extraReducers: builder =>
    builder
      .addCase(fetchProducts.pending, state => {
        state.status = 'loading';
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.products = action.payload.products;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.productsPageMessage = action.payload;
      }),
});

export const productsReducer = slice.reducer;
