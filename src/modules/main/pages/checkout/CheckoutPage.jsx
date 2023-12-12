import React, { useState } from 'react';
import './CheckoutStyles.css';
//#region Material
import
{
    Grid,
    Button,
    Typography,
    Stepper,
    Step,
    StepLabel,
    Stack,
    useMediaQuery,
} from '@mui/material'

import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector';
import { styled } from '@mui/material/styles';
//#endregion

//#region Icons
import WhiteCheckIcon from '../../../../svg/shared-icons/WhiteCheckIcon';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import BigBrownLeftArrow from '../../../../svg/arrows/BigBrownLeftArrow';
import BrownLeftArrow40x40Icon from '../../../../svg/arrows/BrownLeftArrow40x40Icon';
//#endregion

//#region Redux
import { useDispatch, useSelector } from 'react-redux';
import
{
    setShowUnsuccessfulOrerAlert,
    setErrorList,
    setCardErrorList,
    createOrder,
} from '../../features/order/userOrderSlice';
import
{
    setCheckedIds,
} from '../../features/basket/cartSlice';
//#endregion

//#region Components
import ContactData from './contact-data/ContactData';
import DeliveryData from './delivery-data/DeliveryData';
import PaymentData from './payment-data/PaymentData';
import UnsuccessfulCheckout from './successful-checkout/UnsuccessfulCheckout';
//#endregion

import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


//Налаштування лінії
const QontoConnector = styled(StepConnector)(() => ({
    [`&.${stepConnectorClasses.alternativeLabel}`]: {
        top: 10,
        left: 'calc(-50% + 13px)',
        right: 'calc(50% + 13px)',
    },
    [`&.${stepConnectorClasses.active}`]: {
        [`& .${stepConnectorClasses.line}`]: {
            borderColor: '#6C4744',
        },
    },
    [`&.${stepConnectorClasses.completed}`]: {
        [`& .${stepConnectorClasses.line}`]: {
            borderColor: '#DAD1D0',
        },
    },
    [`& .${stepConnectorClasses.line}`]: {
        borderColor: '#DAD1D0',
        borderTopWidth: 3,
        borderRadius: 10,
    },
}));

//Налаштування кружка
const QontoStepIconRoot = styled('div')(({ ownerState }) => ({
    color: '#eaeaf0',
    backgroundColor: '#B5A3A1',
    display: 'flex',
    height: 24,
    width: 24,
    borderRadius: 90,
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: 'Montserrat Alternates',
    fontSize: '16px',
    fontWeight: 500,
    lineHeight: '21px',
    letterSpacing: '0em',
    textAlign: 'left',

    ...(ownerState.active && {
        color: '#F6F6F6',
        backgroundColor: '#DA8D33',
        height: 24,
        width: 24,
    }),

    '& .QontoStepIcon-completedIcon': {
        color: '#F6F6F6',
        backgroundColor: '#01830E',
        height: 24,
        width: 24,
        borderRadius: 90,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        cursor: 'pointer',
    },
}));

function QontoStepIcon(props)
{
    const { active, completed, className, index, onClick } = props;

    return (
        <QontoStepIconRoot ownerState={{ active }} className={className}>
            {completed ? (
                <span
                    className="QontoStepIcon-completedIcon"
                    onClick={onClick}
                >
                    <WhiteCheckIcon />
                </span>
            ) : (
                <span className='unselectable'>{index}</span>
            )}
        </QontoStepIconRoot>
    );
}

QontoStepIcon.propTypes = {
    /**
     * Whether this step is active.
     * @default false
     */
    active: PropTypes.bool,
    className: PropTypes.string,
    /**
     * Mark the step as completed. Is passed to child components.
     * @default false
     */
    completed: PropTypes.bool,
    index: PropTypes.number,
    onClick: PropTypes.func,
};

