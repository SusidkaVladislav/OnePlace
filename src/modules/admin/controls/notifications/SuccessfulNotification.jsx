import React from 'react';
import './NotificationStyles.css';
import SuccessfulCharacterIcon from '../../../../svg/shared-icons/SuccessfulCharacterIcon';
import
{
    Grid,
    Typography,
} from '@mui/material'

const CongratulationNotification = (props) =>
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
            className='brown1-500-16'
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
                <SuccessfulCharacterIcon />
            </Grid>
        </Grid>
    )
}

export default CongratulationNotification;