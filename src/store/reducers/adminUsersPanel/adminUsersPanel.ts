import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'adminUsers',
  initialState: {
    users: [],
  },
  reducers: {},
});

export const adminUsersReducer = slice.reducer;
