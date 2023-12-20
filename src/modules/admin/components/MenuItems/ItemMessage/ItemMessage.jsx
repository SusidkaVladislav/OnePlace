import React, { useState, useEffect, useMemo, Fragment } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './ItemMessageStyle.css';

//#region Redux
import { useSelector, useDispatch } from 'react-redux';
import
{
    getMessages,
    getFilteredMessages,
    updateMessage,
    deleteMessage,
    hideSuccessfulAlert,
    hideUnsuccessfulAlert,

} from '../../../features/adminMessages/adminMessagesSlice';
//#endregion

//#region Services
import AdminSearch from '../../../../../services/search/adminSearch';
import SuccessfulNotification from '../../../controls/notifications/SuccessfulNotification'
import UnsuccessfulNotification from '../../../controls/notifications/UnsuccessfulNotification'
import CustomPagination from '../../../../../services/pagination/CustomPagination';
import MessageRow from './message-component/MessageRow';
//#endregion

//#region Icons
import GreenCheckCheckboxIcon from '../../../../../svg/shared-icons/GreenCheckCheckboxIcon';
import BackTextAndArrowIcon from '../../../../../svg/arrows/BackTextAndArrowIcon';
import LoadingAnimation from '../../../../../common-elements/loading/LoadingAnimation';
import UnknownUserIcon from '../../../../../svg/shared-icons/UnknownUserIcon';
//#endregion

