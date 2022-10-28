import { createSlice } from '@reduxjs/toolkit';

const initialState = {};

const messageSlice = createSlice({
    name: 'messages',
    initialState,
    reducers: {},
});

// eslint-disable-next-line no-empty-pattern
export const {} = messageSlice.actions;
export default messageSlice.reducer;
