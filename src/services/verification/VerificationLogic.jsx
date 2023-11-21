import React, { useState } from 'react';
import VerificationCodeUnit from './VerificationCodeUnit';
import { changeBorderStyle, setValidCode } from '../../modules/admin/features/servicesState/verificationCodeState';
import { useDispatch, useSelector } from 'react-redux';
import { Stack, Grid } from '@mui/material';

const VerificationLogic = () =>
{
    const dispatch = useDispatch();

    const [digits, setDigits] = useState(['', '', '', '', '', '']);

    const handleCheckCode = () =>
    {
        var code = digits.join('');
        //Тут йде запит на сервер де перевіряється валідність вказаного коду

        //Якщо код правильний
        if (code.length === 6)
        {
            dispatch(changeBorderStyle('green'));
            dispatch(setValidCode(true));
        }
        else
        {
            dispatch(changeBorderStyle('red'));
        }
    };

    const handleGetCodeUnit = (index, value) =>
    {
        const updatedDigits = [...digits];
        updatedDigits[index] = value;
        setDigits(updatedDigits);
    }

    return (
        <Grid
            container
            padding={'2%'}
            md={12}
            sm={12}
            xs={12}
            justifyContent={'center'}
        >
            <Stack
                md={12}
                sm={12}
                xs={12}
                marginBottom={'5%'}
                sx={{
                    width: '100%',
                }}
            >
                <label className="t2-medium">Введіть код:</label>
                <Grid
                    container
                    md={12}
                    justifyContent={'center'}
                    gap={'4%'}
                >
                    <VerificationCodeUnit getValue={value => handleGetCodeUnit(0, value)} index={0} />
                    <VerificationCodeUnit getValue={value => handleGetCodeUnit(1, value)} index={1} />
                    <VerificationCodeUnit getValue={value => handleGetCodeUnit(2, value)} index={2} />
                    <VerificationCodeUnit getValue={value => handleGetCodeUnit(3, value)} index={3} />
                    <VerificationCodeUnit getValue={value => handleGetCodeUnit(4, value)} index={4} />
                    <VerificationCodeUnit getValue={value => handleGetCodeUnit(5, value)} index={5} />
                </Grid>

            </Stack>
            
            <span
                className='t1-bold'
                style={{
                    display: 'flex',
                    justifySelf: 'right',
                    marginBottom: '2%',
                }}
            >00:00</span>

            <button
                className='confirm-button'
                onClick={handleCheckCode}
                style={{
                }}
            >Перевірити</button>
        </Grid>
    )
}

export default VerificationLogic;