import React from 'react';
import "./ProductCharacteristics.css";
import QuickProductNav from '../controls/QuickProductNav';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

const ProductCharacteristics = () => {
    const exampleData = [
        {name: "Тип навушників", description: "Накладні" },
        {name: "Особливості", description: "Басові" },
        {name: "Ітрерфейс під’єднання:", description: "Bluetooth" },
        {name: "Колір", description: "Black" },
        {name: "Тип кріплення", description: "3 наголов'ям" },
        {name: "Функції та можливості", description: "Multipoint" },
        {name: "Діапазон частот", description: "20 Гц-20 кГц" },
        {name: "Чутливість", description: "103,5 ДБ SPL @ 1 кГЦ 1 мВт" },
        {name: "Імпеданс, Ом", description: "32" },
        {name: "Чашки", description: "Круглі" },
        {name: "Рік випуску моделі", description: "2021" },
        {name: "Конструкція мікрофона", description: "Вбудований у корпус" },
        {name: "Спрямованість мікрофона", description: "Всеспрямований" }
    ]

    return (
        <Grid container>
            <Grid item xs={12} md={6} xl={6}>
                <TableContainer component={Paper} className='pc-container1'>
                    <Table>
                    <TableBody>
                        {exampleData.map((characteristic, index) => (
                        <TableRow key={index}>
                            <TableCell className='pc-name-cell' >{characteristic.name}</TableCell>
                            <TableCell className='pc-desc-cell' >{characteristic.description}</TableCell>
                        </TableRow>
                        ))}
                    </TableBody>
                    </Table>
                </TableContainer>
            </Grid>

            <Grid item xs={12} md={6} xl={6}>
                <QuickProductNav/>
            </Grid>
        </Grid>
    )
}

export default ProductCharacteristics;