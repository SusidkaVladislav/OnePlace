import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    list: [], 
    total: 0,
    totalPrice : 0,
    discountPrice : 0,
};
const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart : (state, action) => {
            const check = state.list.findIndex(book => book.id === action.payload.id)
            if (check !== -1) {
                state.list[check].quantity += action.payload.quantity 
            } else {
                state.list.push(action.payload)
            }

            state.total = state.list.reduce((sum, book) => sum + +book?.price * book?.quantity, 0)
        },
        updateQuantity : (state, action) => {
            const check = state.list.findIndex(book => book.id === action.payload.id)
            if (check !== -1) {
                state.list[check].quantity = action.payload.quantity 
            }
            state.total = state.list.reduce((sum, book) => sum + +book?.price * book?.quantity, 0)
        },
        removeItem : (state, action) => {
            state.list = state.list.filter(book => book.id !== action.payload.id)
            state.total = state.list.reduce((sum, book) => sum + +book?.price * book?.quantity, 0)
        },
        incrementTotalPrice : (state, action) => {
            let price = action.payload + state.totalPrice;
            
            return{
                ...state,
                totalPrice:price,
            
            }
            
        },
        decrementTotalPrice : (state, action) => {
            let price =state.totalPrice - action.payload;
            
            return{
                ...state,
                totalPrice:price,
            
            }
            
        },
        updateDiscountPrice : (state,{payload}) => {
            return{
                ...state,
                discountPrice:payload,
            }
        }
    }
})

//const { actions, reducer } = cartSlice


export const { addToCart, updateQuantity, removeItem, decrementTotalPrice, incrementTotalPrice, discountPrice} = cartSlice.actions

export default cartSlice.reducer     
 