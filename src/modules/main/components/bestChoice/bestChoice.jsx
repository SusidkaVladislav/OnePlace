import React from "react";
import './bestChoice.css';
import ProductCard from "../../controls/ProductCard";
import BigBrownLeftArrow from "../../../../svg/arrows/BigBrownLeftArrow";
import BigBrownRightArrow from "../../../../svg/arrows/BigBrownRightArrow";
import Toolbar from "@mui/material/Toolbar";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Divider from "../../../../svg/shared-icons/Divider";
import Button from "@mui/material/Button";

const BestChoice = () => {
    return (
        <div className="bc-container1">
            <div className="bc-container2">
                <Toolbar className="head-container">
                    <h2>Кращий вибір</h2>
                    <Toolbar className="arrow-container">
                        <BigBrownLeftArrow/>
                        <BigBrownRightArrow/>
                    </Toolbar>
                </Toolbar>
                <Grid container className="categories-container">
                    <Grid item>
                        <h5 className="bold-orange">Усе</h5>
                    </Grid>
                    <Grid item  className="divider">
                        <Divider/>
                    </Grid>
                    <Grid item>
                        <Typography className="t1-light">Одяг та взуття</Typography>
                    </Grid>
                    <Grid item  className="divider">
                        <Divider/>
                    </Grid>
                    <Grid item>
                        <Typography className="t1-light">Техніка та електроніка</Typography>
                    </Grid>
                    <Grid item  className="divider">
                        <Divider/>
                    </Grid>
                    <Grid item>
                        <Typography className="t1-light">Дім і сад</Typography>
                    </Grid>
                    <Grid item  className="divider">
                        <Divider/>
                    </Grid>
                    <Grid item>
                        <Typography className="t1-light">Спорт і відпочинок</Typography>
                    </Grid>
                    <Grid item  className="divider"> 
                        <Divider/>
                    </Grid>
                    <Grid item>
                        <Typography className="t1-light">Товари для дітей</Typography>
                    </Grid>
                    <Grid item  className="divider">
                        <Divider/>
                    </Grid>
                </Grid>
                <Grid container className="bcp-container" spacing={6}>
                    <Grid item>
                        <ProductCard/>
                    </Grid>
                    <Grid item>
                        <ProductCard/>
                    </Grid>
                    <Grid item>
                        <ProductCard/>
                    </Grid>
                    <Grid item>
                        <ProductCard/>
                    </Grid>
                    <Grid item>
                        <ProductCard/>
                    </Grid>
                    <Grid item>
                        <ProductCard/>
                    </Grid>
                    <Grid item>
                        <ProductCard/>
                    </Grid>
                    <Grid item>
                        <Button variant="outlined" className="mp-button">Більше товарів</Button>
                    </Grid>
                </Grid>
            </div>
        </div>
    )
}

export default BestChoice;