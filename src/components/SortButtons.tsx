interface SortButtonsProps {
    toggleSortOrder: (by: "year" | "price") => void;
    sortBy: string | null;
    sortOrder: string | null;
}


const SortButtons: React.FC<SortButtonsProps> = ({sortBy, sortOrder, toggleSortOrder}) => {
    return (
        <div className="sort-buttons">
            <button onClick={() => toggleSortOrder('year')}>
                Sort by Year {sortBy === 'year' ? (sortOrder === 'asc' ? '↑' : '↓') : ''}
            </button>
            <button onClick={() => toggleSortOrder('price')}>
                Sort by Price {sortBy === 'price' ? (sortOrder === 'asc' ? '↑' : '↓') : ''}
            </button>
        </div>
    )
}

export default SortButtons