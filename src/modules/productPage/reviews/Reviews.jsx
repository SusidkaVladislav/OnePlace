import React from "react";
import "./Reviews.css";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import StarRating from "../controls/StarRating";
import ReviewReplyIcon from "../../../svg/client-icons/productPage/ReviewReplyIcon";

const Reviews = () => {
    return(
        <Grid container className="review-container4">
            <Grid item xs={12} xl={12} className="review-container1">
                <div className="review-container2">
                    <div className="review-container3">
                        <h5 className="bold">Іврацтинський Віталій</h5>
                        <Typography className="t2-medium-brown3">02 серпня 2023</Typography>
                    </div>
                    <StarRating defaultRating={3}/>
                    <Typography className="t1-bold review-description">
                    Гарний телефон, купували на подарунок, сподобався.
                    </Typography>
                </div>
            </Grid>

            <Grid item xs={9} xl={9} className="review-container1">
                <div className="review-container2">
                    <div className="review-container3">
                        <div style={{display:"flex"}}>
                            <ReviewReplyIcon/>
                            <Typography className="t1-bold-orange1">Відповідь адміністратора</Typography>
                        </div>
                        <Typography className="t2-medium-brown3">02 серпня 2023</Typography>
                    </div>
                    <Typography className="t1-bold review-description">
                    Дякуємо за відгук!
                    </Typography>
                </div>
            </Grid>

            <Grid item xs={12} xl={12} className="review-container1">
                <div className="review-container2">
                    <div className="review-container3">
                        <h5 className="bold">Лістровий Андрій</h5>
                        <Typography className="t2-medium-brown3">02 серпня 2023</Typography>
                    </div>
                    <StarRating defaultRating={4}/>
                    <Typography className="t1-bold review-description">
                    Працює чудово.
                    </Typography>
                </div>
            </Grid>
        </Grid>
    )
}

export default Reviews;