import React, { useState } from 'react';

//#region Icons
import MyOrders from '../../../svg/user-cabinet/user-cabinet-main/MyOrdersIcon';
import MyDesireList from '../../../svg/user-cabinet/user-cabinet-main/MyDesireListIcon';
import MyReviews from '../../../svg/user-cabinet/user-cabinet-main/MyReviewsIcon';
import MyMessages from '../../../svg/user-cabinet/user-cabinet-main/MyChatsIcon';
import MyPersonalData from '../../../svg/user-cabinet/user-cabinet-main/MyPersonalDataIcon';
import MyExit from '../../../svg/user-cabinet/user-cabinet-main/MyExitIcon';
import CloseMenuIcon from '../../../svg/user-cabinet/user-cabinet-main/CloseMenuIcon';
import OpenMenuIcon from '../../../svg/user-cabinet/user-cabinet-main/OpenMenuIcon';
//#endregion

import { Hidden, Grid, Drawer, IconButton} from '@mui/material';
import { Outlet } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const INACTIVE_ICON_COLOR = "#6C4744";
const ACTIVE_ICON_COLOR = "#0A3D58";

const IMG_URL = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSTR3zZjipG0-Lf-MtJcieX_ASoCDA_6JfGxA&usqp=CAU';

const MainCabinetLayer = () =>
{
    const navigate = useNavigate();
    const [hoveredIndex, setHoveredIndex] = useState(0);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [open, setOpen] = useState(false);

    const toggleDrawer = () => {
        setOpen(!open);
    };

    const setIndex = (index) =>
    {
        setHoveredIndex(index)
    }

    const setSelectionIndex = (index) =>
    {
        setSelectedIndex(index)
    }

    return (
    <Grid container sx={{backgroundColor:"#F6F6F6"}}>
        <Hidden smUp>
            <Drawer anchor="left" variant="permanent" open={open} onClose={toggleDrawer}>
                {!open ? (
                  <div style={{direction:"column", paddingLeft:"15px", paddingRight:"5px"}}>
                    <IconButton onClick={toggleDrawer} sx={{paddingTop:"20px"}}>
                        <OpenMenuIcon/>
                    </IconButton>
                  
                  <Grid container direction={'column'}>
  
                  <Grid item sx={{display:"flex", paddingTop:"50px"}}
                    onClick={() =>
                    {
                        setSelectionIndex(0)
                        navigate("")
                    }}>
                  <MyOrders color={selectedIndex === 0 ? ACTIVE_ICON_COLOR : INACTIVE_ICON_COLOR} />
                  </Grid>
                      
                  <Grid item sx={{display:"flex", paddingTop:"30px"}}
                        onClick={() =>
                        {
                            setSelectionIndex(1)
                            navigate("desires")
                        }}>
                  <MyDesireList color={selectedIndex === 1 ? ACTIVE_ICON_COLOR : INACTIVE_ICON_COLOR} />
                  </Grid>
  
                  <Grid item sx={{display:"flex", paddingTop:"30px"}}
                        onClick={() =>
                            {
                                setSelectionIndex(2)
                                navigate("reviews")
                            }}>
                  <MyReviews color={selectedIndex === 2 ? ACTIVE_ICON_COLOR : INACTIVE_ICON_COLOR} />
                  </Grid>
                     
  
                  <Grid item sx={{display:"flex", paddingTop:"30px"}}
                        onClick={() =>
                            {
                                setSelectionIndex(3)
                                navigate("chats")
                            }}>
                  <MyMessages color={selectedIndex === 3 ? ACTIVE_ICON_COLOR : INACTIVE_ICON_COLOR} />
                  </Grid>
                          
                  <Grid item sx={{display:"flex", paddingTop:"30px"}}
                        onClick={() =>
                            {
                                setSelectionIndex(4)
                                navigate("personal-data")
                            }}>
                  <MyPersonalData color={selectedIndex === 4 ? ACTIVE_ICON_COLOR : INACTIVE_ICON_COLOR} />
                  </Grid>
                     
                  <Grid item sx={{display:"flex", paddingTop:"80px"}}
                        onClick={() =>
                            {
                                navigate("/")
                            }}>
                  <MyExit color={selectedIndex === 5 ? ACTIVE_ICON_COLOR : INACTIVE_ICON_COLOR} />   
                  </Grid>      
                  </Grid>
  
              </div>   
                ) : (
                    <div sx={{direction:"column"}}>
                    <div style={{borderRadius: '0px 0px 40px 0px',padding: '10px', backgroundColor: '#DA8D33', display:"flex", alignItems:"center"}}>
                        <img style={{borderRadius: '90px', width: '50px', height: "50px", objectFit:"contain", marginLeft:"10px"}}
                         src={IMG_URL} alt='user' />
                        <span style={{paddingLeft:"10px"}}>
                            <h5 className='bold-white'>Ігор Стець</h5>
                            <span className='t2-medium-white' >igor167@gmail.com</span>
                        </span>
                        <IconButton onClick={toggleDrawer} sx={{marginLeft:"60px"}}>
                        <CloseMenuIcon/>
                        </IconButton>
                    </div>
    
                    <Grid container direction={'column'} sx={{paddingLeft:"40px"}}>
    
                    <Grid item sx={{display:"flex", paddingTop:"30px"}}>
                    <MyOrders color={hoveredIndex === 0 || selectedIndex === 0 ? ACTIVE_ICON_COLOR : INACTIVE_ICON_COLOR} />
                            <h5 className='bold-brown2 unselectable'
                                style={{paddingLeft:"15px", cursor: 'pointer', color: hoveredIndex === 0 || selectedIndex === 0 ? ACTIVE_ICON_COLOR : INACTIVE_ICON_COLOR }}
                                onMouseOver={() =>
                                {
                                    setIndex(0)
                                }}
                                onMouseLeave={() =>{
                                    setIndex(-1)
                                }}
                                onClick={() =>
                                {
                                    setSelectionIndex(0)
                                    navigate("")
                                }}
                            >Мої замовлення</h5>
                    </Grid>
                        
                    <Grid item sx={{display:"flex", paddingTop:"30px"}}>
                    <MyDesireList color={hoveredIndex === 1 || selectedIndex === 1 ? ACTIVE_ICON_COLOR : INACTIVE_ICON_COLOR} />
                            <h5 className='bold-brown2 unselectable'
                                style={
                                    {
                                        paddingLeft: "15px",
                                        cursor: 'pointer',
                                        color: hoveredIndex === 1 || selectedIndex === 1 ? ACTIVE_ICON_COLOR : INACTIVE_ICON_COLOR
                                    }}
                                onMouseOver={() =>
                                {
                                    setIndex(1)
                                }}
                                onMouseLeave={() =>{
                                    setIndex(-1)
                                }}
                                onClick={() =>
                                {
                                    setSelectionIndex(1)
                                    navigate("desires")
                                }}>Список бажань</h5>
                    </Grid>
    
                    <Grid item sx={{display:"flex", paddingTop:"30px"}}>
                    <MyReviews color={hoveredIndex === 2 || selectedIndex === 2 ? ACTIVE_ICON_COLOR : INACTIVE_ICON_COLOR} />
                            <h5 className='bold-brown2 unselectable'
                                style={
                                    {
                                        paddingLeft: "15px",
                                        cursor: 'pointer',
                                        color: hoveredIndex === 2 || selectedIndex === 2 ? ACTIVE_ICON_COLOR : INACTIVE_ICON_COLOR
                                    }}
                                onMouseOver={() =>
                                {
                                    setIndex(2)
                                }}
                                onMouseLeave={() =>{
                                    setIndex(-1)
                                }}
                                onClick={() =>
                                {
                                    setSelectionIndex(2)
                                    navigate("reviews")
                                }}>Мої відгуки</h5>
                    </Grid>
                       
    
                    <Grid item sx={{display:"flex", paddingTop:"30px"}}>
                    <MyMessages color={hoveredIndex === 3 || selectedIndex === 3 ? ACTIVE_ICON_COLOR : INACTIVE_ICON_COLOR} />
                            <h5 className='bold-brown2 unselectable'
                                style={
                                    {
                                        paddingLeft: "15px",
                                        cursor: 'pointer',
                                        color: hoveredIndex === 3 || selectedIndex === 3 ? ACTIVE_ICON_COLOR : INACTIVE_ICON_COLOR
                                    }}
                                onMouseOver={() =>
                                {
                                    setIndex(3)
                                }}
                                onMouseLeave={() =>{
                                    setIndex(-1)
                                }}
                                onClick={() =>
                                {
                                    setSelectionIndex(3)
                                    navigate("chats")
                                }}>Мої повідомлення</h5>
                    </Grid>
                            
                    <Grid item sx={{display:"flex", paddingTop:"30px"}}>
                    <MyPersonalData color={hoveredIndex === 4 || selectedIndex === 4 ? ACTIVE_ICON_COLOR : INACTIVE_ICON_COLOR} />
                            <h5 className='bold-brown2 unselectable'
                                style={
                                    {
                                        paddingLeft: "15px",
                                        cursor: 'pointer',
                                        color: hoveredIndex === 4 || selectedIndex === 4 ? ACTIVE_ICON_COLOR : INACTIVE_ICON_COLOR
                                    }}
                                onMouseOver={() =>
                                {
                                    setIndex(4)
                                }}
                                onMouseLeave={() =>{
                                    setIndex(-1)
                                }}
                                onClick={() =>
                                {
                                    setSelectionIndex(4)
                                    navigate("personal-data")
                                }}>Особисті дані</h5>
                    </Grid>
                       
                    <Grid item sx={{display:"flex", paddingTop:"60px"}}>
                    <MyExit color={hoveredIndex === 5 || selectedIndex === 5 ? ACTIVE_ICON_COLOR : INACTIVE_ICON_COLOR} />
                            <h5 className='bold-brown2 unselectable'
                                style={
                                    {
                                        paddingLeft: "15px",
                                        cursor: 'pointer',
                                        color: hoveredIndex === 5 || selectedIndex === 5 ? ACTIVE_ICON_COLOR : INACTIVE_ICON_COLOR
                                    }}
                                onMouseOver={() =>
                                {
                                    setIndex(5)
                                }}
                                onMouseLeave={() =>{
                                    setIndex(-1)
                                }}
                                onClick={() =>
                                    {
                                        navigate("/")
                                    }}>Назад на головну</h5>    
                    </Grid>      
                    </Grid>
    
                </div>
                )}
            </Drawer>
        </Hidden>
        <Hidden smDown>
            <Grid item md={3} xl={3} sx={{direction:"column"}}>
                <div style={{borderRadius: '0px 0px 30px 0px',padding: '15px', backgroundColor: '#DA8D33', display:"flex", alignItems:"center"}}>
                    <img style={{borderRadius: '90px', width: '50px', height: "50px", objectFit:"contain", marginLeft:"10px"}}
                     src={IMG_URL} alt='user' />
                    <span style={{paddingLeft:"10px"}}>
                        <h5 className='bold-white'>Ігор Стець</h5>
                        <span className='t2-medium-white' >igor167@gmail.com</span>
                    </span>
                </div>

                <Grid container direction={'column'} sx={{paddingLeft:"40px", borderRight:"2px solid #C1BFBF"}}>

                <Grid item sx={{display:"flex", paddingTop:"30px"}}>
                <MyOrders color={hoveredIndex === 0 || selectedIndex === 0 ? ACTIVE_ICON_COLOR : INACTIVE_ICON_COLOR} />
                        <h5 className='bold-brown2 unselectable'
                            style={{paddingLeft:"15px", cursor: 'pointer', color: hoveredIndex === 0 || selectedIndex === 0 ? ACTIVE_ICON_COLOR : INACTIVE_ICON_COLOR }}
                            onMouseOver={() =>
                            {
                                setIndex(0)
                            }}
                            onMouseLeave={() =>{
                                setIndex(-1)
                            }}
                            onClick={() =>
                            {
                                setSelectionIndex(0)
                                navigate("")
                            }}
                        >Мої замовлення</h5>
                </Grid>
                    
                <Grid item sx={{display:"flex", paddingTop:"30px"}}>
                <MyDesireList color={hoveredIndex === 1 || selectedIndex === 1 ? ACTIVE_ICON_COLOR : INACTIVE_ICON_COLOR} />
                        <h5 className='bold-brown2 unselectable'
                            style={
                                {
                                    paddingLeft: "15px",
                                    cursor: 'pointer',
                                    color: hoveredIndex === 1 || selectedIndex === 1 ? ACTIVE_ICON_COLOR : INACTIVE_ICON_COLOR
                                }}
                            onMouseOver={() =>
                            {
                                setIndex(1)
                            }}
                            onMouseLeave={() =>{
                                setIndex(-1)
                            }}
                            onClick={() =>
                            {
                                setSelectionIndex(1)
                                navigate("desires")
                            }}>Список бажань</h5>
                </Grid>

                <Grid item sx={{display:"flex", paddingTop:"30px"}}>
                <MyReviews color={hoveredIndex === 2 || selectedIndex === 2 ? ACTIVE_ICON_COLOR : INACTIVE_ICON_COLOR} />
                        <h5 className='bold-brown2 unselectable'
                            style={
                                {
                                    paddingLeft: "15px",
                                    cursor: 'pointer',
                                    color: hoveredIndex === 2 || selectedIndex === 2 ? ACTIVE_ICON_COLOR : INACTIVE_ICON_COLOR
                                }}
                            onMouseOver={() =>
                            {
                                setIndex(2)
                            }}
                            onMouseLeave={() =>{
                                setIndex(-1)
                            }}
                            onClick={() =>
                            {
                                setSelectionIndex(2)
                                navigate("reviews")
                            }}>Мої відгуки</h5>
                </Grid>
                   

                <Grid item sx={{display:"flex", paddingTop:"30px"}}>
                <MyMessages color={hoveredIndex === 3 || selectedIndex === 3 ? ACTIVE_ICON_COLOR : INACTIVE_ICON_COLOR} />
                        <h5 className='bold-brown2 unselectable'
                            style={
                                {
                                    paddingLeft: "15px",
                                    cursor: 'pointer',
                                    color: hoveredIndex === 3 || selectedIndex === 3 ? ACTIVE_ICON_COLOR : INACTIVE_ICON_COLOR
                                }}
                            onMouseOver={() =>
                            {
                                setIndex(3)
                            }}
                            onMouseLeave={() =>{
                                setIndex(-1)
                            }}
                            onClick={() =>
                            {
                                setSelectionIndex(3)
                                navigate("chats")
                            }}>Мої повідомлення</h5>
                </Grid>
                        
                <Grid item sx={{display:"flex", paddingTop:"30px"}}>
                <MyPersonalData color={hoveredIndex === 4 || selectedIndex === 4 ? ACTIVE_ICON_COLOR : INACTIVE_ICON_COLOR} />
                        <h5 className='bold-brown2 unselectable'
                            style={
                                {
                                    paddingLeft: "15px",
                                    cursor: 'pointer',
                                    color: hoveredIndex === 4 || selectedIndex === 4 ? ACTIVE_ICON_COLOR : INACTIVE_ICON_COLOR
                                }}
                            onMouseOver={() =>
                            {
                                setIndex(4)
                            }}
                            onMouseLeave={() =>{
                                setIndex(-1)
                            }}
                            onClick={() =>
                            {
                                setSelectionIndex(4)
                                navigate("personal-data")
                            }}>Особисті дані</h5>
                </Grid>
                   
                <Grid item sx={{display:"flex", paddingTop:"60px"}}>
                <MyExit color={hoveredIndex === 5 || selectedIndex === 5 ? ACTIVE_ICON_COLOR : INACTIVE_ICON_COLOR} />
                        <h5 className='bold-brown2 unselectable'
                            style={
                                {
                                    paddingLeft: "15px",
                                    cursor: 'pointer',
                                    color: hoveredIndex === 5 || selectedIndex === 5 ? ACTIVE_ICON_COLOR : INACTIVE_ICON_COLOR
                                }}
                            onMouseOver={() =>
                            {
                                setIndex(5)
                            }}
                            onMouseLeave={() =>{
                                setIndex(-1)
                            }}
                            onClick={() =>
                                {
                                    navigate("/")
                                }}>Назад на головну</h5>    
                </Grid>      
                </Grid>

            </Grid>
            </Hidden>

            <Hidden smUp>
            <Grid item xs={1} sm={0}></Grid>
            </Hidden>

            <Grid item xs={11} sm={8} md={9} xl={9}>
                <Outlet />
            </Grid>
        </Grid>
    )
}

export default MainCabinetLayer; 