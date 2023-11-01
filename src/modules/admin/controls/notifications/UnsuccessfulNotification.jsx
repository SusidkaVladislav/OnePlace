import React from 'react';
import './NotificationStyles.css';
import UnsuccessfulCharacterIcon from '../../../../svg/shared-icons/UnsuccessfulCharacterIcon';

const UnsuccessfulNotification = (props) =>
{
    const {
        notifiaction,
    } = props;

    return (
        <div className='notification-main-container'>
            <div className='notification-text'>
                <p style={{
                    color: '#B31D21'
                }}>{notifiaction}</p>
            </div>
            <span className='icon'>
                <UnsuccessfulCharacterIcon />
            </span>
        </div>
    )
}

export default UnsuccessfulNotification;