import React, { useState } from 'react';
import
{
    Grid,
    Typography,
} from '@mui/material'
import DeliveryDataRow from './DeliveryDataRow';
import CustomRadio from '../../../../../services/custom-inputs/CutomRadio';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import
{
    setCity,
    setDepartment,
    setErrorList,
} from '../../../features/order/userOrderSlice';

const citiesInit = [
    "Івано-Франківськ", "Вінниця", "Дніпро", "Житомир",
    "Запоріжжя", "Київ", "Кропивницький", "Луцьк", "Львів",
    "Миколаїв", "Одеса", "Полатава", "Рівне", "Суми", "Тернопіль",
    "Ужгород", "Харків", "Херсон", "Хмельницький", "Черкаси",
    "Чернівці", "Чернігів"
]

const DeliveryData = () =>
{
    const dispatch = useDispatch();

    const {
        city,
        department,

        errorList,
    } = useSelector(state => state.userOrder);

    const [deliveryCompany, setDeliveryCompany] = useState(1);
    const [cities, setCities] = useState(citiesInit)
    const [departments, setDetartments] = useState([]);

    const selectCity = async (value) =>
    {
        if (value.length >= 3)
        {
            const resp = await axios.post('https://api.novaposhta.ua/v2.0/json/', {
                apiKey: "bfb9c83d670e006bf220a681e0d085f7",
                modelName: "Address",
                calledMethod: "getCities",
                methodProperties: {
                    FindByString: value,
                }
            })

            let c = [];
            for (let i = 0; i < resp.data.data.length; i++)
            {
                c.push(resp.data.data[i].Description);
            }
            setCities(c);

            const updatedErrorList = [...errorList];
            updatedErrorList[4] = false;
            dispatch(setErrorList(updatedErrorList));
            dispatch(setDepartment(''))
        }
        else
        {
            if (value.length <= 2 && value.length !== 0)
            {
                let c = [];

                if (cities.length === 0)
                {
                    c = citiesInit.filter(c => c.includes(value));
                }
                else
                    c = cities.filter(c => c.includes(value));
                setCities(c)
            }
            else
            {
                setCities(citiesInit)
                setDetartments([])
            }
        }

        dispatch(setCity(value))
    }

    const selectDepartment = async (department) =>
    {
        if (city.length > 0)
        {
            const dep = await axios.post('https://api.novaposhta.ua/v2.0/json/',
                {
                    apiKey: "bfb9c83d670e006bf220a681e0d085f7",
                    modelName: "Address",
                    calledMethod: "getWarehouses",
                    "methodProperties": {
                        CityName: city,
                        Language: "UA",
                        TypeOfWarehouseRef: "841339c7-591a-42e2-8233-7a0a00f0ed6f"
                    }
                })

            let d = [];

            for (let i = 0; i < dep.data.data.length; i++)
            {
                d.push(dep.data.data[i].Description)
            }
            setDetartments(d)

            dispatch(setDepartment(department))
            const updatedErrorList = [...errorList];
            updatedErrorList[5] = false;
            dispatch(setErrorList(updatedErrorList));
        }
    }

    return (
        <Grid
            container
            item
            xs={12}
            gap={'34px'}
            sx={{
                borderBottom: {
                    md: 'none',
                    xs: '1px solid #DAD1D0',
                },
                paddingBottom: {
                    md: '0px',
                    xs: '15px'
                }
            }}
        >
            <Grid
                container
                item
                xs={12}
                direction={'row'}
                sx={{
                    padding: {
                        lg: '0px 0px 46px 15px',
                        md: '0px 0px 6px 15px',
                        sm: '20px 0px 20px 15px',
                        xs: '10px 0px 0px 0px',
                    },
                }}
            >
                <Grid
                    container
                    item
                    md={4}
                    xs={6}
                    gap={1}
                    alignItems={'center'}
                >
                    <CustomRadio
                        name="delivery-company"
                        checked={deliveryCompany === 1}
                        onChange={() => { setDeliveryCompany(1) }}
                        disabled={false}
                    />
                    <Typography
                        className={'t2-medium-500-brown2 unselectable'}
                    >Нова пошта</Typography>
                </Grid>

                <Grid
                    container
                    item
                    md={4}
                    xs={6}
                    gap={1}
                    alignItems={'center'}
                    style={{ opacity: 0.5 }}
                >
                    <CustomRadio
                        name="delivery-company"
                        checked={deliveryCompany === 2}
                        onChange={() => { setDeliveryCompany(2) }}
                        disabled={true}
                    />
                    <Typography
                        className={'t2-medium-500-brown2 unselectable'}
                    >Укрпошта</Typography>
                </Grid>

            </Grid>

            <DeliveryDataRow
                title={'Місто'}
                options={cities}
                onInput={selectCity}
                outsideValue={city}
                isError={errorList[4]}
            />

            <DeliveryDataRow
                title={'Відділення'}
                options={departments}
                onInput={selectDepartment}
                outsideValue={department}
                isError={errorList[5]}
            />

        </Grid>
    )
}

export default DeliveryData;