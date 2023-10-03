import { useSelector } from "react-redux";
import Card from "../UI/Card";
import Modal from "../UI/Modal";
import classes from "./Cart.module.css";
import CartItem from "./CartItem";

const Cart = (props) => {
  const cartItems = useSelector(state => state.cart.cartItems);

  return (
    <Modal>
      <Card className={classes.cart}>
        <h2>Your Shopping Cart</h2>
        <ul>
          {cartItems.map(ele => (
            <CartItem key={ele.title} item={ele}/>
          ))}
        </ul>
      </Card>
    </Modal>
  );
};

export default Cart;
