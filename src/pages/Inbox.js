import ChatBody from '../components/inbox/chatBody/ChatBody';
import RightSideBar from '../components/inbox/RightSideBar';
import Sidebar from '../components/inbox/Sidebar';

const Inbox = () => (
    <div className="flex items-center justify-start w-full">
        <Sidebar />
        <ChatBody />
        <RightSideBar />
    </div>
);

export default Inbox;
