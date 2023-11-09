import React, { useState } from 'react';

import "./MainManuStyle.css";

//#region Icons
import MainSiteLogoWithText from '../../../svg/shared-icons/MainSiteLogoWithText';
import MainSiteLogo from '../../../svg/shared-icons/MainSiteLogo';
import WhiteLeftWithGapArrow from "../../../svg/arrows/WhiteLeftWithGapArrow";
import WhiteRightWithGapArrow from "../../../svg/arrows/WhiteRightWithGapArrow";
import AdminLogoIcon from '../../../svg/main-panel-icons/AdminLogoIcon.jpg'
//#endregion

import 'bootstrap/dist/css/bootstrap.min.css';

import HoverIcon from './HoverIcons';

import { Outlet } from 'react-router-dom';


const Main = () =>
{
    const [isPanelOpened, setIsPanelOpened] = useState(true);

    const handleShowArrow = () =>
    {
        setIsPanelOpened(!isPanelOpened);
    }

    return (
        <div className='admin-body' style={{
            gridTemplateColumns: isPanelOpened ? '17% 83%' : '5% 95%'
        }}>

            <div className='left-menu'>

                <span className='main-logo'>
                    {
                        !isPanelOpened ? <MainSiteLogo /> : <MainSiteLogoWithText />
                    }
                </span>

                <div className='menu-item-user' style={{
                    borderRadius: isPanelOpened ? ' 0px 10px 0px 0px' : '0px'
                }}>

                    <img width={45} height={45} src={AdminLogoIcon} style={{
                        borderRadius: '90px',
                        marginLeft: !isPanelOpened ? '13px' : '3px',
                    }} />

                    <label className='menu-name'
                        style={{
                            display: isPanelOpened ? 'inline' : 'none',
                        }}
                    >Admin</label>

                    <label className='menu-arrow-icon'
                        style={{
                            marginLeft: isPanelOpened ? '41%' : '8%'
                        }}
                        onClick={handleShowArrow}>
                        {isPanelOpened ? <WhiteRightWithGapArrow /> : <WhiteLeftWithGapArrow />}
                    </label>
                </div>

                <HoverIcon isPanelOpened={isPanelOpened} />

            </div>


            <div className='body-by-item'>
                <Outlet />
            </div>
        </div>
    )
}

export default Main;

