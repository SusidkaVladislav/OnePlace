import React, { useEffect, useRef } from 'react';
import Dropdown from './Dropdown';
import NestedMenuItem from './NestedMenuItem';

import MenuItem from "@mui/material/MenuItem";

import ComboBoxArrowOpenIcon from '../../svg/sharedIcons/ComboboxArrowOpenIcon';
import ArrowRight from "@mui/icons-material/ArrowRight";
import './RecursedComboStyles.css';

import { useSelector } from 'react-redux';

const RecursedCombo = (props) =>
{
    const {categoryValid} = useSelector(state => state.adminProducts)

    const {
        onCategoryClick,
        mainCategories,
        subCategories,
        category,
    } = props;



    var categories = useRef([])

    useEffect(() =>
    {
        getCategories();
    }, [])


    const getFullPath = (parentCategoryId) =>
    {
        var fullPath = [];
        var parentId = parentCategoryId;

        while (true)
        {
            let index = -1;
            index = mainCategories.current.findIndex(x => x.id === parentId);

            if (index === -1)
            {
                index = subCategories.current.findIndex(x => x.id === parentId);

                fullPath.push(subCategories.current[index].name);
                parentId = subCategories.current[index].parentCategoryId;
            }
            else
            {
                fullPath.push(mainCategories.current[index].name);
                break;
            }
        }

        return fullPath.reverse().join(' | ');
    }

    const onCatClick = (id, name, parentCategoryId) =>
    {
        var fullPath = '';
        if (parentCategoryId === null)
            fullPath = name;
        else
            fullPath = getFullPath(parentCategoryId);

        onCategoryClick(id, name, fullPath + ' | ' + name);
    }



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
                        onClick={() => onCatClick(childrens[i].id, childrens[i].name, childrens[i].parentCategoryId)}>
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
                        onClick={() => onCatClick(mainCategories.current[i].id, mainCategories.current[i].name, null)}
                    >
                        <p>{mainCategories.current[i].name}</p>
                    </MenuItem>
                )
            }

        }
    }

    const validBorderStyles = {
        border: !categoryValid ? '1px solid red' : 'none',
    }

    return (
        <Dropdown
            trigger={
                <div className='category-select' style={validBorderStyles}>
                    <label onClick={() =>
                    {
                        getCategories()
                        categories.current = [];
                    }}>
                        {
                            category.name !== undefined ? category.name : 'Категорії'
                        }
                    </label>

                    <span
                        onClick={() =>
                        {
                            getCategories()
                            categories.current = [];
                        }}>

                        <ComboBoxArrowOpenIcon />

                    </span>
                </div>
            }
            menu={categories.current}
        />
    )
}

export default RecursedCombo;