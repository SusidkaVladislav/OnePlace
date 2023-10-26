import React, { useState, useRef, useEffect } from "react";
import EditIcon from '../../../../../../svg/shared-icons/EditIcon';
import './EditCategoryStyles.css';

const EditCategory = props =>
{
    const {
        onChange,
        onEdit,
        categoryId,
        categoryName,
        picturePath
    } = props;

    const [isConfirmDialogVisible, setIsConfirmDialogVisible] = useState(false);
    const [selectedPicture, setSelectedPicture] = useState(picturePath);

    const handleRemoveButtonClick = () =>
    {
        setIsConfirmDialogVisible(true);
    };

    const handleConfirmEdit = async () =>
    {
        setIsConfirmDialogVisible(false);
        onEdit(true, categoryName, categoryId, selectedPicture);
    };

    const handleCancelEdit = () =>
    {
        setIsConfirmDialogVisible(false);
        onEdit(false)
    };

    const changeCategoryNameHandler = (event) =>
    {
        onChange(event.target.value);
    }


    const handleFileChange = (event) =>
    {
        // const file = event.target.files[0];

        // const reader = new FileReader();
    
        // reader.onload = () => {
        //   setSelectedPicture(reader.result);
        // };
    
        // if (file) {
        //   reader.readAsDataURL(file);
        // }
    };

    return (
        <label>
            <label className='edit-button' onClick={handleRemoveButtonClick}> <EditIcon /></label>

            {isConfirmDialogVisible && (
                <div className='edit-category-dialog-container'>
                    <div className='edit-category-dialog-body'>
                        <div className='inputs-edit-category-container'>
                            <p style={
                                {
                                    color: '#471915',
                                    fontSize: '16px',
                                    fontFamily: 'Montserrat Alternates',
                                    fontWeight: '400',
                                    lineHeight: '20.8px',
                                    wordWrap: 'break-word',
                                    margin: '0'
                                }
                            }>Редагувати категорію</p>

                            <div className='inputs-edit-category'>
                                <input
                                    className="img-category-edit"
                                    type="image"
                                    src={selectedPicture}
                                    alt=""
                                />
                  
                                <input
                                    className='edit-category-input'
                                    type='text'
                                    value={categoryName}
                                    onChange={changeCategoryNameHandler}
                                />

                            </div>

                            <input
                                className="custom-file-upload"
                                type="file"
                                onChange={handleFileChange}
                                accept="image/png, image/gif, image/jpeg"
                            />

                        </div>

                        <div className="buttons-edit-category-container">
                            <label className='confirm-buttom-cancel' onClick={handleCancelEdit}>Скасувати</label>
                            <label className='confirm-buttom-ok' onClick={handleConfirmEdit}>Зберегти</label>
                        </div>
                    </div>
                </div>
            )
            }
        </label >

    )
}

export default EditCategory;