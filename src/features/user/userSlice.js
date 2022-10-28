import { createSlice } from '@reduxjs/toolkit';

const initialState = {};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
});

// eslint-disable-next-line no-empty-pattern
export const {} = userSlice.actions;
export default userSlice.reducer;
