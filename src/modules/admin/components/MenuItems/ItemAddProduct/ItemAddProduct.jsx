import React, { useState, useEffect, useRef } from 'react';

import ArrowRight from "@mui/icons-material/ArrowRight";
import ComboBoxArrowOpenIcon from '../../../svg/sharedIcons/ComboboxArrowOpenIcon';

import './ItemAddProductStyles.css';

import Dropdown from "./Dropdown";

import MenuItem from "@mui/material/MenuItem";
import NestedMenuItem from "./NestedMenuItem";

import { useDispatch, useSelector } from 'react-redux';
import { getCategoriesForSelect } from '../../../features/adminCategory/adminCategorySlice';
import { setCategory, getAllBrands, getAllCountries } from '../../../features/adminProduct/adminProductSlice';

import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

const ItemAddProduct = () =>
{
    const dispatch = useDispatch();
    const { categoriesForSelect } = useSelector(state => state.adminCategories)
    const { category, allBrands, allCountries } = useSelector(state => state.adminProducts);


    var mainCategories = useRef([])
    var subCategories = useRef([])
    var categories = useRef([])

    useEffect(() =>
    {
        dispatch(getCategoriesForSelect())
        dispatch(getAllBrands());
        dispatch(getAllCountries());
        getCategories();

        mainCategories.current = categoriesForSelect.filter((category) => category.parentCategoryId === null)
        subCategories.current = categoriesForSelect.filter((category) => category.parentCategoryId !== null)
    }, [])


    const getSubcategories = (childrens) =>
    {
        var result = [];
        for (let i = 0; i < childrens.length; i++)
        {

            var subCat = subCategories.current.filter((c) => c.parentCategoryId === childrens[i].id);
            if (subCat.length > 0)
            {
                result.push(
                    <NestedMenuItem
                        label={childrens[i].name}
                        rightIcon={<ArrowRight />}
                        menu={getSubcategories(subCat)}
                    />
                )
            }
            else
            {
                result.push(
                    <MenuItem
                        onClick={() => { dispatch(setCategory({ id: childrens[i].id, name: childrens[i].name })) }}
                    >
                        <p>{childrens[i].name}</p>
                    </MenuItem>
                )
            }
        }
        return result;
    }

    const getCategories = () =>
    {
        var subcategories = [];
        for (let i = 0; i < mainCategories.current.length; i++)
        {
            subcategories = subCategories.current.filter((sub) => sub.parentCategoryId === mainCategories.current[i].id);
            if (subcategories.length > 0)
            {
                categories.current.push(
                    <NestedMenuItem
                        label={mainCategories.current[i].name}
                        rightIcon={<ArrowRight />}
                        menu={getSubcategories(subcategories)}
                    />)
            }
            else
            {
                categories.current.push(
                    <MenuItem
                        onClick={() =>
                        {
                            dispatch(setCategory({ id: mainCategories.current[i].id, name: mainCategories.current[i].name }))
                        }}
                    >
                        <p>{mainCategories.current[i].name}</p>
                    </MenuItem>
                )
            }

        }
    }

    return (
        <div className="add-product-main-container">
            <div className='add-product-left-side-container-1'>

                <Dropdown
                    trigger={<div className='category-select'>
                        <label>{category.name}</label>
                        <ComboBoxArrowOpenIcon /></div>}
                    menu={categories.current}
                />

                <Autocomplete
                    autoHighlight={true}
                    options={allBrands.map((brand) => brand.name)}
                    sx={{
                        width: '424px',
                        borderRadius: '10px',
                        backgroundColor: '#F6F6F6'
                    }}
                    //getOptionDisabled={}
                    renderInput={(params) => <TextField {...params} label="Бренд" />}
                />

            </div>
            <div className='add-product-right-side-container-1'>
                <div className='add-product-name-container'>
                    <label htmlFor="product-name-input">Назва</label>
                    <input className='product-add-name' type='text' id='product-name-input' />
                </div>
                <Autocomplete
                    autoHighlight={true}
                    options={allCountries.map((country) => country.name)}
                    sx={{
                        width: '424px',
                        borderRadius: '10px',
                        backgroundColor: '#F6F6F6'
                    }}
                    //getOptionDisabled={}
                    renderInput={(params) => <TextField {...params} label="Країна виробник" />}
                />
            </div>
        </div>
    )
}

export default ItemAddProduct;


// <NestedMenuItem
//     label="New"
//     rightIcon={<ArrowRight />}

//     menu={[

//         <MenuItem
//             onClick={() =>
//             {
//                 console.log("clicked");
//             }}
//         >
//             Document
//         </MenuItem>,

//         <MenuItem>
//             From Markdown file
//         </MenuItem>,

//         <MenuItem>
//             From HTML file
//         </MenuItem>
//     ]}
// />,

// <NestedMenuItem
//     label="Save as"
//     rightIcon={<ArrowRight />}
//     menu={[

//         <MenuItem
//             onClick={() =>
//             {
//                 console.log("clicked");
//             }}
//         >
//             Markdown
//         </MenuItem>,

//         <MenuItem
//             onClick={() =>
//             {
//                 console.log("clicked");
//             }}
//         >
//             Plain HTML
//         </MenuItem>,

//         <MenuItem
//             onClick={() =>
//             {
//                 console.log("clicked");
//             }}
//         >
//             Styled HTML
//         </MenuItem>
//     ]}
// />,

// <NestedMenuItem
//     label="Export"
//     rightIcon={<ArrowRight />}
//     menu={[
//         <NestedMenuItem
//             label="Category"
//             rightIcon={<ArrowRight />}
//             menu={[
//                 <MenuItem>
//                     1
//                 </MenuItem>,
//                 <MenuItem>
//                     2
//                 </MenuItem>,
//                 <MenuItem>
//                     3
//                 </MenuItem>
//             ]}
//         />,
//         <MenuItem
//             onClick={() =>
//             {
//                 console.log("clicked");
//             }}
//         >
//             Github Gist
//         </MenuItem>
//     ]}
// />