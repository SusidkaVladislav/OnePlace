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
            lg={12}
            gap={'34px'}
        >
            <ContactDataRow title='Прізвище' />
            <ContactDataRow title="Ім'я" />
            <ContactDataRow title='Ел. пошта' />
            <ContactDataRow title='Номер телефону' />
        </Grid>
    )
}

export default ContactData;