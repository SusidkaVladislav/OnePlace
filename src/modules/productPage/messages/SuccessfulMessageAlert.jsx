import React from 'react';
import
{
    Grid,
    Typography,
    useMediaQuery,
} from '@mui/material';


const SuccessfulMessageAlert = () =>
{
    const md = useMediaQuery('(min-width: 900px)');

    return (
        <Grid
            item
            container
            lg={4}
            md={6}
            sm={8}
            xs={10}
            height={'20%'}
            bgcolor={'#F6F6F6'}
            sx={{
                borderRadius: '10px',
                padding: '10px',
            }}
            justifyContent={'center'}
            alignContent={'center'}
            gap={1}
        >
            <Typography
                className={md ? 't1-bold' : 't2-medium'}
            >
                Повідомлення успішно відправлено!
            </Typography>
            <Typography
                className={md ? 't1-bold' : 't2-medium'}
            >
                Очікуйте відповідь на електронну пошту!
            </Typography>
        </Grid>
    )
}

export default SuccessfulMessageAlert;