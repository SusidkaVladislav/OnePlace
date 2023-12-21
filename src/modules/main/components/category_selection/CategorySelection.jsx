import React from "react";
import "./CaregorySelection.css"
import CategoryCard from '../../controls/category-card/CategoryCard'
import CategoryPhoneCard from '../../controls/category-card/CategoryPhoneCard';
import
{
    Grid,
    useMediaQuery,
    Toolbar,
} from '@mui/material'
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const CaregorySelection = (props) =>
{
    const navigate = useNavigate();

    const xs = useMediaQuery('(min-width: 0px)');
    const sm = useMediaQuery('(min-width: 600px)');
    const sm1 = useMediaQuery('(min-width: 650px)');
    const md = useMediaQuery('(min-width: 900px)');
    const md1 = useMediaQuery('(min-width: 1050px)');
    const lg = useMediaQuery('(min-width: 1200px)');
    const lg1 = useMediaQuery('(min-width: 1400px)');

    const {
        categoriesForSelect,
    } = useSelector(state => state.userCategories)

    const {
        id,
        categoryName,
        items,
    } = props;

    const onCategoryClickHandler = (id) =>
    {
        let hasSubCategories = categoriesForSelect.find(c => c.parentCategoryId === Number(id))

        if (hasSubCategories !== undefined)
        {
            navigate('/category/' + id);
        }
        else
        {
            navigate('/products/' + id);
        }
    }

    return (
        <div className="cs-container1">
            <div className="cs-container2">
                <Toolbar className="head-container1">
                    <h3>{categoryName}</h3>
                    <h5
                        className="light ac"
                        style={{
                            cursor: 'pointer'
                        }}
                        onClick={() =>
                        {
                            navigate(`/category/${Number(id)}`)
                        }}
                    >всі категорії</h5>
                </Toolbar>
                <Grid
                    container
                    rowGap={'20px'}
                    sx={{

                        paddingLeft: lg1 ? '40px' : lg ? '0px' :
                            md1 ? '40px' : md ? '0px' : sm ? '20px' : sm1 ? '30px' : '16px',

                        paddingRight: lg1 ? '40px' : lg ? '0px' :
                            md1 ? '40px' : md ? '0px' : sm ? '20px' : sm1 ? '30px' : '16px',
                    }}
                    justifyContent={'space-between'}
                >
                    {
                        items?.map((item, index) =>
                        {
                            return (
                                <Grid
                                    key={index}
                                    item
                                    container
                                    justifyContent={'center'}
                                    lg={3}
                                    md={4}
                                    sm={6}
                                    xs={6}
                                    sx={{
                                        cursor: 'pointer'
                                    }}
                                    onClick={() =>
                                    {
                                        onCategoryClickHandler(item?.id)
                                    }}
                                >
                                    {
                                        sm ? <CategoryCard
                                            name={item?.name}
                                            picture={item?.pictureURL}
                                        /> : <CategoryPhoneCard
                                            bgColor={'#E5EAEA'}
                                            name={item?.name}
                                            picture={item?.pictureURL}
                                        />
                                    }
                                </Grid>
                            )
                        })
                    }
                </Grid>
            </div>
        </div>
    )
}

export default CaregorySelection;