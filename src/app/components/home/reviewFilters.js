import Image from 'next/image';

const ReviewFilters = ({ filters, onSelect, selectedFilter, variant }) => {
    const isPricing = variant === 'pricing';

    return (
        <div className={`inline-flex flex-wrap gap-3 justify-center items-center ${isPricing ? 'md:justify-center' : 'md:justify-start'}`}>
            {filters.map((filter) => {
                const isActive = selectedFilter === filter.id;
                if (isPricing) {
                    return (
                        <button
                            key={filter.id}
                            type="button"
                            onClick={() => onSelect(filter.id)}
                            aria-label={filter.label}
                            title={filter.label}
                            className={`relative rounded-full px-4 py-2 flex items-center gap-2 text-sm font-medium transition-all duration-300 border ${isActive
                                ? 'bg-red-800 text-white border-red-800 shadow-md'
                                : 'bg-white text-gray-700 border-gray-200 hover:border-gray-400 hover:shadow-sm'
                                }`}
                        >
                            {filter.Icon ? (
                                <filter.Icon
                                    className="w-4 h-4"
                                    style={isActive ? { color: '#fff' } : filter.color ? { color: filter.color } : undefined}
                                    strokeWidth={2}
                                />
                            ) : filter.logo ? (
                                <Image
                                    src={filter.logo}
                                    alt={filter.label}
                                    width={16}
                                    height={16}
                                    className="w-4 h-4 object-contain"
                                />
                            ) : null}
                            {filter.label}
                        </button>
                    );
                }
                return (
                    <button
                        key={filter.id}
                        type="button"
                        onClick={() => onSelect(filter.id)}
                        aria-label={filter.label}
                        title={filter.label}
                        className={`relative rounded-full w-12 h-12 flex items-center justify-center overflow-hidden transition-all duration-300 ${isActive
                            ? 'ring-2 ring-accent ring-offset-2 bg-white shadow-md scale-105'
                            : 'bg-white border custom-border hover:border-accent hover:shadow-sm'
                            }`}
                    >
                        {filter.Icon ? (
                            <filter.Icon
                                className="w-6 h-6"
                                style={filter.color ? { color: filter.color } : undefined}
                                strokeWidth={2}
                            />
                        ) : filter.logo ? (
                            <Image
                                src={filter.logo}
                                alt={filter.label}
                                width={24}
                                height={24}
                                className="w-6 h-6 object-contain"
                            />
                        ) : (
                            filter.label
                        )}
                    </button>
                );
            })}
        </div>
    )
}

export default ReviewFilters;