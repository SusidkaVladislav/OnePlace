import React, { useRef, useState } from 'react';

import './DiscountAmountInputStyles.css';

const DiscountAmountInput = (props) =>
{
    const {
        percentAmount
    } = props;


    const [discountPercent, setDiscountPercent] = useState(percentAmount.percent? percentAmount.percent : 0);

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
        setDiscountPercent(discountPercent =>
        {
            if (event.target.value <= 100 && event.target.value >= 0)
            {
                percentAmount.percent = event.target.value;
                return event.target.value;
            }
            percentAmount.percent = discountPercent;
            return discountPercent;
        });
    }


    return (
        <div>
            <label>Знижка</label>
            <div className="discount-amount-wrapper">
                <input type="number" className='discount-add-product-input'
                    onKeyDown={handlerKeyDown}
                    onChange={changeValueHandler}
                    value={discountPercent} />

                <div className="discount-amount-arrows-container">
                    <span
                        className='discount-amount-increase-arrow'
                        onWheel={() =>
                        {
                            setDiscountPercent(discountPercent + 1)
                        }
                        }
                        onMouseDown={() =>
                        {
                            if (discountPercent < 100)
                            {
                                percentAmount.percent = Number(discountPercent) + 1;
                                setDiscountPercent(Number(discountPercent) + 1)
                            }

                            timerId.current = setInterval(() =>
                            {
                                setDiscountPercent(discountPercent =>
                                {
                                    if (discountPercent < 100)
                                    {
                                        percentAmount.percent = discountPercent + 1;
                                        return discountPercent + 1;
                                    }
                                    percentAmount.percent = discountPercent;
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
                                percentAmount.percent = discountPercent - 1;
                                setDiscountPercent(discountPercent - 1)
                            }

                            timerId.current = setInterval(() =>
                            {
                                setDiscountPercent(discountPercent =>
                                {
                                    if (discountPercent > 0)
                                    {
                                        percentAmount.percent = discountPercent - 1;
                                        return discountPercent - 1;
                                    }
                                    percentAmount.percent = discountPercent;
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