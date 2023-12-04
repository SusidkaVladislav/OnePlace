import React from 'react';
import
{
    Grid,
    useMediaQuery,
} from '@mui/material'
import ContactDataRow from './ContactDataRow';

const ContactData = () =>
{
    const xs = useMediaQuery('(min-width: 0px)');
    const sm = useMediaQuery('(min-width: 600px)');
    const md = useMediaQuery('(min-width: 900px)');
    const lg = useMediaQuery('(min-width: 1200px)');

    return (
        <Grid
            container
            item
            xs={12}
            gap={'34px'}
            sx={{
                borderBottom: {
                    md: 'none',
                    xs: '1px solid #DAD1D0',
                },
                paddingBottom: {
                    md: '0px',
                    xs: '15px'
                }
            }}
        >
            <ContactDataRow title='Прізвище' />
            <ContactDataRow title="Ім'я" />
            <ContactDataRow title='Ел. пошта' />
            <ContactDataRow title='Номер телефону' />
        </Grid>
    )
}

export default ContactData;