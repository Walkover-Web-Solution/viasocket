import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';

export const CustomAutocomplete = ({
    items = [],
    value = '',
    onChange = () => {},
    onSelect = () => {},
    placeholder = 'Select Country',
    renderItem = null,
    getItemValue = (item) => item?.name?.common,
    defaultCountry = null, // Can be a string (country name) or an object
}) => {
    const [inputValue, setInputValue] = useState(value);
    const [isOpen, setIsOpen] = useState(false);
    const [highlightedIndex, setHighlightedIndex] = useState(-1);
    const [selectedFlag, setSelectedFlag] = useState('');
    const wrapperRef = useRef(null);
    const defaultApplied = useRef(false);

    useEffect(() => {
        if (defaultCountry && !defaultApplied.current && items.length > 0) {
            if (typeof defaultCountry === 'string') {
                const foundCountry = items.find(
                    (item) =>
                        getItemValue(item)?.toLowerCase() === defaultCountry.toLowerCase() ||
                        item?.name?.common?.toLowerCase() === defaultCountry.toLowerCase()
                );

                if (foundCountry) {
                    const countryName = getItemValue(foundCountry);
                    setInputValue(countryName);
                    setSelectedFlag(foundCountry?.flags?.svg);
                    onSelect(countryName, foundCountry);
                    defaultApplied.current = true;
                }
            } else {
                const countryName = getItemValue(defaultCountry);
                setInputValue(countryName);
                setSelectedFlag(defaultCountry?.flags?.svg);
                onSelect(countryName, defaultCountry);
                defaultApplied.current = true;
            }
        }
    }, [defaultCountry, items, getItemValue, onSelect]);

    useEffect(() => {
        if (!defaultCountry) {
            defaultApplied.current = false;
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
        const itemValue = getItemValue(item);
        setInputValue(itemValue);
        setSelectedFlag(item?.flags?.svg);
        onSelect(itemValue, item);
        setIsOpen(false);
    };

    const defaultRenderItem = (item, isHighlighted) => (
        <div
            className={`px-2 py-1 cursor-pointer flex items-center gap-2 ${isHighlighted ? 'bg-secondary' : ''}`}
            onClick={() => handleSelect(item)}
        >
            <Image src={item?.flags?.svg || 'http:placehold.co/20x20'} width={16} height={16} alt={item?.flags?.alt} />
            {item?.name?.common}
        </div>
    );

    return (
        <div className="relative" ref={wrapperRef}>
            <div className="relative w-full h-full">
                <div className="absolute left-2 top-1/2 -translate-y-1/2 flex items-center pointer-events-none">
                    {selectedFlag && (
                        <img
                            src={selectedFlag}
                            alt={items.find((item) => getItemValue(item) === inputValue)?.flags?.alt || ''}
                            className="w-5 h-5"
                        />
                    )}
                </div>
                <input
                    type="text"
                    value={inputValue}
                    onChange={handleInputChange}
                    onFocus={() => setIsOpen(true)}
                    onKeyDown={handleKeyDown}
                    placeholder={placeholder}
                    className="w-full h-full p-2 pl-8 bg-transparent border border-black"
                />
            </div>
            {isOpen && items.length > 0 && (
                <div className="absolute z-10 w-full mt-1 bg-white border border-black rounded shadow-lg max-h-60 overflow-auto">
                    {items.map((item, index) => (
                        <div
                            key={getItemValue(item) || index}
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
