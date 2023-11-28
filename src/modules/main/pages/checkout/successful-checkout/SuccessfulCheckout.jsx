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

    const xs = useMediaQuery('(min-width: 0px)');
    const sm = useMediaQuery('(min-width: 600px)');
    const md = useMediaQuery('(min-width: 900px)');
    const lg = useMediaQuery('(min-width: 1200px)');

    return (
        <Grid
            container
            item
            lg={5}
            sx={{
                position: 'absolute',
                top: '15%',
                left: '30%',
                height: {
                    lg: '423px'
                },
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
                        lg: '2% 4% 1% 0%'
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
                ><BrownCloseCrossIcon /></span>
            </Grid>

            <Grid
                item
                container

                lg={12}
                sx={{
                    height: {
                        lg: '30%'
                    },
                }}
            >
                <Grid
                    container
                    item
                    width={'100%'}
                    justifyContent={'center'}
                >
                    <MainSiteLogoWithText />
                </Grid>
                <Grid
                    container
                    item
                    width={'100%'}
                    justifyContent={'center'}
                >
                    <Typography
                        sx={{
                            textAlign: 'center',
                        }}
                        className={lg ? 'brown1-400-20 unselectable' : 'unselectable'}
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
                    },
                    height: lg ? '60%' : ''
                }}
            >
                <Stack

                    direction="column"
                    alignItems="center"
                    spacing={2}
                >
                    <SuccessfulOrderMessageIcon />
                    <OrderBoxIcon />
                </Stack>

                <Grid>
                    <CharacterIcon />
                </Grid>

            </Grid>

        </Grid>
    )
}

export default SuccessfulCheckout;