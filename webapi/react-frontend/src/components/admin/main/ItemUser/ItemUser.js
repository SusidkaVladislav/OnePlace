import React, { useState, useMemo } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './ItemUserStyle.css';
import SearchIcon from './svg/SearchIcon';
import BellIcon from './svg/BellIcon';
import CustomPagination from './CustomPagination';
import data from './data/mock-data.json';
import BackIcon from './svg/BackIcon';
import RemoveIcon from './svg/RemoveIcon';

let PageSize = 12;
const ItemUser =({size})=>{
  const divStyle = {
    marginLeft: `${size}`,
  };

  const [currentPage, setCurrentPage] = useState(1);
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [selectedRadio, setSelectedRadio] = useState('Last_Name'); // Default to the first radio
  const [clickedUser, setClickedUser] = useState(null);
  const [isUserDivVisible, setIsUserDivVisible] = useState(false);
  const [isConfirmDialogVisible, setIsConfirmDialogVisible] = useState(false);
  const [isPleaseWaitVisible, setIsPleaseWaitVisible] = useState(false);

  const handleIconHover = () => {
    setIsHovered(true);
    setIsFocused(true);
  };

  const handleIconLeave = () => {
    setIsHovered(false);
    setIsFocused(false);
  };

  const handleInputFocus = () => {
    setIsFocused(true);
  };

  const handleInputBlur = () => {
    setIsFocused(false);
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
    setCurrentPage(1);
  };

  const handleRadioChange = (event) => {
    setSelectedRadio(event.target.value);
  };

  const handleRowClick = (userId) => {
    const user = data.find((user) => user.id === userId);
    setClickedUser(user);
    setIsUserDivVisible(true);
  };

  const handleChecked = (userId) => {
    const user = data.find((user) => user.id === userId);
    

  };
  const handleCheckedAll=()=>{

  }
  const handleReviewCount=(userId)=>
  {

  }
  const handleBackToMain = () => {
    setClickedUser(null);
    setIsUserDivVisible(false);
  };

  const handleRemoveButtonClick = () => {
    setIsConfirmDialogVisible(true);
  };

  const handleConfirmDelete = () => {
    // Perform the delete operation here
    setIsConfirmDialogVisible(false);
    setIsPleaseWaitVisible(true); // Show "Please wait" window
    setTimeout(() => {
      setClickedUser(null);
      setIsUserDivVisible(false);
    }, 3000); // 5000 milliseconds = 5 seconds
  };

  const handleCancelDelete = () => {
    setIsConfirmDialogVisible(false);
  };

  const filteredTableData = data.filter((user) => {
    const searchData = inputValue.toLowerCase();
    const userFieldValue = user[selectedRadio.toLowerCase()].toLowerCase();
    return userFieldValue.includes(searchData);
  });

  const filteredAndPaginatedData = useMemo(() => {
    const searchData = inputValue.toLowerCase();
    const filteredData = data.filter((user) => {
      const userFieldValue = user[selectedRadio.toLowerCase()].toLowerCase();
      return userFieldValue.includes(searchData);
    });

    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return filteredData.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, inputValue, selectedRadio]);
  


  return (
      <div style={divStyle}>
        <div className='user-main' style={{ display: isUserDivVisible ? 'none' : 'block' }}>
          <div className="search-div">
            <div
                className={`search-button ${isHovered ? 'hovered' : ''}`}
                onMouseEnter={handleIconHover}
                onMouseLeave={handleIconLeave}
              > <SearchIcon />
            </div>
            <input
                className={`search-field ${isFocused ? 'focused' : ''}`}
                type="text"
                placeholder="Search..."
                onFocus={handleInputFocus}
                onBlur={handleInputBlur}
                onChange={handleInputChange}
                value={inputValue}/>
            <div className='radio-group'>
                <input type="radio" name="searching" value="Last_Name" id="last_name" checked={selectedRadio === 'Last_Name'}
                onChange={handleRadioChange} />
                <label htmlFor="last_name">Прізвище</label>
                <input type="radio" name="searching" value="First_Name" id="first_name" onChange={handleRadioChange} />
                <label htmlFor="first_name">Ім'я</label>
                <input type="radio" name="searching" value="Phone" id="phone" onChange={handleRadioChange} />
                <label htmlFor="phone">Телефон</label>
                <input type="radio" name="searching" value="Email" id="email" onChange={handleRadioChange} />
                <label htmlFor="email">E-mail</label>
            </div>
          </div>
          <div className='user-bell-icon'>
              <BellIcon/>
          </div>
          <div className='user-count'>
              <label>({data.length}) користувачів</label>
          </div>
          <div className='user-body' >
              <div className='user-table'>
                <div className='table-head'>
                      <div className='c1'>Ім'я</div>
                      <div className='c2'>Прізвище</div>
                      <div className='c3'>Номер телефону</div>
                      <div className='c4'>Email</div>
                      <div className='c5'>К-ть угод</div>
                      <div className='c6'>Всі</div>
                      <div className='c7-h'> <input type="checkbox" onChange={handleCheckedAll} /></div>
                </div>
                {filteredAndPaginatedData.map((user,index)=>(   
                    <div className='div-row'>
                      <div key={user.id} className={`table-row ${index % 2 === 0 ? 'even-row' : ''}`}
                          onClick={() => handleRowClick(user.id)}>
                        <div className='c1'>{user.first_name}</div>
                        <div className='c2'>{user.last_name}</div>
                        <div className='c3'>{user.phone}</div>
                        <div className='c4'>{user.email}</div>
                        <div className='c5'></div>
                        <div className='c6'></div>
                      </div>
                      <div className='c7'><input type="checkbox" id={user.id} onChange={handleChecked(user.id)} /></div>
                    </div>
                    
                  )
                )}
              </div>
          </div>
          <div className='pag'>
                <CustomPagination
                className="pagination-bar"
                currentPage={currentPage}
                totalCount={inputValue!==''?filteredTableData.length:data.length}
                pageSize={PageSize}
                onPageChange={page => setCurrentPage(page)}/>
          </div>
        </div>
        <div className='user-div' style={{ display: isUserDivVisible ? 'block' : 'none' }}>
          <div className='back-div'>
            <div className='user-img'></div>
              {clickedUser !==null ? (
                <label className='user-name'>{clickedUser.first_name} {clickedUser.last_name}
                <label className='remove-button' onClick={handleRemoveButtonClick}> <RemoveIcon/></label></label>
              ) : (<label className='user-name'>No User Selected</label>)}
            <label className='back-button' onClick={handleBackToMain} > <BackIcon/></label>
          </div>
          <div className='user-div-info'>
            <div className='info-body'>
              <div className='surname-div'>
                <label className='surname-label-one'>Прізвище</label>
                <div className='surname-label'>
                  <label>{clickedUser !==null ? clickedUser.last_name : 'NotFound'}</label>
                </div>
              </div>
              <div className='name-div'>
                <label className='name-label-one'>Ім'я</label>
                <div className='name-label'>
                  <label>{clickedUser !==null ? clickedUser.first_name : 'NotFound'}</label>
                </div>
              </div>
              <div className='phone-div'>
                <label className='phone-label-one'>Номер телефону</label>
                <div className='phone-label'>
                  <label>{clickedUser !==null ? clickedUser.phone : 'NotFound'}</label>
                </div>
              </div>
              <div className='email-div'>
                <label className='email-label-one'>Email</label>
                <div className='email-label'>
                  <label>{clickedUser !==null ? clickedUser.email : 'NotFound'}</label>
                </div>
              </div>
            </div>
            <div className='order-div'>
              <div className='order-label'>
                <label>Замовлення </label>
              </div>
            </div>
          </div>
          <div className='review-div'>
            <div className='review-label'>
              <label>Відгуки </label><label className='review-count' onClick={handleReviewCount(3)}> 12</label>
            </div>
          </div>
            {isConfirmDialogVisible && (
              <div className='modal-backdrop'>
                <div className='confirm-dialog'>
                  <p>Ви впевнені,що бажаєте видалити запис?</p>
                  <label className='confirm-buttom' onClick={handleConfirmDelete}>Так</label>
                  <label className='confirm-buttom' onClick={handleCancelDelete}>Ні</label>
                </div>
              </div>
            )}

            {isPleaseWaitVisible && (
              <div className='modal-backdrop'>
                <div className='please-wait-dialog'>
                  <p>Please wait...</p>
                  {/* You can add an animation or loading indicator here */}
                </div>
              </div>
            )}
        </div>
      </div>
    );
  
};

export default ItemUser;