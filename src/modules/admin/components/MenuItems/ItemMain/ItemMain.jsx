import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './ItemMainStyle.css';
import WhiteSmallToBottomArrow from '../../../../../svg/arrows/WhiteSmallToBottomArrow';
import AdminSearch from '../../../../../services/search//adminSearch';
import InfoCard from './main-components/InfoCard';

import { useNavigate } from 'react-router-dom'

//#region Redux
import { useDispatch, useSelector } from 'react-redux';
import
{
  getOrdersByDate,
  getFilteredOrders,
} from '../../../features/adminOrders/adminOrdersSlice.js';
//#endregion

import
{
  getUsersCount,
} from '../../../features/adminUsers/adminUsersSlice.js';

//#region Icons
import UsersIcon from '../../../../../svg/shared-icons/UsersIcon';
import OrdersIcon from '../../../../../svg/shared-icons/OrdersIcon';
import DollarIcon from '../../../../../svg/shared-icons/DollarIcon';
//#endregion
import LoadinAnimation from '../../../../../common-elements/loading/LoadingAnimation';

const BLUE_COLOR = '#0A3D58';
const WHITE_COLOR = '#E9ECEC';

const ItemMain = () =>
{
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [iconUserColor, setIconUserColor] = useState(BLUE_COLOR);
  const [iconOrderColor, setIconOrderColor] = useState(BLUE_COLOR);
  const [iconDollarColor, setIconDollarColor] = useState(BLUE_COLOR);

  const [isOpen, setIsOpen] = useState(false);
  const options = ['Сьогодні', 'Тиждень', 'Місяць'];
  const today = new Date();
  const oneWeekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
  const oneMonthAgo = new Date(today.getFullYear(), today.getMonth() - 1, today.getDate());
  const optionsValues = [today, oneWeekAgo, oneMonthAgo];

  const [selectedItem, setSelectedItem] = useState(options[0]);
  const [inputValue, setInputValue] = useState('');

  const {
    getOrdersByDateLoading,
    orders,
  } = useSelector(state => state.adminOrders);

  const {
    usersCountByDate,
    getUsersCountLoading,
  } = useSelector(state => state.adminUsers);

  const filteredData = useSelector(state => getFilteredOrders(state, inputValue));

  useEffect(() =>
  {
    dispatch(getOrdersByDate(today));
    dispatch(getUsersCount(today))
  }, [])

  const handleToggleDropdown = () =>
  {
    setIsOpen(!isOpen);
  };

  const handleItemClick = async (item, value) =>
  {
    setSelectedItem(item);
    await dispatch(getOrdersByDate(value));
    await dispatch(getUsersCount(value));
    setIsOpen(false);
  };

  if (getOrdersByDateLoading)
  {
    return <LoadinAnimation />
  }

  if (getUsersCountLoading)
  {
    return <LoadinAnimation />
  }
  return (
    <div className='main-body'>


      <div className='main-body-header' >
        <AdminSearch
          onSearchChange={value =>
          {
            setInputValue(value);
          }}
        />
        <div
          onClick={handleToggleDropdown}>
          <div className={`dropdown-header ${isOpen ? 'open' : ''}`}>
            <label>{selectedItem}</label>
            <label><WhiteSmallToBottomArrow /></label>
          </div>
          {
            isOpen && (
              <div className="dropdown-list">
                {
                  options.map((item, index) => (
                    <label
                      key={index}
                      className={`dropdown-item ${selectedItem === item ? 'selected' : ''}`}
                      onClick={() => handleItemClick(item, optionsValues[index])}>
                      {item}
                    </label>
                  ))
                }
              </div>
            )
          }
        </div>
      </div>

      <div className='info-cards-container'>
        <InfoCard
          onMouseOver={() => { setIconUserColor(WHITE_COLOR) }}
          onMouseLeave={() => { setIconUserColor(BLUE_COLOR) }}
          text={'Користувачів'}
          icon={<UsersIcon color={iconUserColor} />}
          value={'+' + usersCountByDate}
          color={iconUserColor}
        />

        <InfoCard
          onMouseOver={() => { setIconOrderColor(WHITE_COLOR) }}
          onMouseLeave={() => { setIconOrderColor(BLUE_COLOR) }}
          text={'Замовлень'}
          icon={<OrdersIcon color={iconOrderColor} />}
          value={'+' + orders.length}
          color={iconOrderColor}
        />

        <InfoCard
          onMouseOver={() => { setIconDollarColor(WHITE_COLOR) }}
          onMouseLeave={() => { setIconDollarColor(BLUE_COLOR) }}
          text={'Прибуток'}
          icon={<DollarIcon color={iconDollarColor} />}
          value={'+' + orders.reduce((accumulator, currentValue) =>
            accumulator + (currentValue?.paymentStatus === 'Approved' ? currentValue.totalPrice : 0), 0)
          }
          color={iconDollarColor}
        />
      </div>

      <div className='main-body-orders-container'>
        <label>Останні замовлення</label>

        <div className='main-body-orders-table-header'>
          <label>Ім'я</label>
          <label>Сума</label>
          <label>Оплата</label>
          <label>Статус</label>
        </div>

        <div className='main-body-orders-table-body' id='scrollbar-style-1'>
          {
            filteredData.map((order, index) =>
            {
              return (
                <div className='main-body-orders-table-row' key={index}
                  onClick={() =>
                  {
                    navigate('/admin/main/orders/order/' + order.id)
                  }}
                >
                  <label>{order.initials}</label>
                  <label>{order.totalPrice} грн.</label>
                  <label>
                    {
                      order.paymentStatus === 'Pending' ? 'Очікується оплата'
                        : order.paymentStatus === 'Approved' ? 'Оплачено' : 'Скасовано'
                    }
                  </label>
                  <label
                    style={{
                      'backgroundColor': order.orderStatus === 'Registered' ? '#DA8D33' :
                        order.orderStatus === 'Processing' ? '#6B81F0' : order.orderStatus === 'Shipped' ? '#C4A8D3' :
                          order.orderStatus === 'Done' ? '#01830E' : '#B31D21',
                      'color': '#F6F6F6',
                      'borderRadius': '10px',
                      'paddingLeft': '10px',
                    }}
                  >
                    {
                      order.orderStatus === 'Registered' ? 'Нове' : order.orderStatus === 'Processing' ? 'Очікування' :
                        order.orderStatus === 'Shipped' ? 'Відправлено' : order.orderStatus === 'Done' ? 'Виконано' : 'Анульовано'
                    }
                  </label>
                </div>
              )
            })
          }
        </div>
      </div>
    </div>
  );
};

export default ItemMain;