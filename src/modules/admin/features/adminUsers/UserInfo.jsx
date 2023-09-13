import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'

import '../../components/MenuItems/ItemUser/ItemUserStyle.css';

import BackIcon from '../../svg/userPageIcons/BackIcon';

import { useSelector } from 'react-redux';
import { getUserById } from './adminUsersSlice';

const UserInfo = () =>
{
    const params = useParams();
    const userId = params.id;

    const [clickedUser, setClickedUser] = useState(null);
    const [isConfirmDialogVisible, setIsConfirmDialogVisible] = useState(false);



    const user = useSelector(state => getUserById(state, Number(userId))); 
    
    const handleRemoveButtonClick = () =>
    {
        setIsConfirmDialogVisible(true);
    };

    const handleBackToMain = () =>
    {
        setClickedUser(null);
        //setIsUserDivVisible(false);
    };

    return (
        <div>
            <div className='user-div'>
                <div className='back-div'>
                    <div className='user-img'>
                        <img src="https://p.kindpng.com/picc/s/116-1169050_avatar-michael-jordan-jersey-clip-art-michael-jordan.png" alt="" />
                    </div>
                    {user !== null ? (
                        <label className='user-name'>{user.name} {user.surname}
                            <label className='remove-button' onClick={handleRemoveButtonClick}> is</label></label>
                    ) : (<label className='user-name'>No User Selected</label>)}
                    <label className='back-button' onClick={handleBackToMain} > <BackIcon /></label>
                </div>
                <div className='user-div-info'>
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
                    <div className='order-div'>
                        <div className='order-label'>
                            <label>Замовлення </label>
                        </div>
                        <div className='order-div-header'>
                            <label className='order-div-name'>Назва</label>
                            <label className='order-div-code'>Код</label>
                            <label className='order-div-price'>Ціна</label>
                        </div>
                        {/* <div className='order-div-list' id='scrollbar-style-1'>
                            {orders.map((order) => (
                                <div className='order-div-row' key={order.id}>
                                    <div className='order-div-name'>
                                        <label>{order.title}</label>
                                    </div>
                                    <div className='order-div-code'>
                                        <label>{order.code}</label>
                                    </div>
                                    <div className='order-div-price'>
                                        <label>{order.price}</label>
                                    </div>
                                    <div className='order-div-image'>
                                        <img src={order.image} alt={order.title} className='order-div-img' width={50} height={50}></img>
                                    </div>
                                </div>

                            ))}

                        </div> */}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserInfo;