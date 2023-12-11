import React from 'react';
import "./ProductCharacteristics.css";
import QuickProductNav from '../controls/QuickProductNav';

import
{
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableRow,
    Paper,
    Grid,
} from '@mui/material';

import { useSelector } from 'react-redux';

const ProductCharacteristics = () =>
{
    const {
        product
    } = useSelector(state => state.userProducts);

    return (
        <Grid container>
            <Grid item xs={12} md={6} xl={6}>
                <TableContainer component={Paper} className='pc-container1'>
                    <Table>
                        <TableBody>
                            {product?.descriptions?.map((characteristic, index) => (
                                <TableRow key={index}>
                                    <TableCell className='pc-name-cell' >{characteristic.name}</TableCell>
                                    <TableCell className='pc-desc-cell' >{characteristic.about}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>

            <Grid item xs={12} md={6} xl={6}>
                <QuickProductNav />
            </Grid>
        </Grid>
    )
}

export default ProductCharacteristics;