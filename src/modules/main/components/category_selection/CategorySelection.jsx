import React from "react";
import "./CaregorySelection.css"
import Toolbar from "@mui/material/Toolbar";
import CategoryCard from '../../controls/category-card/CategoryCard'
import Grid from "@mui/material/Grid";

const CaregorySelection = () => {
    return (
        <div className="cs-container1">
            <div className="cs-container2">
            <Toolbar className="head-container1">
                    <h3>Одяг та взуття</h3>
                    <h5 className="light ac">всі категорії</h5>
            </Toolbar>
            <Grid container className="cs-container3" spacing={6}>
                    <Grid item>
                        <CategoryCard/>
                    </Grid>
                    <Grid item>
                        <CategoryCard/>
                    </Grid>
                    <Grid item>
                        <CategoryCard/>
                    </Grid>
                    <Grid item>
                        <CategoryCard/>
                    </Grid>
                </Grid>
            </div>
        </div>
    )
}

export default CaregorySelection;