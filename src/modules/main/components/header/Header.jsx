import React, {useState} from 'react';
import './Header.css';

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import SearchBar from '../../controls/SearchBar';

import Logo from '../../../../svg/shared-icons/Logo';
import CartIcon from '../../../../svg/client-icons/header/CartIcon';
import HeartIcon from '../../../../svg/client-icons/header/HeartIcon';
import UserIcon from '../../../../svg/client-icons/header/UserIcon';
import DownArrowBlue from '../../../../svg/arrows/DownArrowBlue';


const Header = () => {

    return (
    <AppBar position="static" className="appbar">
        <Toolbar className="toolbar">


        <div className="logo">
        <Logo/>
        <Button 
            disableElevation
            style={{ textTransform: 'none' }}
            className="button">
            <h3 style={{color:'#0A3D58' }}>Категорії</h3>
            <DownArrowBlue/>
        </Button>
        </div>

        <div style={{ flexGrow: 0.3 }} />

        <div className="searchbar">
        <SearchBar/>
        </div>

        <div style={{ flexGrow: 0.4 }} />

        <UserIcon onClick={() => {/* Navigate to a page */}}>
          {/* Your icon component for page navigation */}
        </UserIcon>
       
        <HeartIcon onClick={() => {/* Navigate to a different page */}}>
          {/* Your icon component for another page navigation */}
        </HeartIcon>
      
        <CartIcon onClick={() => {/* Navigate to a different page */}}>
          {/* Your icon component for yet another page navigation */}
        </CartIcon>
       
        </Toolbar>
    </AppBar>
    )
}

export default Header;