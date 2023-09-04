import React, { useState, useMemo } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './ItemReviewStyle.css';
import SearchIcon from './svg/SearchIcon';
import BellIcon from './svg/BellIcon';
import BackIcon from './svg/BackIcon';
import CustomPagination from '../Pagination/CustomPagination';
import FluentArrowIcon from './svg/FluentArrowIcon';
import StarRating from '../StartRating/StarRating';
import ElipseIcon from './svg/ElipseIcon';
import ComunicationIcon from './svg/ComunicationIcon';
import reviewData from './reviews.json';
import reviewReply from './reviewReply.json'


function sortByIdSmallerToLarger(reviews) {
    return reviews.sort((a, b) => {
      return a.id - b.id;
    });
}

let PageSize = 12;
const ItemReview =({size})=>{
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
    //const [isConfirmDialogVisible, setIsConfirmDialogVisible] = useState(false);
    const [reviewsInit, setReviewsInit] = useState(reviewData);
    const [reviewsReply, setReviewsReply] = useState(reviewReply);
    //const [count, setCount] = useState(0);
    //const [selectedReview, setSelectedReview] = useState(null);
    const [selectAllChecked, setSelectAllChecked] = useState(false);
    const sortedReviews = sortByIdSmallerToLarger(reviewsInit);
    const [checkedUsers, setCheckedUsers] = useState([]);

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
        const user = reviewsInit.find((user) => user.id === userId);
        console.log(user);
        setClickedUser(user);
        setIsUserDivVisible(true);
    };
    const handleChecked = (id) => {
        const updatedCheckedUsers = checkedUsers.includes(id)
        ? checkedUsers.filter((userId) => userId !== id)
        : [...checkedUsers, id];
        setCheckedUsers(updatedCheckedUsers);
        console.log(updatedCheckedUsers);
    }

    const handleCheckedAll=()=>{
        const allIds = reviewsInit.map((user) => user.id);
        if (selectAllChecked) {
            setCheckedUsers([]); // Uncheck all checkboxes
        } else {
            setCheckedUsers(allIds); // Check all checkboxes
        }
        setSelectAllChecked(!selectAllChecked); 
        console.log(checkedUsers);
    }
    const handleBackToMain = () => {
        setClickedUser(null);
        setIsUserDivVisible(false);
    };

    const filteredTableData = reviewsInit.filter((review) => {
        const searchData = inputValue.toLowerCase();
        const userFieldValue = review.user[selectedRadio]?.toLowerCase()||'';
        return userFieldValue.includes(searchData);
      });
    
    const filteredAndPaginatedData = useMemo(() => {
        const searchData = inputValue.toLowerCase();
        const filteredData = reviewsInit.filter((review) => {
          const userFieldValue = review.user[selectedRadio]?.toLowerCase()||'';
          return userFieldValue.includes(searchData);
        });
        const firstPageIndex = (currentPage - 1) * PageSize;
        const lastPageIndex = firstPageIndex + PageSize;
        return filteredData.slice(firstPageIndex, lastPageIndex);
    }, [currentPage, inputValue, selectedRadio,reviewsInit]);
      

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
                  </div>
              </div>
          <div className='user-bell-icon'>
              <BellIcon/>
          </div>
          <div className='user-count'>
              <label>({reviewsInit.length}) відгуки</label>
          </div>
          <div className='user-body' >
              <div className='user-table'>
                <div className='review-table-head'>
                    <div className='r1-h'> 
                        <input type="checkbox" 
                        onChange={handleCheckedAll}
                        checked={selectAllChecked} />
                    </div>
                    <label className={`r2-h ${selectAllChecked ? 'selected-all-label' : ''}`}>Всі</label>
                    <label className={`r3-h ${selectAllChecked ? 'selected-all-label' : ''}`}>Видалити</label>
                    <label className={`r4-h ${selectAllChecked ? 'selected-all-label' : ''}`}>Спам</label>
                    {/* <div className='review-check-new'>
                        <div className='r1-h'> 
                            <input type="checkbox" 
                            onChange={handleCheckedNew} />
                        </div>
                        <label>Показати нові</label>
                    </div> */}
                </div>
                {filteredAndPaginatedData.map((review,index)=>(   
                    <div className='review-div-row' key={review.id}>
                      <div className={`review-table-row ${index % 2 === 0 ? 'even-row' : ''}`}>
                        <div className='r1'>
                            <input type="checkbox" id={review.id} 
                            onChange={()=>handleChecked(review.id)}
                            checked={checkedUsers.includes(review.id)}
                            />
                        </div>
                        <div className='r2'>
                            <img src="https://p.kindpng.com/picc/s/116-1169050_avatar-michael-jordan-jersey-clip-art-michael-jordan.png" alt=""/>
                            {!reviewsReply.some((reply) => reply.review_id === review.id) && (
                                <label key={review.id} className='review-elipse-icon'><ElipseIcon/></label>
                            )}
                        </div>
                        <div className='r3'>{review.user.name} {review.user.surname}</div>
                        <div className='r4'>{review.comment}</div>
                        <div className='r5'>{review.date}</div>
                        <div className='r6' onClick={() => handleRowClick(review.id)}>
                            <FluentArrowIcon/>
                        </div>
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
                totalCount={inputValue!==''?filteredTableData.length:reviewsInit.length}
                pageSize={PageSize}
                onPageChange={page => setCurrentPage(page)}/>
          </div>
        </div>
        <div className='user-div' style={{ display: isUserDivVisible ? 'block' : 'none' }}>
            <div className='back-div'>
                <div className='review-user-img'>
                    <img src="https://p.kindpng.com/picc/s/116-1169050_avatar-michael-jordan-jersey-clip-art-michael-jordan.png" alt=""/>
                
                </div>
                {clickedUser !==null ? (
                    <label className='user-name'>{clickedUser.user.name} {clickedUser.user.surname}</label>
                ) : (<label className='user-name'>No User Selected</label>)}
                <label className='back-button' onClick={handleBackToMain} > <BackIcon/></label>
            </div>
            <div className='review-list'>
                <div className='review-list-item'>
                    {clickedUser !==null ? (
                        <div>
                            <div className="review-list-header">
                                <img src={clickedUser.product.image} alt={clickedUser.product.name} className='review-list-img' width={50} height={50}></img>
                                <div className='review-list-title'><label>{clickedUser.product.name}</label></div>
                                <div className='review-list-code'><label> {clickedUser.product.code}</label></div>
                                <div className='review-star-rating'>
                                    <StarRating filledStars={clickedUser.number_of_stars} />
                                </div>
                                <div className='review-list-date'>
                                    <label>
                                        {clickedUser.date}
                                    </label>
                                </div>
                            </div>
                            <div>
                                <div className='review-item-by-user'>
                                    <div className='review-item-by-user-msg'>
                                        <img src="https://p.kindpng.com/picc/s/116-1169050_avatar-michael-jordan-jersey-clip-art-michael-jordan.png" alt=""/>
                                        <div className='review-by-user' id='scrollbar-style-2'>
                                            <label>{clickedUser.comment}</label>
                                        </div>
                                    </div>
                                    {reviewsReply.map((reply)=>(
                                        reply.review_id===clickedUser.id ? (
                                            <div key={clickedUser.id} className='review-item-by-admin-msg'>
                                                <div className='review-by-admin' id='scrollbar-style-2'>
                                                    <label>{reply.comment}</label>
                                                    <div className='review-by-admin-date'>{reply.date}</div>
                                                </div>
                                                <img src="https://cdn-icons-png.flaticon.com/512/6897/6897018.png" alt=""/>
                                                
                                            </div>
                                            ):null
                                        ))
                                    } 
                                </div>
                                {!reviewsReply.some((reply)=>reply.review_id===clickedUser.id) && (
                                    <div key={clickedUser.id} className='msg-from-admin'>
                                        <input type="text" placeholder='Додайте коментар'/>
                                        <label><ComunicationIcon/></label>
                                    </div>
                                )}
                            </div> 
                        </div>


                    ) : (<label className='review-list-title'>No Review Selected</label>)}
                   
                </div>


            </div>

        </div>


      </div>
    );
  
};

export default ItemReview;