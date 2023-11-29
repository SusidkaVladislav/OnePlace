import React, { useState } from 'react';
import
{
    Grid,
    Typography,
    Select,
    MenuItem,
    FormControl,
    InputBase,
    useMediaQuery,
    Autocomplete,
    TextField,
} from '@mui/material'

import CustomTextInput from '../../../../../services/custom-inputs/CustomTextInput';
import UseAutoComplete from '../../../../../services/custom-inputs/UseAutoComplete';

const DeliveryDataRow = (props) =>
{
    const {
        title,
        options,
        onInput,
    } = props;

    const xs = useMediaQuery('(min-width: 0px)');
    const sm = useMediaQuery('(min-width: 600px)');
    const md = useMediaQuery('(min-width: 900px)');
    const lg = useMediaQuery('(min-width: 1200px)');

    return (
        <Grid
            container
        >
            <Typography
                className={lg ? 't2-medium' : ''}
            >{title}</Typography>

            <UseAutoComplete
                options={options}
                onInput={onInput}
            />

        </Grid>
    )
}

export default DeliveryDataRow;