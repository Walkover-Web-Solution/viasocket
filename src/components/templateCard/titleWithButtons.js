import { useEffect, useRef, useState } from 'react';
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';

export default function TitleWithButtons({ title, onInstall, onPrev, onNext }) {
    const [firstLine, setFirstLine] = useState('');
    const [secondLine, setSecondLine] = useState('');
    const measureRef = useRef(null);

    useEffect(() => {
        if (!title || !measureRef.current) return;

        const cleanTitle = title.replace(/^Automate[d]?\s*/i, '');
        const fullTitle = `Automate ${cleanTitle}`;

        const measurer = document.createElement('div');
        measurer.style.position = 'absolute';
        measurer.style.visibility = 'hidden';
        measurer.style.whiteSpace = 'nowrap';
        measurer.className = measureRef.current.className;
        document.body.appendChild(measurer);

        const containerWidth = measureRef.current.offsetWidth;
        const buttonWidth = 250;
        const availableSecondLineWidth = containerWidth - buttonWidth;

        let firstLineChars = 0;
        for (let i = 1; i <= fullTitle.length; i++) {
            measurer.textContent = fullTitle.substring(0, i);
            if (measurer.offsetWidth > containerWidth) {
                firstLineChars = i - 1;
                break;
            }
        }

        if (firstLineChars === 0 || firstLineChars >= fullTitle.length) {
            setFirstLine(fullTitle);
            setSecondLine('');
        } else {
            let breakPoint = firstLineChars;
            while (breakPoint > 0 && fullTitle[breakPoint] !== ' ') {
                breakPoint--;
            }

            if (breakPoint === 0) breakPoint = firstLineChars;

            const firstPart = fullTitle.substring(0, breakPoint);
            let secondPart = fullTitle.substring(breakPoint).trim();

            measurer.textContent = secondPart;
            if (measurer.offsetWidth > availableSecondLineWidth) {
                while (secondPart.length > 0) {
                    measurer.textContent = secondPart + '...';
                    if (measurer.offsetWidth <= availableSecondLineWidth) {
                        secondPart = secondPart + '...';
                        break;
                    }
                    secondPart = secondPart.slice(0, -1);
                }
            }

            setFirstLine(firstPart);
            setSecondLine(secondPart);
        }

        document.body.removeChild(measurer);
    }, [title]);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkWidth = () => setIsMobile(window.innerWidth < 769);
        checkWidth(); // Initial check
        window.addEventListener('resize', checkWidth);
        return () => window.removeEventListener('resize', checkWidth);
    }, []);

    return isMobile ? (
        <div className="cont gap-1">
            <h1 className="h1 line-clamp-2">{title}</h1>
            <div className="flex gap-2">
                <button onClick={onInstall} className="btn btn-accent">
                    Install
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
        <div ref={measureRef} className="h1">
            <div>
                <span className="text-accent">Automate</span> {firstLine.replace(/^Automate\s*/i, '')}
            </div>
            {secondLine && (
                <div className="flex justify-between items-center">
                    <span>{secondLine}</span>
                    <div className="flex gap-2">
                        <button onClick={onInstall} className="btn btn-accent">
                            Install
                        </button>
                        <button onClick={onPrev} className="btn btn-outline bg-white">
                            <MdKeyboardArrowLeft size={32} />
                        </button>
                        <button onClick={onNext} className="btn btn-outline bg-white">
                            <MdKeyboardArrowRight size={32} />
                        </button>
                    </div>
                </div>
            )}
            {!secondLine && (
                <div className="flex justify-end gap-2 mt-2">
                    <button onClick={onInstall} className="btn btn-accent">
                        Install
                    </button>
                    <button onClick={onPrev} className="btn btn-outline bg-white">
                        <MdKeyboardArrowLeft size={32} />
                    </button>
                    <button onClick={onNext} className="btn btn-outline bg-white">
                        <MdKeyboardArrowRight size={32} />
                    </button>
                </div>
            )}
        </div>
    );
}
