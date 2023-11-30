import React from 'react';
import "./CouldInterest.css";
import ProductCard from "../../main/controls/ProductCard";
import BigBrownLeftArrow from "../../../svg/arrows/BigBrownLeftArrow";
import BigBrownRightArrow from "../../../svg/arrows/BigBrownRightArrow";
import Toolbar from "@mui/material/Toolbar";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";

const CouldInterest = () => {
    return (
        <div className="ci-container1">
            <div className="ci-container2">
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
               
                <Grid container className="ci-bcp-container" spacing={6}>
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
                </Grid>
            </div>
        </div>
    )
}

export default CouldInterest;