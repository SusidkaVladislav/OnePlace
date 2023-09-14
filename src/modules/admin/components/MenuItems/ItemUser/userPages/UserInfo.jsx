//#region  Imports
import React from 'react';

//#region Router
import { useParams, useNavigate } from 'react-router-dom'
//#endregion

//#region Styles
import '../ItemUserStyle.css';
//#endregion

//#region Icons
import BackIcon from '../../../../svg/sharedIcons/BackIcon';
//#endregion

//#region Blocks
import UserInfoBlock from '../../../../features/adminUsers/UserInfoBlock';
import UserOrdersBlock from '../../../../features/adminUsers/UserOrdersBlock';
//#endregion

//#region Services
import CustomDelete from '../../../../../../services/delete/CustomDelete';
//#endregion

//#region Redux
import { useSelector } from 'react-redux';
import { getUserById } from '../../../../features/adminUsers/adminUsersSlice';
//#endregion
//#endregion


const UserInfo = () =>
{
    const params = useParams();
    const navigate = useNavigate()
    const userId = params.id;

    const user = useSelector(state => getUserById(state, Number(userId)));

    const deleteHandler = (isDelete, userId) =>
    {
        if (isDelete)
        {
            //Тут логіка видалення
        }
    }

    return (
        <div>
            <div className='user-div'>
                <div className='back-div'>
                    <div className='user-img'>
                        <img src="https://p.kindpng.com/picc/s/116-1169050_avatar-michael-jordan-jersey-clip-art-michael-jordan.png" alt="" />
                    </div>
                    {user !== null ? (
                        <label className='user-name'>{user !== null ? user.name : 'NotFound'} {user !== null ? user.surname : 'NotFound'}
                            <CustomDelete
                                onDelete={value => { deleteHandler(value, userId) }}
                            /></label>
                    ) : (<label className='user-name'>No User Selected</label>)}
                    <label className='back-button' onClick={() => navigate(-1)} > <BackIcon /></label>
                </div>
                <div className='user-div-info'>
                    <UserInfoBlock user={user} />
                    <UserOrdersBlock userId={user.id} />
                </div>

            </div>
        </div>
    )
}

export default UserInfo;