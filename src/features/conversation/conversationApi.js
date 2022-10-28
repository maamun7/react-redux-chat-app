import { toLocaleTimeString } from '../../utils/helpers';
import socket from '../../utils/socket';
import { apiSlice } from '../api/apiSlice';

export const conversationApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getConversations: builder.query({
            query: () => '/conversations',
            providesTags: ['Conversations'],
            async onCacheEntryAdded(arg, { updateCachedData, cacheDataLoaded, cacheEntryRemoved }) {
                try {
                    await cacheDataLoaded;
                    socket.on('new:messages', (data) => {
                        updateCachedData((draft) => {
                            const draftConversation = draft.find(
                                // eslint-disable-next-line eqeqeq
                                (c) => c.conversationId == data?.conversationId
                            );

                            draftConversation.lastText = data?.message;
                            draftConversation.timestamp = toLocaleTimeString(data?.createdAt);
                        });
                    });
                } catch (error) {
                    console.log('Error : ', error);
                }

                await cacheEntryRemoved;
                socket.close();
            },
        }),
        getEmailStatus: builder.query({
            query: (email) => `/conversations/email-status/${email}`,
        }),
        addConversation: builder.mutation({
            query: (data) => ({
                url: 'conversations/add',
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['Conversations'],
        }),
    }),
});

export const { useGetConversationsQuery, useGetEmailStatusQuery, useAddConversationMutation } =
    conversationApi;
