import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { userLoggedOut } from '../auth/authSlice';

const baseQuery = fetchBaseQuery({
    baseUrl: process.env.REACT_APP_API_URL,
    prepareHeaders: async (headers, { getState }) => {
        const token = getState()?.auth?.accessToken;

        if (token) {
            headers.set('Authorization', `Bearer ${token}`);
        }

        return headers;
    },
});

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: async (args, api, extraOptions) => {
        const response = await baseQuery(args, api, extraOptions);

        if (response?.error && response?.error?.status === 401) {
            api.dispatch(userLoggedOut());
            localStorage.clear();
        }

        return response;
    },
    tagTypes: ['Conversations'],
    // eslint-disable-next-line no-unused-vars
    endpoints: (builder) => ({}),
});
