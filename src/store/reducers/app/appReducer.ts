import { createSlice } from '@reduxjs/toolkit';

import { AppInitialStateType } from 'store/reducers/app/types';

const slice = createSlice({
  name: 'app',
  initialState: {
    isInitialized: false,
    appMessage: null,
    status: 'idle',
  } as AppInitialStateType,
  reducers: {
    initializeApp(state) {
      state.isInitialized = true;
    },
  },
});

export const appReducer = slice.reducer;
export const { initializeApp } = slice.actions;
export const getInitialAppState = slice.getInitialState;
