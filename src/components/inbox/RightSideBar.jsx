import React from 'react';
import ProfileImage from '../profile/ProfileImage';

export default function RightSideBar() {
    return (
        <div className="w-1/4 border-solid border-l-[1px] border-gray-300 h-screen">
            <div className="flex items-center p-3 pr-1 h-auto bg-gray-200 leading-10">&nbsp;</div>
            <div className="w-full">
                <ProfileImage />
            </div>
        </div>
    );
}
