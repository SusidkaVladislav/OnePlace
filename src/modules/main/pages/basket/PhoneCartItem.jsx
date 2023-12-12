import React from 'react';

import
{
    Button,
    Typography,
    Grid,
} from "@mui/material";

import { useDispatch, useSelector } from "react-redux"
import
{
    changeProductPriceSum,
    changeTotalOrderPrice,
    changeDiscountPrice,
    setCheckedIds,
    deleteFromCart,
    setCartCount,
    getProductsFromCart,
} from "../../features/basket/cartSlice";

import ButtonMinusXS from '../../../../svg/basket-icons/ButtonMinusXS';
import ButtonPlusXS from '../../../../svg/basket-icons/ButtonPlusXS';
import ButtonTrash from '../../../../svg/basket-icons/trash';
import CustomCheckbox from '../../../../services/custom-inputs/CustomCheckbox2';

const PhoneCartItem = (props) =>
{
    const dispatch = useDispatch();

    const {
        id,
        name,
        imageURL,
        price,
        availableQuantity,
        discount,
        colorId,
        colorName,
    } = props;

    const {
        productPriceSum,
        discountPrice,
        checkedProductIds,
    } = useSelector(state => state.userBasket)


    const onSelectProduct = (value) =>
    {
 //Якщо товар вибраний, то значить його ціну треба додати до загальної
 if (availableQuantity > 0)
 {
   if (value)
   {
     let ids = [];
     ids.push({
       id: id,
       count: 1,
       colorId: colorId,
       name: name,
       imageURL: imageURL,
       price: price,
       discount: discount,
       colorName: colorName,
     })
     checkedProductIds.map(item =>
     {
       ids.push(item);
     })
     dispatch(setCheckedIds(ids));

     dispatch(changeProductPriceSum(productPriceSum + price))
     dispatch(changeDiscountPrice(discountPrice + price * discount / 100))
     dispatch(changeTotalOrderPrice((productPriceSum + price) - (discountPrice + price * discount / 100)))
   }
   else
   {
     let ids = [];
     let count = 0;
     checkedProductIds.map(item =>
     {
       if (item?.id !== id || item?.colorId !== colorId)
         ids.push(item);
       else
         count = item.count;
     })
     dispatch(setCheckedIds(ids));

     dispatch(changeProductPriceSum(productPriceSum - price * count))
     dispatch(changeDiscountPrice(discountPrice - (price * discount / 100) * count))
     dispatch(changeTotalOrderPrice(((productPriceSum - price * count) - (discountPrice - (price * discount / 100) * count))))
   }
 }

    }

    const incrementCount = () =>
    {
        let ids = [];
        let isAvaliableQuantity = true;

        if (availableQuantity > 0)
        {
            //Якщо цей товар не вибраний чекбоксом
            const productsById = checkedProductIds?.filter(item => item?.id === id);
            const isNotInCart = productsById?.every(item => item?.colorId !== colorId)

            if (isNotInCart)
            {
                if (availableQuantity >= 1)
                {
                    ids.push({
                        id: id,
                        count: 1,
                        colorId: colorId,
                        name: name,
                        imageURL: imageURL,
                        price: price,
                        discount: discount,
                        colorName: colorName,
                    })
                    checkedProductIds.map(item =>
                    {
                        ids.push(item);
                    })
                }
                else
                {
                    isAvaliableQuantity = false;
                }
            }
            else
            {
                checkedProductIds?.map(item =>
                {
                    if (item?.id !== id || item?.colorId !== colorId)
                    {
                        ids.push(item);
                    }
                    else
                    {

                        if ((item?.count + 1) <= availableQuantity)
                        {

                            ids.push({
                                id: id,
                                count: item?.count + 1,
                                colorId: colorId,
                                name: name,
                                imageURL: imageURL,
                                price: price,
                                discount: discount,
                                colorName: colorName,
                            })
                        }
                        else 
                        {
                            ids.push({
                                id: id,
                                count: item?.count,
                                colorId: colorId,
                                name: name,
                                imageURL: imageURL,
                                price: price,
                                discount: discount,
                                colorName: colorName,
                            })

                            isAvaliableQuantity = false;
                        }
                    }
                })
            }
            dispatch(setCheckedIds(ids));
            if (isAvaliableQuantity)
            {
                dispatch(changeProductPriceSum(productPriceSum + price))
                dispatch(changeDiscountPrice(discountPrice + price * discount / 100))
                dispatch(changeTotalOrderPrice((productPriceSum + price) - (discountPrice + price * discount / 100)))
            }
        }
    }

    const decrementCount = () =>
    {
        let ids = [];
        //Якщо цей товар не вибраний чекбоксом
        const productsById = checkedProductIds?.filter(item => item?.id === id);
        const isNotInCart = productsById?.every(item => item?.colorId !== colorId)
        if (!isNotInCart)
        {
            checkedProductIds?.map(item =>
            {
                if ((item?.id === Number(id) && item?.colorId === Number(colorId)) && item?.count > 1)
                {
                    ids.push(
                        {
                            id: item.id,
                            count: item.count - 1,
                            colorId: colorId,
                            name: name,
                            imageURL: imageURL,
                            price: price,
                            discount: discount,
                            colorName: colorName,
                        }
                    );
                }
                else if (item?.id !== id || item?.colorId !== colorId)
                {
                    ids.push(item);
                }
            })

            dispatch(setCheckedIds(ids));

            dispatch(changeProductPriceSum(productPriceSum - price))
            dispatch(changeDiscountPrice(discountPrice - price * discount / 100))
            dispatch(changeTotalOrderPrice((productPriceSum - price) - (discountPrice - price * discount / 100)))
        }
    }

    const onDeleteFromCart = async () =>
    {
        let cartFromLocalStorage = JSON.parse(localStorage.getItem('cart'));

        if (cartFromLocalStorage !== null)
        {
            if (cartFromLocalStorage.some(item => item.productId === id || item.colorId === colorId))
            {
                await dispatch(deleteFromCart(
                    {
                        productId: Number(id),
                        colorId: Number(colorId),
                    }
                ))
                if (cartFromLocalStorage.some(item => item.productId === id || item.colorId === colorId))
                    cartFromLocalStorage = cartFromLocalStorage.filter(item => item.productId !== id || item.colorId !== colorId);

                localStorage.setItem('cart', JSON.stringify(cartFromLocalStorage));
                dispatch(setCartCount(cartFromLocalStorage.length));

                const product = checkedProductIds.find(item => item.id === id);
                if (product !== undefined)
                {
                    let ids = checkedProductIds.filter(item => item.id !== id)
                    dispatch(setCheckedIds(ids));
                    dispatch(changeProductPriceSum(productPriceSum - price * product.count))
                    dispatch(changeDiscountPrice(discountPrice - (price * discount / 100) * product.count))
                    dispatch(changeTotalOrderPrice(((productPriceSum - price * product.count) - (discountPrice - (price * discount / 100) * product.count))))
                }

                if (cartFromLocalStorage !== null)
                {
                    await dispatch(getProductsFromCart(cartFromLocalStorage))
                }
            }
        }
    }

    return (
        <Grid
            container
            sx={{
                height: '117px',
                marginTop: '25px',
                borderBottom: '1px solid #B5A3A1',
                paddingBottom: '25px',
            }}
        >
            <Grid
                container
                item
                xs={0.8}
                alignItems={'center'}
            >
                <CustomCheckbox
                    onChange={(value) => { onSelectProduct(value) }}
                    value={checkedProductIds.some(item => item?.id === id && item?.colorId === colorId)}
                    productId={id}
                />
            </Grid>

            <Grid
                container
                item
                xs={11.2}

                justifyContent={'space-between'}
                alignContent={'space-between'}
            >
                <Grid
                    container
                    item
                    xs={12}
                    height={'52.76px'}
                >
                    <Grid
                        container
                        item
                        xs={1.5}
                        alignItems={'center'}
                    >
                        <img
                            height={49}
                            width={47}
                            style={{
                                borderRadius: '10px',
                                boxShadow: '1px 1px 8px 0px rgba(0, 0, 0, 0.08)',
                            }}
                            src={imageURL}
                            alt='product'
                        />
                    </Grid>

                    <Grid
                        item
                        container
                        xs={9.5}
                        height='100%'
                        sx={{
                            paddingLeft: '1%'
                        }}
                    >
                        <Grid
                            item
                            xs={12}
                            sx={{
                                height: '30%',
                                overflow: 'hidden',
                                wordWrap: 'break-word'
                            }}
                        >
                            <Typography
                                className={'t3-bold'}
                            >{name}</Typography>
                        </Grid>

                        <Grid
                            container
                            item
                            direction={'row'}
                            xs={12}
                            sx={{
                                height: '15%',
                            }}
                        >
                            <Grid
                                item
                                xs={6}
                            >
                                <Typography
                                    className='t3-bold'
                                >
                                    Колір: {colorName}
                                </Typography>
                            </Grid>
                            <Grid
                                item
                                container
                                xs={6}
                                justifyContent={'right'}
                            >
                                <Typography
                                    className={availableQuantity > 0 ? 'green-400-12' : 'red-400-12'}
                                >
                                    {availableQuantity > 0 ? 'В наявності' : 'Немає'}
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid
                        item
                        container
                        xs={1}
                    >
                        <Button
                            sx={{
                                height: 'fit-content',
                                minWidth: '100%',
                                ":hover": {
                                    backgroundColor: 'initial',
                                }
                            }}
                            onClick={() => { onDeleteFromCart() }}
                        >
                            <ButtonTrash height={19} width={18} color={'#6C4744'} />
                        </Button>
                    </Grid>

                </Grid>

                <Grid
                    container
                    item
                    xs={12}
                    height={39}
                >

                    <Grid
                        container
                        item
                        xs={6}
                        gap={1}
                        alignContent={'center'}
                    >
                        <Grid
                            container
                            item
                            xs={12}

                            justifyContent={'left'}
                        >
                            <Button
                                sx={{
                                    height: '21px',
                                    width: '20px',
                                    minWidth: '22px',
                                    borderRadius: '90px',
                                    padding: '0',
                                }}
                                onClick={() => { decrementCount() }}
                            >
                                <ButtonMinusXS />
                            </Button>
                            <Typography
                                className={'brown2-500-20'}
                                sx={{
                                    paddingRight: '5%',
                                    paddingLeft: '5%',
                                }}
                            >
                                {
                                    checkedProductIds.some(item => item?.id === id && item?.colorId === colorId) ? checkedProductIds.map(item =>
                                    {
                                        if (item?.id === id && item?.colorId === colorId)
                                            return item.count
                                    }) : 0
                                }
                            </Typography>
                            <Button
                                sx={{
                                    height: '21px',
                                    width: '20px',
                                    minWidth: '22px',
                                    borderRadius: '90px',
                                    padding: '0',
                                }}
                                onClick={() => { incrementCount() }}
                            >
                                <ButtonPlusXS />
                            </Button>
                        </Grid>
                    </Grid>

                    <Grid
                        item
                        container
                        xs={6}
                    >
                        <Grid
                            item
                            container
                            xs={6}
                            justifyContent={'center'}
                            alignContent={'end'}
                        >
                            <Typography
                                className='t3-bold'
                                sx={{
                                    paddingBottom: '2%',
                                }}
                            >
                                До сплати
                            </Typography>
                        </Grid>

                        <Grid
                            item
                            xs={6}
                        >
                            <Grid
                                height={'50%'}
                                container
                                alignContent={'center'}
                            >
                                <Typography
                                    className='t3-bold'
                                    sx={{
                                        textDecoration: 'line-through',
                                    }}
                                >{discount > 0 ? price + ' грн' : ''}</Typography>
                            </Grid>
                            <Grid
                                height={'50%'}
                                alignContent={'center'}
                            >
                                <Typography
                                    className={'t2-medium-500-red'}
                                >{price - (price * discount / 100)} грн</Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid >
            </Grid >
        </Grid>
    );
};


export default PhoneCartItem;