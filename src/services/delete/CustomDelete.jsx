import React, { useState } from "react";
import RemoveIcon from '../../modules/admin/svg/sharedIcons/RemoveIcon';
import './customDeleteStyles.css';

const CustomDelete = props =>
{
    const {
        onDelete
    } = props;

    const [isConfirmDialogVisible, setIsConfirmDialogVisible] = useState(false);
    
    const handleRemoveButtonClick = () =>
    {
        setIsConfirmDialogVisible(true);
    };

    const handleConfirmDelete = async () => {
        setIsConfirmDialogVisible(false);
        onDelete(true);
    };

    const handleCancelDelete = () =>
    {
        setIsConfirmDialogVisible(false);
        onDelete(false)
    };

    return (
        <label>
            <label className='remove-button' onClick={handleRemoveButtonClick}> <RemoveIcon /></label>

            {isConfirmDialogVisible && (
                <div className='modal-backdrop'>
                    <div className='confirm-dialog'>
                        <p>Ви впевнені, що бажаєте видалити запис?</p>
                        <label className='confirm-buttom' onClick={handleConfirmDelete}>Так</label>
                        <label className='confirm-buttom' onClick={handleCancelDelete}>Ні</label>
                    </div>
                </div>
            )}
            
        </label>

    )
}

export default CustomDelete;