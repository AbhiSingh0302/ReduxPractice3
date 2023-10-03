import { createSlice } from "@reduxjs/toolkit";

const initialCartState = {cartItems: []};

const cartSlice = createSlice({
    name: "cart",
    initialState: initialCartState,
    reducers: {
        addItem(state,action){
            const existingCartItem = state.cartItems.find(ele => ele.title === action.payload.title);
            if(existingCartItem){
                existingCartItem.quantity++;
                existingCartItem.total += existingCartItem.price;
            }else{
                state.cartItems.push({...action.payload, quantity: 1, total: action.payload.price});
            }
        },
        removeItem(state,action){
            const existingCartItem = state.cartItems.find(ele => ele.title === action.payload);
            if(existingCartItem.quantity > 1){
                existingCartItem.quantity--;
            }else{
                state.cartItems = state.cartItems.filter(ele => ele.title !== action.payload);
            }
        }
    }
})

export const cartActions = cartSlice.actions;
export default cartSlice.reducer;