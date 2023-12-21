import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import
{
    Grid,
    Typography,
    useMediaQuery,
} from '@mui/material';
import SendMessageBrownIcon from '../../../svg/shared-icons/SendMessageBrownIcon';
import QuickProductNav from '../controls/QuickProductNav';

import
{
    refreshToken,
} from '../../main/features/userAuth/userAuthSlice';

import
{
    createMessage
} from '../../main/features/messages/userMessageSlice';
import SuccessfulMessageAlert from './SuccessfulMessageAlert';
import './MessageToAdminStyles.css';
import LoadingAnimation from '../../../common-elements/loading/LoadingAnimation';
import { useNavigate } from 'react-router-dom';

const EMAIL_PATTERN = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
const NO_SERVER_CONNECTION_PATH = "/no_server_connection";
const MessageToAdmin = () =>
{
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {
        product
    } = useSelector(state => state.userProducts);

    const {
        refreshTokenLoading,
        authServerConnectionError,
    } = useSelector(state => state.userAuth)

    const {
        userName,
        userEmail,
    } = useSelector(state => state.userViewProduct)

    const {
        messagesServerConnectionError
    } = useSelector(state => state.userMessages)

    const xs = useMediaQuery('(min-width: 0px)');
    const md = useMediaQuery('(min-width: 900px)');
    const lg = useMediaQuery('(min-width: 1200px)');

    const [name, setName] = useState(userName);
    const [email, setEmail] = useState(userEmail);
    const [message, setMessage] = useState('');
    const [nameValidError, setNameValidError] = useState(false);
    const [emailValidError, setEmailValidError] = useState(false);
    const [messageValidError, setMessageValidError] = useState(false);
    const [showSuccessfulMessageAlert, setShowSuccessfulMessageAlert] = useState(false);

    const onSendMessage = async () =>
    {
        let isValidError = false;
        if (name.length < 2)
        {
            setNameValidError(true);
            isValidError = true;
        }
        if (!EMAIL_PATTERN.test(email))
        {
            setEmailValidError(true);
            isValidError = true;
        }
        if (message.length === 0)
        {
            setMessageValidError(true);
            isValidError = true;
        }

        if (!isValidError)
        {
            await dispatch(refreshToken())
                .then(() =>
                {
                    dispatch(createMessage({
                        productId: Number(product?.id),
                        name: name,
                        email: email,
                        messageText: message,
                    }))
                    setName('')
                    setEmail('')
                    setMessage('')
                    setShowSuccessfulMessageAlert(true)
                    setTimeout(() =>
                    {
                        setShowSuccessfulMessageAlert(false)
                    }, 2000)
                })
        }
    }

    if (authServerConnectionError || messagesServerConnectionError)
    {
        navigate(NO_SERVER_CONNECTION_PATH)
    }
    if (refreshTokenLoading)
    {
        return <LoadingAnimation />
    }

    return (
        <Grid
            container
            justifyContent={'space-between'}
        >
            <Grid
                item
                container
                lg={6}
                xs={12}
                rowGap={2}
            >
                <Grid
                    width={'100%'}
                >
                    <Typography
                        className={xs ? 't2-medium' : ''}
                    >
                        Ім'я
                    </Typography>
                    <input
                        style={{
                            width: '100%',
                            height: lg ? '46px' : md ? '40px' : xs ? '46px' : '',
                            padding: lg ? '1% 15px 1% 15px' : md ? '1% 10px 1% 10px' : xs ? '1% 15px 1% 15px' : '',
                            border: nameValidError ? '1px solid red' : 'none'
                        }}
                        className='input-message-data t1-bold-blue'
                        type='text'
                        value={name}
                        onInput={({ target }) =>
                        {
                            setName(target.value);
                            if (nameValidError)
                                setNameValidError(false)
                        }}
                    />

                </Grid>

                <Grid
                    width={'100%'}
                >
                    <Typography
                        className={xs ? 't2-medium' : ''}
                    >
                        Ел.пошта
                    </Typography>
                    <input
                        style={{
                            width: '100%',
                            height: lg ? '46px' : md ? '40px' : xs ? '46px' : '',
                            padding: lg ? '1% 15px 1% 15px' : md ? '1% 10px 1% 10px' : xs ? '1% 15px 1% 15px' : '',
                            border: emailValidError ? '1px solid red' : 'none'
                        }}
                        className='input-message-data t1-bold-blue'
                        type='email'
                        value={email}
                        onInput={({ target }) =>
                        {
                            setEmail(target.value)
                            if (emailValidError)
                                setEmailValidError(false)
                        }}
                    />
                </Grid>

                <Grid
                    width='100%'
                >
                    <Typography
                        className={xs ? 't2-medium' : ''}
                    >
                        Запитання
                    </Typography>
                    <div style={{ position: 'relative', width: '100%' }}>
                        <textarea
                            style={{
                                width: '100%',
                                height: '260px',
                                backgroundColor: '#F6F6F6',
                                border: 'none',
                                borderRadius: '10px',
                                resize: 'none',
                                padding: '10px',
                                boxShadow: '1px 1px 8px 0px rgba(0, 0, 0, 0.08)',
                                border: messageValidError ? '1px solid red' : 'none',
                            }}
                            className='t1-bold-blue'
                            id='scrollbar-style-1'
                            value={message}
                            onInput={({ target }) =>
                            {
                                setMessage(target.value)
                                if (messageValidError)
                                    setMessageValidError(false)
                            }}
                        ></textarea>

                        <span
                            style={{
                                position: 'absolute',
                                right: '15px',
                                bottom: '25px',
                                cursor: 'pointer',
                            }}
                            onClick={() =>
                            {
                                onSendMessage()
                            }}
                        >
                            <SendMessageBrownIcon />
                        </span>
                    </div>
                </Grid>

            </Grid>

            <Grid
                container
                item
                lg={5}
            >
                <QuickProductNav />
            </Grid>

            {
                showSuccessfulMessageAlert &&
                <span
                    className="modal-backdrop"
                >
                    <SuccessfulMessageAlert />
                </span>
            }

        </Grid>
    )
}

export default MessageToAdmin;