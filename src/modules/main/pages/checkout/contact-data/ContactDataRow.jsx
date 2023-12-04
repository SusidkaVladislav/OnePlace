import React from 'react';
import
{
    Grid,
    Typography,
    useMediaQuery,
} from '@mui/material'
import GreenCheckCheckboxIcon from '../../../../../svg/shared-icons/GreenCheckCheckboxIcon';
import '../CheckoutStyles.css';

const ContactDataRow = (props) =>
{
    const {
        title,
    } = props;

    const xs = useMediaQuery('(min-width: 0px)');
    const sm = useMediaQuery('(min-width: 600px)');
    const md = useMediaQuery('(min-width: 900px)');
    const lg = useMediaQuery('(min-width: 1200px)');

    return (
        <Grid
            item
            xs={12}
            sx={{
                
            }}
        >
            <Typography
                className={xs ? 't2-medium' : ''}
            >
                {title}
            </Typography>
            <div style={{ position: 'relative' }}>
                <input
                    style={{
                        width: '100%',
                        height: lg ? '46px' : md ? '40px' : xs ? '46px' : '',
                        padding: lg ? '1% 15px 1% 15px' : md ? '1% 10px 1% 10px' : xs ? '1% 15px 1% 15px' : '',
                    }}
                    className={xs ? 't1-bold contact-data-input' : 'contact-data-input'}
                    type="text"
                />
                <span className='contact-data-input-inside-check-icon' >
                    <GreenCheckCheckboxIcon />
                </span>
            </div>
        </Grid>
    )
}

export default ContactDataRow;