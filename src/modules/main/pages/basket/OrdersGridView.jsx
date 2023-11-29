import React, { Fragment } from 'react';

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
import { useDispatch, useSelector } from "react-redux"


const OrdersGridView = (props) =>
{
    const Data = [
        {
            id: 1,
            quantity: 10,
            price: 100,
            discount: 10,
            available: 'В наявності',
            imageURL: 'data:image/jpeg;base64,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',
            name: 'Product 1',
        }
    ];

    const sm = useMediaQuery('(min-width: 600px)');
    const md = useMediaQuery('(min-width: 900px)');
    const lg = useMediaQuery('(min-width: 1200px)');



    // const totalPrice = Data.reduce((acc, item) =>
    // {
    //     const itemTotalPrice = item.price * item.quantity;
    //     return acc + itemTotalPrice;
    // }, 0);
    // const totalDiscountPrice = Data.reduce((acc, item) =>
    // {
    //     const itemTotalPrice = (item.price - item.discount) * item.quantity;
    //     return acc + itemTotalPrice;
    // }, 0);

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
                            <Fragment>
                                <CartItem />
                                <CartItem />
                                <CartItem />
                                <CartItem />
                                <CartItem />
                                <CartItem />
                                <CartItem />
                                <CartItem />
                                <CartItem />
                                <CartItem />
                                <CartItem />
                                <CartItem />
                            </Fragment>
                        ) : (
                            <Fragment>
                                <PhoneCartItem />
                                <PhoneCartItem />
                                <PhoneCartItem />
                                <PhoneCartItem />
                                <PhoneCartItem />
                                <PhoneCartItem />
                                <PhoneCartItem />
                                <PhoneCartItem />
                                <PhoneCartItem />
                                <PhoneCartItem />
                            </Fragment>
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
                        //container
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
                                    lg: '10px',
                                    md: '10px',
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
                                    lg: '10px',
                                    md: '10px',
                                    sm: '10px',
                                },
                                marginBottom: {
                                    lg: '18px',
                                    md: '18px',
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
                            >443 498 грн.</Typography>
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
                            >1 150 грн.</Typography>
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
                            >3 348 грн.</Typography>
                        </Grid>

                    </Grid>

                    <Grid
                        item
                        container
                        justifyContent={'center'}
                    >
                        <Button
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

                        }}
                    >Оформити замовлення</Button>
                </Grid>

            </Grid>
        </Grid >

    )
}
export default OrdersGridView;