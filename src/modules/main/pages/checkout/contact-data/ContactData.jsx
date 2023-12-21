import React, { useEffect } from 'react';
import
{
    Grid,
} from '@mui/material'

import ContactDataRow from './ContactDataRow';

import { useDispatch, useSelector } from 'react-redux'
import
{
    getUserPersonalData
} from '../../../features/userAuth/userAuthSlice';

import
{
    setName,
    setSurname,
    setEmail,
    setPhone,

    setErrorList,
} from '../../../features/order/userOrderSlice';
import LoadingAnimation from '../../../../../common-elements/loading/LoadingAnimation';

const EMAIL_PATTERN = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
const PHONE_PATTERN = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;

const ContactData = () =>
{
    const dispatch = useDispatch();

    const {
        userName,
        userSurname,
        userEmail,
        userPhone,

        errorList,
    } = useSelector(state => state.userOrder);

    const {
        userPersonalDataLoading
    } = useSelector(state => state.userAuth)

    useEffect(() =>
    {
        dispatch(getUserPersonalData())
            .then(({ payload }) =>
            {
                if (userName.length === 0)
                    dispatch(setName(payload?.data?.name !== undefined ? payload?.data?.name : ''))
                if (userSurname.length === 0)
                    dispatch(setSurname(payload?.data?.surname ? payload?.data?.surname : ''))
                if (userEmail.length === 0)
                    dispatch(setEmail(payload?.data?.email ? payload?.data?.email : ''))
                if (userPhone.length === 0)
                    dispatch(setPhone(payload?.data?.phoneNumber ? payload?.data?.phoneNumber : ''))
            })
    }, [])


    if (userPersonalDataLoading)
    {
        return <LoadingAnimation />
    }
    return (
        <Grid
            container
            item
            xs={12}
            gap={'34px'}
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
            <ContactDataRow
                title='Прізвище*'
                onInput={(value) =>
                {
                    dispatch(setSurname(value))
                    if (value.length <= 2)
                    {
                        const updatedErrorList = [...errorList];
                        updatedErrorList[0] = false;
                        dispatch(setErrorList(updatedErrorList));
                    }
                }}
                value={userSurname}
                isError={errorList[0]}
                isValid={userSurname.length >= 2 ? true : false}
            />
            <ContactDataRow
                title="Ім'я*"
                onInput={(value) => 
                {
                    dispatch(setName(value))
                    if (value.length <= 2)
                    {
                        const updatedErrorList = [...errorList];
                        updatedErrorList[1] = false;
                        dispatch(setErrorList(updatedErrorList));
                    }
                }}
                value={userName}
                isError={errorList[1]}
                isValid={userName.length >= 2 ? true : false}
            />
            <ContactDataRow
                title='Ел. пошта'
                onInput={(value) => 
                {
                    dispatch(setEmail(value))
                    const updatedErrorList = [...errorList];
                    updatedErrorList[2] = false;
                    dispatch(setErrorList(updatedErrorList));
                }}
                value={userEmail}
                isError={errorList[2]}
                isValid={EMAIL_PATTERN.test(userEmail) ? true : false}
            />
            <ContactDataRow
                title='Номер телефону*'
                onInput={(value) => 
                {
                    dispatch(setPhone(value))
                    const updatedErrorList = [...errorList];
                    updatedErrorList[3] = false;
                    dispatch(setErrorList(updatedErrorList));
                }}
                value={userPhone}
                isError={errorList[3]}
                isValid={userPhone.length <= 11 && PHONE_PATTERN.test(userPhone) ? true : false}
            />
        </Grid>
    )
}

export default ContactData;