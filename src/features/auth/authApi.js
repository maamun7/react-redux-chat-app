import { apiSlice } from '../api/apiSlice';
import { userLoggedIn } from './authSlice';

export const authApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        register: builder.mutation({
            query: (data) => ({
                url: 'auth/register',
                method: 'POST',
                body: data,
            }),
        }),
        login: builder.mutation({
            query: (data) => ({
                url: 'auth/login',
                method: 'POST',
                body: data,
            }),
            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                try {
                    const result = await queryFulfilled;

                    const payload = {
                        accessToken: result?.data?.tokenHash,
                        user: result?.data?.user,
                    };

                    localStorage.setItem('auth', JSON.stringify(payload));

                    dispatch(userLoggedIn(payload));
                } catch (err) {
                    console.log('Register Error : ', err);
                }
            },
        }),
    }),
});

export const { useRegisterMutation, useLoginMutation } = authApi;
