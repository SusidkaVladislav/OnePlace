import React from 'react';
import './HeaderStyle.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import LogoIcon from '../icons/LogoIcon';

const Header = () => {
  return (
    <header>
        <div className='main-logo'>
            <LogoIcon/>
        </div>
    </header>
  );
};

export default Header;