import React from 'react';

const UsersIcon = (props) =>
{
    const {
        color
    } = props;

    return (
        <svg width="29" height="29" viewBox="0 0 29 29" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M11.002 12C14.3157 12 17.002 9.31371 17.002 6C17.002 2.68629 14.3157 0 11.002 0C7.68825 0 5.00195 2.68629 5.00195 6C5.00195 9.31371 7.68825 12 11.002 12Z" fill={color} />
            <path d="M11.002 28.5015C16.8009 28.5015 21.502 25.8152 21.502 22.5015C21.502 19.1878 16.8009 16.5015 11.002 16.5015C5.20296 16.5015 0.501953 19.1878 0.501953 22.5015C0.501953 25.8152 5.20296 28.5015 11.002 28.5015Z" fill={color} />
            <path d="M29.0005 22.5C29.0005 24.9855 25.9465 27 22.219 27C23.317 25.8 24.073 24.2925 24.073 22.503C24.073 20.7105 23.3155 19.203 22.2145 18.0015C25.9435 18 29.0005 20.016 29.0005 22.5ZM24.5005 6.00003C24.501 6.7241 24.3268 7.4376 23.9926 8.07994C23.6584 8.72228 23.1741 9.27449 22.5809 9.68969C21.9877 10.1049 21.3031 10.3708 20.5852 10.4649C19.8672 10.559 19.1372 10.4784 18.457 10.23C19.1898 8.94084 19.5739 7.48292 19.5715 6.00003C19.5715 4.46253 19.1665 3.01953 18.4585 1.77153C19.1386 1.52348 19.8685 1.44315 20.5862 1.53736C21.3039 1.63157 21.9883 1.89755 22.5814 2.31271C23.1744 2.72788 23.6585 3.27998 23.9926 3.92216C24.3267 4.56433 24.5009 5.27614 24.5005 6.00003Z" fill={color} />
        </svg>

    )
}


export default UsersIcon;