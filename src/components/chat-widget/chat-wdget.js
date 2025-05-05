import { useState } from 'react';
import style from './chat-widget.module.scss';
import { MdCircle } from 'react-icons/md';
import Support from './support';

export default function ChatWidget() {
    const [launcher, setLauncher] = useState(false);
    // const toggleChatWidget = () => {
    //     if (launcher) {
    //         window.chatWidget.close();
    //     } else {
    //         window.chatWidget.open();
    //     }
    //     setLauncher(!launcher);
    // };
    const [anchorEl, setAnchorEl] = useState(null)
    const open = Boolean(anchorEl)
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }
    return (
        <>
            <button
                onClick={handleClick}
                className={`${style.chat_widget} btn btn-lg btn-primary `}
                aria-label="Talk to an expert"
            >
                <MdCircle color="#dc3545" fontSize={12} /> Support
            </button>
            <Support open={open} onClose={handleClose} />
        </>
    );
}
