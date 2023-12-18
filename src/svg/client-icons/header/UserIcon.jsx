import React from 'react';
import './Hover.css';

const UserIcon = () =>
{
    return (
        <svg className='svgHover' xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 18 22" fill="none" stroke="#471915">
        <path d="M9 9C11.2091 9 13 7.20914 13 5C13 2.79086 11.2091 1 9 1C6.79086 1 5 2.79086 5 5C5 7.20914 6.79086 9 9 9Z" strokeWidth="1.5"/>
        <path d="M16.997 17C17 16.836 17 16.669 17 16.5C17 14.015 13.418 12 9 12C4.582 12 1 14.015 1 16.5C1 18.985 1 21 9 21C11.231 21 12.84 20.843 14 20.563"  strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
    )

};

export default UserIcon;