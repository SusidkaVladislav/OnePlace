import React, { useState } from 'react';
import './CheckoutStyles.css';
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
import WhiteCheckIcon from '../../../../svg/shared-icons/WhiteCheckIcon';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';

import ContactData from './contact-data/ContactData';
import DeliveryData from './delivery-data/DeliveryData';
import PaymentData from './payment-data/PaymentData';

import SuccessfulCheckout from './successful-checkout/SuccessfulCheckout';

import { useDispatch, useSelector } from 'react-redux';
import
{
    setShowSuccessfulOrerAlert
} from '../../features/order/userOrderSlice';
import { useNavigate } from 'react-router-dom';

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


const CheckoutPage = () =>
{
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const xs = useMediaQuery('(min-width: 0px)');
    const sm = useMediaQuery('(min-width: 600px)');
    const md = useMediaQuery('(min-width: 900px)');
    const lg = useMediaQuery('(min-width: 1200px)');

    const {
        showSuccessfulOrderAlert,
    } = useSelector(state => state.userOrder);

    const steps = [
        'Контактні дані',
        'Доставка',
        'Оплата',
    ];

    const [activeStep, setActiveStep] = useState(2);


    const products = [
        {
            name: 'Навушники JBL TUNE 510 BT Black (JBLT510BTBLKEU)',
            price: '2 499',
            discount: '3 299',
            imgPath:
                'https://images.unsplash.com/photo-1537944434965-cf4679d1a598?auto=format&fit=crop&w=400&h=250&q=60',
        },
        {
            name: 'Hello World',
            price: '24 499',
            discount: '39',
            imgPath:
                'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTBBgPuolchqmbFUqosIXWDXIWwvywhQCBNvA&usqp=CAU',
        },
        {
            name: 'Навушники JBL TUNE 510 BT Black (JBLT510BTBLKEU)',
            price: '2 499',
            discount: '3 299',
            imgPath:
                'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=400&h=250',
        },
        {
            name: 'Навушники JBL TUNE 510 BT Black (JBLT510BTBLKEU)',
            price: '2 499',
            discount: '3 299',
            imgPath:
                'https://images.unsplash.com/photo-1512341689857-198e7e2f3ca8?auto=format&fit=crop&w=400&h=250&q=60',
        },
    ];

    const [activeProductStep, setActiveProductStep] = useState(0);
    const maxSteps = products.length;

    return (

        <Stack
            sx={{
                padding: {
                    xs: 'green',
                    sm: 'orange',
                    md: '2% 0% 3% 7%',
                    lg: 'red',
                    xl: 'blue'
                }
            }}
        >

            <Typography

                className={md ? 'h2-md-brown2 unselectable' : 't2-light unselectable'}

                sx={{
                    marginBottom: {
                        lg: '3%'
                    }
                }}
            >Оформлення замовлення</Typography>
            <Stepper alternativeLabel activeStep={activeStep} connector={<QontoConnector />}
                sx={{
                    display: {
                        xs: 'none',
                        sm: 'none',
                        md: 'none',
                        lg: 'flex',
                        xl: 'flex'
                    },
                    marginBottom: {
                        lg: '3%'
                    },
                    marginLeft: {
                        lg: '-4%'
                    }
                }}
            >
                {steps.map((label, index) => (
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
                ))}
            </Stepper>

            <Grid
                container
                justifyContent={'space-between'}
            >

                <Grid
                    item
                    lg={6}
                >
                    {
                        // Заповнення контактних даних
                        activeStep === 0 && (
                            <ContactData />
                        )
                    }
                    {
                        // Заповнення інформації про доставку
                        activeStep === 1 && (
                            <DeliveryData />
                        )
                    }
                    {
                        // Оплата
                        activeStep === 2 && (
                            <PaymentData />
                        )
                    }
                </Grid>

                <Grid
                    lg={5}
                    xs={12}
                    item
                    height='fit-content'
                >
                    <Grid
                        sx={{
                            borderRadius: {
                                lg: '10px 0px 0px 10px'
                            },
                            boxShadow: {
                                lg: '1px 1px 8px 0px rgba(0, 0, 0, 0.08)'
                            },
                            padding: {
                                lg: '36px 116px 31px 24px'
                            }
                        }}
                    >
                        <Grid
                            container
                            direction={'row'}
                            justifyContent="space-between"

                            sx={{
                                borderBottom: {
                                    lg: '2px solid #DAD1D0'
                                },
                                paddingBottom: {
                                    lg: '2%'
                                }
                            }}
                        >
                            <Typography
                                sx={{
                                    width: 'fit-content'
                                }}
                                className={lg ? 't2-medium-500' : ''}
                            >
                                Ваше замовлення __ товар
                            </Typography>
                            <Typography
                                sx={{
                                    width: 'fit-content',
                                }}
                                className={lg ? 't1-bold-red' : ''}
                            >2 449 грн</Typography>
                        </Grid>

                        <Grid
                            container
                            justifyContent={'right'}
                            alignItems={'center'}
                            sx={{
                                height: {
                                    lg: '37px'
                                },
                                paddingRight: {
                                    lg: '10px'
                                },

                            }}
                        >
                            <span
                                style={{
                                    color: activeProductStep === 0 ? 'var(--brown3)' : 'var(--brown2)',
                                    cursor: activeProductStep === 0 ? 'default' : 'pointer'
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
                                    cursor: activeProductStep === maxSteps - 1 ? 'default' : 'pointer'
                                }}
                                onClick={() =>
                                {
                                    if (activeProductStep < maxSteps - 1)
                                        setActiveProductStep(activeProductStep + 1)
                                }}
                            ><KeyboardArrowRight /></span>
                        </Grid>

                        <Grid
                            container
                            sx={{
                                padding: '0px 30px 19px 0px',
                                borderBottom: {
                                    lg: '2px solid #DAD1D0'
                                }
                            }}
                        >
                            <Grid
                                container
                                item
                                direction={'row'}
                                justifyContent={'space-between'}
                                lg={12}
                            >
                                <Grid
                                    container
                                    item
                                    lg={3}
                                >
                                    <img
                                        style={{
                                            boxShadow: lg ? '1px 1px 8px 0px rgba(0, 0, 0, 0.08)' : '',
                                            borderRadius: lg ? '10px' : '0px',
                                        }}
                                        src={products[activeProductStep].imgPath}
                                        height={69}
                                        width={72}
                                        alt='product'
                                    />

                                </Grid>

                                <Grid
                                    container
                                    item
                                    lg={9}
                                    direction={'column'}
                                >
                                    <Typography
                                        height={'40px'}
                                        maxHeight={'40px'}
                                        overflow={'hidden'}
                                        sx={{
                                            wordBreak: 'break-all'
                                        }}
                                        className={lg ? 't2-medium-500' : ''}
                                    >
                                        {products[activeProductStep].name}
                                    </Typography>
                                    <Grid
                                        container
                                        item
                                        direction={'row'}
                                        alignItems={'center'}
                                    >
                                        <Typography
                                            width="fit-content"
                                            className={lg ? 'h4-red' : ''}
                                        >
                                            {products[activeProductStep].price} грн.
                                        </Typography>

                                        <Typography
                                            width="fit-content"
                                            className={lg ? 't2-medium' : ''}
                                            sx={{
                                                textDecoration: 'line-through',
                                                marginLeft: {
                                                    lg: '5%'
                                                }
                                            }}
                                        >
                                            {products[activeProductStep].discount} грн.
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>

                        <Grid
                            container
                            sx={{
                                padding: {
                                    lg: '19px 0px 19px 0px'
                                },
                                borderBottom: {
                                    lg: '2px solid #DAD1D0'
                                }
                            }}
                            justifyContent={'space-between'}
                        >
                            <Typography
                                className={lg ? 't2-medium-500' : ''}
                            >
                                Вартість замовлення
                            </Typography>

                            <Typography
                                className={lg ? 't2-medium-500' : ''}
                            >
                                3 299 грн.
                            </Typography>

                        </Grid>

                        <Grid
                            container
                            sx={{
                                padding: {
                                    lg: '19px 0px 19px 0px'
                                },
                                borderBottom: {
                                    lg: '2px solid #DAD1D0'
                                }
                            }}
                            justifyContent={'space-between'}
                        >
                            <Typography
                                className={lg ? 't2-medium-500' : ''}
                            >
                                Знижка
                            </Typography>
                            <Typography
                                className={lg ? 't2-medium-500-red' : ''}
                            >
                                -850 грн.
                            </Typography>
                        </Grid>

                        <Grid
                            container
                            sx={{
                                padding: {
                                    lg: '19px 0px 19px 0px'
                                },
                                borderBottom: {
                                    lg: '2px solid #DAD1D0'
                                }
                            }}
                            justifyContent={'space-between'}
                        >
                            <Typography
                                className={lg ? 't2-medium-500' : ''}
                            >
                                До оплати
                            </Typography>
                            <Typography
                                className={lg ? 't2-medium-500' : ''}
                            >
                                2 449 грн.
                            </Typography>
                        </Grid>

                    </Grid>

                    <Button
                        sx={{
                            width: {
                                lg: '70%',
                            },
                            height: {
                                lg: '50px',
                            },
                            bgcolor: '#D17100',
                            ':hover': {
                                bgcolor: '#D17100',
                            },
                            marginLeft: {
                                lg: '2%'
                            },
                            marginTop: {
                                lg: '50px'
                            },
                            textTransform: 'initial',
                        }}
                        className={lg ? 'h4-lg-gray3 stepper-navigation-btn' : 'stepper-navigation-btn'}
                        variant='contained'
                        onClick={() =>
                        {
                            if (activeStep < 2)
                                setActiveStep(activeStep + 1)
                            else
                            {
                                dispatch(setShowSuccessfulOrerAlert(true))
                                navigate('/')
                            }
                        }}
                    >{activeStep === 2 ? 'Підтвердити замовлення' : 'Продовжити'}</Button>
                </Grid>

            </Grid>

        </Stack>
    )
}

export default CheckoutPage;