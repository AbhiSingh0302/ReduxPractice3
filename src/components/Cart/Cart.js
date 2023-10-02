import Card from "../UI/Card";
import Modal from "../UI/Modal";
import classes from "./Cart.module.css";
import CartItem from "./CartItem";

const Cart = (props) => {
  return (
    <Modal>
      <Card className={classes.cart}>
        <h2>Your Shopping Cart</h2>
        <ul>
          <CartItem
            item={{ title: "Test Item", quantity: 3, total: 18, price: 6 }}
          />
        </ul>
      </Card>
    </Modal>
  );
};

export default Cart;
