import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import firebase from 'firebase/compat';

import { authApi } from 'api';
import { VERIFY_ACCOUNT_MESSAGE } from 'appConstants';
import { AuthInitialStateType, SignUpDataType } from 'store/reducers/auth/types';
import { AUTH_ERROR_CODES, reduceErrorMessage } from 'utils/reduceErrorMessage';

export const signUp = createAsyncThunk<
  undefined,
  SignUpDataType,
  { rejectValue: string }
>('auth/signUp', async (signUpData: SignUpDataType, { dispatch, rejectWithValue }) => {
  try {
    await authApi.signUp(signUpData);

    dispatch(signOut());
  } catch (e) {
    const { code } = e as firebase.FirebaseError;

    return rejectWithValue(reduceErrorMessage(code as AUTH_ERROR_CODES));
  }
});

export const signIn = createAsyncThunk<
  {
    email?: string | null;
    displayName?: string | null;
    isAuth?: boolean;
    authPageMessage?: string;
  },
  SignUpDataType,
  { rejectValue: string }
>(
  'auth/signIn',
  async (
    signInData: { email: string; password: string },
    { dispatch, rejectWithValue },
  ) => {
    try {
      const user = await authApi.signIn(signInData);

      if (user.emailVerified) {
        const { email, displayName } = user;

        return { email, displayName, isAuth: true };
      }
      dispatch(signOut());
      const authPageMessage = VERIFY_ACCOUNT_MESSAGE;

      return {
        authPageMessage,
      };
    } catch (e) {
      const { code } = e as firebase.FirebaseError;

      return rejectWithValue(reduceErrorMessage(code as AUTH_ERROR_CODES));
    }
  },
);

export const signOut = createAsyncThunk<undefined, undefined, { rejectValue: string }>(
  'auth/signOut',
  async (_, { rejectWithValue }) => {
    try {
      await authApi.signOut();
    } catch (e) {
      const { code } = e as firebase.FirebaseError;

      return rejectWithValue(reduceErrorMessage(code as AUTH_ERROR_CODES));
    }
  },
);

const slice = createSlice({
  name: 'auth',
  initialState: {
    isAuth: false,
    email: null,
    name: null,
    status: 'idle',
    authPageMessage: null,
  } as AuthInitialStateType,
  reducers: {
    setAuthPageMessage(state, action: PayloadAction<{ errorMessage: string | null }>) {
      state.authPageMessage = action.payload.errorMessage;
    },
    setUserAuth(
      state,
      action: PayloadAction<{
        email: string | null;
        displayName: string | null;
      }>,
    ) {
      const { email, displayName } = action.payload;

      state.email = email;
      state.name = displayName;
      state.isAuth = true;
    },
  },
  extraReducers: builder =>
    builder
      .addCase(signUp.pending, state => {
        state.status = 'loading';
      })
      .addCase(signUp.fulfilled, state => {
        state.status = 'succeeded';
      })
      .addCase(signUp.rejected, (state, { payload }) => {
        const errorMessage = payload as string | null;

        state.status = 'failed';
        state.authPageMessage = errorMessage;
      })
      .addCase(signIn.pending, state => {
        state.status = 'loading';
      })
      .addCase(signIn.fulfilled, (state, { payload }) => {
        const { email, displayName, isAuth, authPageMessage } = payload;

        if (email && displayName && isAuth) {
          state.isAuth = isAuth;
          state.email = email;
          state.name = displayName;
        }
        if (authPageMessage) state.authPageMessage = authPageMessage;
        state.status = 'succeeded';
      })
      .addCase(signIn.rejected, (state, { payload }) => {
        const errorMessage = payload as string | null;

        state.status = 'failed';
        state.authPageMessage = errorMessage;
      })
      .addCase(signOut.pending, state => {
        state.status = 'loading';
      })
      .addCase(signOut.fulfilled, state => {
        state.status = 'succeeded';
        state.isAuth = false;
        state.email = null;
        state.name = null;
      })
      .addCase(signOut.rejected, (state, { payload }) => {
        const errorMessage = payload as string | null;

        state.status = 'failed';
        state.authPageMessage = errorMessage;
      }),
});

export const authReducer = slice.reducer;
export const { setAuthPageMessage, setUserAuth } = slice.actions;
export const getInitialAuthState = slice.getInitialState;
