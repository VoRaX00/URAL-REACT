import React from 'react';
import './style.css';

const Pagination = ({ totalPosts, postsPerPage, setCurrentPage, currentPage }) => {
    const totalPages = Math.ceil(totalPosts / postsPerPage);
    let pages = [];

    const startPage = Math.max(1, currentPage - 4);
    const endPage = Math.min(totalPages, currentPage + 4);

    for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
    }

    return (
        <>
        <div className="pagination">
            {
                pages.map((page, i) => {
                    return (
                        <button key={i} onClick={() => setCurrentPage(page)}
                                className={`buttonPagination ${page === currentPage ? "Active" : ""}`}>
                            {page}
                        </button>
                    )
                })
            }
        </div>
        <br/>
        </>
    )
}

export default Pagination;