import React, { useRef, useState } from 'react';

import './DiscountAmountInputStyles.css';

const DiscountAmountInput = (props) =>
{
    const {
        percentAmount,
        onPercentAmountChange,
    } = props;


    const [discountPercent, setDiscountPercent] = useState(Number(percentAmount) ? Number(percentAmount) : 0);
    const timerId = useRef();
    const DURATION = 150;

    const handlerKeyDown = (event) =>
    {
        if (event.which === 69 || event.which === 189
            || event.which === 107 || event.which === 109
            || event.which === 190)
        {
            event.preventDefault();
        }
    }

    const changeValueHandler = (event) =>
    {
        const newPercentAmount = event.target.value;
        setDiscountPercent(discountPercent =>
        {
            if (newPercentAmount <= 100 && newPercentAmount >= 0)
            {
                onPercentAmountChange(newPercentAmount);
                return newPercentAmount;
            }
            onPercentAmountChange(discountPercent);
            return discountPercent;
        });
    }

    return (
        <div>
            <label className='discount-amount-header-label'>Знижка(%)</label>
            <div className="discount-amount-wrapper">
                <input
                    type="number"
                    className='discount-add-product-input'
                    onKeyDown={handlerKeyDown}
                    onChange={changeValueHandler}
                    value={discountPercent}
                />

                <div className="discount-amount-arrows-container">
                    <span
                        className='discount-amount-increase-arrow'
                        onMouseDown={() =>
                        {
                            if (discountPercent < 100)
                            {
                                onPercentAmountChange(Number(discountPercent) + 1);
                                setDiscountPercent(Number(discountPercent) + 1)
                            }

                            timerId.current = setInterval(() =>
                            {
                                setDiscountPercent(discountPercent =>
                                {
                                    if (discountPercent < 100)
                                    {
                                        onPercentAmountChange(discountPercent + 1);
                                        return discountPercent + 1;
                                    }
                                    onPercentAmountChange(discountPercent);
                                    return discountPercent;
                                });

                            }, DURATION);

                        }}
                        onMouseUp={() =>
                        {
                            clearInterval(timerId.current);
                        }}
                        onMouseOut={() =>
                        {
                            clearInterval(timerId.current);
                        }}
                    />
                    <span
                        className='discount-amount-decrease-arrow'
                        onMouseDown={() =>
                        {
                            if (discountPercent > 0)
                            {
                                onPercentAmountChange(discountPercent - 1);
                                setDiscountPercent(discountPercent - 1)
                            }

                            timerId.current = setInterval(() =>
                            {
                                setDiscountPercent(discountPercent =>
                                {
                                    if (discountPercent > 0)
                                    {
                                        onPercentAmountChange(discountPercent - 1);
                                        return discountPercent - 1;
                                    }
                                    onPercentAmountChange(discountPercent);
                                    return discountPercent;
                                });
                            }, DURATION);

                        }}
                        onMouseUp={() =>
                        {
                            clearInterval(timerId.current);
                        }}
                        onMouseOut={() =>
                        {
                            clearInterval(timerId.current);
                        }}
                    />
                </div>
            </div>

        </div>
    )
}

export default DiscountAmountInput;