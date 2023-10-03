import { useDispatch, useSelector } from 'react-redux';
import classes from './CartButton.module.css';
import { uiActions } from '../../store/ui-slice';

const CartButton = (props) => {
  const cartItems = useSelector(state => state.cart.cartItems);
  const dispatch = useDispatch();

  const showCart = () => {
    dispatch(uiActions.toggleCart());
  }
  
  return (
    <button className={classes.button} onClick={showCart}>
      <span>My Cart</span>
      <span className={classes.badge}>{cartItems.length}</span>
    </button>
  );
};

export default CartButton;
