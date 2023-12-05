import React from 'react';
import
{
    Grid,
    useMediaQuery,
    Typography,
} from '@mui/material'
import MasterCardIcon from '../../../../svg/shared-icons/MasterCardIcon';
import './BankCardStyles.css'
import InfoIcon from '../../../../svg/shared-icons/InfoIcon';

const BankCard = (props) =>
{
    const xs = useMediaQuery('(min-width: 0px)');
    const md = useMediaQuery('(min-width: 900px)');

    const {
        number,
        expireMonth,
        expireYear,
        cvv,

        numberInput,
        expireMonthInput,
        expireYearInput,
        cvvInput,

        numberError,
        expireMonthError,
        expireYearError,
        cvvError,
    } = props;

    const onNumberInput = (event) =>
    {
        //Перевірка на цифру
        if (event.keyCode >= 48 && event.keyCode <= 57 || event.keyCode === 8)
        {
            if (event.keyCode === 8)
            {
                numberInput(number.slice(0, -1));
            }
            else if (number.length < 19)
            {
                if (number.length > 0 && ((number.length + 1) % 5 === 0))
                {
                    numberInput(number + " " + event.key);
                } else
                {
                    numberInput(number + event.key);
                }
            }
        }
    }

    const onMonthInput = (event) =>
    {
        if (event.keyCode >= 48 && event.keyCode <= 57 || event.keyCode === 8)
        {
            if (event.keyCode === 8)
            {
                if (Number(expireMonth) >= 10)
                    expireMonthInput(expireMonth.slice(0, -1));
                else
                    expireMonthInput('')
            }
            else if (expireMonth.length === 0 && Number(event.key) > 1)
            {
                if (Number(event.key) !== 0)
                    expireMonthInput(0 + event.key)
            }
            else if (expireMonth.length < 2)
            {
                let tmp = expireMonth + event.key;

                if (Number(tmp) > 0)
                    if (Number(tmp) <= 12)
                    {
                        expireMonthInput(expireMonth + event.key)
                    }
                    else
                        if (Number(event.key) !== 0)
                            expireMonthInput(0 + event.key)
            }
        }
    }

    const onYearInput = (event) =>
    {
        if (event.keyCode >= 48 && event.keyCode <= 57 || event.keyCode === 8)
        {
            if (event.keyCode === 8)
            {
                expireYearInput(expireYear.slice(0, -1));
            }
            else if (expireYear.length < 2)
            {
                if (expireYear.length !== 0 || Number(event.key) !== 0)
                    expireYearInput(expireYear + event.key);
            }
        }
    }

    const onCvvInput = (event) =>
    {
        if (event.keyCode >= 48 && event.keyCode <= 57 || event.keyCode === 8)
        {
            if (event.keyCode === 8)
            {
                cvvInput(cvv.slice(0, -1));
            }
            else if (cvv.length < 3)
            {
                cvvInput(cvv + event.key)
            }
        }
    }

    return (
        <Grid
            container
            item
            xs={12}
            height={{
                lg: '156px',
                md: '380px',
                sm: '370px',
                xs: '370px',
            }}
            gap={{
                lg: 5,
                md: 4,
                xs: '10%',
            }}
            justifyContent={'center'}
        >

            <Grid
                container
                item
                lg={5}
                md={9}
                sm={7}
                xs={8}

                bgcolor='#3D393F'
                sx={{
                    borderRadius: '12px',
                    height: {
                        lg: '100%',
                        xs: '45%'
                    }
                }}
                padding={{
                    lg: '18px 14px 18px 14px',
                    md: '9px 7px 9px 7px',
                    sm: '9px 14px 18px 9px',
                    xs: '9px 14px 18px 9px',
                }}
            >
                <Grid
                    container
                    width='100%'
                    height='20%'
                    alignItems={'center'}
                    justifyContent={'space-between'}
                >
                    <Typography
                        sx={{
                            color: '#D3D3D3',
                            textAlign: 'center',
                            fontFamily: 'JejuGothic',
                            fontSize: '12px',
                            fontStyle: 'normal',
                            fontWeight: '400',
                            lineHeight: '130%',
                        }}
                        className='unselectable'
                    >Credit Card</Typography>
                    <MasterCardIcon />
                </Grid>

                <Grid
                    container
                    width='100%'
                    height='35%'
                >
                    <Typography
                        className={'t2-medium-blue3 unselectable'}
                    >
                        Номер картки
                    </Typography>
                    <input
                        type='text'
                        className={'h5-bold-brown2 number-input'}
                        placeholder='XXXX XXXX XXXX XXXX'
                        style={{
                            height: '24px',
                            width: '75%',
                            padding: '8px',
                            border: numberError ? '2px solid red' : 'none',
                        }}
                        onKeyDown={(event) => { onNumberInput(event) }}
                        value={number}
                    />
                </Grid>

                <Grid
                    container
                    width='100%'
                    height='35%'
                >
                    <Typography
                        className={'t2-medium-blue3 unselectable'}
                    >
                        Термін дії
                    </Typography>
                    <Grid
                        container
                        alignItems={'center'}
                        gap={1}
                    >
                        <input
                            style={{
                                height: '24px',
                                width: '23%',
                                padding: '8px 15px',
                                border: expireMonthError ? '2px solid red' : 'none',
                            }}
                            className={'h5-bold-brown2 number-input unselectable'}
                            placeholder='ММ'
                            onKeyDown={(event) => { onMonthInput(event) }}
                            value={expireMonth}
                            onBlur={() =>
                            {
                                if (Number(expireMonth) === 1)
                                {
                                    expireMonthInput('0' + '1')
                                }
                            }}
                        />
                        <Typography
                            sx={{
                                fontWeight: 500,
                            }}
                            className={'t2-medium-blue3 unselectable'}
                        >/</Typography>
                        <input
                            style={{
                                height: '24px',
                                width: '23%',
                                padding: '8px 15px',
                                border: expireYearError ? '2px solid red' : 'none',
                            }}
                            className={'h5-bold-brown2 number-input unselectable'}
                            placeholder='РР'
                            value={expireYear}
                            onKeyDown={(event) =>
                            {
                                onYearInput(event)
                            }}
                            onBlur={() =>
                            {
                                if (expireYear.length === 1)
                                {
                                    if (Number(expireYear) !== 0)
                                        expireYearInput('0' + expireYear);
                                    else
                                        expireYearInput('')
                                }
                            }}
                        />
                    </Grid>
                </Grid>
            </Grid >

            <Grid
                container
                item
                lg={5}
                md={9}
                sm={7}
                xs={8}
                bgcolor='#3D393F'
                sx={{
                    borderRadius: '12px',
                    paddingTop: '8%',
                    height: {
                        lg: '100%',
                        xs: '45%'
                    },
                }}
            >
                <Grid
                    bgcolor='#E9ECEC'
                    height={{
                        lg: '24px',
                        md: '28px',
                        xs: '24px',
                    }}
                    width={'100%'}
                />

                <Grid
                    container
                    height='60%'
                >
                    <Grid
                        container
                        direction={'column'}
                        padding={{
                            lg: '3px 10px 10px 10px',
                            md: '3px 5px 5px 5px',
                            xs: '3px 10px 10px 10px',
                        }}
                        gap={0.5}
                    >
                        <Typography
                            className={'t2-medium-blue3 unselectable'}
                            alignItems={'center'}
                        >
                            CVV <InfoIcon />
                        </Typography>
                        <input
                            style={{
                                height: md ? '24px' : xs ? '30px' : '',
                                width: xs ? '23%' : '',
                                padding: xs ? '8px' : '',
                                border: cvvError ? '2px solid red' : 'none',
                            }}
                            className={'h5-bold-brown2 number-input unselectable'}
                            value={cvv}
                            onKeyDown={(event) =>
                            {
                                onCvvInput(event)
                            }}
                            onBlur={() =>
                            {
                                if (cvv.length < 3)
                                {
                                    cvvInput('')
                                }
                            }}
                        />

                    </Grid>
                </Grid>


            </Grid>

        </Grid >
    )
}

export default BankCard