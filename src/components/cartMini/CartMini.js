import React from 'react';
import './cartMini.scss';
import { useButtonContext } from '../../context/button_context';
import RotateCloseBtn from '../rotateCloseBtn/RotateCloseBtn';
import CartMiniProduct from '../cartMini-product/CartMiniProduct';
import CartMiniEmty from '../cartMini-emty/CartMiniEmty';
import { useCartContext } from '../../context/cart_context';
const CartMini = () => {
  const { isMiniCartOpen, miniAction } = useButtonContext();
  const action = () => {
    miniAction('close', 'MiniCart');
  };
  const { cart } = useCartContext();
  return (
    <div
      className={isMiniCartOpen ? 'cart-mini cart-mini-openned' : 'cart-mini'}
    >
      <div className='mini-wrap'>
        <div className=' mini-header-title mini-header-title-shadow'>
          <h3>SHOPPING CART</h3>
          <RotateCloseBtn action={action} />
        </div>
        {cart.length > 0 ? (
          <CartMiniProduct isMiniCartOpen={isMiniCartOpen} />
        ) : (
          <CartMiniEmty />
        )}
      </div>
    </div>
  );
};
export default CartMini;
