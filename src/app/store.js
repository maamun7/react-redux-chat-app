import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from '../features/api/apiSlice';
import authSliceReducer from '../features/auth/authSlice';
import conversationsSliceReducer from '../features/conversation/conversationsSlice';
import messageSliceReducer from '../features/message/messageSlice';
import userSliceReducer from '../features/user/userSlice';

export const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        auth: authSliceReducer,
        user: userSliceReducer,
        conversations: conversationsSliceReducer,
        messages: messageSliceReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
});
