import React, { useEffect, useState, useRef } from 'react';
import { Grid } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom'
import './CategoriesPageStyles.css';

//#region Components&Controls
import Footer from '../../components/footer/Footer'
import CategorySelectBox from '../../controls/CategorySelectBox';
import CategoryCard from '../../controls/CategoryCard';
import Header from '../../components/header/Header';
//#endregion

import { useDispatch, useSelector } from 'react-redux';
import
{
    getCategoriesForSelect,
} from '../../features/categories/userCategorySlice';

import { getFullPath } from '../../services/CategoryService';

const CategoriesPage = () =>
{
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const params = useParams();

    const [subCategories, setSubCategories] = useState([])
    var categoryPath = useRef([]);

    const {
        isCategoryOpen,
        categoriesForSelect,
    } = useSelector(state => state.userCategories);

    const [categoryId, setCategoryId] = useState(params.id);

    useEffect(() =>
    {
        setCategoryId(params.id);
        categoryPath.current = [];
        dispatch(getCategoriesForSelect())
        getFullPath(Number(params.id), categoriesForSelect, categoryPath);
        categoryPath.current = categoryPath.current.reverse();
        getSubCategories(Number(params.id));
    }, [params.id])

    const getSubCategories = (id) =>
    {
        let sub = categoriesForSelect.filter(category => category.parentCategoryId === Number(id))
        setSubCategories(sub)
    }

    const onCategoryClickHandler = (id) =>
    {
        let hasSubCategories = categoriesForSelect.find(c => c.parentCategoryId === Number(id))

        if (hasSubCategories !== undefined)
        {
            navigate('/category/' + id)
        }
        else
        {
            navigate('/products/' + id);
        }
    }

    return (
        <div>
            <Header />
            {
                isCategoryOpen && (
                    <CategorySelectBox />
                )
            }

            <Grid
                container
                marginTop={'1.5%'}
                paddingLeft={'7%'}
            >
                {
                    <Grid
                        item
                        className='t2-medium-blue category-hover'
                        onClick={() =>
                        {
                            navigate('/')
                        }}
                        sx={
                            {
                                borderRight: '1px solid #DAD1D0',
                                padding: '0% 0.5% 0 0.5%'
                            }
                        }
                    >
                        OnePlace.ua
                    </Grid>
                }
                {
                    categoryPath.current.map((path, index) =>
                    {
                        if (categoryPath.current.length > index + 1)
                            return (
                                <Grid
                                    item
                                    key={index}
                                    className='t2-medium-blue category-hover'
                                    onClick={() =>
                                    {
                                        navigate('/category/' + path.id)
                                    }}
                                    sx={
                                        {
                                            borderRight: '1px solid #DAD1D0',
                                            padding: '0% 0.5% 0 0.5%'
                                        }
                                    }
                                >
                                    {path.name}

                                </Grid>
                            )
                        else
                        {
                            return (
                                <Grid
                                    item
                                    key={index}
                                    className='t2-bold'
                                    sx={{
                                        paddingLeft: '0.5%'
                                    }}
                                >
                                    {path.name}
                                </Grid>
                            )
                        }
                    })
                }
            </Grid>

            <h3
                style={{
                    padding: '3% 0% 0% 9%'
                }}
            >{categoryPath.current[categoryPath.current.length - 1]?.name}</h3>

            <Grid
                container
                columnSpacing={6}
                rowSpacing={2}
                justifyContent="center"
                alignItems="center"
                padding='3% 9% 5% 9%'
            >
                {
                    subCategories.map((category, index) =>
                    {
                        return (
                            <Grid
                                key={index}
                                item
                                sx={{
                                    cursor: 'pointer'
                                }}
                                onClick={() =>
                                {
                                    onCategoryClickHandler(category.id)
                                }}
                            >
                                <CategoryCard
                                    name={category.name}
                                    picture={category.pictureURL}
                                />
                            </Grid>
                        )
                    })
                }

            </Grid>

            <Footer />
        </div>
    )
}

export default CategoriesPage;