import React, { useState, useEffect, useMemo } from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import './ItemUserStyle.css';

import CustomPagination from '../../../features/pagination/CustomPagination';

import { useSelector, useDispatch } from 'react-redux';
import { fetchUsers, getFilteredUsers } from '../../../features/adminUsers/adminUsersSlice';

import AdminSearch from '../../../features/search/adminSearch';

import { useNavigate } from "react-router-dom";

const PageSize = 10;

const ItemUser = () =>
{
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [inputValue, setInputValue] = useState('');
    const [currentPage, setCurrentPage] = useState(1);

    const { loading, commonUsersInfo } = useSelector((state) => state.adminUsers)
    const filteredData = useSelector(state => getFilteredUsers(state, inputValue));

    useEffect(() =>
    {
        dispatch(fetchUsers())
    }, [])

    // const [clickedUser, setClickedUser] = useState(null);
    // const [isConfirmDialogVisible, setIsConfirmDialogVisible] = useState(false);

    // const [count, setCount] = useState(0);
    // const [countReviews, setCountReviews] = useState([]);
    // const [selectedReview, setSelectedReview] = useState(null);
    //const [reviewsInit, setReviewsInit] = useState(reviewData);

    const handleRowClick = (userId) =>
    {
        navigate(`user/${userId}`)
        
       
        // const user = users.find((user) => user.id === userId);
        // setClickedUser(user);
        // setIsUserDivVisible(true);
        //const countOfReviews=reviewsInit.filter((review) =>review.user.id===userId);
        //console.log(countOfReviews);
        //setCountReviews(countOfReviews.length);
    };

    const filteredAndPaginatedData = useMemo(() =>
    {
        const firstPageIndex = (currentPage - 1) * PageSize;
        const lastPageIndex = firstPageIndex + PageSize;
        return filteredData.slice(firstPageIndex, lastPageIndex);
    }, [currentPage, inputValue, commonUsersInfo]);


    if (loading) return <p>Loading...</p>

    return (
        <div>

            <div className='user-main'>

                <AdminSearch
                    onSearchChange={value =>
                    {
                        setInputValue(value);
                        setCurrentPage(1);
                    }}
                />

                <div className='user-count'>
                    <label>({filteredData.length}) користувачів</label>
                </div>

                <div className='user-body' >
                    <div className='user-table'>
                        <div className='table-head'>
                            <div className='c1'>Ім'я</div>
                            <div className='c2'>Прізвище</div>
                            <div className='c3'>Номер телефону</div>
                            <div className='c4'>Email</div>
                            <div className='c5'>К-ть замовлень</div>
                        </div>

                        {filteredAndPaginatedData.map((user, index) => (
                            <div className='div-row' key={user.id}>
                                    <div className={`table-row ${index % 2 === 0 ? 'even-row' : ''}`}
                                    onClick={async event => { navigate(`user/${user.id}`); }}
                                   >
                                    <div className='c1'>{user.name}</div>
                                    <div className='c2'>{user.surname}</div>
                                    <div className='c3'>{user.phoneNumber}</div>
                                    <div className='c4'>{user.email}</div>
                                    <div className='c5'>{user.orders.length}</div>
                                </div>
                            </div>
                                
                                
                        )
                        )}
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

        </div>
    );

};

export default ItemUser;