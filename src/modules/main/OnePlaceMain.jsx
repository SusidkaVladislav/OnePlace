import React, { useEffect, useState } from 'react';
import Header from './components/header/Header';
import Banner1 from './components/banner1/Banner1';
import Banner2 from './components/banner2/Banner2';
import SpecialOffers from './components/special_offers/SpecialOffers';
import BestChoice from './components/bestChoice/bestChoice';
import CategorySelection from './components/category_selection/CategorySelection';
import Footer from './components/footer/Footer';
import { useSelector, useDispatch } from 'react-redux';
import
{
    getAllRecommendedProducts,
} from '../main/features/products/userProductSlice';
import
{
    getCategoriesForSelect
} from '../main/features/categories/userCategorySlice';
import LoadingAnimation from '../../common-elements/loading/LoadingAnimation';
import { useNavigate } from 'react-router-dom';

const NO_SERVER_CONNECTION_PATH = "/no_server_connection";
const OnePlaceMain = () =>
{
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {
        loadingRecommendedProducts,
        productServerConnectionError,
    } = useSelector(state => state.userProducts)

    const {
        loading,
        categoryServerConnectionError,
    } = useSelector(state => state.userCategories)

    const [recommendedCategories, setRecommendedCategories] = useState([]);
    const [recommendedSubCategories, setRecommendedSubCategories] = useState([]);
    const [productsInCart, setProductsInCart] = useState([]);

    useEffect(() =>
    {
        dispatch(getAllRecommendedProducts())

        dispatch(getCategoriesForSelect()).then((data) =>
        {
            if (data?.payload !== null)
            {
                let categories = [];
                let subCategories = [];

                data?.payload?.map((category, index) =>
                {

                    if (category?.parentCategoryId === null)
                    {

                        if (categories.length < 5)
                        {
                            categories.push(category);
                        }
                    }
                    if (categories.some(c => c.id === category?.parentCategoryId))
                    {
                        const count = subCategories.filter(c =>
                            c.parentCategoryId === category?.parentCategoryId
                        ).length;

                        if (count < 4)
                        {
                            subCategories.push(category);
                        }
                    }
                })
                setRecommendedCategories(categories);
                setRecommendedSubCategories(subCategories);
            }
        })

        if (localStorage.getItem('cart') === null)
        {
            localStorage.setItem('cart', JSON.stringify([]))
        }

        if (localStorage.getItem('recommendedNumber') === null)
        {
            localStorage.setItem('recommendedNumber', 3)
        }

        let cart = [];
        let cartFromLocalStorage = JSON.parse(localStorage.getItem('cart'));
        if (cartFromLocalStorage !== null)
        {
            Object.values(cartFromLocalStorage).forEach(item =>
            {
                cart.push(item);
            });
        }
        setProductsInCart(cart);
    }, [])

    if (productServerConnectionError || categoryServerConnectionError)
    {
        navigate(NO_SERVER_CONNECTION_PATH)
        return<></>;
    }
    if (loadingRecommendedProducts)
    {
        return <LoadingAnimation />
    }
    if (loading)
    {
        return <LoadingAnimation />
    }
    return (
        <div>
            <Header />
            <Banner1 />
            <BestChoice
                productsInCart={productsInCart}
            />
            {
                recommendedCategories?.length > 1 && <CategorySelection
                    id={recommendedCategories[0]?.id}
                    categoryName={recommendedCategories[0]?.name}
                    items={recommendedSubCategories?.filter(c =>
                    {
                        if (c?.parentCategoryId === recommendedCategories[0]?.id)
                            return c;
                    })}
                />
            }
            {
                recommendedCategories?.length > 2 && <CategorySelection
                    id={recommendedCategories[1]?.id}
                    categoryName={recommendedCategories[1]?.name}
                    items={recommendedSubCategories?.filter(c =>
                    {
                        if (c?.parentCategoryId === recommendedCategories[1]?.id)
                            return c;
                    })}
                />
            }
            <Banner2 />
            {
                recommendedCategories.length > 3 && <CategorySelection
                    id={recommendedCategories[2]?.id}
                    categoryName={recommendedCategories[2]?.name}
                    items={recommendedSubCategories?.filter(c =>
                    {
                        if (c?.parentCategoryId === recommendedCategories[2]?.id)
                            return c;
                    })}
                />
            }
            {
                recommendedCategories.length > 4 && <CategorySelection
                    id={recommendedCategories[3]?.id}
                    categoryName={recommendedCategories[3]?.name}
                    items={recommendedSubCategories?.filter(c =>
                    {
                        if (c?.parentCategoryId === recommendedCategories[3]?.id)
                            return c;
                    })}
                />
            }
            {
                recommendedCategories.length === 5 && <CategorySelection
                    id={recommendedCategories[4]?.id}
                    categoryName={recommendedCategories[4]?.name}
                    items={recommendedSubCategories?.filter(c =>
                    {
                        if (c?.parentCategoryId === recommendedCategories[4]?.id)
                            return c;
                    })}
                />
            }
            <SpecialOffers />
            <Footer />
        </div>
    )
}

export default OnePlaceMain;