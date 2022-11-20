import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

import { authApi } from 'api';
import { AuthInitialStateType } from 'store/reducers/auth/types';

export const signIn = createAsyncThunk<
  undefined,
  { email: string; password: string },
  { rejectValue: string }
>(
  'auth/signUp',
  async (signUpData: { email: string; password: string }, { rejectWithValue }) => {
    try {
      await authApi.signIn();

      return;
    } catch (e) {
      const { message } = e as AxiosError;

      return rejectWithValue(message);
    }
  },
);

const slice = createSlice({
  name: 'auth',
  initialState: {
    isAuth: false,
    email: '',
    name: '',
    status: 'idle',
    authPageMessage: '',
  } as AuthInitialStateType,
  reducers: {
    logOut(state) {
      state.isAuth = false;
    },
  },
  extraReducers: builder =>
    builder
      .addCase(signIn.pending, state => {
        state.status = 'loading';
      })
      .addCase(signIn.fulfilled, state => {
        state.status = 'succeeded';
        state.isAuth = true;
      })
      .addCase(signIn.rejected, (state, action) => {
        state.status = 'failed';
        state.authPageMessage = action.payload;
      }),
});

export const authReducer = slice.reducer;
export const { logOut } = slice.actions;
