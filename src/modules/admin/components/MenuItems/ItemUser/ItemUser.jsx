import React, { useState, useEffect, useMemo } from 'react';


//#region Styles
import 'bootstrap/dist/css/bootstrap.min.css';
import './ItemUserStyle.css';
//#endregion

//#region  Services
import CustomPagination from '../../../../../services/pagination/CustomPagination';
import AdminSearch from '../../../../../services/search/adminSearch';
//#endregion

//#region Redux
import { useSelector, useDispatch } from 'react-redux';
import { getUsers, getFilteredUsers } from '../../../features/adminUsers/adminUsersSlice';
//#endregion

import LoadingIcon from '../../../../../svg/animations/LoadingAnimation.gif';

//#region Router
import { useNavigate } from "react-router-dom";
//#endregion

const PageSize = 12;

const ItemUser = () =>
{
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [inputValue, setInputValue] = useState('');
    const [currentPage, setCurrentPage] = useState(1);

    const { loading, users } = useSelector((state) => state.adminUsers)
    const filteredData = useSelector(state => getFilteredUsers(state, inputValue));

    useEffect(() =>
    {
        dispatch(getUsers())
    }, [])

    const filteredAndPaginatedData = useMemo(() =>
    {
        const firstPageIndex = (currentPage - 1) * PageSize;
        const lastPageIndex = firstPageIndex + PageSize;
        return filteredData.slice(firstPageIndex, lastPageIndex);
    }, [currentPage, inputValue, users]);


    if (loading)
    {
        return <img style={{
            width: '100px',
            height: '100px',
            position: 'absolute',
            alignSelf: 'center',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
        }} src={LoadingIcon} alt="loading" />
    }

    return (

        <div className='user-main'>

            <AdminSearch
                onSearchChange={value =>
                {
                    setInputValue(value);
                    setCurrentPage(1);
                }}
            />

            <div className='user-count'>
                <label><span
                    style={{
                        'font': 'Montserrat Alternates',
                        'fontWeight': '500',
                        'fontSize': '20px',

                    }}
                >({filteredData.length})</span> користувачів</label>
            </div>

            <div className='user-body' >
                <div className='user-table'>
                    <div className='table-head'>
                        <label>Прізвище</label>
                        <label>Ім'я</label>
                        <label>Номер телефону</label>
                        <label>E-mail</label>
                        <label>К-ть замовлень</label>
                    </div>

                    {filteredAndPaginatedData.map((user, index) => (
                        <div className='div-row' key={user.id}

                        >
                            <div className={`table-row ${index % 2 === 0 ? 'even-row' : ''}`}
                                onClick={async event => { navigate(`user/${user.id}`); }}
                                style={{
                                    'borderRadius': ((((index + 1) % PageSize) === 0) || filteredAndPaginatedData.length === index + 1) ? '0px 0px 10px 10px' : '0px'
                                }}>
                                <label>{user.surname}</label>
                                <label>{user.name}</label>
                                <label>{user.phoneNumber}</label>
                                <label>{user.email}</label>
                                <label>{user.countOfOrders}</label>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className='pag'>
                <CustomPagination
                    className="pagination-bar"
                    currentPage={currentPage}
                    totalCount={filteredData.length}
                    pageSize={PageSize}
                    onPageChange={page => setCurrentPage(page)} />
            </div>
        </div>
    );
};

export default ItemUser;