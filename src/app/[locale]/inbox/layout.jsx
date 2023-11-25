import ChatSideBar from "@/components/chat/chatSideBar/ChatSideBar";

export default function Layout({ children }) {
    return (
        <div className='h-screen flex'>
            <ChatSideBar />

            {children}
        </div>
    );
}
