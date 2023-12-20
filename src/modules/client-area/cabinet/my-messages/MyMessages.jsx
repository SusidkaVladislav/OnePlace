import React, { useEffect } from 'react';
import "./MyMessages.css";

import { Grid, Typography } from "@mui/material";
import CommentIcon from '../../../../svg/user-cabinet/orders/CommentIcon';

import { useDispatch, useSelector } from 'react-redux';
import
{
    getAllMyMessages,
} from '../../features/messages/myMessagesSlice';

import { useNavigate } from 'react-router-dom';

import LoadingAnimation from '../../../../common-elements/loading/LoadingAnimation';

const MyMessages = () =>
{
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {
        loadingUserMessages,
        userMessages,
    } = useSelector(state => state.myMessages);

    useEffect(() =>
    {
        dispatch(getAllMyMessages());
    }, [])


    if (loadingUserMessages)
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
        <div className='mm-container1'>
            <Grid container>

                {
                    userMessages?.map((message, index) =>
                    {
                        return (
                            <Grid key={index} item xs={12} xl={12} className="mm-container2">
                                <div className="mm-container3">
                                    <div className="mm-container4">
                                        <div className="mm-container5">
                                            <img src={message?.pictureAddress} className='mr-product-image'></img>
                                            <h5 className='bold-blue'
                                                style={{
                                                    cursor: 'pointer'
                                                }}
                                                onClick={() =>
                                                {
                                                    navigate(`/product-page/${message?.productId}`)
                                                }}
                                            >{message?.productName}</h5>
                                        </div>
                                        <Typography className="t2-medium-blue">
                                            {new Date(message?.date).getDate() + '.' + (new Date(message?.date).getMonth() + 1) + '.' + new Date(message?.date).getFullYear()}
                                        </Typography>
                                    </div>

                                    <Typography
                                        className="t1-bold"
                                        sx={{ paddingTop: "20px" }}
                                    >{message?.messageText}</Typography>

                                    <div className="mm-container6">
                                        <CommentIcon /><h5 className='light-blue' style={{ paddingLeft: "5px" }}>Стан повідомлення: {message?.isReplied === true ? 'відповідь відправлена'
                                            : 'в обробці'}</h5>
                                    </div>
                                </div>
                            </Grid>
                        )
                    })
                }
            </Grid>

            <h5 className='bold-blue' style={{ margin: "20px" }}>Тут з'являються запитання, які ви залишили менеджеру. Для того, щоб залишити запитання, перейдіть на сторінку товару, який вас цікавить, та оберіть вкладку "Задати питання". Наш менеджер надішле вам відповідь на електронну пошту на протязі 3 робочих днів.</h5>
        </div>
    )
}

export default MyMessages; 