import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import avatarImg from '../../assets/avatar.jpg';
import { userLoggedOut } from '../../features/auth/authSlice';
import useGetAuthUser from '../../hooks/useGetAuthUser';
import ConversationSearch from './ConversationSearch';
import Friends from './Friends';
import MessagingModal from './MessagingModal';

export default function Sidebar() {
    const { email, avatar } = useGetAuthUser();
    const [isShowModal, setIsShowModal] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {
        user: { name },
    } = useSelector((state) => state.auth);

    const handleLogout = () => {
        dispatch(userLoggedOut());
        localStorage.clear();
        navigate('/login');
    };

    const handleModal = () => {
        setIsShowModal((prevState) => !prevState);
    };

    return (
        <div className="w-1/4 h-screen flex flex-col border-r-[1px] border-gray-300">
            {/* Left Header  */}
            <div className="flex items-center justify-between p-3 pr-2 h-auto bg-gray-200">
                <Link to="/" className="flex flex-start flex-row items-center space-x-2">
                    <img
                        className="w-10 h-10 rounded-full ring-2 ring-blue-500 ring-offset-1 hover:ring-blue-700"
                        src={avatar || avatarImg}
                        alt="avatar"
                    />
                    <span className="text-lg font-medium"> {name} </span>
                </Link>
                <div className="flex items-center space-x-5 text-black">
                    <span onClick={() => setIsShowModal(true)}>
                        <i className="fa-solid fa-comment-dots text-xl cursor-pointer" />
                    </span>

                    <button className="relative flex justify-center items-center group">
                        <span>
                            <i className="fa-solid fa-ellipsis-vertical text-xl cursor-pointer" />
                        </span>

                        <div className="absolute right-0 hidden group-focus:block top-full min-w-full w-max bg-white shadow-md mt-1 rounded">
                            <ul className="text-left border rounded">
                                <li>
                                    <span className="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap hover:bg-gray-100 bg-transparent text-gray-700">
                                        Singed in as <br />
                                        {email}
                                    </span>
                                </li>

                                <li>
                                    <span className="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap hover:bg-gray-100 border-b bg-transparent text-gray-700 hover:bg-gray-100">
                                        Settings
                                    </span>
                                </li>

                                <li>
                                    <span
                                        onClick={handleLogout}
                                        className="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap  hover:bg-gray-100 border-b bg-transparent text-gray-700 hover:bg-gray-100"
                                    >
                                        Logout
                                    </span>
                                </li>
                            </ul>
                        </div>
                    </button>
                </div>
            </div>
            <ConversationSearch />
            <hr />
            <Friends />
            <MessagingModal isShowModal={isShowModal} handleModal={handleModal} />
        </div>
    );
}