const PageSize = 8;
const ItemMessage = () =>
{
    const dispatch = useDispatch()

    const [inputValue, setInputValue] = useState('');
    const [checkedMessages, setCheckedMessages] = useState([]);
    const [checkedMessage, setCheckedMessage] = useState([]);
    const [selectAllChecked, setSelectAllChecked] = useState(false);
    const [isChecked, setIsChecked] = useState(false);
    const [isConfirmDialogVisible, setIsConfirmDialogVisible] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [rowClicked, setRowClicked] = useState(false);

    const {
        deleteMessageLoading,
        updateMessageLoading,
        getMessagesLoading,

        messages,
        successfulAlertShow,
        unsuccessfulAlertShow,
        actionNotification,
    } = useSelector((state) => state.adminMessages)

    const filteredData = useSelector(state => getFilteredMessages(state, inputValue));


    useEffect(() =>
    {
        dispatch(getMessages());
    }, [])

    const handleCheckboxChange = async () =>
    {
        const messageID = checkedMessage.id;
        const isReplied = !isChecked;


        const messageUpdateData = {
            id: messageID,
            isReplied: isReplied,
        };
        try
        {
            await dispatch(updateMessage(messageUpdateData)).unwrap()
            await setTimeout(() =>
            {
                dispatch(hideSuccessfulAlert());
                dispatch(getMessages());
            }, 1000)
        }
        catch (err)
        {
            setTimeout(() =>
            {
                dispatch(hideUnsuccessfulAlert());
            }, 2000);
        }
        setIsChecked(!isChecked);
    };

    const handleRowClick = (msgId) =>
    {

        const message = filteredData.find((msg) => msg.id === msgId);
        setCheckedMessage(message);

        if (message.isReplied === true)
        {
            setIsChecked(true);
        }
        else
        {
            setIsChecked(false);
        }
        setRowClicked(true);

    };

    const handleChecked = (id) =>
    {
        const updatedCheckedMessages = checkedMessages.includes(id)
            ? checkedMessages.filter((userId) => userId !== id)
            : [...checkedMessages, id];
        setCheckedMessages(updatedCheckedMessages);
    }

    const handleCheckedAll = () =>
    {
        const allIds = filteredData.map((review) => review.id);
        if (checkedMessages.length > 0)
        {
            if (checkedMessages.length === allIds.length)
            {
                setCheckedMessages([]);
                setSelectAllChecked(false)
            }
            else
            {
                const newCheckedMessages = [...new Set([...checkedMessages, ...allIds])];
                setCheckedMessages(newCheckedMessages);
                setSelectAllChecked(true);
            }
        }
        else
        {
            if (selectAllChecked)
            {
                setCheckedMessages([]);
                setSelectAllChecked(false)
            } else
            {
                setCheckedMessages(allIds);
                setSelectAllChecked(true)
            }
        }
    }

    const handleDeleteMessages = () =>
    {
        if (checkedMessages.length > 0)
            setIsConfirmDialogVisible(true);
    }

    const handleConfirmDelete = async () =>
    {
        setRowClicked(false);
        setIsConfirmDialogVisible(false);
        try
        {
            await dispatch(deleteMessage(checkedMessages)).unwrap();
            await setTimeout(() =>
            {
                dispatch(hideSuccessfulAlert());
                dispatch(getMessages());
                setCheckedMessages([])
            }, 1000)
        }
        catch (err)
        {
            setTimeout(() =>
            {
                dispatch(hideUnsuccessfulAlert());
                setCheckedMessages([])
            }, 2000);
        }
    };

    const handleCancelDelete = () =>
    {
        setIsConfirmDialogVisible(false);
    };

    const filteredAndPaginatedData = useMemo(() =>
    {
        const firstPageIndex = (currentPage - 1) * PageSize;
        const lastPageIndex = firstPageIndex + PageSize;
        return filteredData.slice(firstPageIndex, lastPageIndex);
    }, [currentPage, inputValue, messages]);


    if (deleteMessageLoading)
    {
        return <LoadingAnimation />
    }
    if (updateMessageLoading)
    {
        return <LoadingAnimation />
    }
    if (getMessagesLoading)
    {
        return <LoadingAnimation />
    }

    return (
        <Fragment>
            {successfulAlertShow && (
                <div className='modal-backdrop'>
                    <SuccessfulNotification notifiaction={actionNotification} />
                </div>
            )}
            {unsuccessfulAlertShow && (
                <div className='modal-backdrop'>
                    <UnsuccessfulNotification notifiaction={actionNotification} />
                </div>
            )}

            <div className='message-body'>
                <AdminSearch
                    onSearchChange={value =>
                    {
                        setInputValue(value);
                        setCurrentPage(1);
                    }}
                />
                <div className='message-table-head'>
                    <label className="message-custom-checkbox">
                        <input
                            type="checkbox"
                            checked={selectAllChecked}
                            onChange={handleCheckedAll} />
                        <span className='message-custom-checkbox-checkmark'><GreenCheckCheckboxIcon /></span>
                    </label>
                    <label>Всі</label>
                    <label style={{
                        'cursor': 'pointer',
                    }} onClick={handleDeleteMessages}>Видалити</label>
                    {
                        rowClicked && <label
                            style={{
                                'cursor': 'pointer',
                            }} onClick={() =>
                            {
                                setRowClicked(false);
                            }}><BackTextAndArrowIcon /></label>
                    }
                </div>

                <div className={rowClicked ? 'msg-chart' : ''}>
                    <div className='msg-user-list'>
                        {filteredAndPaginatedData?.map((msg) => (
                            <MessageRow
                                key={msg?.id}
                                id={msg?.id}
                                name={msg?.name}
                                email={msg?.email}
                                date={msg?.date}
                                isReplied={msg?.isReplied}
                                handleChecked={handleChecked}
                                checkedMessages={checkedMessages}
                                onRowClick={handleRowClick}
                                isRowClicked={rowClicked}
                                pictureAddress={msg?.userPictureAddress}
                            />
                        ))}
                    </div>

                    {rowClicked ? (
                        checkedMessage?.productId !== 0 ? (
                            <div className='chart-with-user'>
                                <div className='user-product-info'>
                                    {checkedMessage?.userId !== 0 ? (
                                        <div className='user-info'>
                                            <label>
                                                {
                                                    checkedMessage?.userPictureAddress !== null ?
                                                        <img
                                                            src={checkedMessage?.userPictureAddress} alt='userIcon'
                                                            style={{
                                                                width: '50px',
                                                                height: '50px',
                                                                borderRadius: '90px'
                                                            }}
                                                        /> : <UnknownUserIcon />
                                                }
                                            </label>

                                            <div className='user-initials-message-container'>
                                                <div className='user-initials-message-name'
                                                    onClick={() =>
                                                    {
                                                        navigator.clipboard.writeText(checkedMessage?.email)
                                                            .catch(() =>
                                                            {
                                                                console.log('Write permission denied.')
                                                            });

                                                        window.open('https://mail.google.com/', '_blank');
                                                    }}>
                                                    {checkedMessage?.userName} {checkedMessage?.userSurname}
                                                </div>
                                                <div className='user-initials-message-email'
                                                    style={{
                                                        'color': '#D17100'
                                                    }}
                                                    onClick={() =>
                                                    {
                                                        navigator.clipboard.writeText(checkedMessage?.email)
                                                            .catch(() =>
                                                            {
                                                                console.log('Write permission denied.')
                                                            });

                                                        window.open('https://mail.google.com/', '_blank');
                                                    }}
                                                >
                                                    {checkedMessage?.userEmail}
                                                </div>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className='user-info'>
                                            <label> <UnknownUserIcon /></label>

                                            <div className='user-initials-message-container'>
                                                <div className='user-initials-message-name'
                                                    onClick={() =>
                                                    {
                                                        navigator.clipboard.writeText(checkedMessage?.email)
                                                            .catch(() =>
                                                            {
                                                                console.log('Write permission denied.')
                                                            });

                                                        window.open('https://mail.google.com/', '_blank');
                                                    }}
                                                >{checkedMessage?.name}</div>
                                                <div
                                                    className='user-initials-message-email'
                                                    style={{
                                                        'color': '#D17100'
                                                    }}
                                                    onClick={() =>
                                                    {
                                                        navigator.clipboard.writeText(checkedMessage?.email)
                                                            .catch(() =>
                                                            {
                                                                console.log('Write permission denied.')
                                                            });

                                                        window.open('https://mail.google.com/', '_blank');
                                                    }}
                                                >{checkedMessage?.email}</div>
                                            </div>
                                        </div>
                                    )}

                                    <div className='product-info'>
                                        <img src={checkedMessage?.productPictureAddress} alt=''></img>
                                        <label>{checkedMessage?.productName}</label>
                                        <label>{checkedMessage?.productCode}</label>
                                    </div>
                                </div>

                                <div className='msg-from-user'>
                                    <div className='checked-msg-date'>
                                        <label >{new Date(checkedMessage?.date).getUTCDate() + '.' + (new Date(checkedMessage?.date).getMonth() + 1) + '.' + new Date(checkedMessage?.date).getFullYear()}</label>
                                    </div>

                                    <div className='checked-icon-text'>
                                        <div className='checked-msg-icon'>
                                            <label> <UnknownUserIcon /></label>
                                        </div>
                                        <div className='checked-msg-text' id='scrollbar-style-1'>
                                            <label>{checkedMessage?.messageText}</label>
                                        </div>
                                        <div className="checkbox-container">
                                            <label className="custom-checkbox">
                                                <input type="checkbox" checked={isChecked} onChange={handleCheckboxChange} />
                                                <span className="checkmark"><GreenCheckCheckboxIcon /></span>
                                            </label>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        ) : null
                    ) : null}
                </div>

                <div className='pag'>
                    <CustomPagination
                        className="pagination-bar"
                        currentPage={currentPage}
                        totalCount={filteredData?.length}
                        pageSize={PageSize}
                        onPageChange={page => setCurrentPage(page)} />
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
        </Fragment >
    );
}

export default ItemMessage;