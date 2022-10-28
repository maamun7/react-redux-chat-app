import React from 'react';
import NotFound from '../../ui/NotFound';
import Message from './Message';

export default function Messages({ messages }) {
    let content = null;

    if (!messages || messages?.length === 0) {
        content = <NotFound item="message" />;
    } else {
        content = messages.map((message) => <Message key={message?.id} message={message} />);
    }

    return (
        <div className="flex flex-col col-gap h-screen px-2 py-2 overflow-y-auto">{content}</div>
    );
}
