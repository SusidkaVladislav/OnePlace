import React from 'react';
import './NotificationStyles.css';
import SuccessfulCharacterIcon from '../../../../svg/shared-icons/SuccessfulCharacterIcon';

const CongratulationNotification = (props) =>
{
    const {
        notifiaction,
    } = props;

    return (
        <div className='notification-main-container'>
            <div className='notification-text'>
                <p style={{
                    color: '#0BB43A',
                }}>{notifiaction}</p>
            </div>
            <span className='notification-icon'>
                <SuccessfulCharacterIcon />
            </span>
        </div>
    )
}

export default CongratulationNotification;