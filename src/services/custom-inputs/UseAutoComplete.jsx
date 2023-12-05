import React, { useState } from 'react';
import { useAutocomplete } from '@mui/base/useAutocomplete';
import
{
    Grid,
} from '@mui/material'
import { styled } from '@mui/system';
import './CustomInputsStyles.css';

const Input = styled('input')(({ theme }) => ({
    width: '100%',
    height: '46px',
    backgroundColor: '#E1E3E3',
    borderRadius: '10px',
    color: '#6C4744',
    border: 'none',
    paddingLeft: '10px',
}));

const Listbox = styled('ul')(({ theme }) => ({
    width: '100%',
    listStyle: 'none',
    backgroundColor: theme.palette.mode === 'light' ? '#fff' : '#000',
    overflow: 'auto',
    maxHeight: 200,
    borderRadius: '10px',
    paddingLeft: '0px',
    border: '1px solid rgba(0,0,0,.25)',
    '& li.Mui-focused': {
        color: '#DA8D33',
        cursor: 'pointer',
    },
    '& li:active': {
        color: '#DA8D33',
    },

    '&::-webkit-scrollbar': {
        width: '0px',
    },
}));

export default function UseAutocomplete(props)
{
    const {
        options,
        onInput,
        outsideValue,
        isError,
    } = props;

    const {
        getRootProps,
        getInputLabelProps,
        getInputProps,
        getListboxProps,
        getOptionProps,
        groupedOptions,
    } = useAutocomplete(
        {
            id: 'use-autocomplete-demo',
            options: options,
            getOptionLabel: (option) => option,
        }
    );

    const [value, setValue] = useState(outsideValue);

    return (
        <Grid
            item
            xs={12}
            sx={{
                border: isError ? '1px solid red' : 'none',
                borderRadius: '10px',
            }}
        >
            <Grid
                {...getRootProps()}
            >
                <Input
                    {...getInputProps()}
                    className={'t1-bold-brown2 bg-img'}
                    value={value}
                    onChange={({ target }) =>
                    {
                        setValue(target.value)
                        onInput(target.value)
                    }}
                    onClick={({ target })=>{
                        onInput(target.value)
                    }}
                />
            </Grid>

            <Grid
                container
                item
                xs={12}
                position={'absolute'}
                sx={{
                    width: {
                        lg: '46.5%',
                        md: '47.5%',
                        sm: '95%',
                        xs: '94%',
                    },
                    zIndex: {
                        xs: 1
                    }
                }}
            >
                {
                    groupedOptions.length > 0 ? (
                        <Listbox
                            {...getListboxProps()}
                        >
                            {groupedOptions.map((option, index) => (
                                <li style={{
                                    height: '44px',
                                    padding: '5px 10px 5px 10px',
                                    borderBottom: '1px solid #DAD1D0',
                                    display: 'flex',
                                    alignItems: 'center',
                                }}
                                    {...getOptionProps({ option, index })}
                                    className={'t1-bold-brown3'}
                                    onClick={() =>
                                    {
                                        setValue(option)
                                        onInput(option)
                                    }}
                                >{option}</li>
                            ))}
                        </Listbox>
                    ) : null
                }
            </Grid>

        </Grid>
    );
}