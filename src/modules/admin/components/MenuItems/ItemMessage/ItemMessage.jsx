import React, { useState, useEffect, useMemo,useRef } from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import './ItemMessageStyle.css';
import AdminSearch from '../../../../../services/search/adminSearch';
import { useSelector, useDispatch } from 'react-redux';
import { fetchMessages, getFilteredMessages,fetchPutMessage,fetchDeleteMessage } from '../../../features/adminMessages/adminMessagesSlice';
import { useNavigate } from "react-router-dom";
import ElipseIcon from './svg/ElipseIcon';
import FluentArrowIcon from './svg/FluentArrowIcon';
import VectorIcon from './svg/VectorIcon';
import UserIcon from './svg/UserIcon'; 

const ItemMessage = () =>
{
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [inputValue, setInputValue] = useState('');
    const [checkedMessages, setCheckedMessages] = useState([]);
    const [checkedMessage, setCheckedMessage] = useState([]);
    const [selectAllChecked, setSelectAllChecked] = useState(false);
    const [isChecked, setIsChecked] = useState(false);
    const [isConfirmDialogVisible, setIsConfirmDialogVisible] = useState(false);
    const [isConfirmDialogVisible2, setIsConfirmDialogVisible2] = useState(false);
    const [isConfirmDialogError, setIsConfirmDialogError] = useState(false);

    const { loading, messages } = useSelector((state) => state.adminMessages)
    const filteredData = useSelector(state => getFilteredMessages(state, inputValue));
    const [rowClicked, setRowClicked] = useState(false);

    const handleCheckboxChange = () => {
    
        const messageID = checkedMessage.id;
        const isReplied = !isChecked;

        const messageUpdateData = {
                id: messageID,
                isReplied: isReplied,
        };
        dispatch(fetchPutMessage(messageUpdateData))
        .then(()=>{
            dispatch(fetchMessages());
        });
        setIsChecked(!isChecked);
    
      };

    const handleRowClick = (msgId) => {

        const message=filteredData.find((msg) => msg.id === msgId);
        setCheckedMessage(message);
        
        if (message.isReplied === true) {
          setIsChecked(true);
        }
        else{
          setIsChecked(false);
        }
        setRowClicked(true);
    
      };

    const handleChecked = (id) => {
        const updatedCheckedMessages = checkedMessages.includes(id)
        ? checkedMessages.filter((userId) => userId !== id)
        : [...checkedMessages, id];
        setCheckedMessages(updatedCheckedMessages);
        //console.log(updatedCheckedMessages);
    }

    const handleCheckedAll=()=>{
        const allIds = filteredData.map((review) => review.id);
        if (checkedMessages.length > 0) {
            if (checkedMessages.length === allIds.length) {
                setCheckedMessages([]);
                setSelectAllChecked(false)
            }
            else{
                const newCheckedMessages = [...new Set([...checkedMessages, ...allIds])]; // Combine and remove duplicates
                setCheckedMessages(newCheckedMessages);
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
        //console.log(checkedMessages);
    }

    const handleDeleteMessages=()=>
    {
        setIsConfirmDialogVisible(true);
        //console.log(checkedMessages);
    }
    const handleConfirmDelete = async () => {
        
        setRowClicked(false);
        setIsConfirmDialogVisible(false);
        dispatch(fetchDeleteMessage(checkedMessages))
        .then((response) => {
            if (response.meta.requestStatus==='rejected') {
                setIsConfirmDialogError(true);
                //console.log(response);
            }
            if(response.meta.requestStatus==='fulfilled')
            {
                dispatch(fetchMessages());
                setIsConfirmDialogVisible2(true);
                setTimeout(() => {
                    setIsConfirmDialogVisible2(false);
                }, 3000);
                
            }
        });
    };

    const handleCancelDelete = () =>
    {
        setIsConfirmDialogVisible(false);
    };
    const handleClickOk=()=>{
        setIsConfirmDialogError(false);
        setIsConfirmDialogVisible2(false);
    }

    useEffect(() =>
    {
        dispatch(fetchMessages());
        
    }, [])

    if (loading) return <p>Loading...</p>

    return (
        <div>
            <div>
                <div className="search-div">
                    <AdminSearch
                        onSearchChange={value =>
                        {
                            setInputValue(value);
                        }}
                    />
                </div>
            </div>
            <div className='user-body'>
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
                        {filteredData.map((msg,index)=>(   
                            <div className='msg-div-row' key={msg.id}>
                                <div className={`msg-table-row ${index % 2 === 0 ? 'even-row' : ''}`}>
                                    <div className='m1'>
                                        <input type="checkbox" id={msg.id} 
                                        onChange={()=>handleChecked(msg.id)}
                                        checked={checkedMessages.includes(msg.id)}
                                        />
                                    </div>
                                    <div className='m2'>
                                        <label> <UserIcon/></label>
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
                                            {msg.isReplied===false?(<label className='msg-elipse-icon'><ElipseIcon/></label>):null}
                                            
                                        </div>
                                        <a className='m6' onClick={() => handleRowClick(msg.id)}>
                                            <FluentArrowIcon/>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        )
                        )}

                    </div>
                    <div className='chart-with-user'>
                        {rowClicked?(
                            checkedMessage.productId !==0  ? (
                                <div className='user-msg-form'> 
                                    <div className='user-product-info'>
                                        <div className='user-info'>
                                            {checkedMessage.userId!==0?(
                                                <div className='user-info-m2'>
                                                <div className='m2'>
                                                    <label> <UserIcon/></label> 
                                                </div>
                                                <div className='m3-m4'>
                                                    <div className='m3'>{checkedMessage?.userName} {checkedMessage?.userSurname}</div>
                                                    <div className='m4'>{checkedMessage?.userEmail}</div>
                                                </div>
                                                </div>
                                                ):(
                                                <div className='user-info-m2'>
                                                <div className='m2'>
                                                    <label> <UserIcon/></label>  
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
                                            <img src={checkedMessage?.productPictureAddress} alt='' className='order-div-img' width={30} height={30}></img>
                                        </div>
                                        <div className='msg-product-name-code'>
                                            <label className='msg-product-name'>{ checkedMessage?.productName}</label>
                                            <label className='msg-product-code'>{checkedMessage?.productCode}</label>
                                        </div>
                                        </div>

                                    </div>
                                    <div className='msg-from-user'>
                                        <div className='checked-msg-date'>
                                        <label >{checkedMessage?.date}</label>
                                        </div>
                                        <div className='checked-icon-text'>
                                        <div className='checked-msg-icon'>
                                            <label> <UserIcon/></label>
                                        </div>
                                        <div className='checked-msg-text'>
                                            <label>{checkedMessage?.messageText}</label>
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
                            ) : null
                        ):null}
                    </div>
                </div>
            </div>
            {isConfirmDialogVisible && (
                <div className='modal-backdrop'>
                    <div className='confirm-dialog'>
                        <p>Ви впевнені, що бажаєте видалити запис?</p>
                        <label className='confirm-buttom' onClick={handleConfirmDelete}>Так</label>
                        <label className='confirm-buttom' onClick={handleCancelDelete}>Ні</label>
                    </div>
                </div>
            )}
            {isConfirmDialogVisible2 && (
                <div className='modal-backdrop-true'>
                    <div className='confirm-dialog-true'>
                        <p>Запис видалено успішно</p>
                        {/* <label onClick={handleClickOk} className='confirm-buttom-ok'>Ok</label> */}
                    </div>
                </div>
            )}
            {isConfirmDialogError && (
                <div className='modal-backdrop-false'>
                    <div className='confirm-dialog-false'>
                        <p>Помилка видалення запису. Спробуйте пізніше!</p>
                        <label onClick={handleClickOk}className='confirm-buttom-ok'>Ok</label>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ItemMessage;