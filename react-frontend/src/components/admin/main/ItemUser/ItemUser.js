import React, { useState,useEffect, useMemo } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './ItemUserStyle.css';
import './ReviewStyle.css';
import SearchIcon from './svg/SearchIcon';
import BellIcon from './svg/BellIcon';
import CustomPagination from './CustomPagination';
// import data from './data/mock-data.json';
import BackIcon from './svg/BackIcon';
import RemoveIcon from './svg/RemoveIcon';

let reviews=[
  {id:11,title:"Monitor black 1245",rate:4,review:"Присутній явний брак у звучанні, відчутний тріск, який не залежить від пристрою програвання. Потрібна заміна.",date:"28.02.2023 20:22",image:"https://content2.rozetka.com.ua/goods/images/big/106662744.jpg"},
  {id:21,title:"Headfones black 3245",rate:3,review:"Відсутні будь-які дефекти",date:"15.06.2023 10:22",image:"https://content2.rozetka.com.ua/goods/images/big/172266668.jpg"},
  {id:31,title:"Bluetooth speaker olive 3578",rate:5,review:"Відсутні будь-які дефекти",date:"10.10.2023 15:22",image:"https://img.moyo.ua/img/products/4942/96_600.jpg?1693298050"}
];

let PageSize = 12;
const ItemUser =({size})=>{
  const divStyle = {
    marginLeft: `${size}`,
  };

  const [currentPage, setCurrentPage] = useState(1);
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [selectedRadio, setSelectedRadio] = useState('surname'); // Default to the first radio
  const [clickedUser, setClickedUser] = useState(null);
  const [isUserDivVisible, setIsUserDivVisible] = useState(false);
  const [isConfirmDialogVisible, setIsConfirmDialogVisible] = useState(false);
  const [users, setUsers] = useState([]);

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
    const user = users.find((user) => user.id === userId);
    setClickedUser(user);
    setIsUserDivVisible(true);
  };

  const handleChecked = (userId) => {
    //const user = users.find((user) => user.id === userId);
    

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
    
      setClickedUser(null);
      setIsUserDivVisible(false);
  };

  const handleCancelDelete = () => {
    setIsConfirmDialogVisible(false);
  };



  const filteredTableData = users.filter((user) => {
    const searchData = inputValue.toLowerCase();
    const userFieldValue = user[selectedRadio]?.toLowerCase()||'';
    return userFieldValue.includes(searchData);
  });

  const filteredAndPaginatedData = useMemo(() => {
    const searchData = inputValue.toLowerCase();
    const filteredData = users.filter((user) => {
      const userFieldValue = user[selectedRadio]?.toLowerCase()||'';
      return userFieldValue.includes(searchData);
    });

    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return filteredData.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, inputValue, selectedRadio,users]);
  

  useEffect(() => {
    fetch('https://localhost:44394/api/Admin/GetUsers')
        .then(response => response.json())
        .then(data => {
            setUsers(data);
        })
        .catch(error => {
            console.error('Error fetching user list:', error);
        });
  }, []);
  //console.log(users)


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
            <div className='search-radio-div'>
              <input
                  className={`search-field ${isFocused ? 'focused' : ''}`}
                  type="text"
                  placeholder="Search..."
                  onFocus={handleInputFocus}
                  onBlur={handleInputBlur}
                  onChange={handleInputChange}
                  value={inputValue}/>
              <div className='radio-group'>
                  <input type="radio" name="searching" value="surname" id="surname" checked={selectedRadio === 'surname'}
                  onChange={handleRadioChange} />
                  <label htmlFor="last_name">Прізвище</label>
                  <input type="radio" name="searching" value="name" id="name" 
                  onChange={handleRadioChange} />
                  <label htmlFor="first_name">Ім'я</label>
                  <input type="radio" name="searching" value="phoneNumber" id="phoneNumber" 
                  onChange={handleRadioChange} />
                  <label htmlFor="phone">Телефон</label>
                  <input type="radio" name="searching" value="email" id="email" 
                  onChange={handleRadioChange} />
                  <label htmlFor="email">E-mail</label>
              </div>

            </div>
          </div>
          <div className='user-bell-icon'>
              <BellIcon/>
          </div>
          <div className='user-count'>
              <label>({users.length}) користувачів</label>
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
                    <div className='div-row' key={user.id}>
                      <div className={`table-row ${index % 2 === 0 ? 'even-row' : ''}`}
                          onClick={() => handleRowClick(user.id)}>
                        <div className='c1'>{user.name}</div>
                        <div className='c2'>{user.surname}</div>
                        <div className='c3'>{user.phoneNumber}</div>
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
                totalCount={inputValue!==''?filteredTableData.length:users.length}
                pageSize={PageSize}
                onPageChange={page => setCurrentPage(page)}/>
          </div>
        </div>
        <div className='user-div' style={{ display: isUserDivVisible ? 'block' : 'none' }}>
          <div className='back-div'>
            <div className='user-img'></div>
              {clickedUser !==null ? (
                <label className='user-name'>{clickedUser.name} {clickedUser.surname}
                <label className='remove-button' onClick={handleRemoveButtonClick}> <RemoveIcon/></label></label>
              ) : (<label className='user-name'>No User Selected</label>)}
            <label className='back-button' onClick={handleBackToMain} > <BackIcon/></label>
          </div>
          <div className='user-div-info'>
            <div className='info-body'>
              <div className='surname-div'>
                <label className='surname-label-one'>Прізвище</label>
                <div className='surname-label'>
                  <label>{clickedUser !==null ? clickedUser.surname : 'NotFound'}</label>
                </div>
              </div>
              <div className='name-div'>
                <label className='name-label-one'>Ім'я</label>
                <div className='name-label'>
                  <label>{clickedUser !==null ? clickedUser.name : 'NotFound'}</label>
                </div>
              </div>
              <div className='phone-div'>
                <label className='phone-label-one'>Номер телефону</label>
                <div className='phone-label'>
                  <label>{clickedUser !==null ? clickedUser.phoneNumber : 'NotFound'}</label>
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
                <label>Відгуки </label><label className='review-count' onClick={handleReviewCount(3)}> {reviews.length}</label>
            </div>
            <div className='review-body'>
              {reviews.map((review)=>(   
                  <div className='review-row' key={review.id}>
                    <div className="review-header">
                      <img src={review.image} alt={review.title} className='review-img' width={50} height={50}></img>
                      <div className='review-title'><label>{review.title}</label></div>
                    </div>
                    <div className='star-rating'>
                      
                    </div>
                    <div className='review-review'>
                      <label>
                        {review.review}
                      </label>
                    </div>
                    <div className='review-date'>
                      <label>
                        {review.date}
                      </label>
                    </div>
                    <div className='review-bottom-line'>
                    </div>
                  </div>
                  
                ))
              }


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
        </div>
      </div>
    );
  
};

export default ItemUser;