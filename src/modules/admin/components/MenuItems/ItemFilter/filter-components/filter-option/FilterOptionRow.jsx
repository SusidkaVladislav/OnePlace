import React, { useState } from 'react';
import './FilterOptionRowStyles.css';

import CustomDelete from '../../../../../../../services/delete/CustomDelete';
import AddCountryFilter from '../add-filter/AddCountryFilter';
import AddBrandFilter from '../add-filter/AddBrandFilter';

import LoadingIcon from '../../../../../../../svg/animations/LoadingAnimation.gif';
import EditIcon from '../../../../../../../svg/shared-icons/EditIcon';

import { useDispatch, useSelector } from 'react-redux';

import
{
    updateCountry,
    deleteCountry,
    getCountries,
    getAllBrands,
    deleteBrand,
    updateBrand,
    hideSuccessfulAlert,
    hideUnsuccessfulAlert,
} from '../../../../../features/adminFilter/adminFilterSlice'

const FilterOptionRow = (props) =>
{
    const dispatch = useDispatch();
    const {
        kind,
        name,
        id,
    } = props;

    const { loading } = useSelector(state => state.adminFilter);

    const [showAddCountry, setShowAddCountry] = useState(false);
    const [showAddBrand, setShowAddBrand] = useState(false);


    const deleteCountryHandler = async (isDelete) =>
    {
        if (isDelete)
        {
            await dispatch(deleteCountry(id));
            await dispatch(getCountries());
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

    const deleteBrandHandler = async (isDelete) =>
    {
        if (isDelete)
        {
            await dispatch(deleteBrand(id));
            await dispatch(getAllBrands());
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

    const updateCountryOpenHandler = () =>
    {
        setShowAddCountry(!showAddCountry);
    }

    const closeAddCountryDialog = () =>
    {
        setShowAddCountry(false);
    }

    const updateBrandOpenHandler = () =>
    {
        setShowAddBrand(!showAddBrand);
    }

    const closeUpdateBrandDialog = () =>
    {
        setShowAddBrand(false);
    }

    const updateCountryHandler = async (country) =>
    {
        await dispatch(updateCountry({
            id: id,
            name: country,
        }))
        await dispatch(getCountries());
        setTimeout(() =>
        {
            dispatch(hideSuccessfulAlert())
        }, 1000);
        setTimeout(() =>
        {
            dispatch(hideUnsuccessfulAlert())
        }, 2000);
    }

    const updateBrandHandler = async (brand) =>
    {
        await dispatch(updateBrand({
            id: id,
            name: brand,
        }))
        await dispatch(getAllBrands());
        setTimeout(() =>
        {
            dispatch(hideSuccessfulAlert())
        }, 1000);
        setTimeout(() =>
        {
            dispatch(hideUnsuccessfulAlert())
        }, 2000);
    }

    if (loading)
    {
        return (
            <img
                style={{
                    width: '100px',
                    height: '100px',
                    position: 'absolute',
                    alignSelf: 'center',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                }}
                src={LoadingIcon}
                alt="loading"
            />
        );
    }

    return (
        <div className='filter-option-div'>
            <span className='filter-option-title'>{name}</span>
            <div className='filter-option-controls'>
                <span
                    style={{ cursor: 'pointer' }}
                    onClick={
                        kind === 'country' ?
                            updateCountryOpenHandler : updateBrandOpenHandler
                    }
                >
                    <EditIcon />
                </span>
                {
                    kind === 'country' ?
                        (
                            showAddCountry &&
                            <AddCountryFilter
                                closeAddCountryDialog={closeAddCountryDialog}
                                countryName={name}
                                actionCountry={(country) =>
                                {
                                    updateCountryHandler(country);
                                }}
                            />
                        )
                        :
                        (
                            showAddBrand &&
                            <AddBrandFilter
                                closeAddBrandDialog={closeUpdateBrandDialog}
                                brandName={name}
                                actionBrand={(brand) =>
                                {
                                    updateBrandHandler(brand);
                                }}
                            />
                        )
                }

                <CustomDelete
                    onDelete={(isDelete) =>
                    {
                        kind === 'country' ?
                            deleteCountryHandler(isDelete)
                            :
                            deleteBrandHandler(isDelete)
                    }}
                />
            </div>
        </div>
    );
}

export default FilterOptionRow;