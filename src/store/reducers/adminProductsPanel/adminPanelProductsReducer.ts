import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import firebase from 'firebase/compat';

import { AddProductPayload, productsAPI } from 'api';
import { ADMIN_PANEL_PRODUCTS_MESSAGES, AUTH_PAGE_MESSAGES } from 'enums';
import { AdminPanelProductsInitialState } from 'store/reducers/adminProductsPanel/types';
import { ProductType } from 'store/reducers/products/types';
import { AlertNotification } from 'types';
import { reduceErrorMessage } from 'utils/reduceErrorMessage';

export const addProduct = createAsyncThunk<
  { adminProductsPageMessage: AlertNotification; newProduct: ProductType },
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
    } catch (e) {
      const { code } = e as firebase.FirebaseError;
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
    adminPageSize: 6,
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
  },
  extraReducers: builder => {
    builder
      .addCase(addProduct.pending, state => {
        state.adminProductsStatus = 'loading';
      })
      .addCase(addProduct.fulfilled, (state, { payload }) => {
        state.adminProductsStatus = 'succeeded';
        state.adminProductsPageMessage = payload.adminProductsPageMessage;
      })
      .addCase(addProduct.rejected, (state, { payload }) => {
        state.adminProductsStatus = 'failed';
        if (payload) state.adminProductsPageMessage = payload;
      });
  },
});

export const adminPanelProductsReducer = slice.reducer;
export const { setAdminProductsPageMessage } = slice.actions;
