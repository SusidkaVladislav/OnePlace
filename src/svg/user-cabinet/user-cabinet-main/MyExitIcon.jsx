import React from 'react';

const MyExit = (props) =>
{
    const {
        color
    } = props;

    return (
        <svg width="24" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5.39893 8.3335H14.3989" stroke={color} strokeWidth="1.2" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M8.77857 1H2.96429C1.86429 1 1 1.72024 1 2.57143V14.0298C1 14.9464 1.86429 15.6667 2.96429 15.6667H8.77857" stroke={color} strokeWidth="1.2" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M12 5.84521L14.9857 8.33331L12 10.8214" stroke={color} strokeWidth="1.2" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
        </svg>

    )
}

export default MyExit;