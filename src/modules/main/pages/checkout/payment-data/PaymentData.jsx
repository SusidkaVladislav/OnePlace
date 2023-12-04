import React, { useState } from 'react';
import CustomRadio from '../../../../../services/custom-inputs/CutomRadio';
import
{
    Grid,
    useMediaQuery,
    Typography,
} from '@mui/material'
import '../CheckoutStyles.css';
import BankCard from '../../../controls/bank-card/BankCard';


const PaymentData = () =>
{
    const [paymantMethod, setPaymentMethod] = useState(1);

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
                        checked={paymantMethod === 1}
                        onChange={() => { setPaymentMethod(1) }}
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
                        checked={paymantMethod === 2}
                        onChange={() => { setPaymentMethod(2) }}
                    />
                    <Typography
                        className={xs ? 't2-medium-500-brown2' : ''}
                    >Карта</Typography>
                </Grid>
            </Grid>

            {
                paymantMethod === 2 && (
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
                        <BankCard />
                    </Grid>
                )
            }

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
                    style={{}} />
            </Grid>

        </Grid>
    )
}

export default PaymentData;