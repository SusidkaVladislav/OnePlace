import React, { Fragment, useState } from 'react';
import './Header.css';

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import SearchBar from '../../controls/SearchBar';


import Logo from '../../../../svg/shared-icons/Logo';
import CartIcon from '../../../../svg/client-icons/header/CartIcon';
import HeartIcon from '../../../../svg/client-icons/header/HeartIcon';
import UserIcon from '../../../../svg/client-icons/header/UserIcon';
import DownArrow from '../../../../svg/arrows/DownArrow';

import { useDispatch, useSelector } from 'react-redux';
import
{
  setIsCategoryOpen
} from '../../features/categories/userCategorySlice';

const Header = () =>
{
  const dispatch = useDispatch();

  const [isMouseOverCategory, setIsMouseOverCategory] = useState(false);

  const {
    isCategoryOpen
  } = useSelector(state => state.userCategories);

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

        <UserIcon onClick={() => {/* Navigate to a page */ }}>
          {/* Your icon component for page navigation */}
        </UserIcon>

        <HeartIcon onClick={() => {/* Navigate to a different page */ }}>
          {/* Your icon component for another page navigation */}
        </HeartIcon>

        <CartIcon onClick={() => {/* Navigate to a different page */ }}>
          {/* Your icon component for yet another page navigation */}
        </CartIcon>
      </Toolbar>



    </AppBar>
  )
}

export default Header;