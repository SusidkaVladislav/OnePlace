import React, { useEffect, useState, useRef, Fragment } from 'react';
import './ProductsByCategoryPageStyles.css';
import { useParams, useNavigate } from 'react-router-dom'
import
{
    Grid,
    Stack,
    useMediaQuery,
} from '@mui/material'

//#region Components & controls
import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';
import CategorySelectBox from '../../controls/CategorySelectBox';
import ProductCard from '../../controls/ProductCard';
//#endregion

//#region Services
import ClientPagination from '../../../../services/pagination/ClientPagination';
import { getFullPath } from '../../services/CategoryService';
import FilterShowArrow from './elements/FilterShowArrow';
//#endregion

//#region Redux
import { useDispatch, useSelector } from 'react-redux';
import
{
    getCategoriesForSelect
} from '../../features/categories/userCategorySlice';

import
{
    getProductsByFilters,
    resetErrorProduct,
} from '../../features/products/userProductSlice';

import
{
    getCategoryProductsInfo
} from '../../features/analitics/userAnaliticSlice';

import
{
    getUserCart,
} from '../../features/basket/cartSlice';

//#endregion

//#region Icons
import BackArrow from '../../../../svg/arrows/BackArrow';
import GreenCheckCheckboxIcon from '../../../../svg/shared-icons/GreenCheckCheckboxIcon';
import CloseFiltersIcon from '../../../../svg/shared-icons/CloseFiltersIcon';
import OpenFiltersIcon from '../../../../svg/shared-icons/OpenFiltersIcon';
import BackRightArrowIcon from '../../../../svg/arrows/BackRightArrowIcon';
//#endregion

const PAGE_SIZE = 7;
const LOCAL_STORAGE_FILTER_KEY = "filtersSet"
const LOCAL_STORAGE_RELOAD_KEY = "firstLoadPageProductCategories";

