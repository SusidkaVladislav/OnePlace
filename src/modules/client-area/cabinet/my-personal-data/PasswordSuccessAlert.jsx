import React from 'react';
import
{
    Grid,
    Typography,
    useMediaQuery,
} from '@mui/material';

const PasswordSuccessAlert = () =>
{
    const md = useMediaQuery('(min-width: 900px)');

    return (
        <Grid
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
                style={{
                    color: '#3FB914'
                }}
            >
                Пароль змінено!
            </Typography>
        </Grid>
    )
}

export default PasswordSuccessAlert;