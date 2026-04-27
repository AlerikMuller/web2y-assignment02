import { useState } from "react";

export default function Pagination({
                                       page,
                                       totalPages,
                                       onPrevious,
                                       onNext,
                                       onGoToPage,
                                   }) {
    const [inputValue, setInputValue] = useState(String(page + 1));

    function handleSubmit(event) {
        event.preventDefault();

        const pageNumber = Number(inputValue);

        if (Number.isNaN(pageNumber)) {
            return;
        }

        onGoToPage(pageNumber - 1);
    }

    return (
        <div className="pagination">
            <button onClick={onPrevious} disabled={page === 0}>
                Previous
            </button>

            <span>
        Page {page + 1} / {totalPages}
      </span>

            <form className="page-jump-form" onSubmit={handleSubmit}>
                <input
                    type="number"
                    min="1"
                    max={totalPages}
                    value={inputValue}
                    onChange={(event) => setInputValue(event.target.value)}
                    className="page-jump-input"
                />
                <button type="submit">Go</button>
            </form>

            <button onClick={onNext} disabled={page >= totalPages - 1}>
                Next
            </button>
        </div>
    );
}