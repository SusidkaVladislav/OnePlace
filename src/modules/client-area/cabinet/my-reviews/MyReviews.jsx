import React, { useState, useEffect, Fragment } from 'react';
import './MyReviews.css';

import
{
    Grid,
    Typography,
} from "@mui/material";

//#region Icons
import Divider from "../../../../svg/shared-icons/Divider";
import StarRating from '../../../productPage/controls/StarRating';
import TrashIcon from '../../../../svg/user-cabinet/favourites/TrashIcon';
import ReviewReplyIcon from '../../../../svg/client-icons/productPage/ReviewReplyIcon';
import PlusIcon from '../../../../svg/user-cabinet/reviews/PlusIcon';
//#endregions

import CreateReviewForm from './CreateReviewForm';

import { useNavigate } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import
{
    getAllMyReviews,
    deleteReview,
} from '../../features/reviews/myReviewsSlice';

import
{
    getSoldProducts,
} from '../../features/products/myProductsSlice';

import CreateReviewAlert from './CreateReviewAlert';
import LoadingAnimation from '../../../../common-elements/loading/LoadingAnimation';
const MyReviews = () =>
{
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [activeMenuItem, setActiveMenuItem] = useState('yourReviews');
    const [createReviewFormOpen, setCreateReviewFormOpen] = useState(false);

    const {
        loadingUserReviews,
        userReviews,
        showReviewMessage,
    } = useSelector(state => state.myReviews);

    const {
        loadingBoughtProducts,
        boughtProducts,
    } = useSelector(state => state.myProducts);

    const handleMenuItemClick = (menuItem) =>
    {
        setActiveMenuItem(menuItem);
    };

    useEffect(() =>
    {
        dispatch(getAllMyReviews());
    }, [])

    if (loadingUserReviews)
    {
        return (
            <Grid
                sx={{
                    minHeight: '100vh'
                }}
            >
                <LoadingAnimation />
            </Grid>
        )
    }
    if (loadingBoughtProducts)
    {
        return (
            <Grid
                sx={{
                    minHeight: '100vh'
                }}
            >
                <LoadingAnimation />
            </Grid>
        )
    }
    return (
        <div className='mr-container1'>
            <Grid container>
                <Grid item onClick={() => handleMenuItemClick('yourReviews')} sx={{ cursor: "pointer" }}>
                    <Typography className={activeMenuItem === 'yourReviews' ? 't1-bold-orange1' : 't1-light'}>Ваші відгуки</Typography>
                </Grid>
                <Grid item className="mr-divider-container">
                    <Divider />
                </Grid>
                <Grid item onClick={async () =>
                {
                    await dispatch(getSoldProducts());
                    handleMenuItemClick('productsForReview')
                }} sx={{ cursor: "pointer" }}>
                    <Typography className={activeMenuItem === 'productsForReview' ? 't1-bold-orange1' : 't1-light'}>Товари до яких ви можете залишити відгук</Typography>
                </Grid>
            </Grid>

            <div className={activeMenuItem === 'yourReviews' ? 'visible' : 'hidden'}>
                <Grid container sx={{ justifyContent: "flex-end" }}>
                    {
                        userReviews?.map((review, index) =>
                        {
                            return (
                                <Fragment
                                    key={index}
                                >
                                    <Grid item xs={12} xl={12} className="mr-container2">
                                        <div className="mr-container3">
                                            <div className="mr-container4">
                                                <div className="mr-container5">
                                                    <img src={review?.productPicture} className='mr-product-image'></img>
                                                    <h5
                                                        className='bold-brown2'
                                                        style={{
                                                            cursor: 'pointer'
                                                        }}
                                                        onClick={() =>
                                                        {
                                                            navigate(`/product-page/${review?.productId}`);
                                                        }}
                                                    >{review?.productName}</h5>
                                                </div>
                                                <Typography className="t2-medium-brown3">
                                                    {new Date(review?.commentDate).getDate() + '.' + (new Date(review?.commentDate).getMonth() + 1) + '.' + new Date(review?.commentDate).getFullYear()}
                                                </Typography>
                                            </div>
                                            <StarRating defaultRating={review?.numberOfStars} />
                                            <Typography className="t1-bold" sx={{ paddingTop: "20px" }}>{review?.comment}</Typography>
                                            <div
                                                className="mr-container6"
                                            >
                                                <span
                                                    onClick={async () =>
                                                    {
                                                        await dispatch(deleteReview(review?.id))
                                                            .then(() =>
                                                            {
                                                                dispatch(getAllMyReviews())
                                                            })
                                                    }}
                                                >
                                                    <TrashIcon />
                                                </span>
                                            </div>
                                        </div>
                                    </Grid>

                                    <Grid
                                        display={review?.adminReplyComment?.length > 0 ? 'block' : 'none'}
                                        item
                                        xs={11}
                                        xl={11}
                                        className="mr-container2"
                                    >
                                        <div className="mr-container3">
                                            <div className="mr-container4">
                                                <div style={{ display: "flex" }}>
                                                    <ReviewReplyIcon />
                                                    <Typography className="t1-bold-orange1">Відповідь адміністратора</Typography>
                                                </div>
                                                <Typography className="t2-medium-brown3">
                                                    {new Date(review?.amindReplyDate).getUTCDay() + '.' + (new Date(review?.amindReplyDate).getMonth() + 1) + '.' + new Date(review?.amindReplyDate).getFullYear()}
                                                </Typography>
                                            </div>
                                            <Typography className="t1-bold review-description">{review?.adminReplyComment}</Typography>
                                        </div>
                                    </Grid>
                                </Fragment>
                            )
                        })
                    }
                </Grid>
            </div>

            <div className={activeMenuItem === 'productsForReview' ? 'visible' : 'hidden'}>
                <Grid container gap={1}>

                    {
                        boughtProducts?.map((product, index) =>
                        {
                            return (
                                <Grid key={index} item xs={12} sm={12} md={5} lg={5} className='mr-container2'>
                                    <div className="mr-container7">
                                        <img src={product?.picureAddress} className='mr-product-image'></img>
                                        <div
                                            style={{
                                                width: '100%',
                                            }}
                                        >
                                            <h5 className='bold-brown2'
                                                style={{
                                                    cursor: 'pointer'
                                                }}
                                                onClick={() =>
                                                {
                                                    navigate(`/product-page/${product?.productId}`);
                                                }}
                                            >{product?.name}</h5>
                                            <div style={{ display: "flex", justifyContent: "right" }}>
                                                <span
                                                    onClick={() =>
                                                    {
                                                        setCreateReviewFormOpen(!createReviewFormOpen);
                                                    }}
                                                >
                                                    <PlusIcon />
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    {
                                        createReviewFormOpen &&
                                        <CreateReviewForm
                                            id={product?.productId}
                                        />
                                    }
                                </Grid>
                            )
                        })
                    }

                </Grid>
            </div>

            {
                showReviewMessage &&
                <span
                    className="modal-backdrop"
                >
                    <CreateReviewAlert />
                </span>
            }

        </div>
    )
}

export default MyReviews;