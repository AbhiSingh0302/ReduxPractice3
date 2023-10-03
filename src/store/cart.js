import { createSlice } from "@reduxjs/toolkit";
import { uiActions } from "./ui-slice";

const initialCartState = { cartItems: [] };

const cartSlice = createSlice({
  name: "cart",
  initialState: initialCartState,
  reducers: {
    addItem(state, action) {
      const existingCartItem = state.cartItems.find(
        (ele) => ele.title === action.payload.title
      );
      if (existingCartItem) {
        existingCartItem.quantity++;
        existingCartItem.total += existingCartItem.price;
      } else {
        state.cartItems.push({
          ...action.payload,
          quantity: 1,
          total: action.payload.price,
        });
      }
    },
    removeItem(state, action) {
      const existingCartItem = state.cartItems.find(
        (ele) => ele.title === action.payload
      );
      if (existingCartItem.quantity > 1) {
        existingCartItem.quantity--;
      } else {
        state.cartItems = state.cartItems.filter(
          (ele) => ele.title !== action.payload
        );
      }
    },
    fillCart(state,action) {
        state.cartItems = action.payload;
    }
  },
});

export const sendCartData = (cart) => {
  return async (dispatch) => {
    dispatch(
      uiActions.showNotification({
        status: "pending",
        title: "Sending...",
        message: "Sending cart data!",
      })
    );

    const sendRequest = async () => {
      const response = await fetch(
        "https://redux-cart-5f9d2-default-rtdb.firebaseio.com/cart.json",
        {
          method: "PUT",
          body: JSON.stringify(cart),
        }
      );

      if(!response.ok){
        throw new Error('Sending cart data failed!');
      }
    };

    try {
        await sendRequest();

        dispatch(
            uiActions.showNotification({
              status: 'success',
              title: 'Success!',
              message: 'Sent cart data successfully!'
            })
          )

    } catch (error) {
        dispatch(
        uiActions.showNotification({
          status: 'error',
          title: 'Error!',
          message: 'Sending cart data failed!'
        })
      )
    }
  };
};

export const getCartData = () => {
    return async (dispatch) => {
      dispatch(
        uiActions.showNotification({
          status: "pending",
          title: "Receiving...",
          message: "Receiving cart data!",
        })
      );
  
      const getRequest = async () => {
        const response = await fetch("https://redux-cart-5f9d2-default-rtdb.firebaseio.com/cart.json");
  
        if(!response.ok){
          throw new Error('Receiving cart data failed!');
        }
        return await response.json();
      };
  
      try {
          const data = await getRequest();

          dispatch(cartActions.fillCart(data));
          
          dispatch(
              uiActions.showNotification({
                status: 'success',
                title: 'Success!',
                message: 'Received cart data successfully!'
              })
            )
  
      } catch (error) {
          dispatch(
          uiActions.showNotification({
            status: 'error',
            title: 'Error!',
            message: 'Sending cart data failed!'
          })
        )
      }
    };
  };

export const cartActions = cartSlice.actions;

export default cartSlice.reducer;
