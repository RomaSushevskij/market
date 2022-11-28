import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import firebase from 'firebase/compat';

import { authApi } from 'api';
import { ResetPasswordPayload } from 'api/auth/types';
import { SignInFormValuesType } from 'components';
import { AuthInitialStateType, SignUpDataType } from 'store/reducers/auth/types';
import { AlertNotification } from 'types';
import { AUTH_PAGE_MESSAGES, reduceErrorMessage } from 'utils/reduceErrorMessage';

export const signUp = createAsyncThunk<
  undefined,
  SignUpDataType,
  { rejectValue: AlertNotification }
>('auth/signUp', async (signUpData: SignUpDataType, { dispatch, rejectWithValue }) => {
  try {
    await authApi.signUp(signUpData);

    dispatch(signOut());
  } catch (e) {
    const { code } = e as firebase.FirebaseError;
    const notificationMessage = reduceErrorMessage(code as AUTH_PAGE_MESSAGES);

    return rejectWithValue({ message: notificationMessage, severity: 'error' });
  }
});

export const signIn = createAsyncThunk<
  {
    email?: string | null;
    displayName?: string | null;
    uid?: string;
    isAuth?: boolean;
    authPageMessage: AlertNotification;
  },
  SignInFormValuesType,
  { rejectValue: AlertNotification }
>(
  'auth/signIn',
  async (signInData: SignInFormValuesType, { dispatch, rejectWithValue }) => {
    try {
      const user = await authApi.signIn(signInData);

      if (user.emailVerified) {
        const { email, displayName, uid } = user;

        return {
          email,
          displayName,
          uid,
          isAuth: true,
          authPageMessage: {
            message: AUTH_PAGE_MESSAGES.LOGGED_IN_SUCCESSFULLY,
            severity: 'success',
          },
        };
      }
      dispatch(signOut());

      return {
        authPageMessage: {
          message: AUTH_PAGE_MESSAGES.NEED_VERIFY_ACCOUNT,
          severity: 'warning',
        },
      };
    } catch (e) {
      const { code } = e as firebase.FirebaseError;
      const notificationMessage = reduceErrorMessage(code as AUTH_PAGE_MESSAGES);

      return rejectWithValue({ message: notificationMessage, severity: 'error' });
    }
  },
);

export const signOut = createAsyncThunk<
  undefined,
  undefined,
  { rejectValue: AlertNotification }
>('auth/signOut', async (_, { rejectWithValue }) => {
  try {
    await authApi.signOut();
  } catch (e) {
    const { code } = e as firebase.FirebaseError;
    const notificationMessage = reduceErrorMessage(code as AUTH_PAGE_MESSAGES);

    return rejectWithValue({ message: notificationMessage, severity: 'error' });
  }
});

export const sendPasswordResetEmail = createAsyncThunk<
  undefined,
  string,
  { rejectValue: AlertNotification }
>('auth/sendPasswordResetEmail', async (email: string, { rejectWithValue }) => {
  try {
    await authApi.sendPasswordResetEmail(email);
  } catch (e) {
    const { code } = e as firebase.FirebaseError;
    const notificationMessage = reduceErrorMessage(code as AUTH_PAGE_MESSAGES);

    return rejectWithValue({ message: notificationMessage, severity: 'error' });
  }
});

export const resetPassword = createAsyncThunk<
  undefined,
  ResetPasswordPayload,
  { rejectValue: AlertNotification }
>(
  'auth/resetPassword',
  async (resetPasswordPayload: ResetPasswordPayload, { rejectWithValue }) => {
    try {
      await authApi.resetPassword(resetPasswordPayload);
    } catch (e) {
      const { code } = e as firebase.FirebaseError;
      const notificationMessage = reduceErrorMessage(code as AUTH_PAGE_MESSAGES);

      return rejectWithValue({ message: notificationMessage, severity: 'error' });
    }
  },
);

