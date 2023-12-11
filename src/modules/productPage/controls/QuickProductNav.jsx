import React, { useState, useEffect, Fragment, } from 'react';

import
{
    Typography,
    Button,
    Badge,
} from '@mui/material';

import ShareIcon from '../../../svg/client-icons/productPage/ShareIcon';
import BigHeartIcon from '../../../svg/client-icons/productPage/BigHeartIcon';
import BigFilledHeartIcon from '../../../svg/client-icons/productPage/BigFilledHeartIcon';
import AddReviewIcon from '../../../svg/client-icons/productPage/AddReviewIcon';
import StarRating from './StarRating';

import { useDispatch, useSelector } from 'react-redux';

const QuickProductNav = () =>
{
    const {
        product,
        productRaitingInfo,
    } = useSelector(state => state.userProducts);
    const [currentColorProductConfig, setCurrentColorProductConfig] = useState({})

    const [rating, setRating] = useState({});

    useEffect(() =>
    {
        setCurrentColorProductConfig({
            colorName: product?.productColors?.[0]?.color?.name,
            price: product?.productColors?.[0]?.price,
            quantity: product?.productColors?.[0]?.quantity,
        });

        setRating(
            {
                starsCount: productRaitingInfo?.startsCount,
                reviewsCount: productRaitingInfo?.reviewsCount,
                averageValue: productRaitingInfo?.averageValue,
            }
        )
    }, [])

    //heart button logic
    const [filled, setFilled] = useState(false);

    function HeartClick()
    {
        setFilled(!filled);
    }

    return (
        <div
            style={{
                borderRadius: "10px",
                boxShadow: "1px 1px 8px 0px rgba(0, 0, 0, 0.08)",
                width: "100%",
            }}>
            <div style={{ padding: "22px" }}>
                <div style={{ display: "flex", alignItems: "center" }}>
                    <img
                        src={product?.pictures?.find(img => img?.isTitle === true)?.address}
                        style={{
                            padding: "2px",
                            height: "79px",
                            width: "82px",
                            backgroundColor: "white",
                            borderRadius: "10px",
                            boxShadow: "1px 1px 8px 0px rgba(0, 0, 0, 0.08)",
                            objectFit: "contain"
                        }}></img>
                    <div style={{ width: "24px" }}></div>
                    <h4>{product?.name}</h4>
                </div>

                <div className='hl'></div>

                <div style={{ display: "flex", justifyContent: 'space-between' }}>
                    <div style={{
                        display: "flex",
                        width: '60%',
                        gap: '5%',
                    }}>
                        <h4 className='red'>{
                            product?.sale !== null ?
                                currentColorProductConfig?.price - (currentColorProductConfig?.price * product?.sale?.discountPercent / 100)
                                : currentColorProductConfig?.price
                        }грн</h4>

                        <Typography
                            className='t2-medium'
                            sx={{
                                display: product?.sale !== null ? 'flex' : 'none',
                                textDecoration: 'line-through'
                            }}>{product?.sale !== null ? currentColorProductConfig?.price : 0}
                            грн</Typography>
                    </div>
                    <Typography className={currentColorProductConfig?.quantity > 0 ? 't1-bold-green' : 't1-bold-red'}>
                        {currentColorProductConfig?.quantity > 0 ? 'В наявності' : 'Немає'}</Typography>
                </div>

                <div className='hl'></div>

                <div style={{ display: "flex", justifyContent: 'space-between' }}>
                    <Typography className='t1-bold'>Колір: {currentColorProductConfig?.colorName}</Typography>
                    <div style={{ display: "flex" }}>
                        {
                            product?.productColors?.map((productColor, index) =>
                            {
                                return (
                                    <Fragment
                                        key={index}
                                    >
                                        {
                                            productColor?.color?.name === currentColorProductConfig?.colorName ?
                                                (
                                                    <Badge
                                                        color="warning"
                                                        variant="dot"
                                                        overlap="circular"
                                                    >
                                                        <div
                                                            className='aap-color-circle'
                                                            style={{
                                                                backgroundColor: productColor?.color.hex,
                                                                display: 'flex'
                                                            }}
                                                            onClick={() =>
                                                            {
                                                                setCurrentColorProductConfig({
                                                                    colorName: productColor?.color?.name,
                                                                    price: productColor?.price,
                                                                    quantity: productColor?.quantity,
                                                                });
                                                            }}
                                                        >
                                                        </div>
                                                    </Badge>
                                                ) :
                                                (
                                                    <div
                                                        className='aap-color-circle'
                                                        style={{
                                                            backgroundColor: productColor?.color.hex,
                                                            display: 'flex'
                                                        }}
                                                        onClick={() =>
                                                        {
                                                            setCurrentColorProductConfig({
                                                                colorName: productColor?.color?.name,
                                                                price: productColor?.price,
                                                                quantity: productColor?.quantity,
                                                            });
                                                        }}
                                                    >
                                                    </div>
                                                )
                                        }
                                        <div style={{ width: "5px" }}></div>
                                    </Fragment>

                                )
                            })
                        }
                    </div>
                </div>

                <div className='hl'></div>

                <div style={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
                    <Button variant="contained" className="aap-button">Купити</Button>

                    <div style={{ display: "flex", paddingTop: "9px" }}>
                        <ShareIcon />
                        <div style={{ width: "20px" }}></div>

                        <div id="heartBtn" onClick={HeartClick}>
                            {filled === false ?
                                (<div id="heartIcon"><BigHeartIcon /></div>) :
                                (<div id="filledHeartIcon"><BigFilledHeartIcon /></div>)}
                        </div>

                        <div style={{ width: "20px" }}></div>
                        <AddReviewIcon />
                    </div>
                </div>

                <div className='aap-star-rating-container'>
                    <StarRating
                        defaultRating={rating?.starsCount}
                    />
                    <Typography
                        className='t2-medium-blue'
                        style={{ display: "inline", paddingTop: "5px" }}
                    >
                        {rating?.averageValue} ({rating?.reviewsCount} оцінок)
                    </Typography>
                </div>

                <div className='hl'></div>
            </div>
        </div>
    )
}

export default QuickProductNav;