const ReviewFilters = ({ filters, onSelect, selectedFilter }) => {
    return (
        <div className="inline-flex flex-wrap gap-3 md:justify-start justify-center items-center">
            {filters.map((filter) => {
                const isActive = selectedFilter === filter.id;
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
                            <img
                                src={filter.logo}
                                alt={filter.label}
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