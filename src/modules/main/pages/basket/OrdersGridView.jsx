import React, { useEffect, useState } from 'react';

import
{
    Button,
    Grid,
    Typography,
    Divider,
    useMediaQuery,
} from "@mui/material";

import CartItem from "./CartItem";
import PhoneCartItem from "./PhoneCartItem";
import { useSelector } from "react-redux"
import { useNavigate } from 'react-router-dom';

const OrdersGridView = () =>
{
    const navigate = useNavigate();

    const {
        products,
        totalOrderPrice,
        checkedProductIds,
    } = useSelector(state => state.userBasket)

    const sm = useMediaQuery('(min-width: 600px)');
    const md = useMediaQuery('(min-width: 900px)');
    const lg = useMediaQuery('(min-width: 1200px)');

    const [discountPrice, setDiscountPrice] = useState(0)

    useEffect(() =>
    {
        setDiscountPrice(totalOrderPrice)
    }, [])

    return (
        <Grid
            container
            sx={{
                padding: {
                    lg: '43px 156px 50px 156px',
                    md: '23px 58px 25px 58px',
                    sm: '30px 32px 69px 32px',
                    xs: '25px 16px 25px 16px'
                }
            }}
        >
            <Typography
                className={lg ? 'h2-500-32-brown1 unselectable' :
                    md ? 'brown1-400-20 unselectable' :
                        sm ? 'brown1-500-32 unselectable'
                            : 'light-h5 unselectable'
                }
                sx={{
                    marginBottom: {
                        sm: '23px',
                        xs: '13px',
                    }
                }}
            >Корзина</Typography>

            <Grid
                item
                xs={12}
            >
                <Divider
                    sx={{
                        height: '2px',
                        backgroundColor: '#DA8D33'
                    }}
                />
            </Grid>

            <Grid
                container
                item
                justifyContent={'space-between'}
            >
                <Grid
                    order={md ? 0 : 1}
                    item
                    container
                    lg={7}
                    md={8}
                    sm={12}
                    xs={12}
                    sx={{
                        marginTop: {
                            lg: '5px',
                            md: '5px',
                            sm: '45px',
                            xs: '25px',
                        }
                    }}
                >
                    {
                        sm ? (
                            products?.map((product, index) =>
                            {
                                return (
                                    <CartItem
                                        key={index}
                                        id={product?.id}
                                        name={product?.name}
                                        imageURL={product?.picture}
                                        price={product?.price}
                                        availableQuantity={product?.quantity}
                                        discount={product?.discount}
                                        colorId={product?.colorId}
                                        colorName={product?.colorName}
                                    />
                                )
                            })
                        ) : (
                            products?.map((product, index) =>
                            {
                                return (
                                    <PhoneCartItem
                                        key={index}
                                        id={product?.id}
                                        name={product?.name}
                                        imageURL={product?.picture}
                                        price={product?.price}
                                        availableQuantity={product?.quantity}
                                        discount={product?.discount}
                                        colorId={product?.colorId}
                                        colorName={product?.colorName}
                                    />
                                )
                            })
                        )
                    }
                </Grid>

                <Grid
                    display={!sm && 'none'}
                    item
                    container
                    lg={4}
                    md={3.5}
                    sm={12}
                    height={'fit-content'}
                    direction={'column'}
                    sx={{
                        marginTop: {
                            md: '0px',
                            sm: '40px'
                        },
                        paddingLeft: {
                            md: '0',
                            sm: '5%',
                        },
                        paddingRight: {
                            md: '0',
                            sm: '5%',
                        }
                    }}
                >
                    <Grid
                        item
                        bgcolor={'#F8F8F8'}

                        sx={{
                            borderRadius: '10px',
                            boxShadow: '1px 1px 8px 0px rgba(0, 0, 0, 0.08)',
                            padding: {
                                lg: '10px',
                                md: '10px',
                                sm: '20px',
                            },
                            marginTop: {
                                lg: '5px',
                                md: '5px',
                            },
                        }}

                    >
                        <Typography
                            className={lg ? 'brown1-400-20 unselectable'
                                : md ? 't1-light unselectable'
                                    : sm ? 'brown1-400-20 unselectable'
                                        : 'unselectable'}
                            sx={{
                                marginBottom: {
                                    sm: '10px',
                                }
                            }}
                        >
                            Всього
                        </Typography>

                        <Grid
                            item
                            xs={12}
                            sx={{

                            }}
                        >
                            <Divider
                                sx={{
                                    height: '1px',
                                    backgroundColor: '#B5A3A1'
                                }}
                            />
                        </Grid>

                        <Grid
                            item
                            xs={12}
                            container
                            justifyContent={'space-between'}
                            sx={{
                                marginTop: {
                                    sm: '10px',
                                },
                                marginBottom: {
                                    sm: '18px',
                                }
                            }}
                        >
                            <Typography
                                className={lg ? 'light-h5-brown2 unselectable'
                                    : md ? 't1-light  unselectable'
                                        : sm ? 'light-h5 unselectable' : 'light-h5-brown2 unselectable'}
                            >Сума товарів: </Typography>
                            <Typography
                                className={lg ? 'h5-bold-brown2 unselectable'
                                    : md ? 't2-medium-500-brown2 unselectable'
                                        : sm ? 'h5-bold-brown2 unselectable'
                                            : 'unselectable'
                                }
                            >{
                                    checkedProductIds?.reduce(
                                        (accumulator, currentValue) => accumulator + (currentValue?.price * currentValue?.count),
                                        0)
                                } грн.</Typography>
                        </Grid>

                        <Grid
                            item
                            xs={12}
                            container
                            justifyContent={'space-between'}
                        >
                            <Typography
                                className={
                                    lg ? 'light-h5-brown2 unselectable'
                                        : md ? 't1-light unselectable'
                                            : sm ? 'light-h5 unselectable'
                                                : 'light-h5-brown2 unselectable'}
                            >Сума знижки: </Typography>
                            <Typography
                                className={
                                    lg ? 'h5-bold-brown2 unselectable'
                                        : md ? 't2-medium-500-brown2 unselectable'
                                            : sm ? 'h5-bold-brown2 unselectable'
                                                : 'unselectable'
                                }
                            >
                                {
                                    checkedProductIds?.filter(product => product.discount > 0)?.
                                        reduce((sum, product) => sum + (product?.price * product?.discount / 100 * (product?.count || 1)), 0)
                                } грн.</Typography>
                        </Grid>

                        <Grid
                            item
                            xs={12}
                            container
                            justifyContent={'space-between'}
                            sx={{
                                marginTop: {
                                    lg: '28px',
                                    md: '20px',
                                    sm: '28px',
                                }
                            }}
                        >
                            <Typography
                                className={
                                    lg ? 'light-h5-brown2 unselectable'
                                        : md ? 't1-light unselectable'
                                            : sm ? 'brown1-500-20 unselectable'
                                                : 'light-h5-brown2 unselectable'
                                }
                            >До оплати: </Typography>
                            <Typography
                                className={
                                    lg ? 'h4-red unselectable'
                                        : md ? 't2-medium-500-red unselectable'
                                            : sm ? 'h4-red unselectable'
                                                : 'unselectable'
                                }
                            >
                                {
                                    (checkedProductIds?.reduce(
                                        (accumulator, currentValue) => accumulator + (currentValue?.price * currentValue?.count),
                                        0)) - (checkedProductIds?.filter(product => product.discount > 0)?.
                                            reduce((sum, product) => sum + (product?.price * product?.discount / 100 * (product?.count || 1)), 0))
                                } грн.</Typography>
                        </Grid>
                    </Grid>

                    <Grid
                        item
                        container
                        justifyContent={'center'}
                    >
                        <Button
                            disabled={checkedProductIds?.length === 0}
                            sx={{

                                width: {
                                    lg: '100%',
                                    md: '100%',
                                    sm: '90%'
                                },
                                height: {
                                    lg: '50px',
                                    md: '40px',
                                    sm: '50px'
                                },
                                bgcolor: '#D17100',
                                ':hover': {
                                    bgcolor: '#D17100',
                                },
                                marginLeft: {
                                    md: '2%'
                                },
                                marginTop: {
                                    lg: '50px',
                                    md: '30px',
                                    sm: '20px',
                                },
                                textTransform: 'initial',
                            }}
                            className={
                                lg ? 'h4-lg-gray3 stepper-navigation-btn' :
                                    md ? 'gray3-500-16 stepper-navigation-btn' :
                                        sm ? 'h4-lg-gray3 stepper-navigation-btn' :
                                            'stepper-navigation-btn'
                            }
                            variant='contained'
                            onClick={() =>
                            {
                                navigate('/checkout')
                            }}
                        >Оформити замовлення</Button>
                    </Grid>

                </Grid>

                <Grid
                    item
                    order={1}
                    display={sm && 'none'}
                    xs={12}
                >
                    <Button
                        disabled={checkedProductIds?.length === 0}
                        sx={{
                            width: '100%',
                            height: '48px',
                            bgcolor: '#DA8D33',
                            ':hover': {
                                bgcolor: '#D17100',
                            },
                            marginTop: '25px',
                            textTransform: 'initial',
                        }}
                        className='h4-lg-gray3 stepper-navigation-btn'
                        variant='contained'
                        onClick={() =>
                        {
                            navigate('/checkout')
                        }}
                    >Оформити замовлення</Button>
                </Grid>

            </Grid>
        </Grid >

    )
}
export default OrdersGridView;