import React from 'react';
import CustomRadio from '../../../../../services/custom-inputs/CutomRadio';
import
{
    Grid,
    useMediaQuery,
    Typography,
} from '@mui/material'
import '../CheckoutStyles.css';
import { useDispatch, useSelector } from 'react-redux';
import
{
    setPaymentMethod,
    setComment,
} from '../../../features/order/userOrderSlice';

const PaymentData = () =>
{
    const dispatch = useDispatch();

    const {
        paymentMethod,
        comment,
    } = useSelector(state => state.userOrder);

    const xs = useMediaQuery('(min-width: 0px)');

    return (
        <Grid
            container
            item
            xs={12}
            gap={'34px'}
        >
            <Grid
                container
                item
                xs={12}
                direction={'row'}
                sx={{
                    padding: {
                        lg: '0px 0px 20px 15px',
                        md: '0px 0px 10px 15px',
                        sm: '20px 0px 20px 15px',
                        xs: '10px 0px 0px 0px',
                    },
                }}
            >
                <Grid
                    container
                    item
                    md={4}
                    xs={6}
                    gap={1}
                    alignItems={'center'}
                >
                    <CustomRadio
                        name="payment-method"
                        checked={paymentMethod === 0 ? true : false}
                        onChange={() => 
                        {
                            dispatch(setPaymentMethod(0))
                        }}
                    />
                    <Typography
                        className={xs ? 't2-medium-500-brown2' : ''}
                    >Готівка</Typography>
                </Grid>
                <Grid
                    container
                    item
                    md={4}
                    xs={6}
                    gap={1}
                    alignItems={'center'}
                >
                    <CustomRadio
                        name="payment-method"
                        checked={paymentMethod === 1 ? true : false}
                        onChange={() => 
                        {
                            dispatch(setPaymentMethod(1))
                        }}
                    />
                    <Typography
                        className={xs ? 't2-medium-500-brown2' : ''}
                    >Карта</Typography>
                </Grid>
            </Grid>

            {/* {
                paymentMethod === 1 && (
                    <Grid
                        container
                        sx={{
                            borderBottom: {
                                md: 'none',
                                xs: '1px solid #DAD1D0',
                            },
                            paddingBottom: {
                                md: '0px',
                                xs: '15px'
                            }
                        }}
                    >
                        <BankCard
                            number={cardNumber}
                            expireMonth={expireMonth}
                            expireYear={expireYear}
                            cvv={cvv}
                            numberInput={(value) =>
                            {
                                const updatedCardErrorList = [...cardErrorList];
                                dispatch(setCardNumber(value))
                                updatedCardErrorList[0] = false;
                                dispatch(setCardErrorList(updatedCardErrorList))
                            }}
                            expireMonthInput={(value) =>
                            {
                                const updatedCardErrorList = [...cardErrorList];
                                dispatch(setExpireMonth(value))
                                updatedCardErrorList[1] = false;
                                dispatch(setCardErrorList(updatedCardErrorList))
                            }}
                            expireYearInput={(value) =>
                            {
                                const updatedCardErrorList = [...cardErrorList];
                                dispatch(setExpireYear(value))
                                updatedCardErrorList[2] = false;
                                dispatch(setCardErrorList(updatedCardErrorList))
                            }}
                            cvvInput={(value) =>
                            {
                                const updatedCardErrorList = [...cardErrorList];
                                dispatch(setCvv(value))
                                updatedCardErrorList[3] = false;
                                dispatch(setCardErrorList(updatedCardErrorList))
                            }}
                            numberError={cardErrorList[0]}
                            expireMonthError={cardErrorList[1]}
                            expireYearError={cardErrorList[2]}
                            cvvError={cardErrorList[3]}
                        />
                    </Grid>
                )
            } */}

            <Grid
                container
                item
                xs={12}
                sx={{
                    borderBottom: {
                        md: 'none',
                        xs: '1px solid #DAD1D0',
                    },
                    paddingBottom: {
                        md: '0px',
                        xs: '15px'
                    }
                }}
            >
                <Typography
                    className={'t2-medium'}
                >
                    Коментар до замовлення
                </Typography>
                <textarea
                    className={xs ? 'light-h5 comment-text-area' : 'comment-text-area'}
                    value={comment}
                    onInput={({ target }) => { dispatch(setComment(target.value)) }}
                />
            </Grid>

        </Grid>
    )
}

export default PaymentData;