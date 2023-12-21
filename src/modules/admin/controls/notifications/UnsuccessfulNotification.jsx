import React from 'react';
import './NotificationStyles.css';
import UnsuccessfulCharacterIcon from '../../../../svg/shared-icons/UnsuccessfulCharacterIcon';
import
{
    Grid,
    Typography,
} from '@mui/material'


const UnsuccessfulNotification = (props) =>
{
    const {
        notifiaction,
    } = props;

    return (
        <Grid
            sx={{
                width: '300px',
                minHeight: '380px',
                height: 'fit-content',
                backgroundColor: '#FFFFFF',
                borderRadius: '20px',
                padding: '10px',
            }}
            className='red-500-16'
        >
            <Grid
                container
                justifyContent={'center'}
                sx={{
                    marginTop: '30px'
                }}
            >
                <Typography>
                    {notifiaction}
                </Typography>
            </Grid>
            <Grid
                sx={{
                    marginRight: '670px'
                }}
            >
                <UnsuccessfulCharacterIcon />
            </Grid>
        </Grid>
    )
}

export default UnsuccessfulNotification;