export const verifyEmail = createAsyncThunk<
  undefined,
  string,
  { rejectValue: AlertNotification }
>('auth/verifyEmail', async (oobCode: string, { rejectWithValue }) => {
  try {
    await authApi.verifyEmail(oobCode);
  } catch (e) {
    const { code } = e as firebase.FirebaseError;
    const notificationMessage = reduceErrorMessage(code as AUTH_PAGE_MESSAGES);

    return rejectWithValue({ message: notificationMessage, severity: 'error' });
  }
});

const slice = createSlice({
  name: 'auth',
  initialState: {
    isAuth: false,
    email: null,
    name: null,
    status: 'idle',
    authPageMessage: null,
    uid: null,
  } as AuthInitialStateType,
  reducers: {
    setAuthPageMessage(state, action: PayloadAction<AlertNotification | null>) {
      if (action.payload) {
        const { message, severity } = action.payload;

        state.authPageMessage = { message, severity };

        return;
      }
      state.authPageMessage = action.payload;
    },
    setUserAuth(
      state,
      action: PayloadAction<{
        email: string | null;
        displayName: string | null;
        uid: string;
      }>,
    ) {
      const { email, displayName, uid } = action.payload;

      state.email = email;
      state.name = displayName;
      state.uid = uid;
      state.isAuth = true;
    },
  },
  extraReducers: builder => {
    // const allAuthThunks = [
    //   signUp,
    //   signIn,
    //   signOut,
    //   sendPasswordResetEmail,
    //   resetPassword,
    //   verifyEmail,
    // ];

    // allAuthThunks.forEach(thunk => {
    //   builder.addCase(thunk.pending, state => {
    //     state.status = 'loading';
    //   });
    // });
    builder
      .addCase(signUp.pending, state => {
        state.status = 'loading';
      })
      .addCase(signUp.fulfilled, state => {
        state.status = 'succeeded';
      })
      .addCase(signUp.rejected, (state, { payload }) => {
        state.status = 'failed';
        if (payload) state.authPageMessage = payload;
      })
      .addCase(signIn.pending, state => {
        state.status = 'loading';
      })
      .addCase(signIn.fulfilled, (state, { payload }) => {
        const { email, displayName, isAuth, authPageMessage, uid } = payload;

        if (email && displayName !== undefined && isAuth && uid) {
          state.isAuth = isAuth;
          state.email = email;
          state.name = displayName;
          state.uid = uid;
        }
        if (authPageMessage) state.authPageMessage = authPageMessage;
        state.status = 'succeeded';
      })
      .addCase(signIn.rejected, (state, { payload }) => {
        state.status = 'failed';
        if (payload) state.authPageMessage = payload;
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
        state.status = 'failed';
        if (payload) state.authPageMessage = payload;
      })
      .addCase(sendPasswordResetEmail.pending, state => {
        state.status = 'loading';
      })
      .addCase(sendPasswordResetEmail.fulfilled, state => {
        state.status = 'succeeded';
      })
      .addCase(sendPasswordResetEmail.rejected, (state, { payload }) => {
        state.status = 'failed';
        if (payload) state.authPageMessage = payload;
      })
      .addCase(resetPassword.pending, state => {
        state.status = 'loading';
      })
      .addCase(resetPassword.fulfilled, state => {
        state.status = 'succeeded';
      })
      .addCase(resetPassword.rejected, (state, { payload }) => {
        state.status = 'failed';
        if (payload) state.authPageMessage = payload;
      })
      .addCase(verifyEmail.pending, state => {
        state.status = 'loading';
      })
      .addCase(verifyEmail.fulfilled, state => {
        state.status = 'succeeded';
      })
      .addCase(verifyEmail.rejected, (state, { payload }) => {
        state.status = 'failed';
        if (payload) state.authPageMessage = payload;
      });
  },
});

export const authReducer = slice.reducer;
export const { setAuthPageMessage, setUserAuth } = slice.actions;
export const getInitialAuthState = slice.getInitialState;
