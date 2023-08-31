import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const UserInfo =({item})=>{
    return (
      
      <div className='user-info'>
        <label>UserInfo</label>
        <label> { item }</label>
      </div>
    );
  
};

export default UserInfo;