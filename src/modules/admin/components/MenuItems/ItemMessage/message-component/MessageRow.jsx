import React from 'react';
import '../ItemMessageStyle.css';

import GreenCheckCheckboxIcon from '../../../../../../svg/shared-icons/GreenCheckCheckboxIcon';
import UnknownUserIcon from '../../../../../../svg/shared-icons/UnknownUserIcon';
import MessageComeIndicator from '../../../../../../svg/shared-icons/MessageComeIndicator';


const MessageRow = (props) =>
{
    const {
        id,
        name,
        email,
        date,
        isReplied,
        handleChecked,
        checkedMessages,
        onRowClick,
        isRowClicked,
    } = props;

    return (
        <div className={isRowClicked? 'message-row-clicked-container' : 'message-row-container'} onClick={() => { onRowClick(id) }} key={id}>
            <div>
                <label className="message-custom-checkbox">
                    <input
                        id={id}
                        type="checkbox"
                        checked={checkedMessages.includes(id)}
                        onChange={() => handleChecked(id)} />
                    <span className='message-custom-checkbox-checkmark'><GreenCheckCheckboxIcon /></span>
                </label>
            </div>
            <div>
                <label style={{ 'cursor': 'pointer' }}> <UnknownUserIcon /></label>
            </div>

            <div className='user-initials-message-container'>
                <label className='user-initials-message-name'>{name}</label>
                <label className='user-initials-message-email'>{email}</label>
            </div>

            <div className='message-date-indicator-container'>
                <label>{new Date(date).getUTCDate() + '.' + (new Date(date).getMonth() + 1) + '.' + new Date(date).getFullYear()}</label>
                {isReplied === false ? (<label className='msg-elipse-icon'><MessageComeIndicator /></label>) : null}
            </div>

        </div>
    )
}

export default MessageRow;