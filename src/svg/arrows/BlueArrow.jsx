import React from 'react';

const BlueArrow = (props) =>
{
    const {
        color,
    } = props;

    return (
        <svg xmlns="http://www.w3.org/2000/svg" cursor={'pointer'} width="36" height="36" viewBox="0 0 36 36" fill="none">
            <path d="M1.20803 9.19998C0.817097 8.80939 0.817099 8.17575 1.20803 7.78515L8.2932 0.706179C8.68366 0.316067 9.31634 0.316067 9.7068 0.70618L16.792 7.78515C17.1829 8.17575 17.1829 8.80939 16.792 9.19998L16.698 9.29382C16.3076 9.68393 15.6749 9.68393 15.2845 9.29382L9.7068 3.72104C9.31634 3.33093 8.68366 3.33093 8.2932 3.72104L2.71555 9.29382C2.32509 9.68393 1.69241 9.68393 1.30195 9.29382L1.20803 9.19998Z" stroke={color} stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
    )

};
export default BlueArrow;

