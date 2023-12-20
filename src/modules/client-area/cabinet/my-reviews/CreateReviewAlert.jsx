import React from 'react';
import
{
    Grid,
    Typography,
    useMediaQuery,
} from '@mui/material';

import { useSelector } from 'react-redux'

const CreateReviewAlert = () =>
{
    const md = useMediaQuery('(min-width: 900px)');

    const {
        reviewMessage,
    } = useSelector(state => state.myReviews)

    return <Grid
        item
        container
        lg={4}
        md={6}
        sm={8}
        xs={8}
        height={'10%'}
        bgcolor={'#F6F6F6'}
        sx={{
            borderRadius: '10px',
            padding: '5px',
        }}
        justifyContent={'center'}
        alignContent={'center'}
        gap={1}
    >
        <Typography
            className={md ? 't1-bold' : 't2-medium'}
        >
            {reviewMessage}
        </Typography>
    </Grid>
}

export default CreateReviewAlert;