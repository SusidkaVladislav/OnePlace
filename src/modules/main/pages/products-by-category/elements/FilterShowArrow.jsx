import React from 'react';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';

const FilterShowArrow = (props) =>
{

    const {
        filterIndex,
        setShowHideFilterOptions,
        showHideFilterOptions
    } = props;

    return (
        <span className='show-more-filter-options'>
            <span style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                width: '80%',
            }}>
                <span className='line'></span>
                <span style={{ marginLeft: '-10px' }}><ArrowRightIcon className='icon-arrow-brown' /></span>
            </span>
            <span
                style={{ cursor: 'pointer' }}
                onClick={() =>
                {
                    setShowHideFilterOptions(
                       prevOptions =>
                        {
                            const updatedOptions = prevOptions.map((option, index) =>
                            {
                                if (index === filterIndex)
                                {
                                    return !option;
                                }
                                return option;
                            });
                            return updatedOptions;
                        }
                    );
                }}
            >{showHideFilterOptions[filterIndex] ? 'менше' : 'більше'}</span>
        </span>
    )
}

export default FilterShowArrow; 