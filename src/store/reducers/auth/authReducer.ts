import { createAsyncThunk, createSlice, isAnyOf, PayloadAction } from '@reduxjs/toolkit';
import firebase from 'firebase/compat';

import { authApi } from 'api';
import { ResetPasswordPayload } from 'api/auth/types';
import { profileApi } from 'api/profile/profileApi';
import { UpdateProfilePayload } from 'api/profile/types';
import { AUTH_PAGE_MESSAGES } from 'enums';
import {
  AuthInitialStateType,
  SignInThunkArg,
  SignUpDataType,
  UpdateProfileReturned,
} from 'store/reducers/auth/types';
import { AlertNotification } from 'types';
import { reduceErrorMessage } from 'utils/reduceErrorMessage';

const adminId = process.env.REACT_APP_FIREBASE_ADMIN_ID;

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
    isAdmin?: boolean;
    authPageMessage: AlertNotification;
  },
  SignInThunkArg,
  { rejectValue: AlertNotification }
>('auth/signIn', async (signInData: SignInThunkArg, { dispatch, rejectWithValue }) => {
  try {
    const user = await authApi.signIn(signInData);

    if (user.emailVerified) {
      const { email, displayName, uid } = user;

      if (signInData.isAuthForAdmin) {
        if (adminId === uid) {
          return {
            email,
            displayName,
            uid,
            isAdmin: true,
            isAuth: true,
            authPageMessage: {
              message: AUTH_PAGE_MESSAGES.LOGGED_IN_SUCCESSFULLY,
              severity: 'success',
            },
          };
        }

        return {
          authPageMessage: {
            message: AUTH_PAGE_MESSAGES.ACCOUNT_NOT_ADMIN,
            severity: 'error',
          },
        };
      }

      return {
        email,
        displayName,
        uid,
        isAdmin: false,
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
});

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

export const updateProfile = createAsyncThunk<
  UpdateProfileReturned,
  UpdateProfilePayload,
  { rejectValue: AlertNotification }
>('auth/updateProfile', async (thunkArk, { rejectWithValue }) => {
  try {
    const photoURL = await profileApi.updateProfile(thunkArk);

    const authPageMessage: AlertNotification = {
      message: AUTH_PAGE_MESSAGES.PROFILE_UPDATED_SUCCESSFULLY,
      severity: 'success',
    };

    return { displayName: thunkArk.displayName, photoURL, authPageMessage };
  } catch (e) {
    const { code } = e as firebase.FirebaseError;

    return rejectWithValue({ message: code, severity: 'error' });
  }
});

export const updateEmail = createAsyncThunk<
  { newEmail: string; authPageMessage: AlertNotification },
  string,
  { rejectValue: AlertNotification }
>('auth/updateEmail', async (newEmail, { rejectWithValue }) => {
  try {
    await profileApi.updateEmail(newEmail);

    return {
      newEmail,
      authPageMessage: {
        message: AUTH_PAGE_MESSAGES.EMAIL_UPDATED_SUCCESSFULLY,
        severity: 'success',
      },
    };
  } catch (e) {
    const { code } = e as firebase.FirebaseError;

    return rejectWithValue({ message: code, severity: 'error' });
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
        photoURL: string | null;
      }>,
    ) {
      const { email, displayName, uid, photoURL } = action.payload;

      state.email = email;
      state.name = displayName;
      state.photoURL = photoURL;
      state.uid = uid;
      state.isAuth = true;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(signIn.fulfilled, (state, { payload }) => {
        const { email, displayName, isAuth, authPageMessage, uid, isAdmin } = payload;

        if (!isAdmin) {
          if (email && displayName !== undefined && isAuth && uid) {
            state.isAuth = isAuth;
            state.email = email;
            state.name = displayName;
            state.uid = uid;
          }
        }
        if (authPageMessage) state.authPageMessage = authPageMessage;
      })
      .addCase(signOut.fulfilled, state => {
        state.isAuth = false;
        state.email = null;
        state.name = null;
      })
      .addCase(updateProfile.fulfilled, (state, { payload }) => {
        const { photoURL, displayName, authPageMessage } = payload;

        if (displayName !== undefined) state.name = displayName;
        if (photoURL !== undefined) state.photoURL = photoURL;
        state.authPageMessage = authPageMessage;
      })
      .addCase(updateEmail.fulfilled, (state, { payload }) => {
        const { newEmail, authPageMessage } = payload;

        state.email = newEmail;
        state.authPageMessage = authPageMessage;
      })
      .addMatcher(
        isAnyOf(
          signUp.pending,
          signIn.pending,
          signOut.pending,
          sendPasswordResetEmail.pending,
          resetPassword.pending,
          verifyEmail.pending,
          updateProfile.pending,
          updateEmail.pending,
        ),
        state => {
          state.status = 'loading';
        },
      );
    builder.addMatcher(
      isAnyOf(
        signUp.fulfilled,
        signIn.fulfilled,
        signOut.fulfilled,
        sendPasswordResetEmail.fulfilled,
        resetPassword.fulfilled,
        verifyEmail.fulfilled,
        updateProfile.fulfilled,
        updateEmail.fulfilled,
      ),
      state => {
        state.status = 'succeeded';
      },
    );
    builder.addMatcher(
      isAnyOf(
        signUp.rejected,
        signIn.rejected,
        signOut.rejected,
        sendPasswordResetEmail.rejected,
        resetPassword.rejected,
        verifyEmail.rejected,
        updateProfile.rejected,
        updateEmail.rejected,
      ),
      (state, { payload }) => {
        state.status = 'failed';
        if (payload) state.authPageMessage = payload;
      },
    );
  },
});

export const authReducer = slice.reducer;
export const { setAuthPageMessage, setUserAuth } = slice.actions;
