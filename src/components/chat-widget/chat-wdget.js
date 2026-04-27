import style from './chat-widget.module.scss';
import { MessageSquare } from 'lucide-react';


export default function ChatWidget() {
    const openChatWidget = () => {
        window.Chatbot?.open();
    };
    return (
        <>
            <button
                onClick={openChatWidget}
                className={`${style.chat_widget} flex gap-2 items-center py-3 px-4 bg-black text-white border custom-border`}
                aria-label="Talk to an expert"
            >
                <MessageSquare className="w-7 h-7 text-white" />
                <span className='text-xl font-semibold'>Chat</span>
            </button>
        </>
    );
}
