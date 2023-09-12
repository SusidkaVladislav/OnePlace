import React, { useState } from 'react';

import "./MainManuStyle.css";

//#region Icons
import LogoIcon from '../svg/LogoIcon';
import ArrowIcon from "../svg/mainPanelIcons/ArrowIcon";
import ArrowIcon2 from "../svg/mainPanelIcons/ArrowIcon2";
//#endregion

import 'bootstrap/dist/css/bootstrap.min.css';

import HoverIcon from './HoverIcons';

import { Outlet, Routes, Route, Link } from 'react-router-dom';


const Main = () =>
{
    //const [email, setEmail] = useState("");
    //const [body_count, setBodyCount] = useState("");
    const [clickedArrow, setClickedArrow] = useState(true);
    const [isDivWide, setIsDivWide] = useState(false);
    const [isArrowWide, setIsArrowWide] = useState(false);
    const [isMenuWide, setIsMenuWide] = useState(false);
    const [isBodyWide, setIsBodyWide] = useState(false);
    const [isDivSize, setIsDivSize] = useState(null);


    const handleShowArrow = () =>
    {
        setClickedArrow(!clickedArrow);
        setIsDivWide(!isDivWide);
        setIsArrowWide(!isArrowWide);
        setIsMenuWide(!isMenuWide);
        setIsBodyWide(!isBodyWide);
        setIsDivSize(!isDivSize);
    }

    const divStyle = {
        width: isDivWide ? '140px' : '339px',
    };
    const arrowStyle = {
        marginLeft: isArrowWide ? '-87px' : '110px',
    };
    const menuStyle = {
        width: isMenuWide ? '107px' : '326px',
    };
    const bodyStyle = {
        width: isBodyWide ? '1379px' : '1160px',
        marginLeft: isBodyWide ? '98px' : '317px',
    };

    const divSize = isArrowWide ? '239px' : '20px';

    return (
        <div className='admin-body'>
            <div>
                <header>
                    <div className='main-logo'>
                        <LogoIcon />
                    </div>
                </header>
            </div>
            <div className='left-menu' style={menuStyle} >
                <div className='menu-item-user' style={divStyle}>
                    <div className='menu-img-icon'></div>
                    <div className='menu-labels'>
                        <label className='menu-name'>Admin admin</label>
                        {/* <label className='menu-email'>{email}</label> */}
                    </div>
                    <label className='menu-arrow-icon' style={arrowStyle}
                        onClick={handleShowArrow}>
                        {clickedArrow ? <ArrowIcon2 /> : <ArrowIcon />}
                    </label>
                </div>
                <HoverIcon />
            </div>
            <div className='body-by-item' style={bodyStyle}>
                <Outlet />
            </div>
        </div>
    )
}

export default Main;