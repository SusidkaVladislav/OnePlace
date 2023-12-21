import React, { useEffect, useState } from "react";
import './CategoryUnitStyles.css';

import CustomDelete from "../../../../../../services/delete/CustomDelete";
import EditCategory from "./EditCategory";

import { useDispatch, useSelector } from "react-redux";
import
{
    getCategories,
    getCategoryById,
    deleteCategory,
    updateCategory,
    hideSuccessfulAlert,
    hideUnsuccessfulAlert,
} from '../../../../features/adminCategory/adminCategorySlice';

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


    const editCategoryHandler = async (isUpdate, categoryName, categoryId, picturePath, pictureDeletePath) =>
    {
        if (isUpdate)
        {
            const categoryToUpdate = {
                id: categoryId,
                name: categoryName,
                pictureURL: picturePath,
                deletePictureURL: pictureDeletePath,
            }
            await dispatch(updateCategory(categoryToUpdate));
            if (chosenCategoryId === null)
                await dispatch(getCategories());
            else
                await dispatch(getCategoryById(chosenCategoryId));

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


    return (
        <div className='main-category-unit-container'>
            <div className={hasProducts ? "left-side-main-category-unit-container-disabled left-side-main-category-unit-container" :
                "left-side-main-category-unit-container"}
                onClick={onClickHandle}>
                <div
                    style={{
                        backgroundImage: `url(${img})`,
                        objectFit: 'contain',
                    }}
                    className="main-category-unit-img">
                </div>
                <h6 className="main-category-unit-title">{title}</h6>
            </div>
            <div className="right-side-main-category-unit-container">
                <div className="main-category-unit-control">
                    <EditCategory
                        categoryId={idCategory}
                        imgURL={categoryImgPath}
                        categoryName={categoryName}

                        onEditHandler={(value,
                            categoryName,
                            categoryId,
                            picturePath,
                            pictureDeletePath
                        ) =>
                        {
                            editCategoryHandler(value,
                                categoryName,
                                categoryId,
                                picturePath,
                                pictureDeletePath)
                        }}
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