const ReviewFilters = ({ filters, onSelect, selectedFilter }) => {
    return (
        <div className="flex flex-wrap gap-3 mb-8 md:mb-12 md:justify-start justify-center items-center">
            {filters.map((filter) => (
                <button
                    key={filter.id}
                    type="button"
                    onClick={() => onSelect(filter.id)}
                    className={`px-4 py-2 rounded-full border text-sm font-medium transition ${selectedFilter === filter.id
                        ? 'bg-black text-white border-black'
                        : 'bg-white text-black border custom-border hover:!bg-black hover:text-white'
                        }`}
                >
                    {filter.label}
                </button>
            ))}
        </div>
    )
}

export default ReviewFilters;