import { toLocaleTimeString } from '../../utils/helpers';
import socket from '../../utils/socket';
import { apiSlice } from '../api/apiSlice';

export const messageApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getMessages: builder.query({
            query: (conversationId) => `/messages/${conversationId}`,
            async onCacheEntryAdded(
                conversationId,
                { updateCachedData, cacheDataLoaded, cacheEntryRemoved }
            ) {
                try {
                    await cacheDataLoaded;
                    socket.on('new:messages', (data) => {
                        updateCachedData((draft) => {
                            if (
                                // eslint-disable-next-line eqeqeq
                                conversationId == draft?.conversation_id &&
                                // eslint-disable-next-line eqeqeq
                                draft?.contact_id != data?.recipientId
                            ) {
                                const messages = draft?.messages || [];
                                messages?.push({
                                    is_edited: false,
                                    is_deleted: false,
                                    id: data?.messageId,
                                    message: data?.message,
                                    created_at: data?.createdAt,
                                    created_by: data?.createdBy,
                                });
                            }
                        });
                    });
                } catch (error) {
                    console.log('Error : ', error);
                }

                await cacheEntryRemoved;
                socket.close();
            },
        }),
        sendMessage: builder.mutation({
            query: (data) => ({
                url: `messages/add`,
                method: 'POST',
                body: data,
            }),
            async onQueryStarted(
                { conversationId, message, userId, timestamp },
                { dispatch, queryFulfilled }
            ) {
                const patchResult = dispatch(
                    apiSlice.util.updateQueryData('getMessages', conversationId, (draft) => {
                        const payload = {
                            conversation_id: conversationId,
                            created_at: timestamp,
                            created_by: userId,
                            is_deleted: false,
                            is_edited: false,
                            id: timestamp,
                            message,
                            recipients: [],
                        };
                        draft?.messages?.push(payload);
                    })
                );

                const patchResult2 = dispatch(
                    apiSlice.util.updateQueryData('getConversations', undefined, (draft) => {
                        const draftConversation = draft.find(
                            // eslint-disable-next-line eqeqeq
                            (c) => c.conversationId == conversationId
                        );

                        draftConversation.lastText = message;
                        draftConversation.timestamp = toLocaleTimeString(timestamp);
                    })
                );

                try {
                    await queryFulfilled;
                } catch (err) {
                    patchResult.undo();
                    patchResult2.undo();
                }
            },
        }),
    }),
});

export const { useGetMessagesQuery, useSendMessageMutation } = messageApi;
