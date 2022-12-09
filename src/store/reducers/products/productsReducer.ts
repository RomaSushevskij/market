import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import firebase from 'firebase/compat';

import { productsAPI } from 'api/products/productsAPI';
import { AUTH_PAGE_MESSAGES } from 'enums';
import {
  addProduct,
  deleteProduct,
  setAdminProductsTotalCount,
  updateProduct,
} from 'store/reducers/adminProductsPanel';
import { ProductsInitialState, ProductType } from 'store/reducers/products/types';
import { AlertNotification } from 'types';
import { reduceErrorMessage } from 'utils/reduceErrorMessage';

export const fetchProducts = createAsyncThunk<
  { products: ProductType[] },
  { isAdmin: boolean },
  { rejectValue: AlertNotification }
>('products/fetchProducts', async (adminIndication, { dispatch, rejectWithValue }) => {
  try {
    const { products, productsTotalCount } = await productsAPI.fetchProducts({
      pageSize: 3,
      currentPage: 2,
    });

    if (adminIndication.isAdmin) {
      dispatch(
        setAdminProductsTotalCount({ adminProductsTotalCount: productsTotalCount }),
      );
    } else {
      dispatch(setProductsTotalCount({ productsTotalCount }));
    }

    return { products };
  } catch (e) {
    const { code } = e as firebase.FirebaseError;
    const notificationMessage = reduceErrorMessage(code as AUTH_PAGE_MESSAGES);

    return rejectWithValue({ message: notificationMessage, severity: 'error' });
  }
});

const slice = createSlice({
  name: 'products',
  initialState: {
    products: [],
    status: 'idle',
    productsPageMessage: null,
    productsTotalCount: 0,
    pageSize: 2,
    currentPage: 1,
  } as ProductsInitialState,
  reducers: {
    setProducts(state, action: PayloadAction<{ products: ProductType[] }>) {
      const { products } = action.payload;

      state.products = products;
    },
    setProductsTotalCount(state, action: PayloadAction<{ productsTotalCount: number }>) {
      const { productsTotalCount } = action.payload;

      state.productsTotalCount = productsTotalCount;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchProducts.pending, state => {
        state.status = 'loading';
      })
      .addCase(fetchProducts.fulfilled, (state, { payload }) => {
        const { products } = payload;

        state.status = 'succeeded';
        state.products = products;
      })
      .addCase(fetchProducts.rejected, (state, { payload }) => {
        state.status = 'failed';
        if (payload) state.productsPageMessage = payload;
      })
      .addCase(addProduct.fulfilled, (state, { payload }) => {
        state.products.push(payload.newProduct);
      })
      .addCase(deleteProduct.fulfilled, (state, { payload }) => {
        const currentProduct = state.products.find(
          product => product.id === payload.productId,
        );

        if (currentProduct) {
          const indexOfCurrentProduct = state.products.indexOf(currentProduct);

          state.products.splice(indexOfCurrentProduct, 1);
        }
      })
      .addCase(updateProduct.fulfilled, (state, { payload }) => {
        const { updateProductPayload } = payload;
        const currentProduct = state.products.find(
          product => product.id === updateProductPayload.id,
        );

        if (currentProduct) {
          const indexOfCurrentProduct = state.products.indexOf(currentProduct);

          state.products.splice(indexOfCurrentProduct, 1, updateProductPayload);
        }
      });
  },
});

export const productsReducer = slice.reducer;
export const { setProducts, setProductsTotalCount } = slice.actions;
