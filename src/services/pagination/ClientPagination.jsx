import React, { useEffect, useState } from 'react';
import classnames from 'classnames';
import { usePagination, DOTS } from './usePagination';
import './cilentPaginationStyles.css';

import BackArrow from '../../svg/arrows/BackArrow';

const ClientPagination = (props) =>
{
    const {
        onPageChange,
        totalCount,
        siblingCount = 1,
        currentPage,
        pageSize,
        className
    } = props;

    const paginationRange = usePagination({
        currentPage,
        totalCount,
        siblingCount,
        pageSize
    });

    const [lastPage, setLastPage] = useState(0);

    const onNext = () =>
    {
        onPageChange(currentPage + 1);
    };

    const onPrevious = () =>
    {
        onPageChange(currentPage - 1);
    };

    useEffect(() =>
    {
        if (paginationRange !== null)
            if (paginationRange?.length !== undefined && paginationRange?.length !== null && paginationRange?.length !== NaN)
                if (paginationRange[paginationRange?.length - 1] !== undefined && paginationRange[paginationRange?.length - 1] !== null
                    && paginationRange[paginationRange?.length - 1] !== NaN)
                    setLastPage(paginationRange[paginationRange?.length - 1])
    }, [])

    if (currentPage === 0 || paginationRange?.length < 2)
    {
        return null;
    }
    return (
        <ul
            className={classnames('client-pagination-container', { [className]: className })}
        >
            <li
                className={classnames('pagination-item', {
                    disabled: currentPage === 1
                })}
                onClick={onPrevious}
            >
                <BackArrow />
            </li>
            {paginationRange?.map(pageNumber =>
            {
                if (pageNumber === DOTS)
                {
                    return <li key={pageNumber} className="pagination-item dots">&#8230;</li>;
                }

                return (
                    <li key={pageNumber}
                        className={classnames('pagination-item', {
                            selected: pageNumber === currentPage
                        })}
                        onClick={() => onPageChange(pageNumber)}
                    >
                        {pageNumber}
                    </li>
                );
            })}
            <li
                className={classnames('pagination-item', {
                    disabled: currentPage === lastPage
                })}
                onClick={onNext}
            >
                <span className='right-arrow'> <BackArrow /></span>
            </li>
        </ul>
    );
}

export default ClientPagination;