import React from 'react';
import { useParams } from 'react-router-dom';
import { useGetMessagesQuery } from '../../../features/message/messageApi';
import Error from '../../ui/Error';
import Loading from '../../ui/Loading';
import ChatHead from './ChatHead';
import Compose from './Compose';
import Messages from './Messages';

export default function ChatBody() {
    const { id: conversationId } = useParams();
    const { data, isLoading, isSuccess, isError } = useGetMessagesQuery(conversationId);

    let content = null;

    if (isLoading) {
        content = <Loading />;
    }

    if (!isLoading && isError) {
        content = <Error message="There is something wrong" />;
    }

    if (!isLoading && isSuccess && !isError) {
        content = (
            <>
                <ChatHead friend={data?.contact} />
                <Messages messages={data?.messages} />
                <Compose conversationId={data?.conversation_id} />
            </>
        );
    }

    return <div className="w-2/4 flex flex-col h-screen">{content}</div>;
}
