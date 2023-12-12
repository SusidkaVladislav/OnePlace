import React, { useEffect } from 'react';

import
{
  Button,
  Typography,
  Grid,
  useMediaQuery,

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

import ButtonMinus from '../../../../svg/basket-icons/ButtonMinus';
import ButtonPlus from '../../../../svg/basket-icons/ButtonPlus';
import ButtonTrash from '../../../../svg/basket-icons/trash';

import CustomCheckbox from '../../../../services/custom-inputs/CustomCheckbox';

const CartItem = (props) =>
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

  const sm = useMediaQuery('(min-width: 600px)');
  const md = useMediaQuery('(min-width: 900px)');
  const lg = useMediaQuery('(min-width: 1200px)');

  // useEffect(() =>
  // {
  //   dispatch(changeProductPriceSum(0))
  //   dispatch(changeTotalOrderPrice(0))
  // }, [])

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
        sx={{
          height: {
            lg: '163px',
            md: '163px',
            sm: '183px',
          },
          marginTop: {
            lg: '49px',
            md: '29px',
            sm: '49px',
          }
        }}
        justifyContent={'space-between'}
      >
        <Grid
          item
          sm={3}
        >
          <img
            height={'163px'}
            width={'100%'}
            style={{
              borderRadius: '10px',
              boxShadow: '1px 1px 8px 0px rgba(0, 0, 0, 0.08)',
              objectFit: 'contain',
            }}
            src={imageURL}
            alt='product'
          />
        </Grid>

        <Grid
          item
          container
          sm={8}
          height='100%'
          sx={{
            paddingLeft: {
              sm: '1%',
            }
          }}
        >
          <Grid
            item
            xs={12}
            sx={{
              height: {
                sm: '30%',
              },
              overflow: 'hidden',
              wordWrap: 'break-word'
            }}
          >
            <Typography
              className={
                lg ? 'brown1-400-20'
                  : md ? 't1-bold'
                    : sm ? 'brown1-400-20'
                      : ''}
            >{name}</Typography>
          </Grid>

          <Grid
            item
            container
            direction={'row'}
            xs={12}
            sx={{
              height: {
                sm: '15%',
              },
              marginTop: {
                sm: '15px',
              }
            }}
          >
            <Grid
              item
              xs={6}
            >
              <Typography
                className={lg ? 't1-bold' : md ? 't2-medium' : 't1-bold'}
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
                className={
                  availableQuantity > 0
                    ? (lg ? 't2-medium-orange1'
                      : md ? 't2-medium-orange'
                        : 't2-medium-orange1')
                    : (lg ? 't2-medium-red'
                      : md ? 't2-medium-red'
                        : 't2-medium-red')
                }
              >
                {availableQuantity > 0 ? 'В наявності' : 'Немає'}
              </Typography>
            </Grid>

          </Grid>

          <Grid
            container
            item
            xs={12}
            gap={1}
            sx={{
              height: {
                sm: '45%',
              },
            }}
            alignContent={'center'}
          >
            <Grid
              container
              item
              sm={6}
              sx={{
                paddingTop: {
                  sm: '5%',
                }
              }}
              justifyContent={'space-around'}
            >
              <Button
                sx={{
                  borderRadius: '90px',
                  height: {
                    lg: '29px',
                    md: '29px',
                    sm: '29px',
                  },
                  minWidth: {
                    lg: '29px',
                    md: '29px',
                    sm: '29px',
                  },
                  backgroundColor: '#E1E3E3',
                  ":hover": {
                    backgroundColor: '#E1E3E3',
                  },
                }}
                onClick={() => { decrementCount() }}
              >
                <ButtonMinus />
              </Button>
              <Typography
                className={
                  lg ? 'blue-500-26'
                    : md ? 'h4-blue'
                      : sm ? 'blue-500-26'
                        : ''}
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
                  borderRadius: '90px',
                  height: {
                    sm: '29px',
                  },
                  minWidth: {
                    sm: '27px',
                  },
                  backgroundColor: '#E1E3E3',
                  ":hover": {
                    backgroundColor: '#E1E3E3',
                  }
                }}
                onClick={() => { incrementCount() }}
              >
                <ButtonPlus />
              </Button>
            </Grid>

            <Grid
              item
              container
              direction={'column'}
              height={'50%'}
              sm={5.5}
              sx={{
                paddingLeft: {
                  sm: '5%',
                }
              }}
            >
              <Grid
                item
                container
                sm={6}
                justifyContent={'right'}
              >
                <Typography
                  className={sm ? 't2-medium' : ''}
                  sx={{
                    textDecoration: 'line-through',
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >{discount > 0 ? price + ' грн' : ''}</Typography>
              </Grid>

              <Grid
                item
                sm={6}
                height={'50%'}
                container
                justifyContent={'right'}
              >
                <Typography
                  className={
                    lg ? 'h4-red'
                      : md ? 'h5-bold-red'
                        : sm ? 'h4-red'
                          : ''}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >{price - (price * discount / 100)} грн</Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        <Grid
          item
          container
          sm={1}
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
            <ButtonTrash height={lg ? 36 : sm ? 30 : 0} width={lg ? 36 : sm ? 30 : 0} color={'#0A3D58'} />
          </Button>
        </Grid>
      </Grid >
    </Grid>
  );
};


export default CartItem;