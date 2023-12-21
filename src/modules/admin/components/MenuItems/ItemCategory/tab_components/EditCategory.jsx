import React, { useState, useRef, useEffect } from "react";
import EditIcon from '../../../../../../svg/shared-icons/EditIcon';
import './EditCategoryStyles.css';

import ImgBBUpload from "../../../../../../services/image-upload-service/ImgBBUpload";

const EditCategory = props =>
{
    const { upload } = ImgBBUpload();

    const {
        categoryId,
        imgURL,
        onEditHandler,
        categoryName,
    } = props;


    const [name, setName] = useState(categoryName);
    const [nameValid, setNameValid] = useState(true);
    const [isConfirmDialogVisible, setIsConfirmDialogVisible] = useState(false);
    const [pictureFile, setPictureFile] = useState(null);
    const [picture, setPicture] = useState(imgURL);

    const handleRemoveButtonClick = () =>
    {
        setIsConfirmDialogVisible(true);
    };

    const handleConfirmEdit = async () =>
    {
        if (nameValid)
        {
            setIsConfirmDialogVisible(false);

            let urlToPicture = {
                data: {
                    display_url: null,
                    delete_url: null
                }
            };
            if (pictureFile !== null)
                urlToPicture = await upload(pictureFile)

            onEditHandler(true, name, categoryId, urlToPicture?.data?.display_url, urlToPicture?.data?.delete_url);
        }
    };

    const handleCancelEdit = () =>
    {
        setIsConfirmDialogVisible(false);
        onEditHandler(false)
        setName(categoryName)
        setNameValid(true);
    };

    const changeCategoryNameHandler = (event) =>
    {
        setName(event.target.value)
        if (event.target.value.length === 0)
        {
            setNameValid(false);
        }
        else
        {
            setNameValid(true);
        }
    }


    const handleFileChange = async (event) =>
    {
        if (event.target.files.length !== 0)
        {
            const file = event.target.files[0];

            setPictureFile(file)
            let reader = new FileReader();
            reader.readAsDataURL(file);

            reader.onload = () =>
            {
                setPicture(reader.result)
            }
        }
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
                                    src={picture}
                                    style={{
                                        objectFit: 'contain'
                                    }}
                                    alt=""
                                />

                                <input
                                    style={{
                                        'border': nameValid ? 'none' : '1px solid red'
                                    }}
                                    className='edit-category-input'
                                    type='text'
                                    value={name}
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