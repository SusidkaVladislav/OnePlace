//#region  Imports
import React, { Fragment, useState, useEffect } from "react";

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
import SuccessfulNotification from '../../../../controls/notifications/SuccessfulNotification'
import UnsuccessfulNotification from '../../../../controls/notifications/UnsuccessfulNotification'
//#endregion

//#region Redux
import { useSelector, useDispatch } from 'react-redux';
import
{
    deleteUser,
    hideSuccessfulAlert,
    hideUnsuccessfulAlert,

    getUserPersonalData,
} from '../../../../features/adminUsers/adminUsersSlice';
//#endregion
//#endregion
import LoadingAnimation from "../../../../../../common-elements/loading/LoadingAnimation";

const UserInfo = () =>
{
    const dispatch = useDispatch()
    const params = useParams();
    const navigate = useNavigate()
    const userId = params.id;

    const [isConfirmDialogVisible, setIsConfirmDialogVisible] = useState(false);
    const [userPageControllLoading, setUserPageControllLoading] = useState(true);

    const {
        successfulAlertShow,
        unsuccessfulAlertShow,
        actionNotification,
        getUserPersonalDataLoading,
        userPersonalData,
        deleteUsersLoading,
    } = useSelector(state => state.adminUsers)

    useEffect(() =>
    {
        dispatch(getUserPersonalData(Number(userId))).then(({ payload }) =>
        {
            setUserPageControllLoading(false)
        })
    }, [])

    const handleRemoveButtonClick = () =>
    {
        setIsConfirmDialogVisible(true);
    };

    const handleConfirmDelete = async () =>
    {
        setIsConfirmDialogVisible(false);
        try
        {
            await dispatch(deleteUser(userId)).unwrap();
            await setTimeout(() =>
            {
                dispatch(hideSuccessfulAlert());
                //dispatch(getUsers());
                navigate(-1);
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

    if (getUserPersonalDataLoading)
    {
        return <LoadingAnimation />
    }
    if (userPageControllLoading)
    {
        return <LoadingAnimation />
    }
    if (deleteUsersLoading)
    {
        return <LoadingAnimation />
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

            <div className='user-div'>

                <div className='back-div'>
                    <div className='user-img'>
                        <label>
                            {
                                userPersonalData?.pictureAddress?.length > 0 ?
                                    <img
                                        style={{
                                            width: '60px',
                                            height: '60px',
                                            borderRadius: '90px'
                                        }}
                                        src={userPersonalData?.pictureAddress} /> : <UnknownUserIcon />
                            } </label>
                    </div>
                    {userPersonalData !== null ? (
                        <span>
                            <label className='user-name'>{userPersonalData !== null ? userPersonalData?.name : 'NotFound'} {userPersonalData !== null ? userPersonalData?.surname : 'NotFound'}</label>
                            <label className='remove-button' onClick={handleRemoveButtonClick}> <RemoveIcon /></label>

                        </span>
                    ) : (<label className='user-name'>No User Selected</label>)}
                    <label className='back-button' onClick={() => navigate(-1)} > <BackTextAndArrowIcon /></label>
                </div>

                <div className='user-div-info'>
                    <UserInfoBlock user={userPersonalData} />
                    <UserOrdersBlock userId={userPersonalData?.id} />
                </div>

                <div className="user-div-reviews">
                    <UserReviewBlock userId={userPersonalData?.id} />
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
    )
}

export default UserInfo;