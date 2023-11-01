//#region  Imports
import React, { useState } from "react";

//#region Router
import { useParams, useNavigate } from 'react-router-dom'
//#endregion

//#region Styles
import '../ItemUserStyle.css';
//#endregion

//#region Icons
import BackTextAndArrowIcon from '../../../../../../svg/arrows/BackTextAndArrowIcon';
import RemoveIcon from '../../../../../../svg/shared-icons/RemoveIcon';
import UnknownUserIcon from '../../../../../../svg/shared-icons/UnknownUserIcon';
//#endregion

//#region Blocks
import UserInfoBlock from '../../../../features/adminUsers/UserInfoBlock';
import UserOrdersBlock from '../../../../features/adminUsers/UserOrdersBlock';
import UserReviewBlock from '../../../../features/adminUsers/UserReviewBlock';
//#endregion

//#region Services
//import CustomDelete from '../../../../../../services/delete/CustomDelete';
//#endregion

//#region Redux
import { useSelector, useDispatch } from 'react-redux';
import { getUserById, fetchDeleteUser, fetchUsers } from '../../../../features/adminUsers/adminUsersSlice';
//#endregion
//#endregion


const UserInfo = () =>
{
    const dispatch = useDispatch()
    const params = useParams();
    const navigate = useNavigate()
    const userId = params.id;

    const [isConfirmDialogVisible, setIsConfirmDialogVisible] = useState(false);
    const [isConfirmDialogVisible2, setIsConfirmDialogVisible2] = useState(false);
    const [isConfirmDialogError, setIsConfirmDialogError] = useState(false);

    const user = useSelector(state => getUserById(state, Number(userId)));

    const deleteHandler = (isDelete, userId) =>
    {
        if (isDelete)
        {
            dispatch(fetchDeleteUser(userId))
                .then((response) =>
                {
                    console.log(response)
                    if (!response.ok)
                    {
                        setIsConfirmDialogError(true);
                    } else
                    {
                        setIsConfirmDialogVisible2(true);
                        setTimeout(() =>
                        {
                            dispatch(fetchUsers());
                            navigate(-1);
                        }, 3000);
                    }
                })
                .catch(error =>
                {
                    setIsConfirmDialogError(true);
                    console.error("Error deleting user:", error);
                });
        }
    }

    /*-------------------------------------------*/
    const handleRemoveButtonClick = () =>
    {
        setIsConfirmDialogVisible(true);
    };

    const handleConfirmDelete = async () =>
    {

        setIsConfirmDialogVisible(false);
        dispatch(fetchDeleteUser(userId))
            .then((response) =>
            {
                if (response.meta.requestStatus === 'rejected')
                {
                    setIsConfirmDialogError(true);
                }
                if (response.meta.requestStatus === 'fulfilled')
                {
                    setIsConfirmDialogVisible2(true);
                    setTimeout(() =>
                    {
                        dispatch(fetchUsers());
                        navigate(-1);
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

    return (
        <div>
            <div className='user-div'>
                <div className='back-div'>
                    <div className='user-img'>
                        <label> <UnknownUserIcon /></label>
                    </div>
                    {user !== null ? (
                        <label className='user-name'>{user !== null ? user.name : 'NotFound'} {user !== null ? user.surname : 'NotFound'}
                            <label>
                                <label className='remove-button' onClick={handleRemoveButtonClick}> <RemoveIcon /></label>
                            </label>
                        </label>
                    ) : (<label className='user-name'>No User Selected</label>)}
                    <label className='back-button' onClick={() => navigate(-1)} > <BackTextAndArrowIcon /></label>
                </div>
                <div className='user-div-info'>
                    <UserInfoBlock user={user} />
                    <UserOrdersBlock userId={user.id} />
                </div>
                <div>
                    <UserReviewBlock userId={user.id} />
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
    )
}

export default UserInfo;