import { apiSlice } from '../api/apiSlice';
import { userLoggedIn } from '../auth/authSlice';

export const userApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        uploadImage: builder.mutation({
            query: (data) => ({
                url: `users/profile-image`,
                method: 'PUT',
                body: data,
            }),
            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                try {
                    const result = await queryFulfilled;
                    const authData = JSON.parse(localStorage.getItem('auth'));

                    if (result?.data?.avatar) {
                        authData.user.avatar = result.data.avatar;
                    }

                    localStorage.setItem('auth', JSON.stringify(authData));
                    dispatch(userLoggedIn(authData));
                } catch (err) {
                    console.log('Register Error : ', err);
                }
            },
        }),
    }),
});

export const { useUploadImageMutation } = userApi;
