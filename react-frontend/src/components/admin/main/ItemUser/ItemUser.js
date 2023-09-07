import React, { useState,useEffect, useMemo } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './ItemUserStyle.css';
import './ReviewStyle.css';
import SearchIcon from './svg/SearchIcon';
import BellIcon from './svg/BellIcon';
import CustomPagination from '../Pagination/CustomPagination';
import data from './data/mock-data.json';
import BackIcon from './svg/BackIcon';
import RemoveIcon from './svg/RemoveIcon';
import StarRating from '../StartRating/StarRating';
import FluentArrowIcon from './svg/FluentArrowIcon';
import ArrowDownDark from './svg/ArrowDownDark';
import reviewData from '../ItemReview/reviews.json';
import reviewReply from '../ItemReview/reviewReply.json'

let orders=[
  {id:12,title:"Monitor black",code:1245,price:3600,image:"https://content2.rozetka.com.ua/goods/images/big/106662744.jpg"},
  {id:22,title:"Headfones black",code:3245,price:5600,image:"https://content2.rozetka.com.ua/goods/images/big/172266668.jpg"},
  {id:32,title:"Bluetooth speaker olive",code:3578,price:4600,image:"https://img.moyo.ua/img/products/4942/96_600.jpg?1693298050"},
  {id:42,title:"Apple Watch Series 8 GPS",code:640,price:17800,image:"https://scdn.comfy.ua/89fc351a-22e7-41ee-8321-f8a9356ca351/https://cdn.comfy.ua/media/catalog/product/u/a/uaua_watchs8_gps_q422_41mm_midnight_aluminum_midnight_sport_band_pdp_image_position-1_1.jpg/w_600"},
  {id:52,title:"Apple iPhone 14 128Gb Blue",code:2900,price:29000,image:"https://scdn.comfy.ua/89fc351a-22e7-41ee-8321-f8a9356ca351/https://cdn.comfy.ua/media/catalog/product/u/a/uaua_iphone14_blue_pdp_image_position-1a_1.jpg/w_600"},
  {id:62,title:"Apple iPad Air 10.9'' Purple",code:298,price:28700,image:"https://scdn.comfy.ua/89fc351a-22e7-41ee-8321-f8a9356ca351/https://cdn.comfy.ua/media/catalog/product/e/5/e56u467.jpg/w_600"}
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
  const [users, setUsers] = useState(data);
  const [count, setCount] = useState(0);
  const [countReviews, setCountReviews] = useState([]);
  const [selectedReview, setSelectedReview] = useState(null);
  const [reviewsInit, setReviewsInit] = useState(reviewData);
  const [reviewsReply, setReviewsReply] = useState(reviewReply);
  

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
    const countOfReviews=reviewsInit.filter((review) =>review.user.id===userId);
    console.log(countOfReviews);
    setCountReviews(countOfReviews.length);
  };

  const handleBackToMain = () => {
    setClickedUser(null);
    setIsUserDivVisible(false);
  };

  const handleRemoveButtonClick = () => {
    setIsConfirmDialogVisible(true);
  };

  const handleConfirmDelete = async () => {

    if(clickedUser?.id!==0)
    {
      const response = await fetch(`https://localhost:7052/api/Admin/${clickedUser?.id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setIsConfirmDialogVisible(false);
        setClickedUser(null);
        setIsUserDivVisible(false);

        fetch('https://localhost:7052/api/Admin/users')
        .then(response => response.json())
        .then(data => {
            setUsers(data);
        })
        .catch(error => {
            console.error('Error fetching user list:', error);
        });
      } 
      else {
        console.error('Failed to delete user');
      }
    }
  };

  const handleCancelDelete = () => {
    setIsConfirmDialogVisible(false);
  };

  const handleShowMessage = (review) => {
    setSelectedReview(review);
  };
  const handleCloseMessage = () => {
    setSelectedReview(null);
    setCount(0);
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
  

  // useEffect(() => {
  //   fetch('https://localhost:7052/api/Admin/users')
  //       .then(response => response.json())
  //       .then(data => {
  //           setUsers(data);
  //       })
  //       .catch(error => {
  //           console.error('Error fetching user list:', error);
  //       });
  // }, []);
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
            <div className='search-field-div'>
              <input
                  className={`search-field ${isFocused ? 'focused' : ''}`}
                  type="text"
                  placeholder="Search..."
                  onFocus={handleInputFocus}
                  onBlur={handleInputBlur}
                  onClick={() => setIsFocused(true)}
                  onChange={handleInputChange}
                  value={inputValue}/>
            </div>
          </div>
              <div className='search-radio-div'>
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
                totalCount={inputValue!==''?filteredTableData.length:users.length}
                pageSize={PageSize}
                onPageChange={page => setCurrentPage(page)}/>
          </div>
        </div>
        <div className='user-div' style={{ display: isUserDivVisible ? 'block' : 'none' }}>
          <div className='back-div'>
            <div className='user-img'>
              <img src="https://p.kindpng.com/picc/s/116-1169050_avatar-michael-jordan-jersey-clip-art-michael-jordan.png" alt=""/>
            </div>
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
              <div className='order-div-header'>
                <label className='order-div-name'>Назва</label>
                <label className='order-div-code'>Код</label>
                <label className='order-div-price'>Ціна</label>
              </div>
              <div className='order-div-list' id='scrollbar-style-1'>
                  {orders.map((order)=>(
                    <div className='order-div-row' key={order.id}>
                      <div className='order-div-name'>
                        <label>{order.title}</label>
                      </div>
                      <div className='order-div-code'>
                        <label>{order.code}</label>
                      </div>
                      <div className='order-div-price'>
                        <label>{order.price}</label>
                      </div>
                      <div className='order-div-image'>
                        <img src={order.image} alt={order.title} className='order-div-img' width={50} height={50}></img>
                      </div>
                    </div>

                  ))}

              </div>
            </div>
          </div>
          <div className='review-div'>
            <div className='review-label'>
                <label>Відгуки </label><label className='review-count'> {countReviews}</label>
            </div>
            <div className='review-body' id='scrollbar-style-1'>
              
              {reviewsInit.map((review)=>(
                clickedUser !==null&&clickedUser.id===review.user.id?(  
                  <div className='review-row' key={review.id}>
                    <div className="review-header">
                      <img src={review.product.image} alt={review.product.name} className='review-img' width={50} height={50}></img>
                      <div className='review-title'><label>{review.product.name}  {review.product.code}</label></div>
                      {!reviewsReply.some((reply) => reply.review_id === review.id) && (
                          <label className='review-fluent' onClick={() => handleShowMessage(review)}>
                            <FluentArrowIcon />
                          </label>
                      )}
                    </div>
                    <div className='star-rating'>
                      <StarRating filledStars={review.number_of_stars} />
                    </div>
                    <div className='review-review' id='scrollbar-style-1'>
                      <label>
                        {review.comment}
                      </label>
                    </div>
                    <div className='review-date'>
                      <label>
                        {review.date}
                      </label>
                    </div>
                    {reviewsReply.some((reply) => reply.review_id === review.id) && (
                        <div className='msg-from-admin' id='scrollbar-style-1'>
                          <label> {reviewsReply.find((reply) => reply.review_id === review.id).comment}</label>
                        </div>
                      )}
                    <div className='review-bottom-line'>
                    </div>
                  </div>):null
                ))}
            </div>
          </div>
          {selectedReview && (
            !reviewsReply.some((reply) => reply.review_id === selectedReview.id) && (
              <div className='review-message'>
                    <div>
                      <div className='review-message-label'>
                        <img src={selectedReview.product.image} alt={selectedReview.product.name} className='review-img' width={50} height={50}></img>
                        <div className='review-title'><label>{selectedReview.product.name}</label></div>
                        <label className='textarea-count'>{count}/300</label>
                      </div>
                      <div className='review-message-input'>
                        <textarea type='textarea' maxLength={300} onChange={e => setCount(e.target.value.length)}/>
      
                      </div>
                      <div className='review-message-send'>
                        <label className='review-send'>Відповісти</label>
                      </div>
                    </div>
                    <div className='arrow-toLeft'>
                      <label className='code-main-arrow-down' onClick={handleCloseMessage}><ArrowDownDark /></label>
                    </div>
              </div>
            )
            
          )}
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