const ProductsByCategoryPage = () =>
{
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const params = useParams();

    const xs = useMediaQuery('(min-width: 0px)');
    const sm = useMediaQuery('(min-width: 600px)');
    const sm1 = useMediaQuery('(min-width: 650px)');
    const md = useMediaQuery('(min-width: 900px)');
    const md1 = useMediaQuery('(min-width: 1050px)');
    const lg = useMediaQuery('(min-width: 1200px)');
    const lg1 = useMediaQuery('(min-width: 1400px)');

    const [currentProductPage, setCurrentProductPage] = useState(
        JSON.parse(localStorage.getItem(LOCAL_STORAGE_FILTER_KEY)) !== null &&
            JSON.parse(localStorage.getItem(LOCAL_STORAGE_FILTER_KEY)) !== undefined ?
            JSON.parse(localStorage.getItem(LOCAL_STORAGE_FILTER_KEY))?.page : 1
    );

    const [categoryId, setCategoryId] = useState(params.id);
    var categoryPath = useRef([]);

    const [showHideFilterOptions, setShowHideFilterOptions] = useState([])

    const [filtersSet, setFiltersSet] = useState({});
    const [minPrice, setMinPrice] = useState(Number(filtersSet.minPrice) > 0 && filtersSet.minPrice !== null ? Number(filtersSet.minPrice) : null)
    const [maxPrice, setMaxPrice] = useState(Number(filtersSet.maxPrice) > 0 && filtersSet.maxPrice !== null ? Number(filtersSet.maxPrice) : null)

    const [productsInCart, setProductsInCart] = useState([]);

    const {
        isCategoryOpen,
        categoriesForSelect
    } = useSelector(state => state.userCategories);

    const {
        products,
        loadingProduct,

        isErrorProduct
    } = useSelector(state => state.userProducts)

    const {
        productInfoFilters,
    } = useSelector(state => state.userAnalitic)

    const [isFiltersUploaded, setIsFiltersUploaded] = useState(false)

    const [isFiltersShown, setIsFiltersShown] = useState(true)

    const filtersModel = {
        page: currentProductPage,
        limit: PAGE_SIZE,
        minPrice: null,
        maxPrice: null,
        colors: null,
        manufacturerCountries: null,
        manufacturers: null,
        category: Number(params.id),
        descriptions: null,
        withDiscount: null
    }

    useEffect(() =>
    {
        if (localStorage.getItem("cart") === null)
            localStorage.setItem("cart", JSON.stringify([]));

        dispatch(resetErrorProduct());

        //Якщо користувач авторизований, то з БД підтягуєтсья корзина того коритсувача,
        // якщо не авторизований, то нічого не міняєтсья
        dispatch(getUserCart());

        var filters = JSON.parse(localStorage.getItem(LOCAL_STORAGE_FILTER_KEY));
        //Тут також йде перевірка чи на сторінка просто перезагружається, чи на неї йде перехід з якоїсь іншої сторніки
        //Потрібне для того визначити чи скинути фільтри до початкових значень чи залишити вибрані (якщо сторінка лише перезагружається)
        if (filters !== null && filters.category === Number(params.id) && localStorage.getItem(LOCAL_STORAGE_RELOAD_KEY) !== null)
        {
            setFiltersSet(filters);
            localStorage.setItem(LOCAL_STORAGE_RELOAD_KEY, true)
        }
        else
        {
            if (localStorage.getItem(LOCAL_STORAGE_RELOAD_KEY) !== null)
            {
                filters = filtersModel;
            }
            else
            {
                filters = {
                    page: 1,
                    limit: PAGE_SIZE,
                    minPrice: null,
                    maxPrice: null,
                    colors: null,
                    manufacturerCountries: null,
                    manufacturers: null,
                    category: Number(params.id),
                    descriptions: null,
                    withDiscount: null
                }
            }

            setFiltersSet(filters)
            localStorage.setItem(LOCAL_STORAGE_FILTER_KEY, JSON.stringify(filters));
            localStorage.setItem(LOCAL_STORAGE_RELOAD_KEY, true)
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


        setCategoryId(params.id)
        categoryPath.current = [];

        dispatch(getCategoriesForSelect())
        // .unwrap().catch((error) =>
        // {
        //     if (error.status === 500)
        //         navigate('server-connection-error')
        // })

        dispatch(getProductsByFilters(filters))
        // .unwrap().catch((error) =>
        // {
        //     if (error.status === 500)
        //         navigate('server-connection-error')
        // })

        dispatch(getCategoryProductsInfo(params.id))
            //.unwrap()
            .then(({ payload }) =>
            {
                var falseFilterOptions = [];
                Object.keys(payload).forEach((key, index) =>
                {
                    if (Object.keys(payload).length - 1 === index)
                    {
                        Object.keys(payload[key]).forEach(element =>
                        {
                            falseFilterOptions.push(false)
                        });
                    }
                    else
                    {
                        falseFilterOptions.push(false)
                    }
                })
                setShowHideFilterOptions(falseFilterOptions)
                setIsFiltersUploaded(true)
            })
        // .catch((error) =>
        // {
        //     if (error.status === 500)
        //         navigate('server-connection-error')
        // })

        getFullPath(Number(params.id), categoriesForSelect, categoryPath)
        categoryPath.current = categoryPath.current.reverse();
        setShowHideFilterOptions([])
    }, [params.id, currentProductPage])


    const filterCheckHandler = async (filters) =>
    {
        setFiltersSet(filters);
        await dispatch(getProductsByFilters(filters));
    }

    const handlerKeyDown = (event) =>
    {
        if (event.which === 69 || event.which === 189
            || event.which === 107 || event.which === 109
            || event.which === 190 || event.which === 187)
        {
            event.preventDefault();
        }
    }

    const handlerFilterByPrice = () =>
    {
        let tmpFiltersSet = filtersSet;
        tmpFiltersSet.maxPrice = Number(maxPrice) === 0 ? null : Number(maxPrice)
        tmpFiltersSet.minPrice = Number(minPrice) === 0 ? null : Number(minPrice);

        tmpFiltersSet.page = 1;
        localStorage.setItem(LOCAL_STORAGE_FILTER_KEY, JSON.stringify(tmpFiltersSet));
        filterCheckHandler(tmpFiltersSet)
    }

    // if (isErrorProduct)
    // {
    //     localStorage.setItem(LOCAL_STORAGE_FILTER_KEY, JSON.stringify(filtersModel));
    //     setCurrentProductPage(1);
    // }

    if (loadingProduct)
    {
        return <></>
    }
    if (!isFiltersUploaded)
    {
        return <></>
    }
    return (
        <Grid>

            {/* {
                successfulAlertShow &&
                <div className='modal-backdrop'>
                    <SuccessfulNotification notifiaction={actionNotification} />
                </div>
            }
            {
                unsuccessfulAlertShow &&
                <div className='modal-backdrop'>
                    <UnsuccessfulNotification notifiaction={actionNotification} />
                </div>
            } */}

            <Header />
            {
                md &&
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
                            localStorage.removeItem(LOCAL_STORAGE_RELOAD_KEY);
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
                    categoryPath.current?.map((path, index) =>
                    {
                        if (categoryPath.current?.length > index + 1)
                            return (
                                <Grid
                                    item
                                    key={index}
                                    className='t2-medium-blue category-hover'
                                    onClick={() =>
                                    {
                                        navigate('/category/' + path?.id)
                                    }}
                                    sx={
                                        {
                                            borderRight: '1px solid #DAD1D0',
                                            padding: '0% 0.5% 0 0.5%'
                                        }
                                    }
                                >
                                    {path?.name}

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
                                    {path?.name}
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
            >{categoryPath.current[categoryPath.current?.length - 1]?.name}</h3>
            <div
                style={{
                    marginTop: '1%',
                    paddingLeft: '25%',
                    marginBottom: '1%',
                }}
            >
                <span
                    style={{
                        cursor: 'pointer',
                    }}
                    onClick={() =>
                    {
                        setIsFiltersShown(!isFiltersShown)
                    }}
                >
                    {sm && isFiltersShown === false ? <BackRightArrowIcon /> :
                        sm && isFiltersShown === true ?
                            <BackArrow /> :
                            xs && isFiltersShown === false ? <CloseFiltersIcon /> :
                                <OpenFiltersIcon />
                    }

                </span>
            </div>

            <Grid
                container
                item
                sx={{
                    paddingLeft: lg1 ? '80px' : lg ? '45px' :
                        md ? '50px' : md1 ? '80px' : sm ? '20px' : sm1 ? '30px' : '16px',

                    paddingRight: lg1 ? '80px' : lg ? '45px' :
                        md ? '50px' : md1 ? '80px' : sm ? '20px' : sm1 ? '30px' : '16px',
                }}
                xs={12}
            >

                <Grid
                    sx={{
                        display: isFiltersShown === true ? 'flex' : 'none',
                        zIndex: 1000,
                        position: isFiltersShown === true && !lg ? 'absolute' : 'initial',
                    }}
                    item
                    container
                    height={'fit-content'}
                    style={{ borderRadius: '10px', boxShadow: '1px 1px 8px 0px #00000014' }}
                    padding={'1%'}
                    direction={'column'}
                    bgcolor={'#E9ECEC'}
                    xs={7}
                    sm={6}
                    md={4}
                    lg={3}
                >
                    <Grid
                        container
                        direction={'column'}
                    >
                        <h5 className='bold-brown2'>Ціна</h5>

                        <div className='filter-product-row'>
                            <label className="filter-message-custom-checkbox">
                                <input
                                    type="checkbox"
                                    checked={filtersSet !== null && filtersSet?.withDiscount !== null ?
                                        filtersSet?.withDiscount ? true : false
                                        : false}
                                    onChange={() =>
                                    {
                                        let tmpFiltersSet = filtersSet;
                                        if (tmpFiltersSet !== null)
                                        {
                                            if (tmpFiltersSet.withDiscount !== null)
                                            {
                                                if (tmpFiltersSet.withDiscount)
                                                    tmpFiltersSet.withDiscount = null;
                                                else
                                                    tmpFiltersSet.withDiscount = !tmpFiltersSet.withDiscount;
                                            }
                                            else
                                            {
                                                tmpFiltersSet.withDiscount = true;
                                            }
                                            tmpFiltersSet.page = 1;
                                            localStorage.setItem(LOCAL_STORAGE_FILTER_KEY, JSON.stringify(tmpFiltersSet));

                                        }
                                        filterCheckHandler(tmpFiltersSet)
                                    }}
                                />
                                <span className='filter-message-custom-checkbox-checkmark'><GreenCheckCheckboxIcon /></span>
                            </label>
                            <span className='t2-medium-brown2'>Лише зі знижкою</span>
                        </div>

                        <div className='filter-product-row'>
                            <label className="filter-message-custom-checkbox">
                                <input
                                    type="checkbox"
                                    checked={filtersSet !== null && filtersSet?.withDiscount !== null ?
                                        !filtersSet?.withDiscount ? true : false
                                        : false}
                                    onChange={() =>
                                    {
                                        let tmpFiltersSet = filtersSet;
                                        if (tmpFiltersSet !== null)
                                        {
                                            if (tmpFiltersSet.withDiscount !== null)
                                            {
                                                if (!tmpFiltersSet.withDiscount)
                                                    tmpFiltersSet.withDiscount = null;
                                                else
                                                    tmpFiltersSet.withDiscount = !tmpFiltersSet.withDiscount;
                                            }
                                            else
                                            {
                                                tmpFiltersSet.withDiscount = false;
                                            }
                                            tmpFiltersSet.page = 1;
                                            localStorage.setItem(LOCAL_STORAGE_FILTER_KEY, JSON.stringify(tmpFiltersSet));
                                        }
                                        filterCheckHandler(tmpFiltersSet)
                                    }}
                                />
                                <span className='filter-message-custom-checkbox-checkmark'><GreenCheckCheckboxIcon /></span>
                            </label>
                            <span className='t2-medium-brown2'>Лише без знижки</span>
                        </div>

                        {/*  Фільтр по ціні */}
                        <div className='price-filter-range'>
                            <input type='number' className='price-filter-range-input' value={
                                minPrice !== null ? minPrice : ''
                            } onKeyDown={handlerKeyDown}
                                onChange={({ target }) =>
                                {
                                    setMinPrice(target.value);
                                }}
                            />
                            <input type='number' className='price-filter-range-input' onKeyDown={handlerKeyDown} value={
                                maxPrice !== null ? maxPrice : ''
                            }
                                onChange={({ target }) =>
                                {
                                    setMaxPrice(target.value);
                                }}
                            />
                            <input type='button' className='price-filter-range-btn' value='ok' onClick={handlerFilterByPrice} />
                        </div>

                        <h5 className='bold-brown2 filter-title'>Виробник</h5>
                        {
                            Object.keys(productInfoFilters.manufacturers).map((key, index) =>
                            {
                                if (index < 2 || showHideFilterOptions[0])
                                    return (
                                        <div className='filter-product-row'
                                            key={index}
                                        >
                                            <label className="filter-message-custom-checkbox">
                                                <input
                                                    type="checkbox"
                                                    value={key}
                                                    checked={filtersSet !== null && filtersSet.manufacturers !== null
                                                        ? filtersSet.manufacturers.includes(Number(key))
                                                        : false}
                                                    onChange={() =>
                                                    {
                                                        let tmpFiltersSet = filtersSet;
                                                        if (tmpFiltersSet !== null)
                                                        {
                                                            if (tmpFiltersSet.manufacturers !== null)
                                                            {
                                                                if (!tmpFiltersSet.manufacturers.includes(Number(key)))
                                                                    tmpFiltersSet.manufacturers.push(Number(key));
                                                                else
                                                                {
                                                                    const index = tmpFiltersSet.manufacturers.indexOf(Number(key));
                                                                    if (index > -1)
                                                                    {
                                                                        tmpFiltersSet.manufacturers.splice(index, 1);
                                                                    }
                                                                }
                                                            }
                                                            else
                                                            {
                                                                tmpFiltersSet.manufacturers = [];
                                                                tmpFiltersSet.manufacturers.push(Number(key));
                                                            }
                                                            tmpFiltersSet.page = 1;
                                                            localStorage.setItem(LOCAL_STORAGE_FILTER_KEY, JSON.stringify(tmpFiltersSet));
                                                        }
                                                        filterCheckHandler(tmpFiltersSet)
                                                    }}
                                                />
                                                <span className='filter-message-custom-checkbox-checkmark'><GreenCheckCheckboxIcon /></span>
                                            </label>
                                            <span className='t2-medium-brown2'>{productInfoFilters.manufacturers[key]}</span>
                                        </div>
                                    )
                                return null;
                            })
                        }
                        {
                            Object.keys(productInfoFilters.manufacturers).length > 2 && (
                                <FilterShowArrow
                                    filterIndex={0}
                                    showHideFilterOptions={showHideFilterOptions}
                                    setShowHideFilterOptions={setShowHideFilterOptions}
                                />
                            )
                        }

                        <h5 className='bold-brown2 filter-title'>Країна виробник</h5>
                        {
                            Object.keys(productInfoFilters.countries).map((key, index) =>
                            {
                                if (index < 2 || showHideFilterOptions[1])
                                    return (
                                        <div className='filter-product-row'
                                            key={index}
                                        >
                                            <label className="filter-message-custom-checkbox">
                                                <input
                                                    type="checkbox"
                                                    value={key}
                                                    checked={
                                                        filtersSet !== null && filtersSet.manufacturerCountries !== null
                                                            ? filtersSet.manufacturerCountries.includes(Number(key))
                                                            : false
                                                    }
                                                    onChange={() =>
                                                    {
                                                        let tmpFiltersSet = filtersSet;
                                                        if (tmpFiltersSet !== null)
                                                        {
                                                            if (tmpFiltersSet.manufacturerCountries !== null)
                                                            {
                                                                if (!tmpFiltersSet.manufacturerCountries.includes(Number(key)))
                                                                    tmpFiltersSet.manufacturerCountries.push(Number(key));
                                                                else
                                                                {
                                                                    const index = tmpFiltersSet.manufacturerCountries.indexOf(Number(key));
                                                                    if (index > -1)
                                                                    {
                                                                        tmpFiltersSet.manufacturerCountries.splice(index, 1);
                                                                    }
                                                                }
                                                            }
                                                            else
                                                            {
                                                                tmpFiltersSet.manufacturerCountries = [];
                                                                tmpFiltersSet.manufacturerCountries.push(Number(key));
                                                            }
                                                            tmpFiltersSet.page = 1;
                                                            localStorage.setItem(LOCAL_STORAGE_FILTER_KEY, JSON.stringify(tmpFiltersSet));
                                                        }
                                                        filterCheckHandler(tmpFiltersSet)
                                                    }}
                                                />
                                                <span className='filter-message-custom-checkbox-checkmark'><GreenCheckCheckboxIcon /></span>
                                            </label>
                                            <span className='t2-medium-brown2'>{productInfoFilters.countries[key]}</span>
                                        </div>
                                    )
                                return null;
                            })
                        }
                        {
                            Object.keys(productInfoFilters.countries).length > 2 && (
                                <FilterShowArrow
                                    filterIndex={1}
                                    showHideFilterOptions={showHideFilterOptions}
                                    setShowHideFilterOptions={setShowHideFilterOptions}
                                />
                            )
                        }

                        <h5 className='bold-brown2 filter-title'>Колір</h5>
                        {
                            Object.keys(productInfoFilters.colors).map((key, index) =>
                            {
                                if (index < 2 || showHideFilterOptions[2])
                                    return (
                                        <div className='filter-product-row'
                                            key={index}
                                        >
                                            <label className="filter-message-custom-checkbox">
                                                <input
                                                    type="checkbox"
                                                    value={key}
                                                    checked={filtersSet !== null && filtersSet.colors !== null
                                                        ? filtersSet.colors.includes(Number(key))
                                                        : false}
                                                    onChange={() =>
                                                    {
                                                        let tmpFiltersSet = filtersSet;
                                                        if (tmpFiltersSet !== null)
                                                        {
                                                            if (tmpFiltersSet.colors !== null)
                                                            {
                                                                if (!tmpFiltersSet.colors.includes(Number(key)))
                                                                    tmpFiltersSet.colors.push(Number(key));
                                                                else
                                                                {
                                                                    const index = tmpFiltersSet.colors.indexOf(Number(key));
                                                                    if (index > -1)
                                                                    {
                                                                        tmpFiltersSet.colors.splice(index, 1);
                                                                    }
                                                                }
                                                            }
                                                            else
                                                            {
                                                                tmpFiltersSet.colors = [];
                                                                tmpFiltersSet.colors.push(Number(key));
                                                            }
                                                            tmpFiltersSet.page = 1;
                                                            localStorage.setItem(LOCAL_STORAGE_FILTER_KEY, JSON.stringify(tmpFiltersSet));
                                                        }
                                                        filterCheckHandler(tmpFiltersSet)
                                                    }}
                                                />
                                                <span className='filter-message-custom-checkbox-checkmark'><GreenCheckCheckboxIcon /></span>
                                            </label>
                                            <span className='t2-medium-brown2'>{productInfoFilters.colors[key]}</span>
                                        </div>
                                    )
                                return null;
                            })
                        }
                        {
                            Object.keys(productInfoFilters.colors).length > 2 && (
                                <FilterShowArrow
                                    filterIndex={2}
                                    showHideFilterOptions={showHideFilterOptions}
                                    setShowHideFilterOptions={setShowHideFilterOptions}
                                />
                            )
                        }

                        {
                            Object.keys(productInfoFilters.descriptionFilters).map((key, keyIndex) =>
                            {
                                return (
                                    <Fragment key={keyIndex}>
                                        <h5 className='bold-brown2 filter-title'>{key.trim()}</h5>
                                        {
                                            productInfoFilters.descriptionFilters[key].map((value, index) =>
                                            {
                                                let trimmedKey = key.trim();
                                                if (index < 2 || showHideFilterOptions[keyIndex + 3])
                                                    return <div className='filter-product-row'
                                                        key={index}
                                                    >
                                                        <label className="filter-message-custom-checkbox">
                                                            <input
                                                                type="checkbox"
                                                                value={trimmedKey}
                                                                checked={
                                                                    filtersSet !== null && filtersSet.descriptions !== null ?
                                                                        filtersSet.descriptions.some((element) =>
                                                                            element.name === trimmedKey ? element.abouts.includes(value) : false
                                                                        ) : false
                                                                }
                                                                onChange={() =>
                                                                {
                                                                    let tmpFiltersSet = filtersSet;
                                                                    if (tmpFiltersSet !== null)
                                                                    {
                                                                        if (tmpFiltersSet.descriptions === null)
                                                                        {
                                                                            tmpFiltersSet.descriptions = [];
                                                                        }
                                                                        if (Object.keys(tmpFiltersSet.descriptions).length > 0 &&

                                                                            tmpFiltersSet.descriptions.some((element) =>
                                                                            {
                                                                                return element.name === trimmedKey
                                                                            })
                                                                        )
                                                                        {
                                                                            let rowIndex = -1;
                                                                            tmpFiltersSet.descriptions.map((element, index) =>
                                                                            {
                                                                                if (element.name === trimmedKey)
                                                                                {
                                                                                    rowIndex = index;
                                                                                    return index;
                                                                                }
                                                                            })
                                                                            if (!tmpFiltersSet.descriptions[rowIndex].abouts.includes(value))
                                                                            {
                                                                                tmpFiltersSet.descriptions[rowIndex].abouts.push(value);
                                                                            }
                                                                            else
                                                                            {
                                                                                const index = tmpFiltersSet.descriptions[rowIndex].abouts.indexOf(value);
                                                                                if (index > -1)
                                                                                {
                                                                                    tmpFiltersSet.descriptions[rowIndex].abouts.splice(index, 1);
                                                                                }
                                                                                if (tmpFiltersSet.descriptions[rowIndex].abouts.length === 0)
                                                                                {
                                                                                    tmpFiltersSet.descriptions.splice(rowIndex, 1);
                                                                                }
                                                                                if (Object.keys(tmpFiltersSet.descriptions).length === 0)
                                                                                {
                                                                                    tmpFiltersSet.descriptions = null;
                                                                                }
                                                                            }
                                                                        }
                                                                        else
                                                                        {
                                                                            tmpFiltersSet.descriptions.push(
                                                                                {
                                                                                    name: trimmedKey,
                                                                                    abouts: [value]
                                                                                }
                                                                            )
                                                                        }
                                                                        tmpFiltersSet.page = 1;
                                                                        localStorage.setItem(LOCAL_STORAGE_FILTER_KEY, JSON.stringify(tmpFiltersSet));
                                                                    }
                                                                    filterCheckHandler(tmpFiltersSet)
                                                                }}
                                                            />
                                                            <span className='filter-message-custom-checkbox-checkmark'><GreenCheckCheckboxIcon /></span>
                                                        </label>
                                                        <span className='t2-medium-brown2'>{value}</span>
                                                    </div>
                                            }
                                            )

                                        }
                                        {
                                            productInfoFilters.descriptionFilters[key].length > 2 && (
                                                <FilterShowArrow
                                                    filterIndex={Number(keyIndex) + 3}
                                                    showHideFilterOptions={showHideFilterOptions}
                                                    setShowHideFilterOptions={setShowHideFilterOptions}
                                                />
                                            )
                                        }
                                    </Fragment>
                                )
                            })
                        }

                    </Grid>
                </Grid>

                <Grid
                    container
                    item
                    lg={isFiltersShown ? 9 : 12}
                    md={12}
                    rowGap={3}
                    columnSpacing={2}
                    height={'fit-content'}
                >
                    {
                        products.items?.map((product, index) =>
                        (
                            <Grid
                                key={index}
                                container
                                item
                                lg={isFiltersShown ? 4 : 3}
                                md={4}
                                xs={6}
                                justifyContent="center"
                                alignItems="center"
                            >

                                <ProductCard
                                    id={product?.id}
                                    picture={product?.picture}
                                    isInCart={
                                        productsInCart?.length > 0 ?
                                            productsInCart?.some(item => item?.productId === product?.id)
                                            :
                                            product?.isInCart
                                    }
                                    isInLiked={product?.isInLiked}
                                    name={product?.name}
                                    discountPercent={product?.discountPercent}
                                    price={product?.price}
                                    isInStock={product?.isInStock}
                                    colorId={product?.colorId}
                                />
                            </Grid>
                        ))
                    }
                </Grid>
            </Grid>

            <Grid
                container
                justifyContent={'center'}
            >
                <div className='pag'>
                    <ClientPagination
                        className="pagination-bar"
                        currentPage={
                            JSON.parse(localStorage.getItem(LOCAL_STORAGE_FILTER_KEY)) !== null &&
                                JSON.parse(localStorage.getItem(LOCAL_STORAGE_FILTER_KEY)) !== undefined ?
                                filtersSet?.page :
                                currentProductPage
                        }
                        totalCount={products?.totalCount}
                        pageSize={PAGE_SIZE}
                        onPageChange={(page) =>
                        {
                            setCurrentProductPage(page)
                            var filters = JSON.parse(localStorage.getItem(LOCAL_STORAGE_FILTER_KEY))
                            if (filters !== null)
                            {
                                filters.page = page;
                                localStorage.setItem(LOCAL_STORAGE_FILTER_KEY, JSON.stringify(filters));
                            }
                        }}
                    />
                </div>
            </Grid>

            <Footer />
        </Grid >
    )
}

export default ProductsByCategoryPage;