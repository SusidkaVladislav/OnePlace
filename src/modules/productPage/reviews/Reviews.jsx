import React, { Fragment, useEffect } from "react";
import "./Reviews.css";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import StarRating from "../controls/StarRating";
import ReviewReplyIcon from "../../../svg/client-icons/productPage/ReviewReplyIcon";
import { useSelector } from 'react-redux'

const Reviews = () =>
{

    const {
        reviewsProduct,
    } = useSelector(state => state.userAnalitic)

    return (
        <Grid container className="review-container4">
            {
                reviewsProduct?.map((review, index) =>
                {
                    return (
                        <Fragment
                            key={index}
                        >
                            <Grid item xs={12} xl={12} className="review-container1">
                                <div className="review-container2">
                                    <div className="review-container3">
                                        <h5 className="bold">{review?.userInitials}</h5>
                                        <Typography className="t2-medium-brown3">{new Date(review?.commentDate).getDate() + '.' +
                                            (new Date(review?.commentDate).getMonth() + 1) + '.' + new Date(review?.commentDate).getFullYear()}</Typography>
                                    </div>
                                    <StarRating defaultRating={review?.numberOfStars} />
                                    <Typography className="t1-bold review-description">
                                        {review?.comment}
                                    </Typography>
                                </div>
                            </Grid>
                            {
                                review?.adminReplyComment !== null &&
                                <Grid item xs={9} xl={9} className="review-container1">
                                    <div className="review-container2">
                                        <div className="review-container3">
                                            <div style={{ display: "flex" }}>
                                                <ReviewReplyIcon />
                                                <Typography className="t1-bold-orange1">Відповідь адміністратора</Typography>
                                            </div>
                                            <Typography className="t2-medium-brown3">{new Date(review?.amindReplyDate).getUTCDay() + '.' +
                                                (new Date(review?.amindReplyDate).getMonth() + 1) + '.' + new Date(review?.amindReplyDate).getFullYear()}</Typography>
                                        </div>
                                        <Typography className="t1-bold review-description">
                                            {review?.adminReplyComment}
                                        </Typography>
                                    </div>
                                </Grid>
                            }

                        </Fragment>
                    )

                })
            }
        </Grid>
    )
}

export default Reviews;