import React, {useState} from 'react';
import "./AllAboutProduct.css";

import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

import ShareIcon from '../../../svg/client-icons/productPage/ShareIcon';
import AddReviewIcon from '../../../svg/client-icons/productPage/AddReviewIcon';
import BigHeartIcon from '../../../svg/client-icons/productPage/BigHeartIcon';
import BigFilledHeartIcon from '../../../svg/client-icons/productPage/BigFilledHeartIcon';
import BigBrownLeftArrow from '../../../svg/arrows/BigBrownLeftArrow';
import BigBrownRightArrow from '../../../svg/arrows/BigBrownRightArrow';
import Divider from '../../../svg/shared-icons/Divider';

import StarRating from '../controls/StarRating';

import Black1 from './example-pics/black1.png';
import Black2 from './example-pics/black2.png';
import Black3 from './example-pics/black3.png';
import Black4 from './example-pics/black4.png';
import Black5 from './example-pics/black5.png';
import Black6 from './example-pics/black6.png';
import Black7 from './example-pics/black7.png';

import Blue1 from './example-pics/blue1.png';
import Blue2 from './example-pics/blue2.png';
import Blue3 from './example-pics/blue3.png';
import Blue4 from './example-pics/blue4.png';
import Blue5 from './example-pics/blue5.png';
import Blue6 from './example-pics/blue6.png';
import Blue7 from './example-pics/blue7.png';

import Pink1 from './example-pics/pink1.png';
import Pink2 from './example-pics/pink2.png';
import Pink3 from './example-pics/pink3.png';
import Pink4 from './example-pics/pink4.png';
import Pink5 from './example-pics/pink5.png';
import Pink6 from './example-pics/pink6.png';

const imgBlack = [
    Black1, Black2, Black3, Black4, Black5, Black6, Black7
];

const imgBlue = [
    Blue1, Blue2, Blue3, Blue4, Blue5, Blue6, Blue7
];

const imgPink = [
    Pink1,Pink2,Pink3,Pink4,Pink5,Pink6
];

const AllAboutBroduct = () => {
  //images logic
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [currentColorImg, setCurrentColorImg] = useState(imgBlack);

    const navigateImage = (direction) => {
        if(direction === "next"){
            setCurrentImageIndex((prevIndex) => 
                prevIndex === imgBlack.length - 1 ? 0 : prevIndex + 1);
        } else {
            setCurrentImageIndex((prevIndex) =>
                prevIndex === 0 ? imgBlack.length - 1: prevIndex - 1);
        }
    };

    const changeColor = (imgArray) => {
      setCurrentColorImg(imgArray);
    };

  //star rating logic
  const [rating, setRating] = useState(4);
  const HandleRatingChange = (value) => {
      setRating(value);
  }

  //heart button logic
  const [filled, setFilled] = useState(false);

  function HeartClick()
  {
    setFilled(!filled);
  }

    return(
        <Grid container>
            <Grid item className="product-gallery-root" xs={12} xl={4.7}>
            <Card>
            <div className='product-gallery-cardmedia-container'>
              <CardMedia
                component="img"
                className="product-gallery-main-image" 
                image={currentColorImg[currentImageIndex]}/>
                  <Grid container alignItems="center" justifyContent="center" className='product-gallery-navigation-container'>
                    <Grid item>
                      <IconButton onClick={() => navigateImage('next')}>
                      <BigBrownLeftArrow/>
                      </IconButton>
                    </Grid>
                    <Grid item>
                      <IconButton onClick={() => navigateImage('next')}>
                      <BigBrownRightArrow/>
                      </IconButton>
                    </Grid>
                  </Grid>
            </div>     
            </Card>
            <Grid container justifyContent="center" alignItems="center" spacing={1} className="product-gallery-img-container">
            {currentColorImg.map((image, index) => (
              <Grid item key={index}>
              <img
                src={image}
                alt={`thumbnail-${index}`}
                className={`product-gallery-thumbnail`}
                onClick={() => setCurrentImageIndex(index)}/>
              </Grid>))}
            </Grid>
          </Grid>


          <Grid item xl={0.3}></Grid>
            <Grid item className='aap-container1' xs={12} xl={7}>
              <div className='aap-container2'>
                <h4>Навушники JBL TUNE 510 BT Black (JBLT510BTBLKEU)</h4>

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
                      <div className='aap-color-circle' style={{backgroundColor:"#373639"}} onClick={() => changeColor(imgBlack)}></div>
                      <div style={{width:"5px"}}></div>
                      <div className='aap-color-circle' style={{backgroundColor:"#4D627C"}} onClick={() => changeColor(imgBlue)}></div>
                      <div style={{width:"5px"}}></div>
                      <div className='aap-color-circle' style={{backgroundColor:"#E8C8DA"}} onClick={() => changeColor(imgPink)}></div>
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
                  <StarRating defaultRating={rating} onRatingChange={HandleRatingChange}/>
                  <Typography className='t2-medium-blue' style={{display:"inline", paddingTop:"5px"}}>4,8 (711 оцінок)</Typography>
                </div>
               
                <div className='hl'></div>

                <div>
                  <Typography className='t1-bold-brown2'>
                  Навушники JBL Tune 510BT дають змогу повною мірою передати потужність JBL Pure Bass. Ви можете під'єднатися через Bluetooth 5.0 до двох пристроїв одночасно та вибирати між контентом на різних пристроях, коли Вам цього хочеться. А якщо дзвінок надходить, наприклад, під час перегляду відео на іншому пристрої, JBL Tune 510BT перемикається на ваш мобільний телефон.
                  </Typography>
                </div>

                <div className='hl'></div>

                <Grid container className="aap-footer-container">
                    <Grid item className='aap-navigate'>
                        <h5 className="bold-brown2">Доставка</h5>
                    </Grid>
                    <Grid item  className="pi-divider-container">
                        <Divider/>
                    </Grid>
                    <Grid item className='aap-navigate'>
                        <h5 className="bold-brown2">Оплата</h5>
                    </Grid>
                </Grid>

                <div className='hl'></div>
              </div>
            </Grid>
        </Grid>
    )
}

export default AllAboutBroduct;