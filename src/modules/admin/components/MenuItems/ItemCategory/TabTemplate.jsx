import React, { useState, useEffect } from 'react';

//#region Material Design
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
//#endregion

import CategoryUnit from './tab_components/CategoryUnit'

import LoadingIcon from "../../../../../svg/animations/LoadingAnimation.gif"

import { useDispatch, useSelector } from 'react-redux';
import { changeCategoryPath, getCategories, getCategoryById, sliceCategoryPath, resetPath } from '../../../features/adminCategory/adminCategorySlice';

const TabTemplate = () =>
{
    //#region Styles
    const tabLabelStyle =
    {
        color: '#F6F6F6',
        fontSize: '16px',
        fontFamily: 'Montserrat Alternates',
        fontWeight: '500',
        lineHeight: '20.80px',
        wordWrap: 'break-word'
    }
    //#endregion

    const dispatch = useDispatch();

    const [value, setValue] = useState('1');
    const [showSubcategory, setShowSubcategory] = useState('hidden');


    const {
        mainCategories,
        categoryPath,
        childrenCategories,
        loading, } = useSelector(state => state.adminCategories);

    const categoriesByPath = async (event) =>
    {
        await dispatch(sliceCategoryPath({ id: event.target.value }))
        await dispatch(getCategoryById(event.target.value));
    }

    const handleChangeTab = (event, newValue) =>
    {
        setValue(newValue);

        if (newValue === '1')
        {
            dispatch(resetPath())
        }
        if (newValue === '2')
        {

        }
    };

    const onMainCategoryClickHandle = async (title, idCategory) =>
    {
        setShowSubcategory('visible');
        await dispatch(getCategoryById(idCategory));
        await dispatch(changeCategoryPath({ title: title, id: idCategory }));
        setValue('2');
    }

    useEffect(() =>
    {
        dispatch(getCategories());
        dispatch(resetPath())
    }, [])

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
        <div className='category-main-container'>
            <Box>

                <div className='path-category-container'>
                    <ul className='path-category-list'>
                        {
                            categoryPath.map((path, index) =>
                            (
                                <li
                                    key={index}
                                    onClick={categoriesByPath}
                                    value={path.id}
                                >{path.title}</li>
                            ))
                        }
                    </ul>
                </div>

                <TabContext value={value}>
                    <Box>
                        <TabList onChange={handleChangeTab} className='tab-list'>

                            <Tab
                                label="Категорії"
                                sx={tabLabelStyle}
                                className={
                                    value === '1' ?
                                        'tab checked-tab' : 'tab'}
                                value="1"
                                onClick={() =>
                                {
                                    setShowSubcategory('hidden');
                                }}
                            />

                            <Tab
                                label="Підкатегорії"
                                sx={tabLabelStyle}
                                className={
                                    value === '2' ?
                                        'tab checked-tab' : 'tab'}
                                value="2"
                                style={{ visibility: showSubcategory }}
                            />

                        </TabList>
                    </Box>

                    <div className='category-items-container' id='scrollbar-style-1'>

                        <TabPanel value='1' className='tab-panel'>
                            {
                                mainCategories.map((category, index) => (
                                    <CategoryUnit
                                        key={index}
                                        idCategory={category.id}
                                        title={category.name}
                                        img={category.pictureURL}
                                        deletePictureUrl={category.deletePictureURL}
                                        hasProducts={category.hasProducts}
                                        onClick={onMainCategoryClickHandle} />
                                ))

                            }
                        </TabPanel>

                        <TabPanel value='2' className='tab-panel'>
                            {
                                childrenCategories.map((category, index) => (
                                    <CategoryUnit
                                        key={index}
                                        idCategory={category.id}
                                        title={category.name}
                                        img={category.pictureURL}
                                        deletePictureUrl={category.deletePictureURL}
                                        hasProducts={category.hasProducts}
                                        parentId={category.parentId}
                                        onClick={onMainCategoryClickHandle}
                                    />
                                ))
                            }
                        </TabPanel>
                    </div>
                </TabContext>
            </Box>
        </div>

    )
}

export default TabTemplate;