import React from 'react';

const ButtonTrash = (props) =>
{
    const {
        height,
        width,
        color,
    } = props;

    return (
        <svg width={width} height={height} viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M30.75 9H5.25M14.25 16.5L15 24M21.75 16.5L21 24" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
            <path d="M9.75 9H9.915C10.5187 8.98457 11.1036 8.78733 11.5934 8.43407C12.0831 8.0808 12.4549 7.58796 12.66 7.02L12.711 6.8655L12.8565 6.429C12.981 6.0555 13.044 5.8695 13.1265 5.7105C13.2888 5.39909 13.5218 5.12999 13.8067 4.92474C14.0917 4.71949 14.4207 4.58379 14.7675 4.5285C14.943 4.5 15.1395 4.5 15.5325 4.5H20.4675C20.8605 4.5 21.057 4.5 21.2325 4.5285C21.5793 4.58379 21.9083 4.71949 22.1933 4.92474C22.4782 5.12999 22.7112 5.39909 22.8735 5.7105C22.956 5.8695 23.019 6.0555 23.1435 6.429L23.289 6.8655C23.4791 7.49741 23.8722 8.04901 24.4075 8.43489C24.9428 8.82077 25.5904 9.01939 26.25 9" stroke={color} strokeWidth="1.5" />
            <path d="M27.5595 23.1C27.294 27.081 27.162 29.0715 25.8645 30.285C24.567 31.5 22.572 31.5 18.5805 31.5H17.4195C13.4295 31.5 11.4345 31.5 10.1355 30.285C8.83799 29.0715 8.70599 27.081 8.44049 23.1L7.75049 12.75M28.2495 12.75L27.9495 17.25" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
        </svg>
    )
}

export default ButtonTrash;