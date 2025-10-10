import { useEffect, useState } from 'react';
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';

export default function TitleWithButtons({ title, onInstall, onPrev, onNext }) {
    const [firstLine, setFirstLine] = useState('');
    useEffect(() => {
        if (!title) return;
        const cleanTitle = title.replace(/^Automate[d]?\s*/i, '');
        setFirstLine(cleanTitle);
    }, [title]);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkWidth = () => setIsMobile(window.innerWidth < 769);
        checkWidth(); // Initial check
        window.addEventListener('resize', checkWidth);
        return () => window.removeEventListener('resize', checkWidth);
    }, []);

    return isMobile ? (
        <div className="cont gap-1 flex items-start lg:justify-between flex-col gap-6">
            <h1 className="h1 line-clamp-2">{title}</h1>
            <div className="flex gap-2">
                <button onClick={onInstall} className="btn btn-accent">
                    Install Template
                </button>
                <button onClick={onPrev} className="btn btn-outline bg-white">
                    <MdKeyboardArrowLeft size={32} />
                </button>
                <button onClick={onNext} className="btn btn-outline bg-white">
                    <MdKeyboardArrowRight size={32} />
                </button>
            </div>
        </div>
    ) : (
        <div className="h1 flex items-start lg:justify-between flex-col gap-6 h-full">
            <div className="automations-title">
                <span className="text-accent">Automate</span> {firstLine}
            </div>
            <div className="flex justify-end gap-2 mt-2">
                <button onClick={onInstall} className="btn btn-accent">
                    Install Template
                </button>
                <button onClick={onPrev} className="btn btn-outline bg-white">
                    <MdKeyboardArrowLeft size={32} />
                </button>
                <button onClick={onNext} className="btn btn-outline bg-white">
                    <MdKeyboardArrowRight size={32} />
                </button>
            </div>
        </div>
    );
}
