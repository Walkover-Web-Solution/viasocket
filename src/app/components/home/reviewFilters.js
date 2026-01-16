const ReviewFilters = ({ filters, onSelect, selectedFilter }) => {
    return (
        <div className="flex flex-wrap gap-3 mb-8 md:mb-12 md:justify-start justify-center items-center">
            {filters.map((filter) => (
                <button
                    key={filter.id}
                    type="button"
                    onClick={() => onSelect(filter.id)}
                    className={`w-[100px] py-2 rounded-full border text-sm font-medium transition ${selectedFilter === filter.id
                        ? 'bg-accent/10 text-accent border-2 border-accent'
                        : 'bg-white text-black border-2 custom-border hover:!border-accent hover:text-accent'
                        }`}
                >
                    {filter.label}
                </button>
            ))}
        </div>
    )
}

export default ReviewFilters;