import React from 'react';

const MyPurse = (props) =>
{
    const {
        color
    } = props;

    return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clipPath="url(#clip0_5246_2361)">
                <path d="M21 12C21 8.70038 21 7.05012 19.9452 6.0255C18.8913 5 17.1939 5 13.8 5H10.2C6.8061 5 5.1087 5 4.0548 6.0255C3 7.05012 3 8.70038 3 12C3 15.2996 3 16.9499 4.0548 17.9745C5.1087 19 6.8061 19 10.2 19H13.8C17.1939 19 18.8913 19 19.9452 17.9745C20.5338 17.4031 20.7939 16.6375 20.9082 15.5M10.2 15.5H6.6M13.8 15.5H12.45M3 10.25H7.5M21 10.25H11.1" stroke={color} strokeWidth="1.3" strokeLinecap="round" />
            </g>
            <defs>
                <clipPath id="clip0_5246_2361">
                    <rect width="24" height="24" rx="12" fill="white" />
                </clipPath>
            </defs>
        </svg>

    )
}

export default MyPurse;