import React from 'react';
import { useNavigate } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import
{
    deleteProduct,
    getAllProducts,
    hideSuccessfulAlert,
    hideUnsuccessfulAlert,
} from '../../../../features/adminProduct/adminProductSlice';

import EditIcon from '../../../../../../svg/shared-icons/EditIcon';
import LoadingAnimation from '../../../../../../common-elements/loading/LoadingAnimation';
import CustomDelete from "../../../../../../services/delete/CustomDelete";
import './ItemProductRowStyles.css';

const ItemProductRow = props =>
{
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const {
        picture,
        name,
        code,
        price,
        color,
        quantity,
        productId,
    } = props;

    const {
        category,
        deleteProductLoading,
        getAllProductsLoading,
    } = useSelector(state => state.adminProducts);

    const deleteHandler = async (isDelete, id) =>
    {
        if (isDelete)
        {
            await dispatch(deleteProduct(id));
            await dispatch(getAllProducts(category.id));
            setTimeout(() =>
            {
                dispatch(hideSuccessfulAlert())
            }, 1000);
            setTimeout(() =>
            {
                dispatch(hideUnsuccessfulAlert())
            }, 2000);
        }
    }


    if (deleteProductLoading)
    {
        return <LoadingAnimation />
    }
    if (getAllProductsLoading)
    {
        return <LoadingAnimation />
    }
    return (
        <div className='item-product-row-container'>
            <img className='item-product-row-img' src={picture} />
            <label>{name}</label>
            <label>{code}</label>
            <label>{price + ' ₴'}</label>
            <label>{color}</label>
            <label>{quantity + ' одн.'}</label>
            <label
                style={{
                    color: quantity >= 1 ? 'green' : 'red'
                }}
            >{quantity > 0 ? 'В наявності' : 'Немає'}</label>

            <span
                onClick={() =>
                {
                    navigate('product/' + productId)
                }}
            ><EditIcon /></span>

            <span>
                <CustomDelete
                    onDelete={(value) => { deleteHandler(value, productId) }}
                />
            </span>
        </div>
    )
}

export default ItemProductRow;