import { createAsyncThunk, createSlice, isAnyOf, PayloadAction } from '@reduxjs/toolkit';
import firebase from 'firebase/compat';

import { AddProductPayload, productsAPI } from 'api';
import { ADMIN_PANEL_PRODUCTS_MESSAGES, AUTH_PAGE_MESSAGES } from 'enums';
import {
  AdminPanelProductsInitialState,
  ReturnedPostThunk,
} from 'store/reducers/adminProductsPanel/types';
import { ProductType } from 'store/reducers/products/types';
import { AlertNotification } from 'types';
import { reduceErrorMessage } from 'utils/reduceErrorMessage';

export const addProduct = createAsyncThunk<
  ReturnedPostThunk,
  AddProductPayload,
  { rejectValue: AlertNotification }
>(
  'products/addProduct',
  async (addProductPayload: AddProductPayload, { rejectWithValue }) => {
    try {
      const id = await productsAPI.addProduct(addProductPayload);

      const adminProductsPageMessage: AlertNotification = {
        message: ADMIN_PANEL_PRODUCTS_MESSAGES.PRODUCT_ADDED_SUCCESSFULLY,
        severity: 'success',
      };
      const newProduct: ProductType = { id, ...addProductPayload };

      return { adminProductsPageMessage, newProduct };
    } catch (error) {
      const { code } = error as firebase.FirebaseError;
      const notificationMessage = reduceErrorMessage(code as AUTH_PAGE_MESSAGES);

      return rejectWithValue({ message: notificationMessage, severity: 'error' });
    }
  },
);

export const deleteProduct = createAsyncThunk<
  { productId: string; adminProductsPageMessage: AlertNotification },
  string,
  { rejectValue: AlertNotification }
>('products/deleteProduct', async (productId: string, { rejectWithValue }) => {
  try {
    await productsAPI.deleteProduct(productId);
    const adminProductsPageMessage: AlertNotification = {
      message: ADMIN_PANEL_PRODUCTS_MESSAGES.PRODUCT_REMOVED_SUCCESSFULLY,
      severity: 'success',
    };

    return { productId, adminProductsPageMessage };
  } catch (error) {
    const { code } = error as firebase.FirebaseError;
    const notificationMessage = reduceErrorMessage(code as AUTH_PAGE_MESSAGES);

    return rejectWithValue({ message: notificationMessage, severity: 'error' });
  }
});

export const updateProduct = createAsyncThunk<
  { adminProductsPageMessage: AlertNotification; updateProductPayload: ProductType },
  ProductType,
  { rejectValue: AlertNotification }
>(
  'products/updateProduct',
  async (updateProductPayload: ProductType, { rejectWithValue }) => {
    try {
      await productsAPI.updateProduct(updateProductPayload);
      const adminProductsPageMessage: AlertNotification = {
        message: ADMIN_PANEL_PRODUCTS_MESSAGES.PRODUCT_UPDATED_SUCCESSFULLY,
        severity: 'success',
      };

      return { adminProductsPageMessage, updateProductPayload };
    } catch (error) {
      const { code } = error as firebase.FirebaseError;
      const notificationMessage = reduceErrorMessage(code as AUTH_PAGE_MESSAGES);

      return rejectWithValue({ message: notificationMessage, severity: 'error' });
    }
  },
);

const slice = createSlice({
  name: 'adminPanelProducts',
  initialState: {
    adminProductsStatus: 'idle',
    adminProductsPageMessage: null,
    adminProductsTotalCount: 0,
    adminPageSize: 3,
    adminCurrentPage: 1,
  } as AdminPanelProductsInitialState,
  reducers: {
    setAdminProductsPageMessage(state, action: PayloadAction<AlertNotification | null>) {
      if (action.payload) {
        const { message, severity } = action.payload;

        state.adminProductsPageMessage = { message, severity };

        return;
      }
      state.adminProductsPageMessage = action.payload;
    },
    setAdminProductsTotalCount(
      state,
      action: PayloadAction<{ adminProductsTotalCount: number }>,
    ) {
      const { adminProductsTotalCount } = action.payload;

      state.adminProductsTotalCount = adminProductsTotalCount;
    },
  },
  extraReducers: builder => {
    builder
      .addMatcher(
        isAnyOf(addProduct.pending, deleteProduct.pending, updateProduct.pending),
        state => {
          state.adminProductsStatus = 'loading';
        },
      )
      .addMatcher(
        isAnyOf(addProduct.fulfilled, deleteProduct.fulfilled, updateProduct.fulfilled),
        (state, { payload }) => {
          state.adminProductsStatus = 'succeeded';
          state.adminProductsPageMessage = payload.adminProductsPageMessage;
        },
      )
      .addMatcher(
        isAnyOf(addProduct.rejected, deleteProduct.rejected, updateProduct.rejected),
        (state, { payload }) => {
          state.adminProductsStatus = 'failed';
          if (payload) state.adminProductsPageMessage = payload;
        },
      );
  },
});

export const adminPanelProductsReducer = slice.reducer;
export const { setAdminProductsPageMessage, setAdminProductsTotalCount } = slice.actions;
