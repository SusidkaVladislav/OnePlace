import React, { useState } from 'react';
import TextField from "@mui/material/TextField";
import SearchIcon from '../../../svg/client-icons/header/SearchIcon';

const SearchBar = () =>
{
    return (
        <TextField
            disabled={true}
            id="search-bar"
            className="text"
            variant="standard"
            size="small"
            style={{
                borderRadius: '26px',
                border: '1px solid var(--brown-80, #6C4744)',
                background: '#F6F6F6',
                padding: '2% 7% 2% 7%',
                width: '100%',
            }}

            InputProps={{
                startAdornment: <SearchIcon />,
                disableUnderline: true
            }}
        />
    )
}

export default SearchBar;