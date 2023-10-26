import React from 'react';


const DownArrow = (props) =>
{
    const {
        color,
    } = props;

    return (
        <svg xmlns="http://www.w3.org/2000/svg" cursor={'pointer'} width="36" height="36" viewBox="0 0 36 36" fill="none">
        <path d="M4.92121 8.50915L12.5002 15.491L14.3949 13.7455M20.0791 8.50915L16.5882 12" stroke="#471915" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
    )

};

export default DownArrow;