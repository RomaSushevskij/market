import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

import { authApi } from 'api';
import { AuthInitialStateType, SignUpDataType } from 'store/reducers/auth/types';

export const signUp = createAsyncThunk<
  undefined,
  SignUpDataType,
  { rejectValue: string }
>('auth/signUp', async (signUpData: SignUpDataType, { rejectWithValue }) => {
  try {
    const response = await authApi.signUp(signUpData);

    console.log(response);

    return;
  } catch (e) {
    const error = e as string;

    console.log(e);

    return rejectWithValue(error);
  }
});

export const signIn = createAsyncThunk<
  undefined,
  { email: string; password: string },
  { rejectValue: string }
>(
  'auth/signIn',
  async (signInData: { email: string; password: string }, { rejectWithValue }) => {
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
      })
      .addCase(signUp.pending, state => {
        state.status = 'loading';
      })
      .addCase(signUp.fulfilled, state => {
        state.status = 'succeeded';
      })
      .addCase(signUp.rejected, (state, action) => {
        state.status = 'failed';
        state.authPageMessage = action.payload;
      }),
});

export const authReducer = slice.reducer;
export const { logOut } = slice.actions;
export const getInitialAuthState = slice.getInitialState;
