import React, { useEffect, useState } from 'react';
import { useSendMessageMutation } from '../../../features/message/messageApi';
import useGetAuthUser from '../../../hooks/useGetAuthUser';
import { getTime } from '../../../utils/helpers';

export default function Compose({ conversationId }) {
    const { id: userId } = useGetAuthUser();
    const [message, setMessage] = useState('');
    const [sendMessage, { data, isSuccess }] = useSendMessageMutation();

    useEffect(() => {
        if (isSuccess && data?.messageId) {
            setMessage('');
        }
    }, [data, isSuccess]);

    const handleSubmit = (e) => {
        e.preventDefault();
        sendMessage({ userId, conversationId, message, timestamp: getTime() });
    };

    return (
        <div className="px-5 py-2 bg-gray-300 border-t-[1px] border-gray-300">
            <div>
                <form
                    onSubmit={handleSubmit}
                    className="flex flex-start items-center justify-between h-auto"
                >
                    <input
                        className="flex-grow border-[1px] bg-gray-100 border-gray-300 font-medium h-8 text-1xl rounded-lg py-1 px-3 my-1 focus:outline-none focus:border-none focus:ring-0"
                        type="text"
                        onChange={(e) => setMessage(e.target.value)}
                        name="message"
                        value={message}
                        autoComplete="off"
                    />

                    <button type="button" className="ml-2">
                        <i className="fa-sharp fa-solid fa-circle-arrow-right text-3xl text-indigo-900" />
                    </button>
                </form>
            </div>
        </div>
    );
}
