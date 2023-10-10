import React, { useEffect, useState } from 'react';
import { DateRangePicker } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';

import './DiscountRangePickerStyles.css';

import CalendarIcon from '../../../../../svg/sharedIcons/CalendarIcon.jsx';

const DiscountRangePicker = (props) =>
{
    const {
        discountDates
    } = props;

    const [showCalendar, setShowCalendar] = useState(false);
    useEffect(() =>
    {
        if (showCalendar)
        {
            generateCustomization();
        }
    }, [showCalendar])

    const [dateRange, setDateRange] = useState({
        startDate: discountDates.startDate ? new Date(discountDates.startDate) : new Date(), //
        endDate: discountDates.endDate ? new Date(discountDates.endDate) : new Date(),
        key: 'selection',
    });

    const handleSelect = (ranges) =>
    {
        discountDates.startDate = ranges.selection.startDate.getFullYear() + '.' + (ranges.selection.startDate.getMonth() + 1) + '.' + ranges.selection.startDate.getDate()

        //new Date(ranges.selection.endDate.getFullYear(),
        //ranges.selection.endDate.getMonth() + 1, ranges.selection.endDate.getDate());

        discountDates.endDate = ranges.selection.endDate.getFullYear() + '.' + (ranges.selection.endDate.getMonth() + 1) + '.' + ranges.selection.endDate.getDate()
        //new Date(ranges.selection.startDate.getFullYear(),
        //ranges.selection.startDate.getMonth() + 1, ranges.selection.startDate.getDate());

        setDateRange(ranges.selection);
    };

    const handleDateInputClick = () =>
    {
        setShowCalendar(!showCalendar);
    };

    const generateCustomization = () =>
    {
        const rdrDateDisplay = document.getElementsByClassName('rdrDateDisplay')[0];
        const newDiv = document.createElement('div');
        newDiv.classList.add('add-product-calendar-header')
        const newSpan = document.createElement('span');
        newSpan.classList.add('add-product-calendar-text')
        newSpan.innerText = 'Термін знижки';
        newDiv.appendChild(newSpan);
        const closeSpan = document.createElement('span');
        closeSpan.addEventListener('click', () =>
        {
            setShowCalendar(false);
        })
        closeSpan.classList.add('close-product-calendar-close-icon');
        newDiv.appendChild(closeSpan);
        rdrDateDisplay.insertBefore(newDiv, rdrDateDisplay.firstChild);
        const newDiv2 = document.createElement('div');
        newDiv2.classList.add('add-product-calendar-inputs-dates-container')
        const input1 = document.getElementsByClassName('rdrDateInput')[0]
        const input2 = document.getElementsByClassName('rdrDateInput')[1]
        newDiv2.appendChild(input1);
        newDiv2.appendChild(input2);
        rdrDateDisplay.appendChild(newDiv2);
        const rdrMonths = document.getElementsByClassName("rdrDateRangeWrapper")[0];
        const newHr = document.createElement('hr');
        newHr.classList.add("add-pruct-calendar-hr")
        rdrMonths.insertBefore(newHr, rdrMonths.children[2]);
    }

    return (
        <div>
            <label>Термін дії знижки</label>
            <div className='date-range-container'>
                <div
                    className='date-range-input'
                    onClick={handleDateInputClick}
                >
                    <div>
                        <span>
                            від {dateRange.startDate.getDate()}.{dateRange.startDate.getMonth() + 1}.{dateRange.startDate.getFullYear()}
                        </span>
                        <span>
                            до {dateRange.endDate.getDate()}.{dateRange.endDate.getMonth() + 1}.{dateRange.endDate.getFullYear()}
                        </span>
                    </div>
                    <CalendarIcon />
                </div>
                {showCalendar && (
                    <div className='date-range-calendar'>
                        <DateRangePicker
                            ranges={[dateRange]}
                            onChange={handleSelect}
                            showSelectionPreview={false}
                        />
                    </div>
                )}
            </div>
        </div>
    )
}

export default DiscountRangePicker;