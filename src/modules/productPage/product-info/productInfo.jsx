import React, { useState, useEffect, useRef, Fragment } from 'react';
import './productInfo.css';

import
{
    Grid,
    Typography,
} from '@mui/material'

import BlueRightLongArrow from '../../../svg/arrows/BlueRightLongArrow';
import Divider from "../../../svg/shared-icons/Divider";
import AllAboutBroduct from '../all-about-product/AllAboutProduct';
import ProductCharacteristics from "../product-characteristics/ProductCharacteristics";
import Reviews from "../reviews/Reviews";
import MessageToAdmin from "../messages/MessageToAdmin";
import CouldInterest from '../could-interest/CouldInterest';
import { useDispatch, useSelector } from 'react-redux';
import
{
    getCategoriesForSelect
} from '../../main/features/categories/userCategorySlice';
import
{
    setActiveTab,
} from '../../main/features/products/userViewProduct';

import { getFullPath } from '../../main/services/CategoryService';
import { useNavigate } from 'react-router-dom';

const ProductInfo = () =>
{
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {
        product
    } = useSelector(state => state.userProducts);

    const {
        activeTab,
    } = useSelector(state => state.userViewProduct);

    const [activeMenuItem, setActiveMenuItem] = useState(activeTab);
    var categoryPath = useRef([]);

    const {
        categoriesForSelect
    } = useSelector(state => state.userCategories);

    const handleMenuItemClick = (menuItem) =>
    {
        setActiveMenuItem(menuItem);
    };

    useEffect(() =>
    {
        categoryPath.current = [];
        dispatch(getCategoriesForSelect())
        getFullPath(product.categoryId, categoriesForSelect, categoryPath)
        categoryPath.current = categoryPath.current.reverse();
    }, [])

    useEffect(() =>
    {
        setActiveMenuItem(activeTab)
    }, [activeTab])

    return (
        <div className='pi-container1'>
            <Grid container className="pi-categories-container">
                <Grid item>
                    <Typography
                        className="t2-medium-blue"
                        onClick={() =>
                        {
                            navigate('/')
                        }}
                        sx={{
                            '&:hover': {
                                color: '#DA8D33',
                                cursor: 'pointer',
                            }
                        }}
                    >Головна</Typography>
                </Grid>
                <Grid item className="pi-arrow-container">
                    <BlueRightLongArrow />
                </Grid>
                {
                    categoryPath.current.map((path, index) =>
                    {
                        return (
                            <Fragment
                                key={index}
                            >
                                <Grid item>
                                    <Typography
                                        className="t2-medium-blue"
                                        onClick={() =>
                                        {
                                            if (index !== categoryPath.current.length - 1)
                                                navigate('/category/' + path.id)
                                            else
                                                navigate('/products/' + path.id)
                                        }}
                                        sx={{
                                            '&:hover': {
                                                color: '#DA8D33',
                                                cursor: 'pointer',
                                            }
                                        }}
                                    >{path.name}</Typography>
                                </Grid>
                                <Grid item className="pi-arrow-container">
                                    <BlueRightLongArrow />
                                </Grid>
                            </Fragment>
                        )
                    })
                }
                <Grid item>
                    <Typography className="t2-medium-brown2">{product.name}</Typography>
                </Grid>

            </Grid>
            <Grid container className="pi-menu-container">
                <Grid item className="pi-menu-item" onClick={
                    () =>
                    {
                        handleMenuItemClick('allAboutProduct')
                        dispatch(setActiveTab('allAboutProduct'))
                    }}>
                    <Typography className={activeMenuItem === 'allAboutProduct' ? 't1-bold-orange1' : 't1-light'}>Усе про товар</Typography>
                </Grid>
                <Grid item className="pi-divider-container">
                    <Divider />
                </Grid>
                <Grid item className="pi-menu-item" onClick={
                    () =>
                    {
                        handleMenuItemClick('characteristics')
                        dispatch(setActiveTab('characteristics'))
                    }}>
                    <Typography className={activeMenuItem === 'characteristics' ? 't1-bold-orange1' : 't1-light'}>Характеристики</Typography>
                </Grid>
                <Grid item className="pi-divider-container">
                    <Divider />
                </Grid>
                <Grid item className="pi-menu-item" onClick={
                    () =>
                    {
                        handleMenuItemClick('reviews')
                        dispatch(setActiveTab('reviews'))
                    }}>
                    <Typography className={activeMenuItem === 'reviews' ? 't1-bold-orange1' : 't1-light'}>Відгуки</Typography>
                </Grid>
                <Grid item className="pi-divider-container">
                    <Divider />
                </Grid>
                <Grid item className="pi-menu-item" onClick={() =>
                {
                    handleMenuItemClick('messages')
                    dispatch(setActiveTab('messages'))
                }}>
                    <Typography className={activeMenuItem === 'messages' ? 't1-bold-orange1' : 't1-light'}>Задати питання</Typography>
                </Grid>
            </Grid>

            <div className='pi-info-container'>
                <div className={activeMenuItem === 'allAboutProduct' ? 'visible' : 'hidden'}>
                    <AllAboutBroduct />
                </div>
                <div className={activeMenuItem === 'characteristics' ? 'visible' : 'hidden'}>
                    <ProductCharacteristics />
                </div>
                <div className={activeMenuItem === 'reviews' ? 'visible' : 'hidden'}>
                    <Reviews />
                </div>
                <div className={activeMenuItem === 'messages' ? 'visible' : 'hidden'}>
                    <MessageToAdmin />
                </div>
            </div>
            <CouldInterest />
        </div>
    )
}

export default ProductInfo;