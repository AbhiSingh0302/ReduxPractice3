import { useDispatch, useSelector } from "react-redux";
import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";
import Notification from "./components/UI/Notification";
import { useEffect } from "react";
import { sendCartData, getCartData } from "./store/cart";

let isFirst = true;

function App() {
  const dispatch = useDispatch();
  const showCart = useSelector((state) => state.ui.showCart);

  const cart = useSelector((state) => state.cart.cartItems);

  const notification = useSelector(state => state.ui.notification)

  useEffect(() => {

    if(isFirst){
      dispatch(getCartData())
      isFirst = false;
      return;
    }

    dispatch(sendCartData(cart))
  }, [cart, dispatch]);
  
  return (
    <>
      {notification && <Notification 
      status={notification.status}
      title={notification.title}
      message={notification.message}/>}
      <Layout>
        {showCart && <Cart />}
        <Products />
      </Layout>
    </>
  );
}

export default App;
