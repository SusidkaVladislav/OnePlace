import React from 'react';
import
{
    Grid,
    useMediaQuery,
    Typography,
} from '@mui/material'
import MasterCardIcon from '../../../../svg/shared-icons/MasterCardIcon';
import './BankCardStyles.css'
import InfoIcon from '../../../../svg/shared-icons/InfoIcon';

const BankCard = (props) =>
{
    const xs = useMediaQuery('(min-width: 0px)');
    const sm = useMediaQuery('(min-width: 600px)');
    const md = useMediaQuery('(min-width: 900px)');
    const lg = useMediaQuery('(min-width: 1200px)');

    const {

    } = props;


    return (
        <Grid
            container
            item
            lg={12}
            height={{
                lg: '156px',
            }}
            gap={{
                lg: 5
            }}
            justifyContent={'center'}
        >

            <Grid
                container
                item
                lg={5}
                bgcolor='#3D393F'
                sx={{
                    borderRadius: '12px'
                }}
                padding={{
                    lg: '18px 14px 18px 14px'
                }}
            >
                <Grid
                    container
                    width='100%'
                    height='20%'
                    alignItems={'center'}
                    justifyContent={'space-between'}
                >
                    <Typography
                        sx={{
                            color: '#D3D3D3',
                            textAlign: 'center',
                            fontFamily: 'JejuGothic',
                            fontSize: '12px',
                            fontStyle: 'normal',
                            fontWeight: '400',
                            lineHeight: '130%',
                        }}
                        className='unselectable'
                    >Credit Card</Typography>
                    <MasterCardIcon />
                </Grid>

                <Grid
                    container
                    width='100%'
                    height='35%'
                >
                    <Typography
                        className={lg ? 't2-medium-blue3 unselectable' : ''}
                    >
                        Номер картки
                    </Typography>
                    <input
                        type='text'
                        className={lg ? 'h5-bold-brown2 number-input' : 'number-input'}
                        placeholder='XXXX XXXX XXXX XXXX'
                        style={{
                            height: lg ? '24px' : '',
                            width: lg ? '75%' : '',
                            padding: lg ? '8px' : ''
                        }}
                    />
                </Grid>

                <Grid
                    container
                    width='100%'
                    height='35%'

                >
                    <Typography
                        className={lg ? 't2-medium-blue3 unselectable' : ''}
                    >
                        Термін дії
                    </Typography>
                    <Grid
                        container
                        alignItems={'center'}
                        gap={1}
                    >
                        <input
                            style={{
                                height: lg ? '24px' : '',
                                width: lg ? '23%' : '',
                                padding: lg ? '8px' : ''
                            }}
                            className={lg ? 'h5-bold-brown2 number-input unselectable' : 'number-input unselectable'}
                            placeholder='ММ'
                        />
                        <Typography
                            sx={{
                                fontWeight: 500,
                            }}
                            className={lg ? 't2-medium-blue3 unselectable' : 'unselectable'}
                        >/</Typography>
                        <input
                            style={{
                                height: lg ? '24px' : '',
                                width: lg ? '23%' : '',
                                padding: lg ? '8px' : ''
                            }}
                            className={lg ? 'h5-bold-brown2 number-input unselectable' : 'number-input unselectable'}
                            placeholder='РР'
                            unselectable
                        />
                    </Grid>
                </Grid>
            </Grid >

            <Grid
                container
                item
                lg={5}
                bgcolor='#3D393F'
                sx={{
                    borderRadius: '12px',
                    paddingTop: '8%'
                }}
            >
                <Grid
                    bgcolor='#E9ECEC'
                    height={{
                        lg: '24px'
                    }}
                    width={'100%'}
                />

                <Grid
                    container
                    height='60%'
                >
                    <Grid
                        container
                        direction={'column'}
                        padding={{
                            lg: '3px 10px 10px 10px'
                        }}
                        gap={0.5}
                    >
                        <Typography
                            className={lg ? 't2-medium-blue3 unselectable' : ''}
                            alignItems={'center'}
                        >
                            CVV <InfoIcon />
                        </Typography>
                        <input
                            style={{
                                height: lg ? '24px' : '',
                                width: lg ? '23%' : '',
                                padding: lg ? '8px' : ''
                            }}
                            className={lg ? 'h5-bold-brown2 number-input unselectable' : 'number-input unselectable'}
                        />

                    </Grid>
                </Grid>


            </Grid>

        </Grid >
    )
}

export default BankCard