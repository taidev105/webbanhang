import React from 'react';
import trust_img2_360x from '../../assets/trust_img2_360x.png';
import './cartMiniProduct.scss';
import { Link } from 'react-router-dom';
import { useButtonContext } from '../../context/button_context';
import { useCartContext } from '../../context/cart_context';

import { formatPrice } from '../../utils/helper';
import { useUserContext } from '../../context/user_context';
import CartMiniProductItem from '../../components/cartMini-product-item/CartMiniProductItem';
const CartMiniProduct = ({ isMiniCartOpen }) => {
  const { miniAction } = useButtonContext();
  const { amountTotal, checkCart, showCartmessage } = useCartContext();
  const { cart, clearCart } = useCartContext();
  const { myUser, loginWithRedirect } = useUserContext();
  return (
    <div className='mini-wrap-2'>
      <div className='content-mini-cart'>
        <div className='mini-cart-list-wrapper'>
          {cart.length > 0 && (
            <ul className='mini-cart-list'>
              {cart.map((cartItem, index) => {
                return <CartMiniProductItem cartItem={cartItem} key={index} />;
              })}
              <div className='mini-cart-list__btn'>
                <button
                  className='sc-content-clear__btn'
                  onClick={() => {
                    clearCart();
                  }}
                >
                  CLEAR CART
                </button>
              </div>
            </ul>
          )}
        </div>
      </div>
      <div
        className={
          isMiniCartOpen ? 'footer-mini-cart open ' : 'footer-mini-cart '
        }
      >
        <div className='footer-mini-cart-total-wrapper'>
          <div className='footer-mini-cart-total'>
            <strong>Subtotal:</strong>
          </div>
          <div className='footer-mini-cart-price'>
            <span>{formatPrice(amountTotal)}</span>
          </div>
        </div>
        <p>Taxes, shipping and discounts codes calculated at checkout</p>
        <Link
          to='/cart'
          className='view-mini-cart-link'
          onClick={() => miniAction('close', 'MiniCart')}
        >
          VIEW CART
        </Link>
        {!myUser && (
          <button className='button_primary' onClick={loginWithRedirect}>
            LOGIN
          </button>
        )}
        {myUser && checkCart && (
          <Link
            to='/checkOut'
            className='button_primary link'
            onClick={() => miniAction('close', 'MiniCart')}
          >
            CHECK OUT
          </Link>
        )}
        {myUser && !checkCart && (
          <button
            onClick={() =>
              showCartmessage(
                'Warning!',
                'please fill quantity of cart item',
                '#ff9800'
              )
            }
            className='button_primary'
          >
            CHECK OUT
          </button>
        )}
        <img src={trust_img2_360x} alt='' />
      </div>
    </div>
  );
};

export default CartMiniProduct;
