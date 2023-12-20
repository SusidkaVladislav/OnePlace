import React from 'react';
import ClientLoadingAnimation from '../../svg/animations/grey-9026.gif';

const LoadingAnimation = () =>
{
    return (
        <div
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                backgroundColor: 'rgba(0, 0, 0, 0.15)',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                zIndex: '1000',
            }}
        >
            <img style={{
                width: '100px',
                height: '100px',
                position: 'absolute',
                alignSelf: 'center',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
            }} src={ClientLoadingAnimation} alt="loading" />

        </div >
    )
}

export default LoadingAnimation;