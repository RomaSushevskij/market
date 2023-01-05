import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { AdminAuthInitialState } from 'store/reducers/adminAuth/types';
import { signIn, signOut } from 'store/reducers/auth/authReducer';

const slice = createSlice({
  name: 'adminAuth',
  initialState: {
    isAdminAuth: false,
    adminName: null,
    photoURL: null,
    adminAuthStatus: 'idle',
    adminAuthPageMessage: null,
    adminEmail: null,
  } as AdminAuthInitialState,
  reducers: {
    setAdminAuth(
      state,
      action: PayloadAction<{
        email: string | null;
        displayName: string | null;
        photoURL: string | null;
      }>,
    ) {
      const { email, displayName, photoURL } = action.payload;

      state.adminEmail = email;
      state.adminName = displayName;
      state.photoURL = photoURL;
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
