import React, { useEffect, useState, useRef } from 'react';
import './PersonalDataStyle.css';

import
{
  Grid,
  Typography,
} from '@mui/material';

import { useSelector, useDispatch } from 'react-redux';
import
{
  updataPhoto,
  updataPersonalData,
  resetMessageFromServer,
  updatePassword,
  resetPasswordMessage,
  setShowPasswordSuccessAlert,
} from '../../features/personal-data/myPersonalDataSlice';
import
{
  getUserPersonalData,
} from '../../../main/features/userAuth/userAuthSlice';

import
{
  resetOrderState
} from '../../../main/features/order/userOrderSlice';

import
{
  resetLikedProductsState
} from '../../../main/features/liked-products/likedProductsSlice';

import
{
  resetCategoryState
} from '../../../main/features/categories/userCategorySlice';

import
{
  resetCartState
} from '../../../main/features/basket/cartSlice';

import { useNavigate } from 'react-router-dom';

import PasswordInput from '../../../../services/passwordInputs/PasswordInput';
import ImgBBUpload from '../../../../services/image-upload-service/ImgBBUpload';
import PasswordSuccessAlert from './PasswordSuccessAlert';
import LoadingAnimation from '../../../../common-elements/loading/LoadingAnimation';


const IMG_URL = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSTR3zZjipG0-Lf-MtJcieX_ASoCDA_6JfGxA&usqp=CAU';
const PHONE_PATTERN = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
const MIN_PASSWORD_LENGTH = 8;
const PASSWORD_PATTERN = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&+])[A-Za-z\d@$!%*?&+]+$/;
const MyPersonalData = () =>
{
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { upload } = ImgBBUpload();

  const inputFile = useRef(null);
  const [pictureFile, setPictureFile] = useState(null);
  const [picturePath, setPicturePath] = useState(IMG_URL)

  const [userName, setUserName] = useState('')
  const [userSurname, setUserSurname] = useState('')
  const [userPhone, setUserPhone] = useState('')

  const [userNameError, setUserNameError] = useState(false)
  const [userSurnameError, setUserSurnameError] = useState(false)
  const [userPhoneError, setUserPhoneError] = useState(false)

  const [currentPassword, setCurrentPassword] = useState('')
  const [currentPasswordError, setCurrentPasswordError] = useState(false)
  const [password, setPassword] = useState('')
  const [passwordError, setPasswordError] = useState(false)
  const [confirmPassword, setConfirmPassword] = useState('')
  const [confirmPasswordError, setConfirmPasswordError] = useState(false)

  const [isConfirmDialogVisible, setIsConfirmDialogVisible] = useState(false);

  const [loadingPhoto, setLoadingPhoto] = useState(false)

  const {
    userPersonalData,
  } = useSelector(state => state.userAuth);

  const {
    messageFromServer,
    passwordMessage,
    showPasswordSuccessAlert,
  } = useSelector(state => state.myPersonalData)

  useEffect(() =>
  {
    if (userPersonalData?.pictureAddress !== null)
    {
      setPicturePath(userPersonalData?.pictureAddress)
    }
    setUserName(userPersonalData?.name)
    setUserSurname(userPersonalData?.surname)
    setUserPhone(userPersonalData?.phoneNumber)
  }, [])

  const openFileManager = () =>
  {
    inputFile.current.click();
  }

  const getPicture = async (event) =>
  {
    let file = event.target.files[0];

    if (file !== undefined)
    {
      let urlToPicture = await upload(file)
      setLoadingPhoto(true)
      await dispatch(updataPhoto({
        pictureAddress: urlToPicture?.data?.display_url,
      })).then(() =>
      {
        setLoadingPhoto(false)
        dispatch(getUserPersonalData())
      }).catch(() =>
      {
        setLoadingPhoto(false)
      })
    }
  }

  const onConfirmEditData = async () =>
  {
    let isValid = true;
    if (userName.length < 2)
    {
      setUserNameError(true);
      isValid = false;
    }
    if (userSurname.length < 2)
    {
      setUserSurnameError(true);
      isValid = false;
    }
    if (!PHONE_PATTERN.test(userPhone))
    {
      setUserPhoneError(true);
      isValid = false;
    }

    if (isValid === true)
    {
      if (userPersonalData?.name !== userName ||
        userPersonalData?.surname !== userSurname ||
        userPersonalData?.phoneNumber !== userPhone)

        await dispatch(updataPersonalData({
          name: userName,
          surname: userSurname,
          email: "",
          phoneNumber: userPhone,
        })).then(({ payload }) =>
        {
          if (payload?.status === 200)
            dispatch(getUserPersonalData())
        })
    }
  }

  const onConfirmEditPassword = async () =>
  {
    if (MIN_PASSWORD_LENGTH > currentPassword.length)
    {
      setCurrentPasswordError(true)
    }
    else if (password.length < MIN_PASSWORD_LENGTH)
    {
      setPasswordError(true)
    }
    else if (!PASSWORD_PATTERN.test(password))
    {
      setPasswordError(true)
    }
    else if (password !== confirmPassword)
    {
      setConfirmPasswordError(true);
    }
    else
    {
      await dispatch(updatePassword({
        currentPassword: currentPassword,
        newPassword: password,
      })).then(({ payload }) =>
      {
        if (payload?.status === 200)
          dispatch(getUserPersonalData()).then(() =>
          {
            dispatch(setShowPasswordSuccessAlert(true));
            setTimeout(() =>
            {
              dispatch(setShowPasswordSuccessAlert(false));
            }, 2000)
          })
      })
    }
  }

  const handleConfirmExit = () =>
  {
    localStorage.removeItem('access-token');
    localStorage.setItem('cart', JSON.stringify([]))
    dispatch(resetOrderState())
    dispatch(resetLikedProductsState())
    dispatch(resetCategoryState())
    dispatch(resetCartState())
    navigate('/')
    setIsConfirmDialogVisible(false);
  };

  const handleCancelExit = () =>
  {
    setIsConfirmDialogVisible(false);
  };


  return (
    <Grid
      item
      sx={{
        minHeight: '100vh',
        height: '100%',
        marginLeft: {
          sm: 0,
          xs: '15px',
        }
      }}
      xs={12}
    >

      <Grid
        container

        item
        xs={12}
        sx={{
          padding: '10px',

        }}
      >
        <Grid
          container
          item
          direction={'row'}
          xs={12}
          alignContent={'center'}
          sx={{
            paddingLeft: {
              lg: '5%',
              md: '5%',
              sm: '10%',
              xs: '10%'
            },
            borderRadius: '10px',
          }}
        >
          <Grid
            item
            xs={2}
          >
            <img
              src={picturePath}
              alt='user'
              width="120"
              height="120"
              style={{
                borderRadius: '90px',
                boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'
              }}
            />
          </Grid>

          <Grid
            item
            container
            xs={10}
            alignContent={'end'}
            sx={{
              paddingLeft: {
                lg: 0,
                md: '5%',
                sm: '8%',
                xs: '15%',
              },
              paddingBottom: {
                xs: '10px'
              }
            }}
          >
            <button
              onClick={openFileManager}
              style={{
                border: 'none',
                background: 'none',
              }}
              className='h5-bold-brown2'
            >Змінити світлину</button>
            <input
              type='file'
              id='file'
              ref={inputFile}
              style={{ display: 'none' }}
              accept="image/png, image/gif, image/jpeg"
              onChange={getPicture}
            />
          </Grid>

        </Grid>

      </Grid>
      <Grid
        container
        item
        xs={12}

        rowGap={1}
        sx={{
          padding: '10px',
        }}

        justifyContent={'space-between'}
      >
        <Grid
          container
          item
          lg={5.9}
          xs={12}
          bgcolor={'#E9ECEC'}
          height={'100%'}
          sx={{
            borderRadius: '10px',
            padding: '10px',
          }}
        >
          <Grid
            container
            item
            xs={12}
            sx={{
              marginBottom: '10px',
            }}
          >
            <Grid
              item
              xs={8}
            >
              <Typography
                className='brown1-500-18'
              >
                Інформація про себе:
              </Typography>
            </Grid>
            <Grid
              item
              container
              xs={4}
              justifyContent={'right'}
              alignContent={'center'}
            >
              <button
                style={{
                  backgroundColor: '#DA8D33',
                  border: 'none',
                  borderRadius: '15px',
                  width: 'fit-content',
                  padding: '5px',
                  boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
                }}
                className='white-500-16'
                onClick={() =>
                {
                  onConfirmEditData()
                }}
              >
                Підтвердити
              </button>
            </Grid>
          </Grid>

          <Grid
            item
            container
            xs={12}
            alignContent={'center'}
          >
            <input
              style={{
                border: userNameError ? '1px solid red' : 'none',
              }}
              type='text'
              value={userName}
              placeholder="Ім'я"
              className='input-my-data-row brown2-500-20'
              onChange={({ target }) =>
              {
                setUserName(target.value);
                if (userNameError)
                {
                  setUserNameError(false)
                }
              }}
            />
          </Grid>
          <Grid
            item
            container
            xs={12}
            alignContent={'center'}
          >
            <input
              style={{
                border: userSurnameError ? '1px solid red' : 'none',
              }}
              type='text'
              value={userSurname}
              className='input-my-data-row brown2-500-20'
              placeholder='Прізвище'
              onChange={({ target }) =>
              {
                setUserSurname(target.value);
                if (userSurnameError)
                {
                  setUserSurnameError(false);
                }
              }}
            />
          </Grid>
          <Grid
            item
            container
            xs={12}
            alignContent={'center'}
          >
            <input
              style={{
                border: userPhoneError ? '1px solid red' : 'none',
              }}
              className='input-my-data-row brown2-500-20'
              type='text'
              value={userPhone}
              placeholder='Номер телефону'
              onChange={({ target }) =>
              {
                setUserPhone(target.value);
                if (userPhoneError)
                {
                  setUserPhoneError(false);
                }
                if (messageFromServer.length > 0)
                {
                  dispatch(resetMessageFromServer())
                }
              }}
            />
            <label
              className={'t2-medium-red'}
            >{messageFromServer}</label>
          </Grid>

        </Grid>

        <Grid
          container
          item
          lg={5.9}
          xs={12}
          bgcolor={'#E9ECEC'}
          sx={{
            borderRadius: '10px',
            padding: '10px',
          }}
        >
          <Grid
            container
            item
            xs={12}
            sx={{
              marginBottom: {
                sm: 0,
                xs: '10px',
              }
            }}
          >
            <Grid
              item
              xs={8}
            >
              <Typography
                className='brown1-500-18'
              >
                Зміна паролю:
              </Typography>
            </Grid>
            <Grid
              item
              container
              xs={4}
              justifyContent={'right'}

            >
              <button
                style={{
                  backgroundColor: '#DA8D33',
                  border: 'none',
                  borderRadius: '15px',
                  width: 'fit-content',
                  height: 'fit-content',
                  padding: '5px',
                  boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
                }}
                className='white-500-16'
                onClick={() =>
                {
                  onConfirmEditPassword()
                }}
              >
                Підтвердити
              </button>
            </Grid>

          </Grid>

          <Grid
            container
            item
            xs={12}
            rowGap={1}
          >
            <Grid
              item
              xs={12}
            >
              <label
                className={'t2-medium'}
              >Поточний пароль</label>
              <PasswordInput
                onChange={(value) =>
                {
                  setCurrentPassword(value)
                  if (currentPasswordError)
                  {
                    setCurrentPasswordError(false);
                  }
                  if (passwordMessage.length > 0)
                  {
                    dispatch(resetPasswordMessage())
                  }
                }}
                isError={currentPasswordError}
              />
              <label
                style={{
                  display: currentPasswordError ? 'flex' : 'none',
                }}
                className={'t2-medium-red'}
              >Введіть поточний пароль</label>
              <label
                className={'t2-medium-red'}
              >{passwordMessage}</label>
            </Grid>

            <Grid
              item
              xs={12}
            >
              <label
                className={'t2-medium'}
              >Новий пароль</label>
              <PasswordInput
                onChange={(value) =>
                {
                  setPassword(value)
                  if (passwordError)
                  {
                    setPasswordError(false);
                  }
                }}
                isError={passwordError}
              />
              <label
                style={{
                  display: passwordError ? 'flex' : 'none',
                }}
                className={'t2-medium-red'}
              >Придумайте складніший пароль</label>
            </Grid>
            <Grid
              item
              xs={12}
            >
              <label
                className={'t2-medium'}
              >Введіть ще раз</label>
              <PasswordInput
                onChange={(value) =>
                {
                  setConfirmPassword(value)
                  if (confirmPasswordError)
                  {
                    setConfirmPasswordError(false)
                  }
                }}
                isError={confirmPasswordError}
              />
              <label
                style={{
                  display: confirmPasswordError ? 'flex' : 'none',
                }}
                className={'t2-medium-red'}
              >Паролі не співпадають</label>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <Grid
        container
        item
        xs={12}
        sx={{
          padding: '10px',
        }}
        justifyContent={'right'}
      >
        <button
          style={{
            backgroundColor: '#B31D21',
            border: 'none',
            borderRadius: '15px',
            width: 'fit-content',
            padding: '10px 25px 10px 25px',
            boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
          }}
          className='white-500-18'
          onClick={() =>
          {
            setIsConfirmDialogVisible(true);
          }}
        >
          Вийти
        </button>
      </Grid>

      {
        showPasswordSuccessAlert &&
        <span
          className="modal-backdrop"
        >
          <PasswordSuccessAlert />
        </span>
      }

      {
        isConfirmDialogVisible && (
          <div className='modal-backdrop'>
            <div className='confirm-dialog'>
              <p>Ви впевнені, що бажаєте вийти?</p>
              <label className='confirm-buttom' onClick={handleConfirmExit}>Так</label>
              <label className='confirm-buttom' onClick={handleCancelExit}>Ні</label>
            </div>
          </div>
        )
      }

      {
        loadingPhoto && (
          <Grid
            sx={{
              minHeight: '100vh'
            }}
          >
            <LoadingAnimation />
          </Grid>
        )
      }

    </Grid>
  );
};

export default MyPersonalData;
