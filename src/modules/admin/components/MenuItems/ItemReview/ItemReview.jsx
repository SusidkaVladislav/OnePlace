import React, { useState, useEffect, useMemo, Fragment } from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import './ItemReviewStyle.css';
import CustomPagination from '../../../../../services/pagination/CustomPagination';
import AdminSearch from '../../../../../services/search/adminSearch';
import LoadingIcon from '../../../../../svg/animations/LoadingAnimation.gif';
import SuccessfulNotification from '../../../controls/notifications/SuccessfulNotification';
import UnsuccessfulNotification from '../../../controls/notifications/UnsuccessfulNotification';
import GreenCheckCheckboxIcon from '../../../../../svg/shared-icons/GreenCheckCheckboxIcon';

import ReviewRow from './item-review-components/ReviewRow';

import { useSelector, useDispatch } from 'react-redux';

import
{
    getReviews,
    getReviewReplies,
    getAllReviewReplies,
    getFilteredReviews,
    deleteReview,
    hideSuccessfulAlert,
    hideUnsuccessfulAlert
} from '../../../features/adminReviews/adminReviewsSlice';

const PageSize = 7;
const ItemReview = () =>
{
    const dispatch = useDispatch()

    const [inputValue, setInputValue] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [checkedUsers, setCheckedUsers] = useState([]);
    const [selectAllChecked, setSelectAllChecked] = useState(false);

    const {
        loading,
        reviews,
        successfulAlertShow,
        unsuccessfulAlertShow,
        actionNotification,
    } = useSelector((state) => state.adminReviews)

    const filteredData = useSelector(state => getFilteredReviews(state, inputValue))?.reverse();
    const reviewsReply = useSelector(state => getAllReviewReplies(state));
    const [isConfirmDialogVisible, setIsConfirmDialogVisible] = useState(false);


    useEffect(() =>
    {
        dispatch(hideUnsuccessfulAlert());
        dispatch(getReviews());
        dispatch(getReviewReplies());
    }, [])

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
        try
        {
            await dispatch(deleteReview(checkedUsers)).unwrap();

            await setTimeout(() =>
            {
                dispatch(hideSuccessfulAlert());
                dispatch(getReviews());
                setCheckedUsers([])
            }, 1000);
        }
        catch (error)
        {
            setTimeout(() =>
            {
                dispatch(hideUnsuccessfulAlert());
            }, 2000);
        }
    };

    const handleCancelDelete = () =>
    {
        setIsConfirmDialogVisible(false);
    };


    const filteredAndPaginatedData = useMemo(() =>
    {
        const firstPageIndex = (currentPage - 1) * PageSize;
        const lastPageIndex = firstPageIndex + PageSize;
        return filteredData.slice(firstPageIndex, lastPageIndex);
    }, [currentPage, inputValue, reviews]);

    if (loading)
    {
        return <img style={{
            width: '100px',
            height: '100px',
            position: 'absolute',
            alignSelf: 'center',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
        }} src={LoadingIcon} alt="loading" />
    }

    return (
        <Fragment>

            {successfulAlertShow && (
                <div className='modal-backdrop'>
                    <SuccessfulNotification notifiaction={actionNotification} />
                </div>
            )}
            {unsuccessfulAlertShow && (
                <div className='modal-backdrop'>
                    <UnsuccessfulNotification notifiaction={actionNotification} />
                </div>
            )}

            <div className='message-main'>
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

                <div className='user-table'>
                    <div className='review-table-head'>
                        <label className="message-custom-checkbox">
                            <input
                                type="checkbox"
                                checked={selectAllChecked}
                                onChange={handleCheckedAll} />
                            <span className='message-custom-checkbox-checkmark'><GreenCheckCheckboxIcon /></span>
                        </label>
                        <label>Всі</label>
                        <label style={{
                            'cursor': 'pointer',
                        }} onClick={handleDeleteReview}>Видалити</label>
                    </div>
                    {
                        filteredAndPaginatedData?.map((review, index) => (

                            <ReviewRow
                                key={index}
                                index={index}
                                reviewId={review.id}
                                reviewProductPictureAddress={review.productPictureAddress}
                                reviewProductName={review.productName}
                                reviewProductCode={review.productCode}
                                reviewComment={review.comment}
                                reviewDate={review.date}
                                handleChecked={handleChecked}
                                reviewsReply={reviewsReply}
                                checkedUsers={checkedUsers}
                            />
                        ))
                    }
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

        </Fragment>
    );
}

export default ItemReview;