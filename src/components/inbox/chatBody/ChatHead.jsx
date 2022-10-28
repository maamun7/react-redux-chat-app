import React from 'react';

export default function ChatHead({ friend }) {
    const { name, avatar } = friend || {};

    return (
        <div className="flex items-center flex-start p-3 h-auto bg-gray-200 space-x-4">
            {avatar ? (
                <img
                    className="w-10 h-10 rounded-full ring-2 ring-blue-500 ring-offset-1 hover:ring-blue-700"
                    src={avatar}
                    alt={name}
                />
            ) : (
                <i className="fa fa-user-circle text-4xl text-gray-300" />
            )}
            <div className="flex items-center text-start">
                <span className=" text-blue-700 text-md font-bold hover:text-blue-900">{name}</span>
            </div>
        </div>
    );
}
