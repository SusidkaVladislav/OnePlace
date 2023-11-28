import React, { forwardRef } from 'react';
import TextField from '@mui/material/TextField';

const Custom = forwardRef(({ onChange, ...props }, ref) =>
{
    const handleChange = (event) =>
    {
        const modifiedValue = event.target.value.toUpperCase();
        onChange && onChange(event, modifiedValue);
    };



    return <input {...props} onChange={handleChange} ref={ref} />;
});

const CustomTextInput = () =>
{
    return (
        <TextField
            InputProps={{
                inputComponent: Custom,
            }}
        />
    );
};

export default CustomTextInput;
