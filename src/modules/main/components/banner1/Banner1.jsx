import React, { useEffect, useState } from "react";
import "./Banner1.css";

import { useSelector, useDispatch } from "react-redux";
import
{
    setShowSuccessfulOrerAlert
} from '../../features/order/userOrderSlice';

import
{
    setIsCategoryOpen
} from '../../features/categories/userCategorySlice';

import
{
    Button,
    Typography,
    useMediaQuery,
} from '@mui/material';

import SuccessfulCheckout from '../../pages/checkout/successful-checkout/SuccessfulCheckout'
import CategorySelectBox from '../../controls/CategorySelectBox';


const Banner1 = () =>
{
    const dispatch = useDispatch();

    const sm = useMediaQuery('(min-width: 600px)');
    const md = useMediaQuery('(min-width: 900px)');
    const lg = useMediaQuery('(min-width: 1200px)');

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

    const buttonSxStyles = {
        '&:hover': {
            backgroundColor: 'var(--orange2)',
            color: 'white',
        },
        marginTop: '15px',
        borderRadius: '0px 26px 26px 0px',
        border: 'none',
        textTransform: 'initial',
        color: '#F6F6F6',
        backgroundColor: '#D17100',
        fontFamily: 'Montserrat Alternates',
        fontSize: '18px',
        fontStyle: 'normal',
        fontWeight: 500,
        position: 'initial',
    };

    useEffect(() =>
    {
        if (window.location.search.includes('order_success=true'))
        {
            dispatch(setShowSuccessfulOrerAlert(true))
        }
    }, [])

    const [step, setStep] = useState(2);

    useEffect(() =>
    {
        const handleResize = () =>
        {
            const isLg = window.matchMedia('(min-width: 1200px)').matches;
            const isMd = window.matchMedia('(min-width: 900px)').matches;

            if (isLg)
            {
                setStep(4);
            } else if (isMd)
            {
                setStep(3);
            } else
            {
                setStep(2);
            }
        };

        handleResize();

        window.addEventListener('resize', handleResize);

        return () =>
        {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    useEffect(() =>
    {
        if (step === 2)
        {
            dispatch(setIsCategoryOpen(false))
        }
    }, [step]);

    return (
        <div className="background" >
            {
                md && isCategoryOpen && (
                    <CategorySelectBox />
                )
            }
            <div className="content">
                <div className="text1">
                    <Typography
                        className={lg ? 'brown1-500-52 unselectable' : md ? 'brown1-500-42 unselectable' :
                            sm ? 'brown1-500-28 unselectable' : 'brown1-400-28 unselectable'}
                    >Приєднуйся до</Typography>
                    <Typography
                        className={lg ? 'brown1-500-52 unselectable' : md ? 'brown1-500-42 unselectable' :
                            sm ? 'brown1-500-28 unselectable' : 'brown1-400-28 unselectable'}
                    >One Place</Typography>
                </div>
                <div className="text2">
                    <Typography
                        className={lg ? 'h2-500-32-brown1 unselectable' : md ? 'brown1-400-24 unselectable'
                            : sm ? 'light-h5 unselectable' : 't1-bold unselectable'}
                    >забудь про пошуки тут ти знайдеш</Typography>
                    <Typography
                        className={lg ? 'h2-500-32-brown1 unselectable' : md ? 'brown1-400-24 unselectable'
                            : sm ? 'light-h5 unselectable' : 't1-bold unselectable'}
                    >все, що потрібно в одному місці!</Typography>
                </div>
                <div className="button-container">
                    <Button
                        size="large"
                        sx={sm ? buttonStyles : buttonSxStyles}
                        onClick={() =>
                        {
                            const targetElement = document.getElementById('best-choice-id')

                            if (targetElement)
                            {
                                targetElement.scrollIntoView({
                                    behavior: 'smooth',
                                    block: 'start',
                                    inline: 'nearest'
                                });
                            }
                        }
                        }
                    >Усі товари</Button>
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