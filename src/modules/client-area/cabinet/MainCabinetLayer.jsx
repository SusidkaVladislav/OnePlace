import React, { useState } from 'react';

//#region Icons
import MyOrders from '../../../svg/user-cabinet/user-cabinet-main/MyOrdersIcon';
import MyDesireList from '../../../svg/user-cabinet/user-cabinet-main/MyDesireListIcon';
import MyPurse from '../../../svg/user-cabinet/user-cabinet-main/MyPurseIcon';
import MyReviews from '../../../svg/user-cabinet/user-cabinet-main/MyReviewsIcon';
import MyChats from '../../../svg/user-cabinet/user-cabinet-main/MyChatsIcon';
import MyPersonalData from '../../../svg/user-cabinet/user-cabinet-main/MyPersonalDataIcon';
import MyExit from '../../../svg/user-cabinet/user-cabinet-main/MyExitIcon';
//#endregion

import { Stack, Grid } from '@mui/material';
import { Outlet } from 'react-router-dom';

import { useNavigate } from 'react-router-dom';

const INACTIVE_ICON_COLOR = "#6C4744";
const ACTIVE_ICON_COLOR = "#0A3D58";

const IMG_URL = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSTR3zZjipG0-Lf-MtJcieX_ASoCDA_6JfGxA&usqp=CAU';

