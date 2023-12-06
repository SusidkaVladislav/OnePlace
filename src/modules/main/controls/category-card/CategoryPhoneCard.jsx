import React from 'react';
import
{
    Grid,
    Typography,
} from '@mui/material'

const CategoryPhoneCard = (props) =>
{

    const {
        name,
        picture,
    } = props;

    return (
        <Grid
            container
            bgcolor={'#E9ECEC'}
            width={'85%'}
            height={'100px'}
            padding={'5% 1% 5% 1%'}
            borderRadius={'8px'}
            justifyContent={'space-between'}
        >
            <Grid
                item
                xs={4}
                height={'100%'}
            >
                <img
                    src={picture}
                    style={{
                        objectFit: 'contain',
                        borderRadius: '15%',
                        height: '100%',
                        width: '100%',
                    }}
                    alt='category'
                    className='t3-bold'
                />
            </Grid>
            <Grid
                item
                container
                xs={7.5}
                sx={{
                    overflow: 'hidden',
                    wordWrap: 'break-word',
                    padding: '3%'
                }}
            >
                <Typography
                    className='t3-bold'
                >
                    {name}
                </Typography>
            </Grid>
        </Grid>
    )
}

export default CategoryPhoneCard;