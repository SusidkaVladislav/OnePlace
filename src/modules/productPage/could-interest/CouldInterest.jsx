import React, { useState, useEffect } from 'react';
import "./CouldInterest.css";
import ProductCard from "../../main/controls/ProductCard";
import BigBrownLeftArrow from "../../../svg/arrows/BigBrownLeftArrow";
import BigBrownRightArrow from "../../../svg/arrows/BigBrownRightArrow";
import
{
    Toolbar,
    Grid,
    IconButton,
    useMediaQuery,
    Typography,
} from '@mui/material';
import { useSelector } from 'react-redux';

const CouldInterest = () =>
{
    const sm = useMediaQuery('(min-width: 600px)');
    const sm1 = useMediaQuery('(min-width: 650px)');
    const md = useMediaQuery('(min-width: 900px)');
    const md1 = useMediaQuery('(min-width: 1050px)');
    const lg = useMediaQuery('(min-width: 1200px)');
    const lg1 = useMediaQuery('(min-width: 1400px)');

    const {
        interestingProducts,
    } = useSelector(state => state.userProducts)

    const [step, setStep] = useState(2);
    const [productBlock, setProductBlock] = useState({})
    const [productsInCart, setProductsInCart] = useState([]);

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
        const step = lg ? 4 : md ? 3 : 16;
        let productBlock = [];

        interestingProducts?.map((item, index) =>
        {
            if (index < step)
            {
                productBlock.push(item);
            }
        })

        setProductBlock(
            {
                blockNumber: 0,
                items: productBlock
            })

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
    }, [step]);

    return (
        <Grid
            sx={{
                marginTop: '100px',
            }}
        >
            <Grid
                container
                sx={{
                    marginBottom: '30px'
                }}
            >
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
                        md={9}
                        xs={12}
                    >
                        <Typography
                            className={lg ? 'h2-500-32-brown1 unselectable' : md ? 'brown1-400-24 unselectable'
                                : sm ? 'brown1-400-20 unselectable' : 'brown1-400-20 unselectable'}
                        >{'Також вас можуть зацікавити'}</Typography>
                    </Grid>

                    <Grid
                        display={md ? 'flex' : 'none'}
                        item
                        container
                        md={3}
                        justifyContent={'right'}
                    >
                        <Toolbar>
                            <IconButton
                                onClick={() =>
                                {
                                    const step = lg ? 4 : 3;
                                    if ((productBlock?.blockNumber - 1) * step >= 0)
                                    {
                                        let tmpProductBlock = [];
                                        interestingProducts?.map((product, index) =>
                                        {
                                            if (index >= (productBlock?.blockNumber - 1) * step && index <= (productBlock?.blockNumber - 1) * step + (step - 1))
                                            {
                                                tmpProductBlock.push(product)
                                            }
                                        })
                                        setProductBlock(
                                            {
                                                blockNumber: productBlock?.blockNumber - 1,
                                                items: tmpProductBlock
                                            })
                                    }
                                }}
                            ><BigBrownLeftArrow /></IconButton>
                            <IconButton
                                onClick={() =>
                                {
                                    const step = lg ? 4 : 3;
                                    if ((productBlock?.blockNumber + 1) * step - 1 < interestingProducts?.length)
                                    {
                                        let tmpProductBlock = [];
                                        interestingProducts?.map((product, index) =>
                                        {
                                            if (index >= (productBlock?.blockNumber + 1) * step && index <= (productBlock?.blockNumber + 1) * step + (step - 1))
                                            {
                                                tmpProductBlock.push(product)
                                            }
                                        })
                                        setProductBlock(
                                            {
                                                blockNumber: productBlock?.blockNumber + 1,
                                                items: tmpProductBlock
                                            })
                                    }
                                }}
                            ><BigBrownRightArrow /></IconButton>
                        </Toolbar>
                    </Grid>
                </Grid>
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
                    productBlock?.items?.map((product, index) =>
                    {
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
            </Grid>

        </Grid>
    )
}

export default CouldInterest;