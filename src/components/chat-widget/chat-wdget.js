import { useState } from 'react';
import style from './chat-widget.module.scss';
import { MdCircle } from 'react-icons/md';
import Support from './support';

export default function ChatWidget() {
    // const [anchorEl, setAnchorEl] = useState(null);
    // const open = Boolean(anchorEl);
    // const handleClick = (event) => {
    //     setAnchorEl(event.currentTarget);
    // };
    // const handleClose = () => {
    //     setAnchorEl(null);
    // };
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
            {/* <Support open={open} onClose={handleClose} /> */}
        </>
    );
}
