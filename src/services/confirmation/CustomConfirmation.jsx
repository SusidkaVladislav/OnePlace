import React, { useState } from "react";
import './CustomConfirmationStyles.css';

const CustomConfirm = props =>
{
    const {
        
    } = props;

    const [isConfirmDialogVisible, setIsConfirmDialogVisible] = useState(false);

    const handleConfirmCancel = async () => {
        setIsConfirmDialogVisible(false);
    };

    const handleCancel = () =>
    {
        setIsConfirmDialogVisible(false);
    };

    return (
        <label>
            {isConfirmDialogVisible && (
                <div className='modal-backdrop'>
                    <div className='confirm-dialog'>
                        <p>Ви впевнені, що бажаєте скасувати операцію?</p>
                        <label className='confirm-buttom' onClick={handleConfirmCancel}>Так</label>
                        <label className='confirm-buttom' onClick={handleCancel}>Ні</label>
                    </div>
                </div>
            )}
        </label>

    )
}

export default CustomConfirm;