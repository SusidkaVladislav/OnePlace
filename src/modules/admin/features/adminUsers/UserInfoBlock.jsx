import React from "react";

const UserInfoBlock = (props) =>
{
    const {
        user
    } = props;

    return (
        <div className='info-body'>
            <div>
                <label className='user-info-label'>Прізвище</label>
                <div className='user-info-label-2'>
                    <label>{user !== null ? user.surname : 'NotFound'}</label>
                </div>
            </div>
            <div>
                <label className='user-info-label'>Ім'я</label>
                <div className='user-info-label-2'>
                    <label>{user !== null ? user.name : 'NotFound'}</label>
                </div>
            </div>
            <div>
                <label className='user-info-label'>Номер телефону</label>
                <div className='user-info-label-2'>
                    <label>{user !== null ? user.phoneNumber : 'NotFound'}</label>
                </div>
            </div>
            <div>
                <label className='user-info-label'>Email</label>
                <div className='user-info-label-2'>
                    <label>{user !== null ? user.email : 'NotFound'}</label>
                </div>
            </div>
        </div>
    )
}

export default UserInfoBlock;