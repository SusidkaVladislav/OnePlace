import React, { Fragment, useEffect, useState } from "react";
import './bestChoice.css';
import ProductCard from "../../controls/ProductCard";
import BigBrownLeftArrow from "../../../../svg/arrows/BigBrownLeftArrow";
import BigBrownRightArrow from "../../../../svg/arrows/BigBrownRightArrow";

import
{
    Toolbar,
    Grid,
    Button,
    IconButton,
    Typography,
    useMediaQuery,
} from "@mui/material";

import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";


const BestChoice = (props) =>
{
    const {
        productsInCart
    } = props;

    const navigate = useNavigate();

    const xs = useMediaQuery('(min-width: 0px)');
    const sm = useMediaQuery('(min-width: 600px)');
    const sm1 = useMediaQuery('(min-width: 650px)');
    const md = useMediaQuery('(min-width: 900px)');
    const md1 = useMediaQuery('(min-width: 1050px)');
    const lg = useMediaQuery('(min-width: 1200px)');
    const lg1 = useMediaQuery('(min-width: 1400px)');

    const [categoryBlock, setCategoryBlock] = useState({})
    const [showRecommendProductNumber, setShowRecommendProductNumber] = useState(localStorage.getItem('recommendedNumber') !== null ? Number(localStorage.getItem('recommendedNumber')) : 3)
    const {
        categoriesForSelect,
    } = useSelector(state => state.userCategories)

    const {
        allRecommendedProducts,
    } = useSelector(state => state.userProducts)

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
        const mainCategories = categoriesForSelect?.filter(category => category?.parentCategoryId === null);

        const step = lg ? 4 : md ? 3 : 2;
        let categoryBlock = [];
        mainCategories?.map((category, index) =>
        {
            if (index < step)
            {
                categoryBlock.push({
                    id: category?.id,
                    name: category?.name
                })
            }
        })
        setCategoryBlock(
            {
                blockNumber: 0,
                items: categoryBlock
            })
    }, [step]);


    return (
        <div
            id='best-choice-id'
            className="bc-container1"
        >
            <Grid>
                <Grid
                    container
                    alignItems={'center'}
                    justifyContent={'space-between'}
                    sx={{
                        paddingLeft: {
                            lg: '156px',
                            md: '100px',
                            sm: '30px',
                            xs: '16px',
                        },
                        paddingRight: {
                            lg: '156px',
                            md: '80px',
                            sm: '30px',
                            xs: '16px',
                        },
                    }}
                >
                    <Grid
                        item
                        xs={9}
                    >
                        <Typography
                            className={lg ? 'h2-500-32-brown1 unselectable' : md ? 'brown1-400-24 unselectable'
                                : sm ? 'brown1-400-20 unselectable' : 'brown1-400-20 unselectable'}
                        >{md ? 'Також вас можуть зацікавити' : 'Кращий вибір'}</Typography>
                    </Grid>

                    <Grid
                        item
                        container
                        xs={3}
                        justifyContent={'right'}
                    >
                        <Toolbar>
                            <IconButton
                                onClick={() =>
                                {
                                    const step = lg ? 4 : md ? 3 : 2;
                                    const mainCategories = categoriesForSelect?.filter(category => category?.parentCategoryId === null);

                                    let tmpCategoryBlock = [];
                                    if ((categoryBlock?.blockNumber - 1) * step >= 0)
                                    {
                                        mainCategories?.map((category, index) =>
                                        {
                                            if (index >= (categoryBlock?.blockNumber - 1) * step && index <= (categoryBlock?.blockNumber - 1) * step + (step - 1))
                                            {
                                                tmpCategoryBlock.push({
                                                    id: category?.id,
                                                    name: category?.name
                                                })
                                            }
                                        })
                                        setCategoryBlock(
                                            {
                                                blockNumber: categoryBlock?.blockNumber - 1,
                                                items: tmpCategoryBlock
                                            })
                                    }
                                }}
                            ><BigBrownLeftArrow /></IconButton>
                            <IconButton
                                onClick={() =>
                                {
                                    const step = lg ? 4 : md ? 3 : 2;
                                    const mainCategories = categoriesForSelect?.filter(category => category?.parentCategoryId === null);

                                    let tmpCategoryBlock = [];
                                    if ((categoryBlock?.blockNumber + 1) * step - 1 < mainCategories?.length)
                                    {
                                        mainCategories?.map((category, index) =>
                                        {
                                            if (index >= (categoryBlock?.blockNumber + 1) * step && index <= (categoryBlock?.blockNumber + 1) * step + (step - 1))
                                            {
                                                tmpCategoryBlock.push({
                                                    id: category?.id,
                                                    name: category?.name
                                                })
                                            }
                                        })
                                        setCategoryBlock(
                                            {
                                                blockNumber: categoryBlock?.blockNumber + 1,
                                                items: tmpCategoryBlock
                                            })
                                    }
                                }}
                            ><BigBrownRightArrow /></IconButton>
                        </Toolbar>
                    </Grid>
                </Grid>

                <Grid
                    container
                    item
                    xs={12}
                    alignItems={'center'}
                    sx={{
                        height: md ? '70px' : '60px',
                        marginTop: '20px',
                        marginBottom: '10px',
                        backgroundColor: '#E9ECEC',
                        paddingLeft: {
                            lg: '156px',
                            md: '100px',
                            sm: '53px',
                            xs: '16px',
                        },
                        paddingRight: {
                            lg: '156px',
                            md: '80px',
                            sm: '53px',
                            xs: '16px',
                        },
                        marginBottom: lg? '60px' : md? '45px' : sm? '35px' : '20px',
                    }}
                    boxShadow='1px 1px 8px 0px rgba(0, 0, 0, 0.08)'
                >
                    <Grid
                        item
                        sm={1}
                        xs={1.5}
                        container
                        justifyContent={'center'}
                        sx={{
                            borderRight: '1px solid #DAD1D0',
                        }}
                    >
                        <Typography
                            className="t2-medium-500-orange2"
                        >Усе</Typography>
                    </Grid>
                    {
                        categoryBlock?.items?.map((category, index) =>
                        {
                            return (
                                <Fragment
                                    key={index}
                                >

                                    <Grid
                                        item
                                        lg={2.7}
                                        md={3.6}
                                        sm={5.5}
                                        xs={5.2}
                                        container
                                        justifyContent={'center'}
                                        sx={{
                                            borderRight: index !== categoryBlock?.items?.length - 1 ? '1px solid #DAD1D0' : 'none',
                                        }}
                                    >
                                        <Typography
                                            className="t1-light"
                                            sx={{
                                                cursor: 'pointer',

                                            }}
                                            onClick={() =>
                                            {
                                                navigate('/category/' + category?.id);
                                            }}
                                        >{category?.name}</Typography>
                                    </Grid>
                                </Fragment>
                            )
                        })
                    }
                </Grid>


                <Grid
                    container
                    rowGap={'20px'}
                    sx={{

                        paddingLeft: lg1 ? '80px' : lg ? '45px' :
                            md ? '50px' : md1 ? '80px' : sm ? '20px' : sm1 ? '30px' : '16px',

                        paddingRight: lg1 ? '80px' : lg ? '45px' :
                            md ? '50px' : md1 ? '80px' : sm ? '20px' : sm1 ? '30px' : '16px',
                    }}
                    justifyContent={'space-between'}
                >
                    {

                        allRecommendedProducts?.map((product, index) =>
                        {
                            if (index - 1 < (showRecommendProductNumber * 2))
                                return (
                                    <Grid
                                        container
                                        item
                                        key={index}
                                        lg={3}
                                        md={4}
                                        xs={6}
                                        justifyContent={'center'}
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
                                )
                        })
                    }
                    <Grid
                        item
                        lg={3}
                        md={4}
                        xs={6}
                    >
                        <Button
                            variant="outlined"
                            className="mp-button"
                            onClick={() =>
                            {
                                localStorage.setItem('recommendedNumber', showRecommendProductNumber + 2)
                                setShowRecommendProductNumber(showRecommendProductNumber + 2)
                            }}
                        >Більше товарів</Button>
                    </Grid>
                </Grid>
            </Grid>
        </div >
    )
}

export default BestChoice;