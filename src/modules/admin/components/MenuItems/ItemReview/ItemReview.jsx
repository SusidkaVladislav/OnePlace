import React, { useState, useEffect, useMemo } from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import './ItemReviewStyle.css';
import CustomPagination from '../../../../../services/pagination/CustomPagination';
import AdminSearch from '../../../../../services/search/adminSearch';
import { useSelector, useDispatch } from 'react-redux';
import { fetchReviews, fetchReviewReplies, getAllReviewReplies, getFilteredReviews, fetchDeleteReview } from '../../../features/adminReviews/adminReviewsSlice';
import { useNavigate } from "react-router-dom";
import ElipseIcon from './svg/ElipseIcon';
import FluentArrowIcon from './svg/FluentArrowIcon';

const PageSize = 7;
const ItemReview = () =>
{
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [inputValue, setInputValue] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [checkedUsers, setCheckedUsers] = useState([]);
    const [selectAllChecked, setSelectAllChecked] = useState(false);

    const { loading,
        reviews,
    } = useSelector((state) => state.adminReviews)

    const filteredData = useSelector(state => getFilteredReviews(state, inputValue));
    const reviewsReply = useSelector(state => getAllReviewReplies(state));
    const [isConfirmDialogVisible, setIsConfirmDialogVisible] = useState(false);
    const [isConfirmDialogVisible2, setIsConfirmDialogVisible2] = useState(false);
    const [isConfirmDialogError, setIsConfirmDialogError] = useState(false);

    const handleChecked = (id) =>
    {
        const updatedCheckedUsers = checkedUsers.includes(id)
            ? checkedUsers.filter((userId) => userId !== id)
            : [...checkedUsers, id];
        setCheckedUsers(updatedCheckedUsers);
    }

    const handleCheckedAll = () =>
    {
        const allIds = filteredData.map((review) => review.id);
        if (checkedUsers.length > 0)
        {
            if (checkedUsers.length === allIds.length)
            {
                setCheckedUsers([]);
                setSelectAllChecked(false)
            }
            else
            {
                const newCheckedUsers = [...new Set([...checkedUsers, ...allIds])];
                setCheckedUsers(newCheckedUsers);
                setSelectAllChecked(true);
            }
        }
        else
        {
            if (selectAllChecked)
            {
                setCheckedUsers([]);
                setSelectAllChecked(false)
            } else
            {
                setCheckedUsers(allIds);
                setSelectAllChecked(true)
            }

        }
    }
    const handleDeleteReview = () =>
    {
        if (checkedUsers.length === 0)
            return;
        setIsConfirmDialogVisible(true);
    }

    const handleConfirmDelete = async () =>
    {
        setIsConfirmDialogVisible(false);
        dispatch(fetchDeleteReview(checkedUsers))
            .then((response) =>
            {
                if (response.meta.requestStatus === 'rejected')
                {
                    setIsConfirmDialogError(true);
                }
                if (response.meta.requestStatus === 'fulfilled')
                {
                    dispatch(fetchReviews());
                    setIsConfirmDialogVisible2(true);
                    setTimeout(() =>
                    {
                        setIsConfirmDialogVisible2(false);
                    }, 2000);

                }
            });
    };

    const handleCancelDelete = () =>
    {
        setIsConfirmDialogVisible(false);
    };
    const handleClickOk = () =>
    {
        setIsConfirmDialogError(false);
        setIsConfirmDialogVisible2(false);
    }

    useEffect(() =>
    {
        dispatch(fetchReviews());
        dispatch(fetchReviewReplies());
    }, [])

    const filteredAndPaginatedData = useMemo(() =>
    {
        const firstPageIndex = (currentPage - 1) * PageSize;
        const lastPageIndex = firstPageIndex + PageSize;
        return filteredData.slice(firstPageIndex, lastPageIndex);
    }, [currentPage, inputValue, reviews]);

    if (loading) return <p>Loading...</p>

    return (
        <div>
            <div className='user-main'>
                <AdminSearch
                    onSearchChange={value =>
                    {
                        setInputValue(value);
                        setCurrentPage(1);
                    }}
                />
                <div className='user-count'>
                    <label>({filteredData.length}) відгуки</label>
                </div>

                <div className='user-body' >
                    <div className='user-table'>
                        <div className='review-table-head'>
                            <div className='r1-h'>
                                <input type="checkbox"
                                    onChange={handleCheckedAll}
                                    checked={selectAllChecked} />
                            </div>
                            <label className="r2-h">Всі</label>
                            <label className="r3-h" onClick={handleDeleteReview}>Видалити</label>
                        </div>
                        {filteredAndPaginatedData.map((review, index) => (
                            <div className='review-div-row' key={review.id}>
                                <div className={`review-table-row ${index % 2 === 0 ? 'even-row' : ''}`}>
                                    <div className='r1'>
                                        <input type="checkbox" id={review.id}
                                            onChange={() => handleChecked(review.id)}
                                            checked={checkedUsers.includes(review.id)}
                                        />
                                    </div>
                                    <div className='r2'>
                                        <img src={review?.productPictureAddress} alt={review?.productName} />
                                        {!reviewsReply.some((reply) => reply.review.id === review.id) && (
                                            <label key={review.id} className='review-elipse-icon'><ElipseIcon /></label>
                                        )}
                                    </div>
                                    <div className='r3'>{review?.productName} {review?.productCode}</div>
                                    <div className='r4'>{review?.comment}</div>
                                    <div className='r5'>{review?.date}</div>
                                    <div className='r6' onClick={async event => { navigate(`review/${review.id}`); }}>
                                        <FluentArrowIcon />
                                    </div>
                                </div>
                            </div>
                        )
                        )}
                    </div>
                </div>

                <div className='pag'>
                    <CustomPagination
                        className="pagination-bar"
                        currentPage={currentPage}
                        totalCount={filteredData.length}
                        pageSize={PageSize}
                        onPageChange={page => setCurrentPage(page)} />
                </div>

            </div>
            {isConfirmDialogVisible && (
                <div className='modal-backdrop'>
                    <div className='confirm-dialog'>
                        <p>Ви впевнені, що бажаєте видалити запис?</p>
                        <label className='confirm-buttom' onClick={handleConfirmDelete}>Так</label>
                        <label className='confirm-buttom' onClick={handleCancelDelete}>Ні</label>
                    </div>
                </div>
            )}
            {isConfirmDialogVisible2 && (
                <div className='modal-backdrop-true'>
                    <div className='confirm-dialog-true'>
                        <p>Запис видалено успішно</p>
                        {/* <label onClick={handleClickOk} className='confirm-buttom-ok'>Ok</label> */}
                    </div>
                </div>
            )}
            {isConfirmDialogError && (
                <div className='modal-backdrop-false'>
                    <div className='confirm-dialog-false'>
                        <p>Помилка видалення запису. Спробуйте пізніше!</p>
                        <label onClick={handleClickOk} className='confirm-buttom-ok'>Ok</label>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ItemReview;