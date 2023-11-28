import React from "react";
import './Footer.css';
import Grid from "@mui/material/Grid"
import Typography from "@mui/material/Typography";
import MainSiteLogoWithText from "../../../../svg/shared-icons/MainSiteLogoWithText";
import InstagramIcon from '../../../../svg/client-icons/footer/InstagramIcon';
import TelegramIcon from "../../../../svg/client-icons/footer/TelegramIcon";
import FacebookIcon from "../../../../svg/client-icons/footer/FacebookIcon";
import Toolbar from "@mui/material/Toolbar";


const Footer = () => {
    return (
        <div className="footer-container1">
            <Grid container className="footer-container2" spacing={9}>
                <Grid item>
                    <h4 className="blue headtxt">Гід покупця</h4>
                    <Typography className="t1-bold-blue ftxt">Оплата та доставка</Typography>
                    <Typography className="t1-bold-blue ftxt">Повернення та обмін</Typography>
                    <Typography className="t1-bold-blue ftxt">Програма захисту</Typography>
                    <Typography className="t1-bold-blue ftxt">Пошук товару</Typography>
                    <Typography className="t1-bold-blue ftxt">Відгуки</Typography>
                </Grid>
                <Grid item>
                    <div className="vl"></div>
                </Grid>
                <Grid item>
                    <h4 className="blue headtxt">One Place.ua</h4>
                    <Typography className="t1-bold-blue ftxt">Угода користувача</Typography>
                    <Typography className="t1-bold-blue ftxt">Бонусна програма</Typography>
                    <Typography className="t1-bold-blue ftxt">Конфіденційність</Typography>
                    <Typography className="t1-bold-blue ftxt">Про OnePlace.ua</Typography>
                    <Typography className="t1-bold-blue ftxt">Вебмайстрам</Typography>
                </Grid>
                <Grid item>
                    <div className="vl"></div>
                </Grid>
                <Grid item>
                    <h4 className="blue headtxt">Допомога</h4>
                    <Typography className="t1-bold-blue ftxt">Зворотній зв’язок</Typography>
                    <Typography className="t1-bold-blue ftxt">Покупцям</Typography>
                    <Typography className="t1-bold-blue ftxt">Довідка</Typography>
                </Grid>
                <Grid item>
                    <MainSiteLogoWithText/>
                    <Grid container className="footer-container3" spacing={4}>
                        <Grid item>
                            <TelegramIcon/>
                        </Grid>
                        <Grid item>
                            <InstagramIcon/>
                        </Grid>
                        <Grid item>
                            <FacebookIcon/>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            <Toolbar className="footer-container4">
                <Typography className="t2-medium-blue">Перевірені інтернет- магазини України на онлайн-маркеті OnePlace.ua</Typography>
                <Typography className="t2-medium-blue">2023 OnePlace.ua </Typography>
            </Toolbar>
        </div>
    )
}

export default Footer;