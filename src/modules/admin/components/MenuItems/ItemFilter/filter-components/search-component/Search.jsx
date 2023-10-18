import React from 'react';
import './SearchStyles.css';
import SearchIcon from '../../../../../svg/sharedIcons/SearchIcon';

const Search = (props) =>
{
    const {
        filterOptions,
    } = props;

    return (
        <label className='search-filter-component'>
            <input className='search-filter-input' type='search' onChange={(event)=>{filterOptions(event.target.value)}}/>
            <span className='search-icon'><SearchIcon /></span>
        </label>
    )
}

export default Search;