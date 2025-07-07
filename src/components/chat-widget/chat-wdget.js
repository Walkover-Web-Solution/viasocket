import style from './chat-widget.module.scss';
import { MdCircle } from 'react-icons/md';
import { IoChatboxEllipsesOutline } from "react-icons/io5";


export default function ChatWidget() {
    const openChatWidget = () => {
        window.chatWidget.open();
    };
    return (
        <>
            <button
                onClick={openChatWidget}
                className={`${style.chat_widget} flex gap-2 items-center py-3 px-4 bg-black text-white border custom-border`}
                aria-label="Talk to an expert"
            >
                <IoChatboxEllipsesOutline color="white" fontSize={28} />
                <span className='text-xl font-semibold'>Chat</span>
            </button>
        </>
    );
}
