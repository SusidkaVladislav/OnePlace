import React from 'react';
import
{
    Grid,
    useMediaQuery,
} from '@mui/material';

const UnsuccessfulCheckout = (props) =>
{
    const {
        message
    } = props;

    const sm = useMediaQuery('(min-width: 600px)');
    const md = useMediaQuery('(min-width: 900px)');
    const lg = useMediaQuery('(min-width: 1200px)');

    return (
        <Grid
            container
            sx={{
                padding: '10px',
                position: 'absolute',
                minHeight: '50px',
                height: 'fit-content',
                borderRadius: '10px',
                boxShadow: '1px 1px 8px 0px rgba(0, 0, 0, 0.08)',
                justifyContent: 'center',
                alignItems: 'center',
                color: '#DCCBE5',
                fontFamily: 'Montserrat Alternates',
                fontSize: '18px',
                fontStyle: 'normal',
                fontWeight: '400',
                lineHeight: '130%',
            }}
            bgcolor={'#B31D21'}
            width={
                lg ? '50%' : md ? '65%' : sm ? '75%' : '90%'
            }
            justifyItems={'center'}
            alignContent={'center'}
        >
            {message}
        </Grid>

    )
}

export default UnsuccessfulCheckout;