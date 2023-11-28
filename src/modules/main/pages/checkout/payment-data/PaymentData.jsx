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
    const sm = useMediaQuery('(min-width: 600px)');
    const md = useMediaQuery('(min-width: 900px)');
    const lg = useMediaQuery('(min-width: 1200px)');

    return (
        <Grid
            container
            item
            lg={12}
            gap={'34px'}
        >
            <Grid
                container
                item
                lg={12}
                direction={'row'}
                sx={{
                    padding: {
                        lg: '0px 0px 20px 15px'
                    }
                }}
            >
                <Grid
                    container
                    item
                    lg={4}
                    gap={1}
                    alignItems={'center'}
                >
                    <CustomRadio
                        name="delivery-company"
                        checked={paymantMethod === 1}
                        onChange={() => { setPaymentMethod(1) }}
                    />
                    <Typography
                        className={lg ? 't2-medium-500-brown2' : ''}
                    >Готівка</Typography>
                </Grid>
                <Grid
                    container
                    item
                    lg={4}
                    gap={1}
                    alignItems={'center'}
                >
                    <CustomRadio
                        name="delivery-company"
                        checked={paymantMethod === 2}
                        onChange={() => { setPaymentMethod(2) }}
                    />
                    <Typography
                        className={lg ? 't2-medium-500-brown2' : ''}
                    >Карта</Typography>
                </Grid>
            </Grid>

            {
                paymantMethod === 2 && (
                    <Grid
                        container
                    >
                        <BankCard />

                    </Grid>
                )
            }

            <Grid
                container
                item
                lg={12}

            >
                <Typography
                    className={lg ? 't2-medium' : ''}
                >
                    Коментар до замовлення
                </Typography>
                <textarea
                    className={lg ? 'light-h5 comment-text-area' : 'comment-text-area'}
                    style={{}} />
            </Grid>

        </Grid>
    )
}

export default PaymentData;