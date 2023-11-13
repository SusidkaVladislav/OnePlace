import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Img from './689fff87dbde131c2540025194fae87f.png';

const CategoryCard = (props) =>
{

    const {
        name,
        picture,
    } = props;

    return (
        <Card sx={{
            width: "264px",
            height: "309px",
            borderRadius: '10px',
            background: '#E5EAEA',
            boxShadow: '1px 1px 8px 0px rgba(0, 0, 0, 0.08)',
            padding: "12px"
        }}>

            <CardMedia
                id="imgContainer"
                component="img"
                height="232px"
                width="217px"
                image={picture}
                alt="Product image"
                sx={{
                    objectFit: 'contain',
                    background: '#E5EAEA',
                    borderRadius: '9px',
                    transition: "transform .6s",
                    "&:hover": {
                        transform: "scale(1.2)"
                    }
                }} />

            <CardContent sx={
                {
                    padding: '0',
                    paddingTop: "20px",
                    overflow: 'clip'
                }
            }>
                <h5 className='light'>{name}</h5>
            </CardContent>

        </Card>
    )
}

export default CategoryCard;