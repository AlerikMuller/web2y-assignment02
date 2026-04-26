export default function Pagination({ page, onPrevious, onNext }) {
    return (
        <div className="pagination">
            <button onClick={onPrevious} disabled={page === 0}>
                Previous
            </button>
            <span>Page {page + 1}</span>
            <button onClick={onNext}>
                Next
            </button>
        </div>
    );
}