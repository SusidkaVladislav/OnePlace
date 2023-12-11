import React, { useState, useEffect, Fragment } from 'react';
import "./AllAboutProduct.css";

import
{
  Grid,
  Card,
  CardMedia,
  IconButton,
  Typography,
  Button,
  Badge,
} from '@mui/material';

import ShareIcon from '../../../svg/client-icons/productPage/ShareIcon';
import AddReviewIcon from '../../../svg/client-icons/productPage/AddReviewIcon';
import BigHeartIcon from '../../../svg/client-icons/productPage/BigHeartIcon';
import BigFilledHeartIcon from '../../../svg/client-icons/productPage/BigFilledHeartIcon';
import BigBrownLeftArrow from '../../../svg/arrows/BigBrownLeftArrow';
import BigBrownRightArrow from '../../../svg/arrows/BigBrownRightArrow';
import Divider from '../../../svg/shared-icons/Divider';

import StarRating from '../controls/StarRating';

import { useSelector } from 'react-redux';


const AllAboutBroduct = () =>
{
  const [currentImageAddress, setCurrentImageAddress] = useState('');

  const [rating, setRating] = useState({});

  const {
    product,
    productRaitingInfo,
  } = useSelector(state => state.userProducts);

  const [currentColorProductConfig, setCurrentColorProductConfig] = useState({})

  useEffect(() =>
  {
    setCurrentColorProductConfig({
      colorName: product?.productColors?.[0]?.color?.name,
      price: product?.productColors?.[0]?.price,
      quantity: product?.productColors?.[0]?.quantity,
    });

    setCurrentImageAddress(product?.pictures?.find(img => img?.isTitle === true)?.address)
    setRating(
      {
        starsCount: productRaitingInfo?.startsCount,
        reviewsCount: productRaitingInfo?.reviewsCount,
        averageValue: productRaitingInfo?.averageValue,
      }
    )
  }, [])

  const navigateImage = (direction) =>
  {
    const currentIndex = product?.pictures?.findIndex(picture => picture.address === currentImageAddress);
    if (direction === "next")
    {
      setCurrentImageAddress(() =>
        currentIndex !== -1 && currentIndex < product?.pictures?.length - 1 ?
          product?.pictures?.[currentIndex + 1]?.address
          : product?.pictures?.[0]?.address
      )
    }
    else if (direction === 'prev')
    {
      setCurrentImageAddress(() =>
        currentIndex !== -1 && currentIndex > 0 ?
          product?.pictures?.[currentIndex - 1]?.address
          : product?.pictures?.[product?.pictures?.length - 1]?.address
      )
    }
  };

  const [filled, setFilled] = useState(false);

  function HeartClick()
  {
    setFilled(!filled);
  }

  return (
    <Grid container>
      <Grid item className="product-gallery-root" xs={12} md={4.7} xl={4.7}>
        <Card>
          <div className='product-gallery-cardmedia-container'>
            <CardMedia
              component="img"
              className="product-gallery-main-image"
              image={currentImageAddress} />
            <Grid
              display={product?.pictures?.length > 1 ? 'flex' : 'none'}
              container
              alignItems="center"
              justifyContent="center"
              className='product-gallery-navigation-container'
            >
              <Grid item>
                <IconButton onClick={() => navigateImage('prev')}>
                  <BigBrownLeftArrow />
                </IconButton>
              </Grid>
              <Grid item>
                <IconButton onClick={() => navigateImage('next')}>
                  <BigBrownRightArrow />
                </IconButton>
              </Grid>
            </Grid>
          </div>
        </Card>
        <Grid container justifyContent="center" alignItems="center" spacing={1} className="product-gallery-img-container">
          {product?.pictures?.map((image, index) => (
            <Grid item key={index}>
              <img
                src={image?.address}
                alt={`thumbnail-${index}`}
                className={`product-gallery-thumbnail`}
                onClick={
                  () =>
                  {
                    setCurrentImageAddress(image?.address)
                  }}
              />
            </Grid>))}
        </Grid>
      </Grid>


      <Grid
        item
        md={0.3}
        xl={0.3}
      ></Grid>
      <Grid
        item
        className='aap-container1'
        xs={12}
        md={7}
        xl={7}
      >
        <div className='aap-container2'>
          <h4>{product?.name}</h4>

          <div className='hl'></div>

          <div style={{ display: "flex", justifyContent: 'space-between' }}>
            <div
              style={{
                display: "flex",
                width: '60%',
                gap: '5%'
              }}
            >

              <h4
                className='red'
              >
                {
                  product?.sale !== null ?
                    currentColorProductConfig?.price - (currentColorProductConfig?.price * product?.sale?.discountPercent / 100)
                    : currentColorProductConfig?.price
                } грн</h4>

              <Typography
                className='t2-medium'
                sx={{
                  display: product?.sale !== null ? 'flex' : 'none',
                  textDecoration: 'line-through'
                }}>
                {
                  product?.sale !== null ? currentColorProductConfig?.price : 0
                } грн</Typography>

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
                        product?.productColors?.length > 1 && productColor?.color?.name === currentColorProductConfig?.colorName ?
                          (
                            <Badge
                              color="warning"
                              variant="dot"
                              overlap="circular"
                            >
                              <div
                                className='aap-color-circle'
                                style={{
                                  backgroundColor: productColor?.color?.hex,
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
                                backgroundColor: productColor?.color?.hex,
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
            <Typography className='t2-medium-blue' style={{ display: "inline", paddingTop: "5px" }}>{rating?.averageValue} ({rating?.reviewsCount} оцінок)</Typography>
          </div>

          <div className='hl'></div>

          <div>
            <Typography className='t1-bold-brown2'>
              {product?.description}
            </Typography>
          </div>

          <div className='hl'></div>

          <Grid container className="aap-footer-container">
            <Grid item className='aap-navigate'>
              <h5 className="bold-brown2">Доставка</h5>
            </Grid>
            <Grid item className="pi-divider-container">
              <Divider />
            </Grid>
            <Grid item className='aap-navigate'>
              <h5 className="bold-brown2">Оплата</h5>
            </Grid>
          </Grid>

          <div className='hl'></div>
        </div>
      </Grid>
    </Grid>
  )
}

export default AllAboutBroduct;