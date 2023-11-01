import React, { useEffect, useState } from 'react';
import "./ItemFilter.css";

import Search from './filter-components/search-component/Search';
import FilterOptionRow from './filter-components/filter-option/FilterOptionRow';
import FilterColorRow from './filter-components/filter-option/FilterColorRow';
import AddColorFilter from './filter-components/add-filter/AddColorFilter';
import AddCountryFilter from './filter-components/add-filter/AddCountryFilter';
import AddBrandFilter from './filter-components/add-filter/AddBrandFilter';
import SuccessfulNotification from '../../../controls/notifications/SuccessfulNotification';
import UnsuccessfulNotification from '../../../controls/notifications/UnsuccessfulNotification';

import { useDispatch, useSelector } from 'react-redux';
import
{
    getCountries,
    getAllBrands,
    getColors,
    createColor,
    getFilteredCountries,
    getFilteredBrands,
    getFilteredColors,
    hideSuccessfulAlert,
    hideUnsuccessfulAlert,
    createCountry,
    createBrand,

} from '../../../features/adminFilter/adminFilterSlice';

const ItemFilter = () =>
{
    const dispatch = useDispatch();

    const {
        successfulAlertShow,
        unsuccessfulAlertShow,
        actionNotification,
    } = useSelector(state => state.adminFilter);

    const [showAddCountry, setShowAddCountry] = useState(false)
    const [showAddBrand, setShowAddBrand] = useState(false)
    const [showAddColor, setShowAddColor] = useState(false)
    const [countryInputName, setCountryInputName] = useState('');
    const [brandInputName, setBrandInputName] = useState('');
    const [colorInputName, setColorInputName] = useState('');

    const filteredCountry = useSelector(state => getFilteredCountries(state, countryInputName));
    const filteredBrand = useSelector(state => getFilteredBrands(state, brandInputName));
    const filteredColors = useSelector(state => getFilteredColors(state, colorInputName));


    useEffect(() =>
    {
        dispatch(getCountries());
        dispatch(getAllBrands());
        dispatch(getColors());
    }, [])

    const generateCountries = () =>
    {
        return filteredCountry.map((country, index) =>
        {
            return <FilterOptionRow kind={'country'} key={index} name={country.name} id={country.id} />
        })
    }

    const generateBrands = () =>
    {
        return filteredBrand.map((brand, index) =>
        {
            return <FilterOptionRow kind={'brand'} key={index} name={brand.name} id={brand.id} />
        })
    }

    const generateColor = () =>
    {
        return filteredColors.map((color, index) =>
        {
            return <FilterColorRow key={index} name={color.name} id={color.id} hex={color.hex} />
        })
    }

    const addCountryHandler = () =>
    {
        setShowAddCountry(!showAddCountry)
    }

    const addBrandHandler = () =>
    {
        setShowAddBrand(!showAddBrand)
    }

    const addColorHandler = () =>
    {
        setShowAddColor(!showAddColor)
    }

    const closeAddCountryDialog = () =>
    {
        setShowAddCountry(false);
    }

    const closeAddBrandDialog = () =>
    {
        setShowAddBrand(false);
    }

    const closeAddColorDialog = () =>
    {
        setShowAddColor(false);
    }

    const addCountry = async (countryName) =>
    {
        await dispatch(createCountry(countryName))
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

    const addBrand = async (brandName) =>
    {
        await dispatch(createBrand(brandName));
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

    const addColor = async (colorInfo, colorName) =>
    {
        await dispatch(createColor({
            name: colorName,
            hex: colorInfo,
        }))
        await dispatch(getColors());
        setShowAddColor(false);
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
        <div className='filter-container'>

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

            <div className='filter-grid'>
                <div className='filter-column-container'>
                    <p className='header-filter-text'>Країна виробник</p>
                    <Search filterOptions={(countryName) => { setCountryInputName(countryName) }} />
                    <button className='add-filter-btn' onClick={addCountryHandler}>+</button>
                    {
                        showAddCountry &&
                        <AddCountryFilter
                            actionCountry={addCountry}
                            closeAddCountryDialog={closeAddCountryDialog}
                        />

                    }
                    <div className='filter-options-container' id='scrollbar-style-1'>
                        {
                            generateCountries()
                        }
                    </div>
                </div>

                <div className='filter-column-container'>
                    <p className='header-filter-text'>Бренд</p>
                    <Search filterOptions={(brandName) => { setBrandInputName(brandName) }} />
                    <button className='add-filter-btn' onClick={addBrandHandler}>+</button>
                    {
                        showAddBrand && <AddBrandFilter
                            actionBrand={addBrand}
                            closeAddBrandDialog={closeAddBrandDialog}
                        />
                    }
                    <div className='filter-options-container' id='scrollbar-style-1'>
                        {
                            generateBrands()
                        }
                    </div>
                </div>

                <div className='filter-column-container'>
                    <p className='header-filter-text'>Колір</p>
                    <Search filterOptions={(colorName) => { setColorInputName(colorName) }} />
                    <button className='add-filter-btn' onClick={addColorHandler}>+</button>
                    {
                        showAddColor &&
                        <AddColorFilter
                            closeAddColorDialog={closeAddColorDialog}
                            addColor={(colorInfo, colorName) =>
                            {
                                addColor(colorInfo, colorName)
                            }}
                        />
                    }

                    <div className='filter-options-container' id='scrollbar-style-1'>
                        {
                            generateColor()
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ItemFilter;