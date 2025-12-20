import React, { useState } from 'react';

const GridBackground = ({ children, gridSize = 20, gridColor = '#f0f0f0' }) => {
    const [hoverPosition, setHoverPosition] = useState({ row: null, col: null });
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e) => {
        const x = e.clientX;
        const y = e.clientY;
        const colIndex = Math.floor(x / gridSize);
        const rowIndex = Math.floor(y / gridSize);
        setHoverPosition({ row: rowIndex + 1, col: colIndex + 1 });
        setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseLeave = () => {
        setHoverPosition({ row: null, col: null });
    };

    return (
        <div
            style={{
                backgroundImage: `linear-gradient(to right, ${gridColor} 1px, transparent 1px), linear-gradient(to bottom, ${gridColor} 1px, transparent 1px)`,
                backgroundSize: `${gridSize}px ${gridSize}px, ${gridSize}px ${gridSize}px`,
                backgroundAttachment: 'fixed',
                backgroundRepeat: 'repeat, repeat',
                backgroundPosition: '0 0, 0 0',
                position: 'relative',
            }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
        >
            {children}

            {/* Hover position indicators */}
            {hoverPosition.row !== null && hoverPosition.col !== null && (
                <>
                    {/* Fixed indicator at bottom right */}
                    <div className="fixed bottom-4 right-4 bg-white shadow-lg rounded-lg py-2 px-4 border border-accent/20 z-50">
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-accent"></div>
                            <span className="font-mono font-medium">
                                Row: {hoverPosition.row} | Column: {hoverPosition.col}
                            </span>
                        </div>
                    </div>
                    
                    {/* Floating indicator that follows cursor */}
                    <div 
                        className="fixed z-50 pointer-events-none" 
                        style={{
                            left: mousePosition.x + 20 + 'px',
                            top: mousePosition.y + 20 + 'px',
                            transform: 'translate(-50%, -50%)',
                        }}
                    >
                        <div className="bg-accent text-white text-xs font-bold py-1 px-2 rounded shadow-lg">
                            R{hoverPosition.row}:C{hoverPosition.col}
                        </div>
                    </div>
                    
                    {/* Highlight current cell */}
                    <div 
                        className="fixed z-40 pointer-events-none border-2 border-accent/50 bg-accent/10" 
                        style={{
                            left: Math.floor(mousePosition.x / gridSize) * gridSize + 'px',
                            top: Math.floor(mousePosition.y / gridSize) * gridSize + 'px',
                            width: `${gridSize}px`,
                            height: `${gridSize}px`
                        }}
                    ></div>
                </>
            )}
        </div>
    );
};

export default GridBackground;
