import React from 'react';
import { useSelector } from 'react-redux';
import { toLocaleTimeString } from '../../../utils/helpers';

export default function Message({ message }) {
    const { message: msgBody, created_by: createdBy, created_at: timestamp } = message;
    const { id } = useSelector((state) => state.auth.user);

    let classes = 'flex-start';

    if (createdBy === id) {
        classes = 'flex-row-reverse self-end';
    }

    return (
        <div className={`flex ${classes} w-fit py-1 px-5 bg-gray-100 m-1 rounded-lg`}>
            <span className="text-gray-800"> {msgBody} </span>
            <span className="font-light text-[11px] mt-5 text-gray-500 lowercase italic">
                {toLocaleTimeString(timestamp)}
            </span>
        </div>
    );
}
