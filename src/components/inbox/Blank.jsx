import React from 'react';
import blankImg from '../../assets/blankMessage.png';

export default function Blank() {
    return (
        <div className="w-3/4 flex flex-col h-screen bg-white border-b-8 border-indigo-500">
            <div className="flex h-screen justify-center items-center p-2">
                <div className="text-center">
                    <img src={blankImg} alt="Blank Message" />
                </div>
            </div>
        </div>
    );
}
