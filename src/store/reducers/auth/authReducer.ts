import { createSlice } from '@reduxjs/toolkit';

import { AuthInitialStateType } from 'store/reducers/auth/types';

const slice = createSlice({
  name: 'auth',
  initialState: {
    isAuth: false,
    email: '',
    name: '',
  } as AuthInitialStateType,
  reducers: {},
});

export const authReducer = slice.reducer;
