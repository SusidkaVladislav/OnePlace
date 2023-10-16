import React from 'react';

const LoadingIcon = () =>
{
    return (

        <svg xmlns="http://www.w3.org/2000/svg" style="margin: auto; background: rgb(233, 236, 236); display: block; shape-rendering: auto;" width="241px" height="241px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
            <circle cx="50" cy="50" r="30" strokeWidth="5" stroke="#0a3d58" strokeDasharray="47.12388980384689 47.12388980384689" fill="none" strokeLinecap="round">
                <animateTransform attributeName="transform" type="rotate" repeatCount="indefinite" dur="0.9900990099009901s" keyTimes="0;1" values="0 50 50;360 50 50"></animateTransform>
            </circle>
        </svg>

    )
}

export default LoadingIcon;