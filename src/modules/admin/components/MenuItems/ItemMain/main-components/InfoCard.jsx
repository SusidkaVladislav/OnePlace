import React from 'react';

const InfoCard = (props) =>
{
    const {
        onMouseOver,
        onMouseLeave,
        text,
        icon,
        value,
        color,
    } = props;

    return (
        <div className='info-card-body' 
        onMouseOver={onMouseOver}
        onMouseLeave={onMouseLeave}>
            <div className='info-card-value-container'>
                <span>
                    {icon}
                </span>
                <span>{value}</span>
            </div>
            <label className='info-card-text' style={{
                color: color
            }}>{text}</label>
        </div>  
    )
}

export default InfoCard;