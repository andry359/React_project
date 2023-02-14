import React from 'react';
import { getPagesArray } from '../../../utils/pages';
// import { usePagination } from '../../../hooks/usePagination';

const MyPagination = ({ totalPages, page, changePage }) => {

    let pagesArray = getPagesArray(totalPages);
    // let pagesArray = usePagination(totalPages);

    return (
        <div className='page__wrapper'>
            {pagesArray.map(p =>
                <span
                    onClick={() => {
                        changePage(p)
                    }}
                    key={p}
                    className={page === p ? 'page page__current' : 'page'}>
                    {p}
                </span>)}
        </div>
    )
}

export default MyPagination;