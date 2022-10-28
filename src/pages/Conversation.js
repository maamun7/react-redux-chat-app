import React from 'react';
import Blank from '../components/inbox/Blank';
import Sidebar from '../components/inbox/Sidebar';

export default function Conversation() {
    return (
        <div className="flex items-center justify-start w-full">
            <Sidebar />
            <Blank />
        </div>
    );
}
