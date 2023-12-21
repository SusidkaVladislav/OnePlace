import React, { useEffect, useState, useRef } from 'react';
import
{
    Grid,
    useMediaQuery,
} from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom'
import './CategoriesPageStyles.css';

//#region Components&Controls
import Footer from '../../components/footer/Footer'
import CategorySelectBox from '../../controls/CategorySelectBox';
import CategoryCard from '../../controls/category-card/CategoryCard';
import CategoryPhoneCard from '../../controls/category-card/CategoryPhoneCard';
import Header from '../../components/header/Header';
//#endregion

import { useDispatch, useSelector } from 'react-redux';
import
{
    getCategoriesForSelect,
    setIsCategoryOpen,
} from '../../features/categories/userCategorySlice';

import { getFullPath } from '../../services/CategoryService';

import BrownLeftArrow40x40Icon from '../../../../svg/arrows/BrownLeftArrow40x40Icon'


const LOCAL_STORAGE_RELOAD_KEY = "firstLoadPageProductCategories";
const NO_SERVER_CONNECTION_PATH = "/no_server_connection";
const CategoriesPage = () =>
{
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const params = useParams();

    const sm = useMediaQuery('(min-width: 600px)');
    const sm2 = useMediaQuery('(min-width: 750px)');
    const md = useMediaQuery('(min-width: 900px)');
    const md2 = useMediaQuery('(min-width:1000px)');
    const lg = useMediaQuery('(min-width: 1200px)');
    const xlg = useMediaQuery('(min-width: 1400px)');

    const [subCategories, setSubCategories] = useState([])
    var categoryPath = useRef([]);

    const {
        isCategoryOpen,
        categoriesForSelect,
        categoryServerConnectionError,
    } = useSelector(state => state.userCategories);

    const [categoryId, setCategoryId] = useState(params.id);

    useEffect(() =>
    {
        window.scrollTo(0, 0);
        localStorage.removeItem(LOCAL_STORAGE_RELOAD_KEY);
        dispatch(getCategoriesForSelect())
        setCategoryId(params.id);
        if (Number(params.id) > 0)
        {
            categoryPath.current = [];

            getFullPath(Number(params.id), categoriesForSelect, categoryPath);
            categoryPath.current = categoryPath.current.reverse();
            getSubCategories(Number(params.id));
        }

    }, [params.id])

    const [step, setStep] = useState(2);

    useEffect(() =>
    {
        const handleResize = () =>
        {
            const isLg = window.matchMedia('(min-width: 1200px)').matches;
            const isMd = window.matchMedia('(min-width: 900px)').matches;

            if (isLg)
            {
                setStep(4);
            } else if (isMd)
            {
                setStep(3);
            } else
            {
                setStep(2);
            }
        };

        handleResize();

        window.addEventListener('resize', handleResize);

        return () =>
        {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    useEffect(() =>
    {
        if (step === 2)
        {
            dispatch(setIsCategoryOpen(false))
        }
    }, [step]);

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

    if (categoryServerConnectionError)
    {
        navigate(NO_SERVER_CONNECTION_PATH)
    }
    return (
        <div>
            <Header />
            {
                md &&
                isCategoryOpen && (
                    <CategorySelectBox />
                )
            }

            <Grid
                display={categoryId > 0 ? 'flex' : 'none'}
                container
                marginTop={md ? '1.5%' : '3%'}
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

            <Grid
                item
                display={categoryId > 0 ? 'flex' : 'none'}
                container
                direction='row'
                xs={12}
                justifyContent={'space-between'}
                sx={{
                    paddingLeft: '10%',
                    marginTop: '2%',
                }}
            >
                {
                    !md && <Grid
                        item
                        container
                        xs={2}
                    >
                        <span

                            style={{
                                cursor: 'pointer',
                            }}
                            onClick={() =>
                            {
                                navigate(-1)
                            }}
                        >
                            <BrownLeftArrow40x40Icon />
                        </span>

                    </Grid>
                }
                <Grid
                    container
                    item
                    xs={10}
                    sx={{
                        paddingTop: '4px'
                    }}
                >
                    <h3>{categoryPath.current[categoryPath.current.length - 1]?.name}</h3>
                </Grid>
            </Grid>


            <Grid
                container
                item
                xs={12}
                rowSpacing={2}
                justifyItems="center"
                alignItems="center"
                paddingLeft={
                    xlg ? '9%' :
                        lg ? '4.5%' :
                            md2 ? '5%' :
                                md ? '' :
                                    sm2 ? '12%' :
                                        sm ? '4.3%' : ''
                }
                paddingRight={
                    xlg ? '9%' :
                        lg ? '4.5%' :
                            md2 ? '5%' :
                                md ? '' :
                                    sm2 ? '12%' :
                                        sm ? '4.3%' : ''
                }
                marginTop={'10px'}
                marginBottom={'150px'}
            >
                {
                    categoryId > 0 ?
                        subCategories?.map((category, index) =>
                        {
                            return (
                                <Grid
                                    key={index}
                                    item
                                    container
                                    justifyContent={'center'}
                                    lg={3}
                                    md={4}
                                    sm={6}
                                    xs={6}
                                    sx={{
                                        cursor: 'pointer'
                                    }}
                                    onClick={() =>
                                    {
                                        onCategoryClickHandler(category?.id)
                                    }}
                                >
                                    {
                                        sm ? <CategoryCard
                                            name={category?.name}
                                            picture={category?.pictureURL}
                                        /> : <CategoryPhoneCard
                                            bgColor={'#E9ECEC'}
                                            name={category?.name}
                                            picture={category?.pictureURL}
                                        />
                                    }

                                </Grid>
                            )
                        })
                        :
                        categoriesForSelect.map((category, index) =>
                        {
                            return (
                                category?.parentCategoryId === null && <Grid
                                    key={index}
                                    item
                                    container
                                    justifyContent={'center'}
                                    lg={3}
                                    md={4}
                                    sm={6}
                                    xs={6}
                                    sx={{
                                        cursor: 'pointer'
                                    }}
                                    onClick={() =>
                                    {
                                        onCategoryClickHandler(category?.id)
                                    }}
                                >
                                    {
                                        sm ? <CategoryCard
                                            name={category?.name}
                                            picture={category?.pictureURL}
                                        /> : <CategoryPhoneCard
                                            bgColor={'#E9ECEC'}
                                            name={category?.name}
                                            picture={category?.pictureURL}
                                        />
                                    }

                                </Grid>
                            )
                        })
                }

            </Grid>

            <Footer />
        </div >
    )
}

export default CategoriesPage;