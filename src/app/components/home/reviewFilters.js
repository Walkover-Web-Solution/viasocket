const ReviewFilters = ({ filters, onSelect, selectedFilter }) => {
    return (
        <div className="inline-flex flex-wrap gap-3 md:justify-start justify-center items-center  ">
            {filters.map((filter) => (
                <button
                    key={filter.id}
                    type="button"
                    onClick={() => onSelect(filter.id)}
                    className={`relative rounded-full px-6 py-2.5 text-sm font-semibold transition-all duration-300 ${selectedFilter === filter.id
                        ? 'bg-accent text-white shadow-md scale-105'
                        : 'bg-gray-50 text-gray-700 border custom-border hover:border-accent hover:text-accent hover:shadow-sm'
                        }`}
                >
                    {filter.label}
                </button>
            ))}
        </div>
    )
}

export default ReviewFilters;