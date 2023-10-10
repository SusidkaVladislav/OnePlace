import React, { useState } from 'react';
import TabTemplate from './TabTemplate';
import Alert from '@mui/material/Alert';

import './ItemCategoryStyles.css';

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
        actionNotification, } = useSelector(state => state.adminCategories);

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
    }

    return (
        <div>
            {
                successfulAlertShow &&
                <Alert variant='filled'
                    severity="success"
                    sx={
                        {
                            width: 'fit-content',
                            height: 'fit-content',
                            minWidth: '433px',
                            marginTop: '7%',
                            marginLeft: '60%',
                            position: 'absolute'
                        }
                    }
                    onClose={() => { dispatch(hideSuccessfulAlert()) }}>{actionNotification}</Alert>
            }
            {
                unsuccessfulAlertShow &&
                <Alert value='filled'
                    severity="error"
                    sx={
                        {
                            width: 'fit-content',
                            minWidth: '433px',
                            height: 'fit-content',
                            marginTop: '7%',
                            marginLeft: '60%',
                            position: 'absolute'
                        }
                    }
                    onClose={() => { dispatch(hideUnsuccessfulAlert()) }}>{actionNotification}</Alert>
            }
            <div className='categories-main'>

                <div className='add-category-container'>
                    <div>
                        <label className='label-create-category'>Створити категорію</label>
                        <input
                            style={errorBorder ? { borderColor: 'red' } : { borderColor: 'black' }}
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

