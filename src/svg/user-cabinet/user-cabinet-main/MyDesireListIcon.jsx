import React from 'react';

const MyDesireList = (props) =>
{
    const {
        color
    } = props;

    return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M13.3551 7.82299C12.873 7.23449 12.2285 6.58426 11.4812 5.98445M3.04964 12.9338C1.55063 9.96022 1.75333 7.80315 3.04946 5.96457C5.39167 2.71226 9.08222 4.05866 11.4812 5.98445M11.4812 5.98445C13.355 4.4324 17.9107 2.69228 20.3818 6.89375C23.005 11.3541 16.6342 17.2702 13.3551 19.4384C11.9498 20.3676 9.98235 20.6464 5.86007 16.1861" stroke={color} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>

    )
}

export default MyDesireList;