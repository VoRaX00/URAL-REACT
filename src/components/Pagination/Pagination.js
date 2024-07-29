import React from 'react';
import styles from './Pagination.module.css';

const Pagination = ({ totalPosts, postsPerPage, setCurrentPage, currentPage }) => {
    let pages = [];

    for (let i = currentPage-4; i <= Math.min(Math.ceil(totalPosts / postsPerPage), currentPage+4); i++) {
        pages.push(i);
    }

    return (
        <div className={styles.pagination}>
        {
            pages.map((page, i) => {
                return (
                    <button key={i} onClick={() => setCurrentPage(page)}
                            className={`${styles.button} ${page === currentPage ? styles.active : styles.noActive}`}>
                        {page}
                    </button>
                )
            })
        }
        </div>
    )
}

export default Pagination;
