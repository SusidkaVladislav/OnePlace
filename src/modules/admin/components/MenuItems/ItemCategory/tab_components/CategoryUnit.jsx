import React, { useEffect, useState } from "react";
import './CategoryUnitStyles.css';

import CustomDelete from "../../../../../../services/delete/CustomDelete";
import EditCategory from "./EditCategory";

import { useDispatch, useSelector } from "react-redux";
import { getCategories, getCategoryById, deleteCategory, updateCategory, resetState } from '../../../../features/adminCategory/adminCategorySlice';

const CategoryUnit = (props) =>
{
    const dispatch = useDispatch();

    const {
        idCategory,
        title,
        img,
        hasProducts,
        onClick,
        parentId,
    } = props;

    const { chosenCategoryId } = useSelector(state => state.adminCategories);

    const [categoryName, setCategoryName] = useState(title)
    const [categoryImgPath, setCategoryImgPath] = useState(img)

    useEffect(() =>
    {
        setCategoryName(title)
        setCategoryImgPath(img)
        
    }, [title, img])

    const onClickHandle = () =>
    {
        onClick(title, idCategory, parentId);
    }

    const deleteHandler = async (isDelete, id) =>
    {
        if (isDelete)
        {
            await dispatch(deleteCategory(id));

            if (chosenCategoryId === null)
                await dispatch(getCategories());
            else
                await dispatch(getCategoryById(chosenCategoryId));
        }
    }

    const onChangeCategoryName = (newName) =>
    {
        setCategoryName(newName);
    }

    const editCategoryHandler = async (isUpdate, categoryName, categoryId, picturePath) =>
    {
        if (isUpdate)
        {
            const categoryToUpdate = {
                id: categoryId,
                name: categoryName,
                pictureAddress: picturePath
            }
            await dispatch(updateCategory(categoryToUpdate));
            if (chosenCategoryId === null)
                await dispatch(getCategories());
            else
                await dispatch(getCategoryById(chosenCategoryId));
        }
    }

    return (
        <div className='main-category-unit-container'>
            <div className={hasProducts ? "left-side-main-category-unit-container-disabled left-side-main-category-unit-container" :
                "left-side-main-category-unit-container"}
                onClick={onClickHandle}>
                <div
                    style={{ backgroundImage: `url(${img})` }}
                    className="main-category-unit-img">
                </div>
                <h6 className="main-category-unit-title">{title}</h6>
            </div>
            <div className="right-side-main-category-unit-container">
                <div className="main-category-unit-control">
                    <EditCategory
                        categoryName={categoryName}
                        categoryId={idCategory}
                        picturePath={img}
                        onEdit={(value, categoryName, categoryId, picturePath) => { editCategoryHandler(value, categoryName, categoryId, picturePath) }}
                        onChange={onChangeCategoryName}
                    />
                </div>
                <div className={hasProducts ? "main-category-unit-control no-clickable" : "main-category-unit-control"}>
                    <CustomDelete
                        onDelete={(value) => { deleteHandler(value, idCategory) }}
                    />
                </div>
            </div>
        </div >
    )
}

export default CategoryUnit;