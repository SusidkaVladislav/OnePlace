import React, { useState} from "react";
import './SpecialOffers.css';
import Grid from '@mui/material/Grid';

import feedback_static from '../../../../svg/client-icons/specialOffers/feedback.svg';
import feedback_animation from '../../../../svg/client-icons/specialOffers/feedback_animation.gif';
import navigation_static from '../../../../svg/client-icons/specialOffers/navigation.svg';
import navigation_animation from '../../../../svg/client-icons/specialOffers/navigation_animation.gif';
import pay_static from '../../../../svg/client-icons/specialOffers/pay.svg';
import pay_animation from '../../../../svg/client-icons/specialOffers/pay_animation.gif';
import return_static from '../../../../svg/client-icons/specialOffers/return.svg';
import return_animation from '../../../../svg/client-icons/specialOffers/return_animation.gif';
import secure_static from '../../../../svg/client-icons/specialOffers/secure.svg';
import secure_animation from '../../../../svg/client-icons/specialOffers/secure_animation.gif';

const SpecialOffers = () => {
    const [imageSrc1, setImageSrc1] = useState(navigation_static);
    const [imageSrc2, setImageSrc2] = useState(pay_static);
    const [imageSrc3, setImageSrc3] = useState(feedback_static);
    const [imageSrc4, setImageSrc4] = useState(return_static);
    const [imageSrc5, setImageSrc5] = useState(secure_static);

    const changeImageSrc1 = () => {
        setImageSrc1(navigation_animation); 
        
        setTimeout(() => {
            setImageSrc1(navigation_static); 
        }, 4000); 
      }

    const changeImageSrc2 = () => {
        setImageSrc2(pay_animation); 
        
        setTimeout(() => {
            setImageSrc2(pay_static); 
        }, 4000); 
    }

    const changeImageSrc3 = () => {
        setImageSrc3(feedback_animation); 
         
        setTimeout(() => {
                setImageSrc3(feedback_static); 
        }, 2000); 
    }

    const changeImageSrc4 = () => {
        setImageSrc4(return_animation); 
        
        setTimeout(() => {
                setImageSrc4(return_static); 
        }, 2000); 
    }
    const changeImageSrc5 = () => {
        setImageSrc5(secure_animation); 
        
        setTimeout(() => {
                setImageSrc5(secure_static); 
        }, 4000); 
    }

 
    return (
        <div>
            <div id="text">
                <h2>Спеціальні пропозиції</h2>
            </div>
            <Grid container justifyContent="center" className="offersContainer"> 
                <Grid item xs={2} className="offerItem">
                <div>
                    <img src={imageSrc1} onMouseOver={changeImageSrc1}/>
                    <h5 className="bold offerText">Пошук</h5>
                </div>
                </Grid>
                <Grid item xs={2} className="offerItem">
                <div>
                    <img src={imageSrc2} onMouseOver={changeImageSrc2}/>
                    <h5 className="bold offerText">Оплата та</h5>
                    <h5 className="bold">доставка</h5>
                </div>
                </Grid>
                <Grid item xs={2} className="offerItem">
                <div>
                    <img src={imageSrc3} onMouseOver={changeImageSrc3}/>
                    <h5 className="bold offerText">Відгук</h5>
                </div>
                </Grid>
                <Grid item xs={2} className="offerItem">
                <div>
                    <img src={imageSrc4} onMouseOver={changeImageSrc4}/>
                    <h5 className="bold offerText">Повернення</h5>
                    <h5 className="bold">та обмін</h5>
                </div>
                </Grid>
                <Grid item xs={2} className="offerItem">
                <div>
                    <img src={imageSrc5} onMouseOver={changeImageSrc5}/>
                    <h5 className="bold offerText">Захист</h5>
                    <h5 className="bold">покупок</h5>
                </div>
                </Grid>
            </Grid>
        </div>
    )
}

export default SpecialOffers;