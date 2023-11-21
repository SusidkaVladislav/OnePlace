import React, { Fragment, useState } from 'react';
import './Header.css';

import { AppBar, Toolbar, Stack } from '@mui/material';

import SearchBar from '../../controls/SearchBar';

import { useNavigate } from "react-router-dom";
import Logo from '../../../../svg/shared-icons/Logo';
import CartIcon from '../../../../svg/client-icons/header/CartIcon';
import HeartIcon from '../../../../svg/client-icons/header/HeartIcon';
import UserIcon from '../../../../svg/client-icons/header/UserIcon';
import DownArrow from '../../../../svg/arrows/DownArrow';

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
  setIsRegisterFormOpen
} from '../../features/userAuth/userAuthSlice';
const Header = () =>
{
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isMouseOverCategory, setIsMouseOverCategory] = useState(false);


  const {
    isCategoryOpen
  } = useSelector(state => state.userCategories);

  const {
    isLoginFormOpen,
    isRegisterFormOpen,
    isRenewPasswordFormOpen,
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

  return (
    <Fragment>
      <AppBar position="static" className="appbar">
        <Toolbar className="toolbar">

          <Stack direction='row' spacing={2}>
            <Logo />
            <Stack
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
          </Stack>

          <div style={{ flexGrow: 0.3 }} />

          <div className="searchbar">
            <SearchBar />
          </div>

          <div style={{ flexGrow: 0.4 }} />

          <span
            style={{
              cursor: 'pointer'
            }}
            onClick={() =>
            {
              dispatch(setIsLoginFormOpen(true))
            }}>
            <UserIcon /></span>


          <HeartIcon onClick={() => {/* Navigate to a different page */ }}>
            {/* Your icon component for another page navigation */}
          </HeartIcon>

          <CartIcon onClick={() => {/* Navigate to a different page */ }}>
            {/* Your icon component for yet another page navigation */}
          </CartIcon>
        </Toolbar>



      </AppBar>


      {
        isLoginFormOpen && (
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

    </Fragment>
  )
}

export default Header;