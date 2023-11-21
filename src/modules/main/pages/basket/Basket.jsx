import React, { useState, useEffect } from 'react';
import Header from '../../components/header/Header';
//import data from './data';
//import { useSelector } from 'react-redux/es/hooks/useSelector';
import { FaTrashAlt } from "react-icons/fa";
import { Container, Table, Button, Stack } from "@mui/material";
import { useDispatch, useSelector } from "react-redux"
//import styles from "src/modules/main/components/basket/BasketStyle.css"
// import
// {
//     removeItem,
//     updateQuantity
// } from "src/services/slice/cartSlice.js"

const Basket = () =>
{

    //Cart Item
    const CartItem = ({ data }) =>
    {
        const dispatch = useDispatch()

        const [quantity, setQuantity] = useState(data?.quantity)
        const [totalPrice, setTotalPrice] = useState(+data?.price * +data?.quantity)

        const handleChange = (e) =>
        {
            const value = parseInt(e.target.value) > 0 ? parseInt(e.target.value) : 1
            setQuantity(value)
        }

        const handleRemove = () =>
        {
            //dispatch(removeItem({ id: data?.id }))
        }

        useEffect(() =>
        {
            setTotalPrice(data?.price * quantity)
            //dispatch(updateQuantity({ id: data?.id, quantity }))
        }, [quantity, data?.price, data?.id, dispatch])

        return (
            <tr>
                <td style={{ maxWidth: 450, textAlign: 'left' }}>
                    <div className="d-flex align-items-center">
                        <img src={data.imageUrl} alt="" style={{ width: 100 }} />
                        <p style={{ marginLeft: 10 }}>{data.name}</p>
                    </div>
                </td>
                <td >
                    {data.price}$
                </td>
                <td>
                    <div className="d-flex align-items-center justify-content-center">
                        <button onClick={() =>
                        {
                            if (quantity > 1)
                            {
                                setQuantity(pre => pre - 1)
                            }
                        }}>-</button>
                        <input type="number" value={quantity} onChange={handleChange} />
                        <button onClick={() => setQuantity(pre => pre + 1)}>+</button>
                    </div>
                </td>
                <td style={{ fontWeight: 'bold' }}>
                    {totalPrice}$
                </td>
                <td>
                    <Button variant="danger" onClick={handleRemove}><FaTrashAlt /></Button>
                </td>
            </tr>
        )
    }

    //-----------------------------------------------------------------------------------
    const OrdersGridView = () =>
    {
        const cart = useSelector(state => state.cart)

        return (
            <Container>
                <Stack direction={'row'}>
                    {cart?.list && cart?.list?.length > 0 ? (
                        <Table hover>
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Price</th>
                                    <th>Quantity</th>
                                    <th>Total</th>
                                </tr>
                            </thead>
                            <tbody style={{ verticalAlign: 'middle' }}>
                                {
                                    cart?.list.map(item =>
                                    {
                                        return (
                                            <CartItem
                                                key={item?.id}
                                                data={item}
                                            />
                                        )
                                    })
                                }
                                <tr style={{ fontSize: 20, textAlign: 'right' }}>
                                    <td colSpan={3}>Total:</td>
                                    <td colSpan={1}>{cart?.total}$</td>
                                    <td></td>
                                </tr>
                            </tbody>
                        </Table>
                    ) : <h1>Empty</h1>}
                </Stack>
            </Container>
        )
    }


    return (
        <div>
            <Header />
            <OrdersGridView />
        </div>
    )

}
export default Basket;