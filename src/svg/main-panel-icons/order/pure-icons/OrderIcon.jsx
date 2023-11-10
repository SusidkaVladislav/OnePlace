import React from 'react';

const OrderIcon = (props) =>
{
    const {
        color
    } = props;

    return (
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M28.4453 14.2222V24.8889C28.4453 26.3555 27.2453 27.5555 25.7786 27.5555H7.11198C5.64531 27.5555 4.44531 26.3555 4.44531 24.8889V6.22221C4.44531 4.75554 5.64531 3.55554 7.11198 3.55554H19.112" stroke={color} strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" />
            <path d="M28.2664 6.13336L14.9331 20.2667L9.06641 14.4" stroke={color} strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" />
        </svg>

    )
}

export default OrderIcon;