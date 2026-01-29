import { FiMinus } from 'react-icons/fi';
import { FiPlus } from 'react-icons/fi';
import { MdCenterFocusStrong } from 'react-icons/md';
import { useEffect, useState } from 'react';

const ZoomableFlowContainer = ({ setScale, contentRef, flowContainerRef, flowRendererHeight, setFlowRendererHeight, template, positionX, positionY }) => {
    const [isWheelZoomEnabled, setIsWheelZoomEnabled] = useState(false);

    useEffect(() => {
        if (contentRef.current) {
            setFlowRendererHeight(`${contentRef.current.offsetHeight}px`);
        }

        const handleWheel = (e) => {
            if (!isWheelZoomEnabled) return;
            e.preventDefault();
            const delta = e.deltaY > 0 ? -0.05 : 0.05;
            setScale((prev) => Math.min(Math.max(prev + delta, 0.1), 3));
        };

        const handleClick = () => {
            setIsWheelZoomEnabled(true);
        };

        const flowContainer = flowContainerRef.current;
        flowContainer?.addEventListener('wheel', handleWheel, { passive: false });
        flowContainer?.addEventListener('click', handleClick);

        return () => {
            flowContainer?.removeEventListener('wheel', handleWheel);
            flowContainer?.removeEventListener('click', handleClick);
        };
    }, [template, flowRendererHeight, isWheelZoomEnabled]);

    const zoomIn = () => setScale((prev) => Math.min(prev + 0.1, 3));
    const zoomOut = () => setScale((prev) => Math.max(prev - 0.1, 0.1));
    const resetZoom = () => setScale(1);

    return (
        <div className={`absolute ${positionX} ${positionY} flex z-10`}>
            <button onClick={zoomIn} className="px-2 py-1 text-xl">
                <FiPlus />
            </button>
            <button onClick={zoomOut} className="px-2 py-1 text-xl">
                <FiMinus />
            </button>
            <button onClick={resetZoom} className="px-2 py-1 text-xl">
                <MdCenterFocusStrong />
            </button>
        </div>
    )
}

export default ZoomableFlowContainer;