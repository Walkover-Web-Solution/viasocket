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
                className={`${style.chat_widget} btn btn-lg btn-primary `}
                aria-label="Talk to an expert"
            >
                <MdCircle color="#dc3545" fontSize={12} /> Support
            </button>
        </>
    );
}
