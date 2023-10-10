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
import { fetchUsers, getFilteredUsers } from '../../../features/adminUsers/adminUsersSlice';
//#endregion

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
        dispatch(fetchUsers())
    }, [])

    // const [count, setCount] = useState(0);
    // const [countReviews, setCountReviews] = useState([]);
    // const [selectedReview, setSelectedReview] = useState(null);
    //const [reviewsInit, setReviewsInit] = useState(reviewData);

    const filteredAndPaginatedData = useMemo(() =>
    {
        const firstPageIndex = (currentPage - 1) * PageSize;
        const lastPageIndex = firstPageIndex + PageSize;
        return filteredData.slice(firstPageIndex, lastPageIndex);
    }, [currentPage, inputValue, users]);


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
                                    onClick={async event => { navigate(`user/${user.id}`); }}>
                                    <div className='c1'>{user.name}</div>
                                    <div className='c2'>{user.surname}</div>
                                    <div className='c3'>{user.phoneNumber}</div>
                                    <div className='c4'>{user.email}</div>
                                    <div className='c5'>{user.countOfOrders}</div>
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