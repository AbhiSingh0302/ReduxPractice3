import { createSlice } from "@reduxjs/toolkit";

const initialUIState = {showCart: false};

const uiSlice = createSlice({
    name: "ui-slice",
    initialState: initialUIState,
    reducers: {
        toggleCart(state){
            state.showCart = !state.showCart;
        }
    }
})

export const uiActions = uiSlice.actions;
export default uiSlice.reducer;