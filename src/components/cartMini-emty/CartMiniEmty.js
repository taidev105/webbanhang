import React from 'react';
import './cartMiniEmty.scss';
import RemoveShoppingCartOutlinedIcon from '@material-ui/icons/RemoveShoppingCartOutlined';
import { useButtonContext } from '../../context/button_context';
import { Link } from 'react-router-dom';
const CartMiniEmty = () => {
  const { miniAction } = useButtonContext();
  return (
    <div className='mini-wrap-2'>
      <div className='empty-mini-cart'>
        <RemoveShoppingCartOutlinedIcon />
        <p>Your cart is empty.</p>
        <Link
          to='./products'
          className='link-back-to-shop'
          onClick={() => miniAction('close', 'MiniCart')}
        >
          <span>RETURN TO SHOP</span>
        </Link>
      </div>
    </div>
  );
};

export default CartMiniEmty;
