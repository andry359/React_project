import React from 'react';
// import classes from './MyButton.module.css';
import { getPagesArray, getPagesCount } from '../../../utils/pages';
import { usePagination } from '../../../hooks/usePagination';

const MyPagination = ({ totalPages, page, changePage }) => {

    // Запасной вариант
    let pagesArray = getPagesArray(totalPages);
    //! Тут разобраться почему пропадют кнопки с номером страници
    // let pagesArray = usePagination(totalPages);
    console.log(pagesArray);

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