const EMAIL_PATTERN = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
const PHONE_PATTERN = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
const CheckoutPage = () =>
{
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // useEffect(() =>
    // {
    //     dispatch(setShowUnsuccessfulOrerAlert(false))
    // }, [])

    const xs = useMediaQuery('(min-width: 0px)');
    const sm = useMediaQuery('(min-width: 600px)');
    const md = useMediaQuery('(min-width: 900px)');
    const lg = useMediaQuery('(min-width: 1200px)');

    const {
        productPriceSum,
        discountPrice,
        checkedProductIds,
    } = useSelector(state => state.userBasket)

    const {
        showUnsuccessfulOrderAlert,

        userName,
        userSurname,
        userEmail,
        userPhone,

        city,
        department,

        paymentMethod,
        cardNumber,
        expireMonth,
        expireYear,
        cvv,

        errorList,
        cardErrorList,

        actionNotification,
    } = useSelector(state => state.userOrder);

    const steps =
        [
            'Контактні дані',
            'Доставка',
            'Оплата',
        ];

    const [activeStep, setActiveStep] = useState(0);

    const [activeProductStep, setActiveProductStep] = useState(0);
    const maxSteps = checkedProductIds?.length;

    //dispatch(setShowUnsuccessfulOrerAlert(false))

    const onGoToNextStep = async () =>
    {
        if (activeStep === 0)
        {
            //Перевірка персональних даних покупця
            let isValidPersonalData = validatePersonalData();
            if (isValidPersonalData)
            {
                setActiveStep(activeStep + 1)
            }
        }
        if (activeStep === 1)
        {
            //Перевірка інформації про доставку
            axios.post('https://api.novaposhta.ua/v2.0/json/',
                {
                    apiKey: "bfb9c83d670e006bf220a681e0d085f7",
                    modelName: "Address",
                    calledMethod: "getWarehouses",
                    "methodProperties": {
                        CityName: city,
                        Language: "UA",
                        TypeOfWarehouseRef: "841339c7-591a-42e2-8233-7a0a00f0ed6f"
                    }
                })
                .then((res) =>
                {
                    const updatedErrorList = [...errorList];

                    if (res.data.data.length === 0)
                    {
                        updatedErrorList[4] = true;
                    }
                    else if (res.data.data.every(d => d.Description !== department))
                    {
                        updatedErrorList[5] = true;
                    }
                    else
                    {
                        setActiveStep(activeStep + 1)
                    }
                    dispatch(setErrorList(updatedErrorList));
                })
        }
        if (activeStep === 2)
        {
            const updatedCardErrorList = [...cardErrorList];

            if (paymentMethod === 1)
            {
                if (cardNumber.length !== 19)
                {
                    updatedCardErrorList[0] = true;
                }
                if (expireMonth.length !== 2)
                {
                    updatedCardErrorList[1] = true;
                }
                if (expireYear.length !== 2)
                {
                    updatedCardErrorList[2] = true;
                }
                if (cvv.length !== 3)
                {
                    updatedCardErrorList[3] = true;
                }

                dispatch(setCardErrorList(updatedCardErrorList))
            }

            if ((paymentMethod === 1 && updatedCardErrorList.every(e => e === false)) || paymentMethod === 0)
            {
                //все провалідовано, можна формувати запит на оформлення замовлення
                await dispatch(createOrder(checkedProductIds))
                    .then((res) =>
                    {
                        if (res?.error)
                            setTimeout(() =>
                            {
                                dispatch(setShowUnsuccessfulOrerAlert(false))
                            }, 3000);
                        else
                        {
                            //почистити в кошику вибрані товари 
                            dispatch(setCheckedIds([]))
                            navigate('/')
                        }
                    })
            }
        }
    }

    const validatePersonalData = () =>
    {
        let isValid = true;
        const updatedErrorList = [...errorList];

        if (userSurname.length < 2)
        {
            updatedErrorList[0] = true;
            isValid = false;
        }
        if (userName.length < 2)
        {
            updatedErrorList[1] = true;
            isValid = false;
        }
        if (userEmail.length > 0 && !EMAIL_PATTERN.test(userEmail))
        {
            updatedErrorList[2] = true;
            isValid = false;
        }
        if (!PHONE_PATTERN.test(userPhone))
        {
            updatedErrorList[3] = true;
            isValid = false;
        }

        dispatch(setErrorList(updatedErrorList));

        return isValid;
    }

    return (

        <Stack
            sx={{
                padding: {
                    lg: '2% 0% 3% 7%',
                    md: '2% 0% 3% 5%',
                }
            }}
        >
            {
                showUnsuccessfulOrderAlert && (
                    <span
                        className="modal-backdrop"
                    >
                        <UnsuccessfulCheckout
                            message={actionNotification}
                        />
                    </span>
                )
            }

            <Grid
                container
                item
                xs={12}
                direction={'row'}
                alignItems={'center'}
                justifyContent={{
                    sm: 'center',
                }}
                sx={{
                    padding: {
                        md: '0',
                        sm: '5%',
                        xs: '28px 18px 18px 18px'
                    }
                }}
            >
                <Grid
                    item
                    xs={1.5}
                >
                    <span
                        style={{
                            display: md ? 'none' : 'flex',
                            cursor: 'pointer',
                        }}
                        onClick={() =>
                        {
                            navigate(-1)
                        }}
                    >
                        {
                            sm ? <BigBrownLeftArrow /> : <BrownLeftArrow40x40Icon />
                        }
                    </span>
                </Grid>
                <Grid
                    item
                    xs={10.5}
                >
                    <Typography

                        className={lg ? 'h2-md-brown2 unselectable'
                            : md ? 'light-h5-brown2 unselectable'
                                : sm ? 'h2-500-32-brown1 unselectable'
                                    : 'light-h5 unselectable'
                        }

                        sx={{
                            marginBottom: {
                                lg: '3%',
                                md: '2%',
                            },

                        }}
                    >Оформлення замовлення</Typography>
                </Grid>

            </Grid>

            <Stepper alternativeLabel activeStep={activeStep} connector={<QontoConnector />}
                sx={{
                    display: {
                        xs: 'none',
                        sm: 'none',
                        md: 'flex',
                    },
                    marginBottom: {
                        lg: '3%',
                        md: '2%',
                    },
                    marginLeft: {
                        md: '-4%',
                    }
                }}
            >
                {
                    steps.map((label, index) => (
                        <Step key={label}>
                            <StepLabel
                                StepIconComponent={(props) => <QontoStepIcon {...props} index={index + 1} onClick={() => { setActiveStep(index) }} />}
                            >
                                <h4
                                    className='brown2 unselectable'
                                    style={{
                                        color: index < activeStep ? '#471915' : '#917573'
                                    }}
                                >{label}</h4>
                            </StepLabel>
                        </Step>
                    ))
                }
            </Stepper>

            <Grid
                container
                justifyContent={'space-between'}
            >
                <Grid
                    item
                    md={6}
                    xs={12}
                    sx={{
                        padding: {
                            md: '0',
                            xs: '15px',
                        }
                    }}
                >
                    {
                        // Заповнення контактних даних
                        (activeStep === 0 || !md) && (
                            <ContactData />
                        )
                    }
                    {
                        // Заповнення інформації про доставку
                        (activeStep === 1 || !md) && (
                            <DeliveryData />
                        )
                    }
                    {
                        // Оплата
                        (activeStep === 2 || !md) && (
                            <PaymentData />
                        )
                    }
                </Grid>

                <Grid
                    order={!md && -1}
                    md={5}
                    xs={12}
                    item
                    height='fit-content'
                >
                    <Grid
                        sx={{
                            borderRadius: {
                                md: '10px 0px 0px 10px'
                            },
                            boxShadow: {
                                md: '1px 1px 8px 0px rgba(0, 0, 0, 0.08)'
                            },
                            padding: {
                                lg: '36px 116px 31px 24px',
                                md: '18px 23px 15px 12px',
                            }
                        }}

                    >
                        <Grid
                            sx={{
                                padding: {
                                    md: '0',
                                    sm: '10px 16px 2px 30px',
                                    xs: '12.5px 16.8px 24px 31px'
                                },
                                boxShadow: !md ? '1px 1px 8px 0px rgba(0, 0, 0, 0.08)' : '',
                            }}
                        >
                            <Grid
                                container
                                direction={'row'}
                                justifyContent="space-between"
                                sx={{
                                    borderBottom: {
                                        xs: '1px solid #DAD1D0'
                                    },
                                    paddingBottom: {
                                        xs: '2%'
                                    }
                                }}
                            >
                                <Typography
                                    sx={{
                                        width: 'fit-content'
                                    }}
                                    className={md ? 't2-medium-500' : sm ? 'brown1-400-20' : 't1-bold'}
                                >
                                    Ваше замовлення {checkedProductIds?.length} товар
                                </Typography>
                                <Typography
                                    sx={{
                                        width: 'fit-content',
                                    }}
                                    className={
                                        md ? 't1-bold-red'
                                            : sm ? 'h5-bold-red' :
                                                't2-medium-500-red'
                                    }
                                >{productPriceSum - discountPrice} грн</Typography>
                            </Grid>

                            <Grid
                                container
                                justifyContent={'right'}
                                alignItems={'center'}
                                sx={{
                                    height: {
                                        md: '37px'
                                    },
                                    paddingRight: {
                                        xs: '10px'
                                    },

                                }}
                            >
                                <span
                                    style={{
                                        color: activeProductStep === 0 ? 'var(--brown3)' : 'var(--brown2)',
                                        cursor: activeProductStep === 0 ? 'default' : 'pointer',
                                        display: checkedProductIds?.length > 1 ? 'flex' : 'none'
                                    }}
                                    onClick={() =>
                                    {
                                        if (activeProductStep > 0)
                                            setActiveProductStep(activeProductStep - 1);
                                    }}
                                ><KeyboardArrowLeft /></span>
                                <span
                                    style={{
                                        color: activeProductStep === maxSteps - 1 ? 'var(--brown3)' : 'var(--brown2)',
                                        cursor: activeProductStep === maxSteps - 1 ? 'default' : 'pointer',
                                        display: checkedProductIds?.length > 1 ? 'flex' : 'none',
                                    }}
                                    onClick={() =>
                                    {
                                        if (activeProductStep < maxSteps - 1)
                                            setActiveProductStep(activeProductStep + 1)
                                    }}
                                ><KeyboardArrowRight /></span>
                            </Grid>
                            <Grid
                                item
                                container
                                sx={{
                                    height: {
                                        lg: '30px',
                                        md: '35px',
                                        xs: '35px',
                                    },
                                    maxHeight: {
                                        lg: '30px',
                                        md: '35px',
                                        xs: '35px',
                                    }
                                }}
                                direction={'row'}
                                justifyContent={'space-between'}
                                alignContent={'center'}
                            >
                                <Typography
                                    className='t2-medium-500'
                                >
                                    Колір: {checkedProductIds[activeProductStep]?.colorName}
                                </Typography>
                                <Typography
                                    className='t2-medium-500'
                                    sx={{
                                        marginRight: '15%',
                                    }}
                                >
                                    (x{checkedProductIds[activeProductStep]?.count})
                                </Typography>
                            </Grid>
                            <Grid
                                container
                                sx={{
                                    padding: '0px 30px 19px 0px',
                                }}
                            >
                                <Grid
                                    container
                                    item
                                    direction={'row'}
                                    justifyContent={'space-between'}
                                    xs={12}
                                >
                                    <Grid
                                        container
                                        item
                                        xs={2.5}
                                    // alignContent={'center'}
                                    >
                                        <img
                                            style={{
                                                boxShadow: xs ? '1px 1px 8px 0px rgba(0, 0, 0, 0.08)' : '',
                                                borderRadius: xs ? '10px' : '0px',
                                                objectFit: 'contain',
                                                height: md ? '69px' : sm ? '100px' : '69px',
                                                width: md ? '72px' : sm ? '112px' : '72px',
                                            }}
                                            src={checkedProductIds[activeProductStep]?.imageURL}
                                            alt='product'
                                        />

                                    </Grid>

                                    <Grid
                                        container
                                        item
                                        xs={9}
                                        direction={'column'}
                                    >
                                        <Typography
                                            overflow={'hidden'}
                                            sx={{
                                                wordBreak: 'break-all',
                                                height: {
                                                    lg: '40px',
                                                    md: '45px',
                                                    xs: '50px',
                                                },
                                                maxHeight: {
                                                    lg: '40px',
                                                    md: '45px',
                                                    xs: '50px',
                                                }
                                            }}
                                            className={md ? 't2-medium-500' : sm ? 'brown1-500-18' : 't1-bold'}
                                        >
                                            {checkedProductIds[activeProductStep]?.name}
                                        </Typography>

                                        <Grid
                                            container
                                            item
                                            direction={'row'}
                                            alignItems={'center'}

                                        >
                                            <Typography
                                                width="fit-content"
                                                className={sm ? 'h4-red' : 't2-medium-500-red'}
                                            >
                                                {checkedProductIds[activeProductStep]?.price - (checkedProductIds[activeProductStep]?.price * checkedProductIds[activeProductStep]?.discount) / 100} грн.
                                            </Typography>

                                            <Typography
                                                display={checkedProductIds[activeProductStep]?.discount > 0 ? 'flex' : 'none'}
                                                width="fit-content"
                                                className={sm ? 't2-medium' : 't2-medium'}
                                                sx={{
                                                    textDecoration: 'line-through',
                                                    marginLeft: {
                                                        xs: '5%'
                                                    }
                                                }}
                                            >
                                                {checkedProductIds[activeProductStep]?.price} грн.
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>

                        <Grid
                            sx={{
                                display: {
                                    md: 'block',
                                    xs: 'none'
                                }
                            }}

                        >
                            <Grid
                                container
                                sx={{
                                    padding: {
                                        ld: '19px 0px 19px 0px',
                                        md: '12px 0px 10px 0px',
                                    },
                                    borderBottom: {
                                        md: '1px solid #DAD1D0'
                                    },
                                }}
                                justifyContent={'space-between'}
                            >
                                <Typography
                                    className={md ? 't2-medium-500' : ''}
                                >
                                    Вартість замовлення
                                </Typography>

                                <Typography
                                    className={md ? 't2-medium-500' : ''}
                                >
                                    {productPriceSum} грн.
                                </Typography>

                            </Grid>

                            <Grid
                                container
                                sx={{
                                    padding: {
                                        lg: '19px 0px 19px 0px',
                                        md: '12px 0px 10px 0px',
                                    },
                                    borderBottom: {
                                        md: '1px solid #DAD1D0'
                                    }
                                }}
                                justifyContent={'space-between'}
                            >
                                <Typography
                                    className={md ? 't2-medium-500' : ''}
                                >
                                    Знижка
                                </Typography>
                                <Typography
                                    className={md ? 't2-medium-500-red' : ''}
                                >
                                    {discountPrice} грн.
                                </Typography>
                            </Grid>

                            <Grid
                                container
                                sx={{
                                    padding: {
                                        lg: '19px 0px 19px 0px',
                                        md: '12px 0px 10px 0px',
                                    },
                                    borderBottom: {
                                        md: '1px solid #DAD1D0',
                                    }
                                }}
                                justifyContent={'space-between'}
                            >
                                <Typography
                                    className={md ? 't2-medium-500' : ''}
                                >
                                    До оплати
                                </Typography>
                                <Typography
                                    className={md ? 't2-medium-500' : ''}
                                >
                                    {productPriceSum - discountPrice} грн.
                                </Typography>
                            </Grid>
                        </Grid>



                    </Grid>

                    <Button
                        sx={{
                            display: {
                                md: 'flex',
                                xs: 'none'
                            },
                            width: {
                                md: '70%',
                            },
                            height: {
                                md: '35px',
                            },
                            bgcolor: '#D17100',
                            ':hover': {
                                bgcolor: '#D17100',
                            },
                            marginLeft: {
                                md: '2%'
                            },
                            marginTop: {
                                lg: '50px',
                                md: '20px',
                            },
                            textTransform: 'initial',
                        }}
                        className={lg ? 'h4-lg-gray3 stepper-navigation-btn'
                            : md ? 'gray3-500-16 stepper-navigation-btn'
                                : ''}
                        variant='contained'
                        onClick={() =>
                        {
                            onGoToNextStep()
                        }}
                    >{activeStep === 2 ? 'Підтвердити замовлення' : 'Продовжити'}</Button>
                </Grid>

                <Grid
                    item
                    sx={{
                        display: {
                            md: 'none',
                            xs: 'block'
                        },
                        padding: {
                            xs: '15px',
                        }
                    }}
                    xs={12}
                >
                    <Grid
                        container
                        sx={{
                            padding: {
                                xs: '19px 0px 8px 0px',
                            },
                            borderBottom: {
                                xs: '1px solid #DAD1D0'
                            },
                        }}
                        justifyContent={'space-between'}
                    >
                        <Typography
                            className={xs ? 't2-medium-500' : ''}
                        >
                            Вартість замовлення
                        </Typography>

                        <Typography
                            className={xs ? 't2-medium-500' : ''}
                        >
                            {productPriceSum} грн.
                        </Typography>

                    </Grid>

                    <Grid
                        container
                        sx={{
                            padding: {
                                xs: '8px 0px 8px 0px',
                            },
                            borderBottom: {
                                xs: '1px solid #DAD1D0'
                            }
                        }}
                        justifyContent={'space-between'}
                    >
                        <Typography
                            className={xs ? 't2-medium-500' : ''}
                        >
                            Знижка
                        </Typography>
                        <Typography
                            className={xs ? 't2-medium-500-red' : ''}
                        >
                            {discountPrice} грн.
                        </Typography>
                    </Grid>

                    <Grid
                        container
                        sx={{
                            padding: {
                                xs: '8px 0px 8px 0px',
                            },
                            borderBottom: {
                                xs: '1px solid #DAD1D0',
                            }
                        }}
                        justifyContent={'space-between'}
                    >
                        <Typography
                            className={xs ? 't2-medium-500' : ''}
                        >
                            До оплати
                        </Typography>
                        <Typography
                            className={xs ? 't2-medium-500' : ''}
                        >
                            {productPriceSum - discountPrice} грн.
                        </Typography>
                    </Grid>
                </Grid>
                <Button
                    sx={{
                        display: {
                            md: 'none',
                            xs: 'block'
                        },
                        width: {
                            xs: '100%',
                        },
                        height: {
                            xs: '45px',
                        },
                        bgcolor: '#D17100',
                        ':hover': {
                            bgcolor: '#D17100',
                        },
                        margin: {
                            xs: '20px 15px 80px 2%'
                        },
                        textTransform: 'initial',
                    }}
                    className={xs ? 'h4-lg-gray3 stepper-navigation-btn' : ''}
                    variant='contained'
                    onClick={async () => 
                    {

                        //Перевірка персональних даних покупця
                        let isValidPersonalData = validatePersonalData();
                        let isValidDeliveryData = true;

                        //Перевірка інформації про доставку
                        axios.post('https://api.novaposhta.ua/v2.0/json/',
                            {
                                apiKey: "bfb9c83d670e006bf220a681e0d085f7",
                                modelName: "Address",
                                calledMethod: "getWarehouses",
                                "methodProperties": {
                                    CityName: city,
                                    Language: "UA",
                                    TypeOfWarehouseRef: "841339c7-591a-42e2-8233-7a0a00f0ed6f"
                                }
                            })
                            .then((res) =>
                            {
                                const updatedErrorList = [...errorList];

                                if (res.data.data.length === 0)
                                {
                                    updatedErrorList[4] = true;
                                    isValidDeliveryData = false;
                                }
                                else if (res.data.data.every(d => d.Description !== department))
                                {
                                    updatedErrorList[5] = true;
                                    isValidDeliveryData = false;
                                }

                                dispatch(setErrorList(updatedErrorList));

                                const updatedCardErrorList = [...cardErrorList];

                                if (paymentMethod === 1)
                                {
                                    if (cardNumber.length !== 19)
                                    {
                                        updatedCardErrorList[0] = true;
                                    }
                                    if (expireMonth.length !== 2)
                                    {
                                        updatedCardErrorList[1] = true;
                                    }
                                    if (expireYear.length !== 2)
                                    {
                                        updatedCardErrorList[2] = true;
                                    }
                                    if (cvv.length !== 3)
                                    {
                                        updatedCardErrorList[3] = true;
                                    }

                                    dispatch(setCardErrorList(updatedCardErrorList))
                                }

                                if (isValidPersonalData && isValidDeliveryData)
                                {
                                    if ((paymentMethod === 1 && updatedCardErrorList.every(e => e === false)) || paymentMethod === 0)
                                    {
                                        dispatch(createOrder(checkedProductIds))
                                            .then((res) =>
                                            {
                                                if (res?.error)
                                                    setTimeout(() =>
                                                    {
                                                        dispatch(setShowUnsuccessfulOrerAlert(false))
                                                    }, 3000);
                                                else
                                                {
                                                    //почистити в кошику вибрані товари 
                                                    dispatch(setCheckedIds([]))
                                                    navigate('/')
                                                }
                                            })
                                    }
                                }
                            })
                    }}
                >{'Підтвердити замовлення'}</Button>
            </Grid>
        </Stack>
    )
}

export default CheckoutPage;