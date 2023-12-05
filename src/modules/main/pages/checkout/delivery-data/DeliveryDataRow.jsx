import React from 'react';
import
{
    Grid,
    Typography,
} from '@mui/material'

import UseAutoComplete from '../../../../../services/custom-inputs/UseAutoComplete';

const DeliveryDataRow = (props) =>
{
    const {
        title,
        options,
        onInput,
        outsideValue,
        isError,
    } = props;

    return (
        <Grid
            container
        >
            <Typography
                className={'t2-medium'}
            >{title}</Typography>

            <UseAutoComplete
                options={options}
                onInput={onInput}
                outsideValue={outsideValue}
                isError={isError}
            />

        </Grid>
    )
}

export default DeliveryDataRow;