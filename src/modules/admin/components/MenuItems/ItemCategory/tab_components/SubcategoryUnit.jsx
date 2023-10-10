import React, { useState } from 'react';


import './SubcategoryUnitStyles.css';

import RemoveIcon from '../../../../svg/sharedIcons/RemoveIcon';
import EditIcon from '../../../../svg/sharedIcons/EditIcon';
import OrangeArrow from '../../../../svg/sharedIcons/OrangeArrowOpenIcon';
import WhiteArrowCloseIcon from '../../../../svg/sharedIcons/WhiteArrowCloseIcon';

import CategoryUnit from './CategoryUnit';

import { useDispatch, useSelector } from 'react-redux';
import { changeCategoryPath, getCategories, getCategoryById } from '../../../../features/adminCategory/adminCategorySlice';

const SubcategoryUnit = (props) =>
{

    const dispatch = useDispatch();

    const {
        title = '',
        img = '',
        onClick,
        idCategory,
        hasProducts,
    } = props;

    const [showSubcategories, setShowSubcategories] = useState(false);
    const { childrenCategories } = useSelector(state => state.adminCategories);

    const onClickHandle = () =>
    {
        onClick();
    }

    const showSubcategoriesHandler = () =>
    {
        setShowSubcategories(!showSubcategories);

        if (!showSubcategories)
        {
            dispatch(getCategoryById(idCategory))
        }
    }

    return (

        <div className='subcategory-unit-container'>

            <div className="subcategory-unit-heder-container" >
                <div className="left-side-main-category-unit-container">
                    <div
                        style={{ backgroundImage: `url(${img})` }}
                        className="main-category-unit-img">
                    </div>
                    <h6 className="main-category-unit-title">{title}</h6>
                </div>
                <div className="right-side-main-category-unit-container">
                    <div className="main-category-unit-control">
                        <EditIcon />
                    </div>
                    <div className="main-category-unit-control">
                        <RemoveIcon />
                    </div>
                </div>
            </div>
            <div className={!showSubcategories ?
                'subcategory-unit-subcategories-container' : 'subcategory-body-container'
            }>

                {showSubcategories &&
                    <div>
                        {
                            // childrenCategories.map((category, index) =>
                            // {
                            //     <h3>{category.name}</h3>
                            // })
                        }
                    </div>
                }

                <span className={
                    !showSubcategories ? 'show-subcategories-arrow' : 'hide-subcategories-arrow'
                } onClick={showSubcategoriesHandler}>

                    {
                        !showSubcategories ?
                            <OrangeArrow /> :
                            <WhiteArrowCloseIcon />
                    }

                </span>
            </div>

        </div>


    )
}

export default SubcategoryUnit;