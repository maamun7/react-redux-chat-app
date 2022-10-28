import React from 'react';
import { useGetConversationsQuery } from '../../features/conversation/conversationApi';
import Error from '../ui/Error';
import Loading from '../ui/Loading';
import NotFound from '../ui/NotFound';
import Friend from './Friend';

export default function Friends() {
    const { data: conversations, isLoading, isError, error } = useGetConversationsQuery();

    let content = null;

    if (isLoading) {
        content = <Loading />;
    } else if (!isLoading && isError) {
        content = <Error message={error?.data} />;
    } else if (!isLoading && !isError && conversations?.length === 0) {
        content = <NotFound item="friend" />;
    } else if (!isLoading && !isError && conversations?.length > 0) {
        content = conversations.map((conversation) => (
            <Friend key={conversation.conversationId} conversation={conversation} />
        ));
    }

    return <div className="flex flex-col">{content}</div>;
}
