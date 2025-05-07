import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';

export const CustomAutocomplete = ({
    items = [],
    value = '',
    onChange = () => {},
    onSelect = () => {},
    placeholder = 'Select Country',
    defaultCountry = null,
    renderItem = null,
}) => {
    const [inputValue, setInputValue] = useState(value);
    const [isOpen, setIsOpen] = useState(false);
    const [highlightedIndex, setHighlightedIndex] = useState(-1);
    const [selectedFlag, setSelectedFlag] = useState('');
    const wrapperRef = useRef(null);

    useEffect(() => {
        if (defaultCountry && items.length > 0) {
            const countryName = defaultCountry.country;
            setInputValue(countryName);
            setSelectedFlag(defaultCountry.img);
            onSelect(countryName, defaultCountry);
        }
    }, [defaultCountry]);

    useEffect(() => {
        if (value !== inputValue) {
            setInputValue(value);
        }
    }, [value]);

    useEffect(() => {
        function handleClickOutside(event) {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleKeyDown = (e) => {
        if (!isOpen) return;

        switch (e.key) {
            case 'ArrowDown':
                e.preventDefault();
                setHighlightedIndex((prev) => (prev < items.length - 1 ? prev + 1 : prev));
                break;
            case 'ArrowUp':
                e.preventDefault();
                setHighlightedIndex((prev) => (prev > 0 ? prev - 1 : 0));
                break;
            case 'Enter':
                e.preventDefault();
                if (highlightedIndex >= 0 && items[highlightedIndex]) {
                    handleSelect(items[highlightedIndex]);
                }
                break;
            case 'Escape':
                e.preventDefault();
                setIsOpen(false);
                break;
            default:
                break;
        }
    };

    const handleInputChange = (e) => {
        const newValue = e.target.value;
        setInputValue(newValue);
        onChange(e);
        setIsOpen(true);
        setHighlightedIndex(-1);
        if (newValue === '') {
            setSelectedFlag('');
            onSelect('', null);
        }
    };

    const handleSelect = (item) => {
        const itemValue = item.country;
        setInputValue(itemValue);
        setSelectedFlag(item?.img);
        onSelect(itemValue, item);
        setIsOpen(false);
    };

    const defaultRenderItem = (item, isHighlighted) => (
        <div
            className={`px-2 py-1 cursor-pointer flex items-center gap-2 ${isHighlighted ? 'bg-secondary' : ''}`}
            onClick={() => handleSelect(item)}
        >
            <Image src={item?.img || 'http:placehold.co/20x20'} width={16} height={16} alt={`${item?.country} flag`} />
            {item?.country}
        </div>
    );

    return (
        <div className="relative" ref={wrapperRef}>
            <div className="relative w-full h-full">
                <div className="absolute left-2 top-1/2 -translate-y-1/2 flex items-center pointer-events-none">
                    {selectedFlag && <img src={selectedFlag} alt={''} className="w-5 h-5" />}
                </div>
                <input
                    type="text"
                    value={inputValue}
                    onChange={handleInputChange}
                    onFocus={() => setIsOpen(true)}
                    onKeyDown={handleKeyDown}
                    placeholder={placeholder}
                    className="w-full h-full p-2 pl-8 bg-transparent border transparent-border-black"
                />
            </div>
            {isOpen && items.length > 0 && (
                <div className="absolute z-10 w-full mt-1 bg-white border transparent-border-black rounded shadow-lg max-h-60 overflow-auto">
                    {items.map((item, index) => (
                        <div
                            key={index}
                            className={`cursor-pointer ${
                                highlightedIndex === index ? 'bg-secondary' : 'hover:bg-gray-100'
                            }`}
                            onMouseEnter={() => setHighlightedIndex(index)}
                        >
                            {renderItem
                                ? renderItem(item, highlightedIndex === index)
                                : defaultRenderItem(item, highlightedIndex === index)}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};
