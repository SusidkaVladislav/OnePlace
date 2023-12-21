import React, { useEffect, useState } from 'react';
import { Grid, Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import
{
    setIsCategoryOpen,
} from '../features/categories/userCategorySlice';

import ClickAwayListener from '@mui/material/ClickAwayListener';
import './CategorySelectBoxStyles.css';

const LOCAL_STORAGE_RELOAD_KEY = "firstLoadPageProductCategories";
const CategorySelectBox = () =>
{
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [secondLevelCategories, setSecondLevelCategories] = useState([]);
    const [categoriesOfSubcategories, setCategoriesOfSubcategories] = useState([]);

    const {
        categoriesForSelect
    } = useSelector(state => state.userCategories)

    useEffect(() =>
    {
        let index = categoriesForSelect.findIndex(c => c.parentCategoryId === null)
        if (index !== -1)
        {
            getSubCategories(index)
        }
    }, [])

    const getSubCategories = (id) =>
    {
        var secondLevelCategories = [];

        categoriesForSelect.map((category, index) =>
        {
            if (category.parentCategoryId === id)
            {
                secondLevelCategories.push(category)
            }
        })
        setSecondLevelCategories(secondLevelCategories)

        var subSecondLevelCategories = [];
        var count = 0;

        secondLevelCategories.map((subCategory) =>
        {
            categoriesForSelect.map((category) =>
            {
                if (subCategory.id === category.parentCategoryId)
                {
                    let i = subSecondLevelCategories.findLastIndex(c => c.key === subCategory.id);
                    if (i !== -1)
                        count = subSecondLevelCategories[i]?.count + 1;
                    else
                        count = 0;

                    subSecondLevelCategories.push({
                        key: subCategory.id,
                        value: category,
                        count: count
                    })
                }
            })
        })

        setCategoriesOfSubcategories(subSecondLevelCategories)
    }

    const goToClickedCategoryPage = (id) =>
    {
        let hasSubCategories = categoriesForSelect.find(c => c.parentCategoryId === Number(id))

        if (hasSubCategories !== undefined)
        {
            dispatch(setIsCategoryOpen(false));
            navigate('/category/' + id);
        }
        else
        {
            localStorage.removeItem(LOCAL_STORAGE_RELOAD_KEY);
            dispatch(setIsCategoryOpen(false));
            navigate('/products/' + id);
        }
    }

    return (
        <ClickAwayListener onClickAway={() =>
        {
            dispatch(setIsCategoryOpen(false))
        }}>
            <Grid
                container
                height='65%'
                width='90%'
                position={'absolute'}
                bgcolor={'var(--gray3)'}
                marginLeft={'5%'}
                marginRight={'5%'}
                borderRadius={'10px'}
                zIndex={1}
            >
                <Stack
                    direction={'column'}
                    width={'100%'}
                    height={'100%'}
                >
                    <div style={{
                        height: '5%',
                        width: '100%',
                        background: '#E3AA66',
                        borderRadius: '10px 10px 0px 0px'
                    }} />

                    <Grid
                        container
                        item
                        height='95%'
                        width='100%'
                        paddingTop={'2%'}
                    >
                        <Grid
                            id='scrollbar'
                            container
                            item
                            height='100%'
                            width='30%'
                            borderRadius={'0px 0px 0px 10px'}
                            direction={'column'}
                            spacing={2}
                            padding={'0% 1% 2% 6%'}
                            gap={'3%'}
                            sx={{ overflow: 'auto' }}
                            wrap='nowrap'
                        >
                            {
                                categoriesForSelect.map((category, index) =>
                                {
                                    if (category.parentCategoryId === null)
                                    {
                                        return (
                                            <Stack
                                                key={index}
                                                width={'100%'}
                                                height={'100%'}
                                                maxHeight={'10%'}
                                                direction={'row'}
                                                alignContent={'center'}
                                                spacing={2}
                                                sx={{
                                                    '&:hover': {
                                                        backgroundColor: 'var(--orange2)',
                                                        borderRadius: '0px 40px 40px 0px',
                                                        cursor: 'pointer',
                                                        '& .t1-bold': {
                                                            color: '#FFFFFF',
                                                        },
                                                    },
                                                    alignItems: 'center',
                                                    padding: '6px'
                                                }}
                                                onMouseOver={() =>
                                                {
                                                    getSubCategories(category.id)
                                                }}
                                            >
                                                <img src={category.pictureURL} alt='category logo' width={25} height={25}
                                                    style={{
                                                        borderRadius: '5px',
                                                        objectFit: 'contain',
                                                    }} />
                                                <span key={index} className="t1-bold">{category.name}</span>
                                            </Stack>
                                        )
                                    }
                                    return null;
                                })
                            }
                        </Grid>

                        <Grid
                            container
                            item
                            height='100%'
                            width='70%'
                            borderRadius={'0px 0px 10px 0px'}
                        >
                            <Grid
                                id='scrollbar'
                                container
                                item
                                width={'100%'}
                                height={'100%'}
                                paddingLeft={'5%'}
                                paddingRight={'5%'}
                                columns={{ xs: 4, sm: 8, md: 12 }}
                                overflow={'auto'}
                            >
                                {
                                    secondLevelCategories.map((category, index) =>
                                    {
                                        return (
                                            <Grid
                                                key={index + category.name.length * 123}
                                                item
                                                xs={4}
                                                height={'50%'}
                                                overflow={'hidden'}
                                                className="t1-bold-blue"
                                                borderBottom={'1px solid lightgrey'}
                                                marginBottom={'2%'}
                                            >
                                                {
                                                    <span className='category-title'
                                                        onClick={
                                                            () => { goToClickedCategoryPage(category.id) }
                                                        }
                                                    >
                                                        {category.name}
                                                    </span>
                                                }
                                                {
                                                    categoriesOfSubcategories.map((subCategory, index) =>
                                                    {
                                                        if (subCategory.key === category.id)
                                                        {
                                                            if (subCategory.count <= 4)
                                                            {
                                                                return (
                                                                    <Grid
                                                                        key={index + subCategory.count + index + 1 + subCategory.key * 12}
                                                                        item
                                                                        width={'80%'}
                                                                        height={'fit-content'}
                                                                        className='t2-light'
                                                                        padding={'4px 4px 4px 0px'}
                                                                        overflow={'clip'}
                                                                        sx={{
                                                                            '&:hover': {
                                                                                cursor: 'pointer',
                                                                                color: 'var(--orange1)'
                                                                            },
                                                                        }}
                                                                        onClick={() => { goToClickedCategoryPage(subCategory.value.id) }}
                                                                    >
                                                                        {
                                                                            subCategory.value.name
                                                                        }
                                                                    </Grid>
                                                                )
                                                            }
                                                            else if (subCategory.count === 5)
                                                            {
                                                                return (
                                                                    <p
                                                                        key={subCategory.count + index * 234}
                                                                        className='t2-medium-500 category-title'
                                                                        onClick={() =>
                                                                        {
                                                                            goToClickedCategoryPage(category.id);
                                                                        }}
                                                                    >більше</p>
                                                                )
                                                            }
                                                            else
                                                            {
                                                                return null;
                                                            }
                                                        }
                                                    })
                                                }

                                            </Grid>
                                        )
                                    })
                                }
                            </Grid>
                        </Grid>
                    </Grid>
                </Stack>
            </Grid >
        </ClickAwayListener >
    )
}

export default CategorySelectBox;