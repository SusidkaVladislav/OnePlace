import React, { Fragment, useState } from 'react';
import './Header.css';

import
{
  AppBar,
  Toolbar,
  Stack,
  Badge,
  useMediaQuery,
} from '@mui/material';

import SearchBar from '../../controls/SearchBar';

import { useNavigate } from "react-router-dom";
import Logo from '../../../../svg/shared-icons/Logo';
import CartIcon from '../../../../svg/client-icons/header/CartIcon';
import HeartIcon from '../../../../svg/client-icons/header/HeartIcon';
import UserIcon from '../../../../svg/client-icons/header/UserIcon';
import DownArrow from '../../../../svg/arrows/DownArrow';
import ShowCategoriesPageIcon from '../../../../svg/shared-icons/ShowCategoriesPageIcon';

import UserLoginForm from '../../features/login/UserLoginForm';
import UserRegisterForm from '../../features/register/UserRegisterForm';
import ChangePassword from '../../features/changePassword/ChangePassword';

import { useDispatch, useSelector } from 'react-redux';
import
{
  setIsCategoryOpen
} from '../../features/categories/userCategorySlice';

import
{
  setIsLoginFormOpen,
  setBeforeAuthPath,
} from '../../features/userAuth/userAuthSlice';

import
{
  setCheckedIds,
  changeDiscountPrice,
  changeProductPriceSum,
  changeTotalOrderPrice,
} from '../../features/basket/cartSlice';

import { styled } from '@mui/material/styles';

const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    minWidth: '20px',
    right: -4,
    top: 2,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: '0 4px',
    background: '#B31D21',
    color: '#FFF',
    textHeight: '10.5px',
    fontWeight: 500,
    fontFamily: 'Montserrat Alternates',
  },
}));

const Header = () =>
{
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const xs = useMediaQuery('(min-width: 0px)');
  const sm = useMediaQuery('(min-width: 600px)');
  const md = useMediaQuery('(min-width: 900px)');
  const lg = useMediaQuery('(min-width: 1200px)');

  const [isMouseOverCategory, setIsMouseOverCategory] = useState(false);

  const {
    cartCount
  } = useSelector(state => state.userBasket)

  const {
    isCategoryOpen
  } = useSelector(state => state.userCategories);

  const {
    isLoginFormOpen,
    isRegisterFormOpen,
    isRenewPasswordFormOpen,
    isAuthState,
  } = useSelector(state => state.userAuth);

  const handleMouseEnter = () =>
  {
    setIsMouseOverCategory(true);
  };

  const handleMouseLeave = () =>
  {
    setIsMouseOverCategory(false);
  };

  const onShowCategoryClickHandler = () =>
  {
    dispatch(setIsCategoryOpen(!isCategoryOpen))
  }

  const onAuth = () =>
  {
    dispatch(setBeforeAuthPath(window.location.pathname))

    navigate('/user')

    if (!isAuthState)
      dispatch(setIsLoginFormOpen(true));
  }

  return (
    <Fragment>
      <AppBar position="static" className="appbar">
        <Toolbar className="toolbar">

          <Stack
            direction='row'
            spacing={2}
            alignItems={'center'}
          >
            <Logo />
            {
              md ? <Stack
                //display={md ? 'flex' : 'none'}
                alignItems='center'
                direction='row' spacing={1}
                style={{
                  cursor: 'pointer',
                  borderBottom: isCategoryOpen ? '2px solid #D17100' : 'none',
                }}
                onClick={() =>
                {
                  onShowCategoryClickHandler()
                }}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >

                {
                  isCategoryOpen
                    ? (
                      <Fragment>
                        <h3 style={{
                          color: '#D17100',
                        }}
                          className="unselectable"
                        >Категорії</h3>

                        <span style={{
                          rotate: '180deg'
                        }}>
                          <DownArrow color='#D17100' />
                        </span>
                      </Fragment>

                    ) : isMouseOverCategory
                      ? (
                        <Fragment>
                          <h3 style={{
                            color: '#D17100',
                          }}
                            className="unselectable"
                          >Категорії</h3>
                          <DownArrow color='#D17100' />
                        </Fragment>
                      ) : (
                        <Fragment>
                          <h3 style={{
                            color: '#0A3D58',
                          }}
                            className="unselectable"
                          >Категорії</h3>

                          <DownArrow color='#0A3D58' />
                        </Fragment>
                      )
                }
              </Stack>
                :
                <span
                  style={{
                    cursor: 'pointer',
                  }}
                  onClick={() =>
                  {
                    navigate('/category/' + 0);
                  }}
                >
                  <ShowCategoriesPageIcon />
                </span>
            }
          </Stack>

          <div style={{ flexGrow: 0.3 }} />

          <div
            style={{
              width: lg ? '35%' : md ? '45%' : '60%'
            }}
          >
            <SearchBar />
          </div>

          <div style={{ flexGrow: 0.4 }} />

          <span
            style={{
              display: sm ? 'flex' : 'none',
              cursor: 'pointer',
            }}
            onClick={onAuth}>
            <UserIcon /></span>

          <span
            style={{
              display: sm ? 'flex' : 'none',
              cursor: 'pointer',
            }}
          >
            <HeartIcon />
          </span>


          <StyledBadge
            badgeContent={cartCount}
            style={{
              cursor: 'pointer'
            }}
            onClick={() =>
            {
              dispatch(setCheckedIds([]));
              dispatch(changeProductPriceSum(0))
              dispatch(changeDiscountPrice(0))
              dispatch(changeTotalOrderPrice(0))
              navigate('/basket')
            }}
          >
            <CartIcon />
          </StyledBadge>
        </Toolbar>
      </AppBar>

      {
        isLoginFormOpen && !isAuthState && (
          <UserLoginForm />
        )
      }
      {
        isRegisterFormOpen && (
          <UserRegisterForm />
        )
      }
      {
        isRenewPasswordFormOpen && (
          <ChangePassword />
        )
      }

    </Fragment >
  )
}

export default Header;