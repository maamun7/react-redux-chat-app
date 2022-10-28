import React from 'react';
import { Link } from 'react-router-dom';
import { getShortenText } from '../../utils/helpers';

export default function Friend({ conversation }) {
    const { conversationId, name, avatar, lastText, timestamp } = conversation || {};

    return (
        <Link to={`/inbox/${conversationId}`}>
            <div className="flex items-center">
                <div className="flex items-center flex-start w-full hover:bg-gray-200">
                    {avatar ? (
                        <div className="px-3">
                            <img
                                src={avatar}
                                alt={name}
                                className="w-[55px] h-[55px] rounded-full ring-2 ring-blue-500 ring-offset-1 hover:ring-blue-700"
                            />
                        </div>
                    ) : (
                        <i className="fa fa-user-circle text-6xl text-gray-300 px-3" />
                    )}
                    <div className="flex-grow flex-col items-center border-solid space-y-1 border-b-[1px] border-gray-200  py-3 pr-3">
                        <div className="flex-grow flex items-center justify-between">
                            <span className="text-lg font-medium"> {name} </span>
                            <span className="text-sm italic lowercase"> {timestamp} </span>
                        </div>
                        <div className="flex-grow flex items-center justify-between">
                            <span className="text-sm italic"> {getShortenText(lastText)} </span>
                            <i className="fa fa-angle-down text-sm" />
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
}
