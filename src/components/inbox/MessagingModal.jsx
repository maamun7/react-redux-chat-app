/* eslint-disable prettier/prettier */
import { useEffect, useState } from 'react';
import {
	useAddConversationMutation,
	useGetEmailStatusQuery
} from '../../features/conversation/conversationApi';
import { useSendMessageMutation } from '../../features/message/messageApi';
import useGetAuthUser from '../../hooks/useGetAuthUser';
import { getTime, isValidEmail } from '../../utils/helpers';

const MessagingModal = ({ isShowModal, handleModal }) => {
	const { id: userId } = useGetAuthUser();
    const [message, setMessage] = useState('');
    const [email, setEmail] = useState('');
    const [emailCheck, setEmailCheck] = useState(false);
    const [conversationId, setConversationId] = useState('');

    const { data, isSuccess } = useGetEmailStatusQuery(email, {
        skip: !emailCheck,
    });

    const [addConversation, { data: addingData, isSuccess: isAddingSuccess, isLoading }] =
        useAddConversationMutation();

	const [sendMessage, {isLoading: isMsgSendingLoading, isSuccess: isMsgSendingSuccess} ] = useSendMessageMutation();

    useEffect(() => {
        if (data?.conversationId && isSuccess) {
            setConversationId(data?.conversationId);
        } else {
			setConversationId('');
		}

        if (addingData?.conversationId && isAddingSuccess) {
            setConversationId(addingData?.conversationId);
        }

        if (isMsgSendingSuccess) {
			setMessage('');
        }
    }, [data, isSuccess, addingData, isAddingSuccess, isMsgSendingSuccess]);

    const handleSearch = (e) => {
        setEmail(e.target.value);

        if (isValidEmail(email)) {
            setEmailCheck(true);
        }
    };

    const handleAddConversation = (e) => {
        e.preventDefault();
        addConversation({ contactId: data?.userId });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        sendMessage({ userId, conversationId, message, timestamp: getTime() });
    };

    return (
        isShowModal && (
            <>
                <div
                    onClick={handleModal}
                    className="fixed w-full h-full inset-0 z-10 bg-black/50 cursor-pointer"
                />
                <div className="rounded w-[400px] lg:w-[600px] space-y-8 bg-white p-10 absolute top-1/2 left-1/2 z-20 -translate-x-1/2 -translate-y-1/2">
                    <h2 className="text-center text-3xl font-extrabold text-gray-900">
                        Send Message
                    </h2>

                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div className="rounded-md shadow-sm -space-y-px">
							<div className="relative w-full">
								<input
									id="to"
									name="to"
									type="email"
									required
									className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-1 sm:text-sm"
									placeholder="E.g: xyz@example.com"
									onChange={handleSearch}
								/>
								<span className="flex absolute inset-y-0 right-0 items-center pr-3" >
									{isSuccess && !data?.hasUser && (
										<i className="text-red-900 fa-solid fa-triangle-exclamation" />
									)}

									{isSuccess && data?.hasUser && !conversationId && (
										<span className="text-blue-700 cursor-pointer text-sm" onClick={handleAddConversation}> { isLoading ? 'Adding..' : 'Add' } </span>
									)}

									{isSuccess && data?.hasUser && conversationId && (
										<i className="text-blue-500 fa-solid fa-check" />
									)}
								</span>
                            </div>
                            <div>
                                <label htmlFor="message" className="sr-only">
                                    Message
                                </label>
                                <textarea
                                    id="message"
                                    name="message"
                                    type="text"
                                    required
                                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                                    placeholder="Message"
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                />
                            </div>
                        </div>

                        <div>
                            <button
								disabled={!conversationId || !message}
                                type="submit"
                                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            >
                              {isMsgSendingLoading ? 'Sending Message...' : 'Send Message'}
                            </button>
                        </div>

                        {/* <Error message="There was an error" /> */}
                    </form>
                </div>
            </>
        )
    );
};

export default MessagingModal;
