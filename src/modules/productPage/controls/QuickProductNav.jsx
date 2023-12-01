import React, {useState} from 'react';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

import ShareIcon from '../../../svg/client-icons/productPage/ShareIcon';
import BigHeartIcon from '../../../svg/client-icons/productPage/BigHeartIcon';
import BigFilledHeartIcon from '../../../svg/client-icons/productPage/BigFilledHeartIcon';
import AddReviewIcon from '../../../svg/client-icons/productPage/AddReviewIcon';
import StarRating from './StarRating';
import MainImg from "../all-about-product/example-pics/black1.png"

const QuickProductNav = () => {

    //heart button logic
    const [filled, setFilled] = useState(false);

    function HeartClick()
    {
        setFilled(!filled);
    }

    return(
        <div style={{borderRadius:"10px", boxShadow:"1px 1px 8px 0px rgba(0, 0, 0, 0.08)"}}>
            <div style={{padding:"22px"}}>
                <div style={{display:"flex", alignItems:"center"}}>
                    <img src={MainImg} style={{padding:"2px", height:"79px", width:"82px", backgroundColor:"white", borderRadius:"10px", boxShadow:"1px 1px 8px 0px rgba(0, 0, 0, 0.08)", objectFit:"contain"}}></img>
                    <div style={{width:"24px"}}></div>
                    <h4>Навушники JBL TUNE 510 BT Black (JBLT510BTBLKEU)</h4>
                </div>

                <div className='hl'></div>

                <div style={{display:"flex", justifyContent:'space-between'}}>
                <div style={{display:"flex"}}>
                    <h4 className='red'>2 449 грн</h4>
                    <Typography className='t2-medium' sx={{ textDecoration: 'line-through'}}>3 299 грн</Typography>
                </div>
                    <Typography className='t1-bold-green'>В наявності</Typography>
                </div>

                <div className='hl'></div>

                <div style={{display:"flex", justifyContent:'space-between'}}>
                <Typography className='t1-bold'>Колір: Black</Typography>  
                <div style={{display:"flex"}}>
                    <div className='aap-color-circle' style={{backgroundColor:"#373639"}} ></div>
                    <div style={{width:"5px"}}></div>
                    <div className='aap-color-circle' style={{backgroundColor:"#4D627C"}} ></div>
                    <div style={{width:"5px"}}></div>
                    <div className='aap-color-circle' style={{backgroundColor:"#E8C8DA"}} ></div>
                </div>
                </div>

                <div className='hl'></div>

                <div style={{display:"flex", justifyContent:"space-between", width:"100%"}}>
                <Button variant="contained" className="aap-button">Купити</Button>

                <div style={{display:"flex", paddingTop:"9px"}}>
                    <ShareIcon/>
                    <div style={{width:"20px"}}></div>

                    <div id="heartBtn" onClick={HeartClick}>
                    {filled === false ?
                        (<div id="heartIcon"><BigHeartIcon /></div>) :
                        (<div id="filledHeartIcon"><BigFilledHeartIcon/></div>)}
                    </div>

                    <div style={{width:"20px"}}></div>
                    <AddReviewIcon/>
                </div>
                </div>

                <div className='aap-star-rating-container'>
                <StarRating defaultRating={5} />
                <Typography className='t2-medium-blue' style={{display:"inline", paddingTop:"5px"}}>4,8 (711 оцінок)</Typography>
                </div>

                <div className='hl'></div>
            </div>
        </div>
    )
}

export default QuickProductNav;