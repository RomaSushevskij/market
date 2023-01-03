import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import firebase from 'firebase/compat';

import { productsAPI } from 'api/products/productsAPI';
import { AUTH_PAGE_MESSAGES } from 'enums';
import {
  addProduct,
  deleteProduct,
  updateProduct,
} from 'store/reducers/adminProductsPanel';
import {
  DEFAULT_ADMIN_PANEL_PAGE_SIZE,
  DEFAULT_CURRENT_PAGE,
  DEFAULT_PRODUCTS_PAGE_SIZE,
} from 'store/reducers/products/constants';
import {
  FetchProductsThunkArg,
  ProductsInitialState,
  ProductType,
} from 'store/reducers/products/types';
import { AlertNotification } from 'types';
import { reduceErrorMessage } from 'utils/reduceErrorMessage';

export const fetchProducts = createAsyncThunk<
  {
    products: ProductType[];
    thunkArg: FetchProductsThunkArg;
    productsTotalCount: number;
  },
  FetchProductsThunkArg,
  { rejectValue: AlertNotification }
>('products/fetchProducts', async (thunkArg, { getState, rejectWithValue }) => {
  try {
    const { isAdmin, pageSize, currentPage } = thunkArg;

    const getProductsState = getState as () => ProductsInitialState;
    const pageSizeFromState = getProductsState().pageSize;

    const resultPageSize =
      pageSize ||
      pageSizeFromState ||
      (isAdmin ? DEFAULT_ADMIN_PANEL_PAGE_SIZE : DEFAULT_PRODUCTS_PAGE_SIZE);

    const { products, productsTotalCount } = await productsAPI.fetchProducts({
      pageSize: resultPageSize,
      currentPage: currentPage || DEFAULT_CURRENT_PAGE,
    });

    return { products, thunkArg, productsTotalCount };
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
    pageSize: 6,
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
    setPageSize(state, action: PayloadAction<{ pageSize: number }>) {
      const { pageSize } = action.payload;

      state.pageSize = pageSize;
    },
    setCurrentPage(state, action: PayloadAction<{ currentPage: number }>) {
      const { currentPage } = action.payload;

      state.currentPage = currentPage;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchProducts.pending, state => {
        state.status = 'loading';
      })
      .addCase(fetchProducts.fulfilled, (state, { payload }) => {
        const { products, thunkArg, productsTotalCount } = payload;
        const { isAdmin, pageSize, currentPage } = thunkArg;

        state.products = products;
        if (!isAdmin) {
          state.status = 'succeeded';
          state.productsTotalCount = productsTotalCount;
          if (pageSize) state.pageSize = pageSize;
          if (currentPage) state.currentPage = currentPage;
        }
      })
      .addCase(fetchProducts.rejected, (state, { payload }) => {
        state.status = 'failed';
        if (payload) state.productsPageMessage = payload;
      })
      .addCase(addProduct.fulfilled, (state, { payload }) => {
        state.products.push(payload.newProduct);
      })
      .addCase(deleteProduct.fulfilled, (state, { payload }) => {
        const indexOfCurrentProduct = state.products.findIndex(
          product => product.id === payload.productId,
        );

        if (indexOfCurrentProduct > -1) state.products.splice(indexOfCurrentProduct, 1);
      })
      .addCase(updateProduct.fulfilled, (state, { payload }) => {
        const { updateProductPayload } = payload;

        const indexOfCurrentProduct = state.products.findIndex(
          product => product.id === updateProductPayload.id,
        );

        if (indexOfCurrentProduct > -1) {
          state.products.splice(indexOfCurrentProduct, 1, updateProductPayload);
        }
      });
  },
});

export const productsReducer = slice.reducer;
export const { setProducts, setProductsTotalCount, setPageSize, setCurrentPage } =
  slice.actions;
