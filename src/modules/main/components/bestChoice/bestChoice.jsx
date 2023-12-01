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
import IconButton from "@mui/material/IconButton";

const BestChoice = () => {
    return (
        <div className="bc-container1">
            <div className="bc-container2">
                <Grid container className="ci-head-container">
                    <Grid item xs={12} s={11} md={11} lg={11}>
                    <h2>Також вас можуть зацікавити</h2>
                    </Grid>
                    
                    <Grid item xs={12} s={1} md={1} lg={1}>
                    <Toolbar className="ci-arrow-container">
                        <IconButton><BigBrownLeftArrow/></IconButton>
                        <IconButton><BigBrownRightArrow/></IconButton>
                    </Toolbar>
                    </Grid>
                </Grid>
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