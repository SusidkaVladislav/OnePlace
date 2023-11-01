import React, { useState } from 'react';
import './FilterColorRowStyles.css';
import CustomDelete from '../../../../../../../services/delete/CustomDelete';
import AddColorFilter from '../add-filter/AddColorFilter';

import EditIcon from '../../../../../../../svg/shared-icons/EditIcon';
import LoadingIcon from '../../../../../../../svg/animations/LoadingAnimation.gif';

import { useDispatch, useSelector } from 'react-redux';
import
{
    deleteColor,
    updateColor,
    getColors,
    hideSuccessfulAlert,
    hideUnsuccessfulAlert,
} from '../../../../../features/adminFilter/adminFilterSlice'

const FilterColorRow = (props) =>
{
    const dispatch = useDispatch();

    const {
        name,
        id,
        hex,
    } = props;

    const [showUpdateColor, setShowUpdateColor] = useState(false)

    const { loading } = useSelector(state => state.adminFilter)

    const deleteColorHandler = async (isDelete) =>
    {
        if (isDelete)
        {
            await dispatch(deleteColor(id))
            await dispatch(getColors());
            setShowUpdateColor(false);
            setTimeout(() =>
            {
                dispatch(hideSuccessfulAlert())
            }, 1000);
            setTimeout(() =>
            {
                dispatch(hideUnsuccessfulAlert())
            }, 2000);
        }
    }

    const updateColorHandler = async (colorInfo, colorName) =>
    {
        await dispatch(updateColor({
            id: id,
            name: colorName,
            hex: colorInfo
        }))
        await dispatch(getColors());
        setShowUpdateColor(false);
        setTimeout(() =>
        {
            dispatch(hideSuccessfulAlert())
        }, 1000);
        setTimeout(() =>
        {
            dispatch(hideUnsuccessfulAlert())
        }, 2000);
    }

    const updateColorOpenHandler = () =>
    {
        setShowUpdateColor(!showUpdateColor);
    }

    const closeUpdateColorDialog = () =>
    {
        setShowUpdateColor(false);
    }

    if (loading)
    {
        return <img style={{
            width: '100px',
            height: '100px',
            position: 'absolute',
            alignSelf: 'center',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
        }} src={LoadingIcon} alt="loading" />
    }

    return (
        <div className='filter-option-color-div'>
            <span className='filter-option-color-example' style={{
                backgroundColor: hex
            }}></span>
            <span className='filter-option-color-title'>{name}</span>
            <div className='filter-option-controls'>
                <span
                    style={{
                        cursor: 'pointer',
                    }}
                    onClick={updateColorOpenHandler}
                >
                    <EditIcon />
                </span>
                {
                    showUpdateColor &&
                    <AddColorFilter
                        hex={hex}
                        name={name}
                        closeAddColorDialog={closeUpdateColorDialog}
                        addColor={(colorInfo, colorName) =>
                        {
                            updateColorHandler(colorInfo, colorName)
                        }}
                    />
                }

                <CustomDelete onDelete={(isDelete) => { deleteColorHandler(isDelete) }} />
            </div>
        </div>
    )
}

export default FilterColorRow;