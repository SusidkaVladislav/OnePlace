import React from "react";
import "./Banner1.css";

import { useDispatch, useSelector } from "react-redux";
import SuccessfulCheckout from '../../pages/checkout/successful-checkout/SuccessfulCheckout'
import Button from '@mui/material/Button';
import CategorySelectBox from '../../controls/CategorySelectBox';

const Banner1 = () =>
{
    const dispatch = useDispatch();

    const {
        isCategoryOpen
    } = useSelector(state => state.userCategories);

    const {
        showSuccessfulOrderAlert
    } = useSelector(state => state.userOrder);

    const buttonStyles = {
        '&:hover': {
            backgroundColor: 'var(--orange2)',
            border: '2px solid var(--orange2)',
            color: 'white',
            transform: "scale(1.05)",
        },
        transition: "transform .3s",
        borderRadius: '26px',
        border: '2px solid var(--brown-100, #471915)',
        textTransform: 'initial',
        color: '#471915',
        fontFamily: 'Montserrat Alternates',
        fontSize: '20px',
        fontStyle: 'normal',
        fontWeight: 500,
        position: 'initial',
    };

    return (
        <div className="background" >
            {
                isCategoryOpen && (
                    <CategorySelectBox />
                )
            }
            <div className="content">
                <div className="text1">
                    <h1 className="unselectable">Приєднуйся до</h1>
                    <h1 className="unselectable">One Place</h1>
                </div>
                <div className="text2">
                    <h2 className="unselectable">забудь про пошуки тут ти знайдеш</h2>
                    <h2 className="unselectable">все, що потрібно в одному місці!</h2>
                </div>
                <div className="button-container">
                    <Button size="large"
                        sx={buttonStyles}>Усі товари</Button>
                </div>
            </div>
            {
                showSuccessfulOrderAlert && (
                    <span
                        className="modal-backdrop"
                    >
                        <SuccessfulCheckout />
                    </span>
                )
            }

        </div>


    )
}

export default Banner1;