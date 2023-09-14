import React, { useState,useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import SearchIcon from './svg/SearchIcon';
import './ItemMessageStyle.css';
import messages from './data/messages.json';
import products from './data/products.json';
import users from './data/users.json';
import ElipseIcon from './svg/ElipseIcon';
import FluentArrowIcon from './svg/FluentArrowIcon';
import VectorIcon from './svg/VectorIcon';

function sortByIdSmallerToLarger(messages) {
  return messages.sort((a, b) => {
    return b.id - a.id;
  });
}
const ItemMessage =({size})=>{
  const divStyle = {
    marginLeft: `${size}`,
  };

  
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [clickedUser, setClickedUser] = useState(null);
  const [clickedProduct, setClickedProduct] = useState(null);
  // const [isUserDivVisible, setIsUserDivVisible] = useState(false);
  //const [count, setCount] = useState(0);
  //const [countReviews, setCountReviews] = useState([]);
  //const [selectedReview, setSelectedReview] = useState(null);
  const [selectAllChecked, setSelectAllChecked] = useState(false);
  const [checkedMessages, setCheckedMessages] = useState([]);
  const [allMessages, setAllMessages] = useState(messages);
  const [productsInit, setProductsInit] = useState(products);
  const [usersInit, setUsersInit] = useState(users);
  const [checkedMessage, setCheckedMessage] = useState([]);
  const sortedMessages = sortByIdSmallerToLarger(allMessages);
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = () => {
    
    setIsChecked(!isChecked);
    console.log(checkedMessage);
    console.log(isChecked);

  };
  

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
  };

  const handleRowClick = (msgId,productId,userId) => {

    const message=allMessages.find((msg) => msg.id === msgId);
    const product = productsInit.find((product) => product.id === productId);
    const user = usersInit.find((user) => user.id === userId);
    
    setClickedUser(user);
    setClickedProduct(product);
    setCheckedMessage(message);
    
    if (message.status === true) {
      setIsChecked(true);
    }
    else{
      setIsChecked(false);
    }

  };


  const handleChecked = (id) => {
    const updatedCheckedMessages = checkedMessages.includes(id)
    ? checkedMessages.filter((msgId) => msgId !== id)
    : [...checkedMessages, id];
    setCheckedMessages(updatedCheckedMessages);
    console.log(updatedCheckedMessages);
  }
  const handleCheckedAll=()=>{
    const allIds = allMessages.map((user) => user.id);
    if (checkedMessages.length > 0) {
      if (checkedMessages.length === allIds.length) {
        setCheckedMessages([]);
        setSelectAllChecked(false)
      }
      else{
        const newCheckedUsers = [...new Set([...checkedMessages, ...allIds])]; // Combine and remove duplicates
        setCheckedMessages(newCheckedUsers);
        setSelectAllChecked(true);
      }
    }
    else{
      if (selectAllChecked) {
        setCheckedMessages([]); // Uncheck all checkboxes
        setSelectAllChecked(false)
      } else {
        setCheckedMessages(allIds); // Check all checkboxes
        setSelectAllChecked(true)
      }

    }
    console.log(checkedMessages);
  }
  const handleDeleteMessages=()=>
  {
    console.log(checkedMessages);
  }

  const filteredTableData = sortedMessages.filter((msg) => {
    const searchData = inputValue.toLowerCase();
    const userFieldValue = (msg.name + ' ' + msg.email).toLowerCase()||'';
    return userFieldValue.includes(searchData);
  });

  return (
      
      <div style={divStyle}>
        <div>
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
        </div>
        <div className='user-body' >
          <div className='user-table'>
            <div className='review-table-head'>
              <div className='r1-h'> 
                <input type="checkbox" 
                  onChange={handleCheckedAll}
                  checked={selectAllChecked} />
              </div>
              <label className="r2-h">Всі</label>
              <label className="r3-h" onClick={handleDeleteMessages}>Видалити</label>
            </div>
          </div>
          <div className='msg-chart'>
            <div className='msg-user-list' id='scrollbar-style-2'>
              {filteredTableData.map((msg,index)=>(   
                    <div className='msg-div-row' key={msg.id}>
                      <div className={`msg-table-row ${index % 2 === 0 ? 'even-row' : ''}`}>
                        <div className='m1'>
                            <input type="checkbox" id={msg.id} 
                            onChange={()=>handleChecked(msg.id)}
                            checked={checkedMessages.includes(msg.id)}
                            />
                        </div>
                        <div className='m2'>
                            <img src="https://p.kindpng.com/picc/s/116-1169050_avatar-michael-jordan-jersey-clip-art-michael-jordan.png" alt=""/>
                            {/* {!reviewsReply.some((reply) => reply.review_id === msg.id) && (
                                <label key={msg.id} className='review-elipse-icon'><ElipseIcon/></label>
                            )} */}
                        </div>
                        <div className='m3-m4'>
                          <div className='m3'>{msg.name}</div>
                          <div className='m4'>{msg.email}</div>
                        </div>
                        <div className='m5-m6'>
                          <div className='m5'>
                            <label>{msg.date}</label>
                            {msg.status===false?(<label className='msg-elipse-icon'><ElipseIcon/></label>):null}
                            
                          </div>
                          <div className='m6' onClick={() => handleRowClick(msg.id,msg.product_id,msg.user_id)}>
                              <FluentArrowIcon/>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                )}

            </div>
            <div className='chart-with-user'>
              {clickedProduct !==null  ? (
                <div className='user-msg-form'> 
                  <div className='user-product-info'>
                    <div className='user-info'>
                      {clickedUser!==undefined?(
                        <div className='user-info-m2'>
                          <div className='m2'>
                            <img src="https://p.kindpng.com/picc/s/116-1169050_avatar-michael-jordan-jersey-clip-art-michael-jordan.png" alt=""/>  
                          </div>
                          <div className='m3-m4'>
                              <div className='m3'>{clickedUser.name} {clickedUser.surname}</div>
                              <div className='m4'>{clickedUser.email}</div>
                          </div>
                        </div>
                      ):(
                      <div className='user-info-m2'>
                        <div className='m2'>
                          <img src="https://p.kindpng.com/picc/s/116-1169050_avatar-michael-jordan-jersey-clip-art-michael-jordan.png" alt=""/>  
                        </div>
                        <div className='m3-m4'>
                            <div className='m3'>{checkedMessage.name}</div>
                            <div className='m4'>{checkedMessage.email}</div>
                        </div>
                      </div>
                      )}

                    </div>
                    <div className='product-info'>
                      <div className='msg-div-image'>
                        <img src={clickedProduct.image} alt={clickedProduct.name} className='order-div-img' width={30} height={30}></img>
                      </div>
                      <div className='msg-product-name-code'>
                        <label className='msg-product-name'>{clickedProduct.name}</label>
                        <label className='msg-product-code'>{clickedProduct.code}</label>
                      </div>
                    </div>

                  </div>
                  <div className='msg-from-user'>
                    <div className='checked-msg-date'>
                      <label >{checkedMessage.date}</label>
                    </div>
                    <div className='checked-icon-text'>
                      <div className='checked-msg-icon'>
                        <img src="https://p.kindpng.com/picc/s/116-1169050_avatar-michael-jordan-jersey-clip-art-michael-jordan.png" alt=""/>
                      </div>
                      <div className='checked-msg-text'>
                        <label>{checkedMessage.message_text}</label>
                      </div>
                        <div className="checkbox-container">
                          <label className="custom-checkbox">
                            <input type="checkbox" checked={isChecked} onChange={handleCheckboxChange} />
                            <span className="checkmark"><VectorIcon/></span>
                          </label>
                        </div>
                    </div>



                  </div>
                </div>
              ) : null}

            </div>
          </div>
        </div>

      </div>
    );
  
};

export default ItemMessage;