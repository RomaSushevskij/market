import { createSlice } from '@reduxjs/toolkit';

import { AdminAuthInitialState } from 'store/reducers/adminAuth/types';
import { signIn, signOut } from 'store/reducers/auth/authReducer';

const slice = createSlice({
  name: 'adminAuth',
  initialState: {
    isAdminAuth: false,
    adminName: null,
    adminAuthStatus: 'idle',
    adminAuthPageMessage: null,
    adminEmail: null,
  } as AdminAuthInitialState,
  reducers: {
    setAdminAuth(state) {
      state.isAdminAuth = true;
    },
  },
  extraReducers: builder =>
    builder
      .addCase(signIn.fulfilled, (state, { payload }) => {
        const { isAuth, isAdmin, email } = payload;

        if (isAdmin && isAuth && email) {
          state.isAdminAuth = isAuth;
          state.adminName = 'Admin';
          state.adminEmail = email;
        }
      })
      .addCase(signOut.fulfilled, state => {
        state.isAdminAuth = false;
        state.adminName = null;
      }),
});

export const adminAuthReducer = slice.reducer;
export const { setAdminAuth } = slice.actions;
