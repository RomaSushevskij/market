import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import firebase from 'firebase/compat';

import { AddProductPayload } from 'api';
import { productsAPI } from 'api/products/productsAPI';
import { ProductsInitialState, ProductType } from 'store/reducers/products/types';
import { AlertNotification } from 'types';
import { AUTH_PAGE_MESSAGES, reduceErrorMessage } from 'utils/reduceErrorMessage';

export const fetchProducts = createAsyncThunk<
  { products: ProductType[] },
  void,
  { rejectValue: AlertNotification }
>('products/fetchProducts', async (_, { rejectWithValue }) => {
  try {
    const products = await productsAPI.fetchProducts();

    return { products };
  } catch (e) {
    const { code } = e as firebase.FirebaseError;
    const notificationMessage = reduceErrorMessage(code as AUTH_PAGE_MESSAGES);

    return rejectWithValue({ message: notificationMessage, severity: 'error' });
  }
});

export const addProduct = createAsyncThunk<
  undefined,
  AddProductPayload,
  { rejectValue: AlertNotification }
>(
  'products/addProduct',
  async (addProductPayload: AddProductPayload, { rejectWithValue }) => {
    try {
      await productsAPI.addProduct(addProductPayload);
    } catch (e) {
      const { code } = e as firebase.FirebaseError;
      const notificationMessage = reduceErrorMessage(code as AUTH_PAGE_MESSAGES);

      return rejectWithValue({ message: notificationMessage, severity: 'error' });
    }
  },
);

const slice = createSlice({
  name: 'products',
  initialState: {
    products: [],
    status: 'idle',
    productsPageMessage: null,
    productsTotalCount: 0,
    pageSize: 6,
    currentPage: 1,
  } as ProductsInitialState,
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
      .addCase(fetchProducts.rejected, (state, { payload }) => {
        state.status = 'failed';
        if (payload) state.productsPageMessage = payload;
      }),
});

export const productsReducer = slice.reducer;
export const getInitialProductState = slice.getInitialState;
