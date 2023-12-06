import React from 'react';
import
{
    Grid,
    Stack,
    Typography,
    useMediaQuery,
} from '@mui/material';
import MainSiteLogoWithText from "../../../../../svg/shared-icons/MainSiteLogoWithText";
import BrownCloseCrossIcon from "../../../../../svg/shared-icons/BrownCloseCrossIcon";
import BrownCloseCrossXSIcon from "../../../../../svg/shared-icons/BrownCloseCrossXSIcon";
import OrderBoxIcon from "../../../../../svg/shared-icons/OrderBoxIcon";
import CharacterIcon from "../../../../../svg/shared-icons/CharacterIcon";
import SuccessfulOrderMessageIcon from "../../../../../svg/shared-icons/SuccessfulOrderMessageIcon";
import { useDispatch } from 'react-redux';
import
{
    setShowSuccessfulOrerAlert
} from '../../../features/order/userOrderSlice';

const SuccessfulCheckout = () =>
{
    const dispatch = useDispatch();

    const lg = useMediaQuery('(min-width: 1200px)');

    return (
        <Grid
            container
            item
            lg={5}
            md={5}
            sm={7.3}
            xs={11}
            sx={{
                position: 'absolute',

                borderRadius: '26px',
                boxShadow: '1px 1px 8px 0px rgba(0, 0, 0, 0.08)',

            }}
            bgcolor={'#F6F6F6'}
        >
            <Grid
                container
                item
                sx={{
                    height: {
                        lg: '10%'
                    },
                    padding: {
                        lg: '2% 4% 1% 0%',
                        xs: '2% 5% 2% 0%'
                    }
                }}
                justifyContent={'right'}
            >
                <span
                    style={{
                        cursor: 'pointer'
                    }}
                    onClick={() =>
                    {
                        dispatch(setShowSuccessfulOrerAlert(false))
                    }}
                >
                    {lg ? <BrownCloseCrossIcon /> : <BrownCloseCrossXSIcon />}</span>
            </Grid>

            <Grid
                item
                container
                lg={12}
                xs={12}
                sx={{
                    height: {
                        lg: '30%'
                    },
                    padding: {
                        xs: '0px 40px 12px 45px'
                    }
                }}
            >
                <Grid
                    container
                    item
                    width={'100%'}
                    justifyContent={lg ? 'center' : 'left'}
                >
                    <MainSiteLogoWithText />
                </Grid>

                <Grid
                    container
                    item
                    width={'100%'}
                    justifyContent={lg ? 'center' : 'left'}
                >
                    <Typography
                        sx={{
                            textAlign: lg ? 'center' : 'left',
                        }}
                        className={lg ? 'brown1-400-20 unselectable' : ' brown1-400-20 unselectable'}
                    >Дякуємо!<br /> Замовлення прийнято.</Typography>
                </Grid>
            </Grid>

            <Grid
                container
                item
                direction={'row'}

                sx={{
                    marginLeft: {
                        lg: '30%',
                        sm: '25%',
                        xs: '30%',
                    },
                    height: lg ? '60%' : '',
                    paddingBottom: {
                        xs: '12px'
                    }
                }}
                alignItems={'end'}
            >
                {
                    lg ? <Stack

                        direction="column"
                        alignItems="center"
                        spacing={2}
                    >
                        <SuccessfulOrderMessageIcon />
                        <OrderBoxIcon />
                    </Stack> : <OrderBoxIcon />
                }

                <Grid>
                        <CharacterIcon />
                </Grid>

            </Grid>
        </Grid>
    )
}

export default SuccessfulCheckout;