const MainCabinetLayer = () =>
{
    const navigate = useNavigate();
    const [hoveredIndex, setHoveredIndex] = useState(0);

    const setIndex = (index) =>
    {
        setHoveredIndex(index)
    }

    return (
        <Grid
            container
            minHeight={'100vh'}
            bgcolor={"#F6F6F6"}

        >
            <Grid
                container
                height={'fit-content'}
                md={3}
                sm={3}
                xs={3}
                direction={'column'}
            >
                <Grid
                    container
                    sx={{
                        borderRadius: '0px 0px 60px 0px',
                        padding: '4%',
                    }}
                    md={12}
                    direction={'row'}
                    gap={1}
                    bgcolor={'#DA8D33'}
                >
                    <img width={50} height={50} style={{
                        borderRadius: '90px'
                    }} src={IMG_URL} alt='user' />
                    <span>
                        <h5 className='bold-white' style={{ margin: 0 }}>Ігор Стець</h5>
                        <span className='t2-medium-white' >igor167@gmail.com</span>
                    </span>
                </Grid>

                <Grid
                    container
                    direction={'column'}
                    padding={'7%'}
                >
                    <span
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '5%'
                        }}
                    >
                        <MyOrders color={hoveredIndex === 0 ? ACTIVE_ICON_COLOR : INACTIVE_ICON_COLOR} />
                        <h5 className='bold-brown2 unselectable'
                            style={{ marginBottom: 0, cursor: 'pointer', color: hoveredIndex === 0 ? ACTIVE_ICON_COLOR : INACTIVE_ICON_COLOR }}
                            onMouseOver={() =>
                            {
                                setIndex(0)
                            }}
                            onClick={() =>
                            {
                                navigate("")
                            }}
                        >Мої замовлення</h5>
                    </span>

                    <span
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '5%',
                            paddingTop: '20px',
                            borderRight: '1px solid #C1BFBF'
                        }}
                    >
                        <MyDesireList color={hoveredIndex === 1 ? ACTIVE_ICON_COLOR : INACTIVE_ICON_COLOR} />
                        <h5 className='bold-brown2 unselectable'
                            style={
                                {
                                    marginBottom: 0,
                                    cursor: 'pointer',
                                    color: hoveredIndex === 1 ? ACTIVE_ICON_COLOR : INACTIVE_ICON_COLOR
                                }}
                            onMouseOver={() =>
                            {
                                setIndex(1)
                            }}
                            onClick={() =>
                            {
                                navigate("desires")
                            }}>Список бажань</h5>
                    </span>

                    <span
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '5%',
                            paddingTop: '20px',
                            borderRight: '1px solid #C1BFBF'
                        }}
                    >
                        <MyPurse color={hoveredIndex === 2 ? ACTIVE_ICON_COLOR : INACTIVE_ICON_COLOR} />
                        <h5 className='bold-brown2 unselectable'
                            style={
                                {
                                    marginBottom: 0,
                                    cursor: 'pointer',
                                    color: hoveredIndex === 2 ? ACTIVE_ICON_COLOR : INACTIVE_ICON_COLOR
                                }}
                            onMouseOver={() =>
                            {
                                setIndex(2)
                            }}
                            onClick={() =>
                            {
                                navigate("purse")
                            }}>Мій гаманець</h5>
                    </span>

                    <span
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '5%',
                            paddingTop: '20px',
                            borderRight: '1px solid #C1BFBF'
                        }}
                    >
                        <MyReviews color={hoveredIndex === 3 ? ACTIVE_ICON_COLOR : INACTIVE_ICON_COLOR} />
                        <h5 className='bold-brown2 unselectable'
                            style={
                                {
                                    marginBottom: 0,
                                    cursor: 'pointer',
                                    color: hoveredIndex === 3 ? ACTIVE_ICON_COLOR : INACTIVE_ICON_COLOR
                                }}
                            onMouseOver={() =>
                            {
                                setIndex(3)
                            }}
                            onClick={() =>
                            {
                                navigate("reviews")
                            }}>Мої відгуки</h5>
                    </span>

                    <span
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '5%',
                            paddingTop: '20px',
                            borderRight: '1px solid #C1BFBF',
                        }}
                    >
                        <MyChats color={hoveredIndex === 4 ? ACTIVE_ICON_COLOR : INACTIVE_ICON_COLOR} />
                        <h5 className='bold-brown2 unselectable'
                            style={
                                {
                                    marginBottom: 0,
                                    cursor: 'pointer',
                                    color: hoveredIndex === 4 ? ACTIVE_ICON_COLOR : INACTIVE_ICON_COLOR
                                }}
                            onMouseOver={() =>
                            {
                                setIndex(4)
                            }}
                            onClick={() =>
                            {
                                navigate("chats")
                            }}>Чати</h5>
                    </span>

                    <span
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '5%',
                            paddingTop: '20px',
                            borderRight: '1px solid #C1BFBF',
                        }}
                    >
                        <MyPersonalData color={hoveredIndex === 5 ? ACTIVE_ICON_COLOR : INACTIVE_ICON_COLOR} />
                        <h5 className='bold-brown2 unselectable'
                            style={
                                {
                                    marginBottom: 0,
                                    cursor: 'pointer',
                                    color: hoveredIndex === 5 ? ACTIVE_ICON_COLOR : INACTIVE_ICON_COLOR
                                }}
                            onMouseOver={() =>
                            {
                                setIndex(5)
                            }}
                            onClick={() =>
                            {
                                navigate("personal-data")
                            }}>Особисті дані</h5>
                    </span>

                    <span
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '5%',
                            paddingTop: '50px',
                            borderRight: '1px solid #C1BFBF',

                        }}
                    >
                        <MyExit color={hoveredIndex === 6 ? ACTIVE_ICON_COLOR : INACTIVE_ICON_COLOR} />
                        <h5 className='bold-brown2 unselectable'
                            style={
                                {
                                    marginBottom: 0,
                                    cursor: 'pointer',
                                    color: hoveredIndex === 6 ? ACTIVE_ICON_COLOR : INACTIVE_ICON_COLOR
                                }}
                            onMouseOver={() =>
                            {
                                setIndex(6)
                            }}>Вийти</h5>
                    </span>
                </Grid>

            </Grid>

            <Grid
                container
                item
                md={9}
                sm={9}
                xs={9}
            >
                <Outlet />
            </Grid>
        </Grid>
    )
}

export default MainCabinetLayer; 