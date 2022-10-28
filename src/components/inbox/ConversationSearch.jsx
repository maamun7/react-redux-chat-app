import React, { useState } from 'react';

export default function ConversationSearch() {
    const [isActiveSearch, setIsActiveSearch] = useState(false);
    const [searchText, setSearchText] = useState('');

    const handleOnClick = () => {
        setIsActiveSearch(true);
    };

    const handleKeyUp = () => {
        if (searchText) {
            setIsActiveSearch(true);
        } else {
            setIsActiveSearch(false);
        }
    };

    return (
        <div className="w-full flex items-center bg-white py-2 px-3 space-x-2">
            <div className="flex flex-auto rounded-md items-center bg-gray-200 py-2 px-4 border-[1px] border-gray-300">
                {isActiveSearch ? (
                    <i className="fa-solid fa-arrow-left" />
                ) : (
                    <i className="fa-solid fa-search" />
                )}

                <input
                    onClick={handleOnClick}
                    onKeyUp={handleKeyUp}
                    onChange={(e) => setSearchText(e.target.value)}
                    type="text"
                    value={searchText}
                    className="flex-auto w-20 text-gray-700 bg-gray-200 focus:outline-none focus:border-none focus:ring-0 ml-2 h-5"
                />
            </div>
            <div>
                <i className="fa-solid fa-bars" />
            </div>
        </div>
    );
}
