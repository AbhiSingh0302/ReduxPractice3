import { useDispatch, useSelector } from 'react-redux';
import classes from './CartButton.module.css';
import { cartActions } from '../../store/cart';

const CartButton = (props) => {
  const cartItems = useSelector(state => state.cartItems);
  const dispatch = useDispatch();

  const showCart = () => {
    dispatch(cartActions.toggleCart());
  }
  
  return (
    <button className={classes.button} onClick={showCart}>
      <span>My Cart</span>
      <span className={classes.badge}>{cartItems.length}</span>
    </button>
  );
};

export default CartButton;
