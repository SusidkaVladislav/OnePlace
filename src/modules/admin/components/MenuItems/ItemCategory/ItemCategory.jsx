import React, { useState, useEffect } from 'react';
import TabTemplate from './TabTemplate';

import './ItemCategoryStyles.css';

import SuccessfulNotification from '../../../controls/notifications/SuccessfulNotification';
import UnsuccessfulNotification from '../../../controls/notifications/UnsuccessfulNotification';

import { useDispatch, useSelector } from 'react-redux';
import
{
    hideSuccessfulAlert,
    hideUnsuccessfulAlert,
    addCategory,
    getCategoryById,
    getCategories
} from '../../../features/adminCategory/adminCategorySlice';
const ItemCategory = () =>
{
    const dispatch = useDispatch();

    const [categoryName, setCategoryName] = useState('');
    const [errorBorder, setErrorBorder] = useState(false);

    const {
        successfulAlertShow,
        unsuccessfulAlertShow,
        chosenCategoryId,
        actionNotification,
    } = useSelector(state => state.adminCategories);

    useEffect(() =>
    {
        dispatch(hideSuccessfulAlert())
        dispatch(hideUnsuccessfulAlert())
    }, [])

    const categoryNameOnChange = (event) =>
    {
        if (errorBorder) setErrorBorder(false)
        setCategoryName(event.target.value);
    }

    const addCategoryHandle = async () =>
    {
        if (categoryName === '')
        {
            setErrorBorder(true);
            return;
        }

        const categoryPayload = {
            name: categoryName,
            pictureAddress: 'string',
            parentId: chosenCategoryId
        };

        setCategoryName('');

        await dispatch(addCategory(categoryPayload));
        if (chosenCategoryId)
            await dispatch(getCategoryById(chosenCategoryId));
        else
            await dispatch(getCategories());

        setTimeout(() =>
        {
            dispatch(hideSuccessfulAlert())
        }, 1000);
        setTimeout(() =>
        {
            dispatch(hideUnsuccessfulAlert())
        }, 2000);
    }

    return (
        <div>
            {
                successfulAlertShow &&
                <div className='modal-backdrop'>
                    <SuccessfulNotification notifiaction={actionNotification} />
                </div>
            }
            {
                unsuccessfulAlertShow &&
                <div className='modal-backdrop'>
                    <UnsuccessfulNotification notifiaction={actionNotification} />
                </div>
            }
            <div className='categories-main'>

                <div className='add-category-container'>
                    <div>
                        <label className='label-create-category'>Створити категорію</label>
                        <input
                            style={errorBorder ? { border: '2px solid red' } : { border: 'none' }}
                            className='input-create-category'
                            value={categoryName}
                            type='text'
                            onChange={categoryNameOnChange} />

                    </div>
                    <button
                        className='add-category-btn'
                        onClick={addCategoryHandle}>
                        <span className='add-btn-label'>+ Додати</span></button>
                </div>

                <div className='category-body'>
                    <TabTemplate />
                </div>
            </div>
        </div >
    );
}

export default ItemCategory;

