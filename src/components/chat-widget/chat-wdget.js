import style from './chat-widget.module.scss';
import { MdCircle } from 'react-icons/md';

export default function ChatWidget() {
    const openChatWidget = () => {
        window.chatWidget.open();
    };
    return (
        <>
            <button
                onClick={openChatWidget}
                className={`${style.chat_widget} flex gap-1 items-center h6 px-4 py-2 bg-black text-white`}
                aria-label="Talk to an expert"
            >
                <MdCircle color="green" fontSize={12} /> Chat
            </button>
        </>
    );
}
