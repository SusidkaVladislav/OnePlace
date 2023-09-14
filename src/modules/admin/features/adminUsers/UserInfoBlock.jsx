import React from "react";

const UserInfoBlock = (props) =>
{
    const user = props.user;

    return (
        <div className='info-body'>
            <div className='surname-div'>
                <label className='surname-label-one'>Прізвище</label>
                <div className='surname-label'>
                    <label>{user !== null ? user.surname : 'NotFound'}</label>
                </div>
            </div>
            <div className='name-div'>
                <label className='name-label-one'>Ім'я</label>
                <div className='name-label'>
                    <label>{user !== null ? user.name : 'NotFound'}</label>
                </div>
            </div>
            <div className='phone-div'>
                <label className='phone-label-one'>Номер телефону</label>
                <div className='phone-label'>
                    <label>{user !== null ? user.phoneNumber : 'NotFound'}</label>
                </div>
            </div>
            <div className='email-div'>
                <label className='email-label-one'>Email</label>
                <div className='email-label'>
                    <label>{user !== null ? user.email : 'NotFound'}</label>
                </div>
            </div>
        </div>
    )
}

export default UserInfoBlock;