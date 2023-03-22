import React, { useState, useEffect } from 'react';
import './cartMiniProductItem.scss';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import { BsTrash } from 'react-icons/bs';
import { useCartContext } from '../../context/cart_context';
import { AiOutlineEdit } from 'react-icons/ai';
import { formatPrice } from '../../utils/helper';
import { Link } from 'react-router-dom';
import { useButtonContext } from '../../context/button_context';
import { useProductContext } from '../../context/product_context';

const CartMiniProductItem = ({ cartItem }) => {
  const { toggleItemCart, setItemCartByInput, removeItemCart } =
    useCartContext();
  const {
    colorIndex,
    size,
    idCart,
    itemCount,
    singleProduct: { colorImg, id, name, onSale, price, stock },
    mess: { show, color },
  } = cartItem;
  const { miniAction } = useButtonContext();
  const { getSingleProduct, getSingleProductTSP, switchIMG, setIdCartTSP } =
    useProductContext();
  const { hiddenCartItemMess } = useCartContext();
  const mutipleAction = (id, indexFollowColor) => {
    getSingleProduct(id);
    miniAction('close', 'MiniCart');
    switchIMG(indexFollowColor);
  };
  const [inputNumber, setInputNumber] = useState('');
  useEffect(() => {
    if (itemCount !== 0) {
      setInputNumber(itemCount);
    } else {
      setInputNumber(0);
    } // eslint-disable-next-line
  }, [itemCount]);
  useEffect(() => {
    if (show) {
      setTimeout(() => {
        hiddenCartItemMess(idCart);
      }, 1500);
    } // eslint-disable-next-line
  }, [show]);
  //get first img of color
  let imgFollowColor = colorImg.find((item) => item.colorName === colorIndex)
    .img[0].thumbnails.large.url;
  //get first index of array of img
  const indexFollowColor = colorImg.find(
    (item) => item.colorName === colorIndex
  ).indexImg[0];
  return (
    <li>
      <Link
        to='/singleProduct'
        onClick={() => mutipleAction(id, indexFollowColor)}
        className='mini-cart-img'
      >
        <img src={imgFollowColor} alt='' />
      </Link>
      <div className='mini-cart-info'>
        <Link
          to='/singleProduct'
          onClick={() => mutipleAction(id, indexFollowColor)}
          className='mini-cart-name-product'
        >
          {name}
        </Link>
        <div className='mini-cart-meta'>
          <p className='mini-cart-meta-color'>
            {colorIndex} / {size}
          </p>
          <div className='mini-cart-meta-price'>
            {onSale ? (
              <div className='sc-item__meta__price'>
                <del>{formatPrice(price)}</del>
                <ins>{formatPrice(price * onSale)}</ins>
              </div>
            ) : (
              <div className='sc-item__meta__price'>
                <span>{formatPrice(price)}</span>
              </div>
            )}
          </div>
        </div>
        <div className='mini-cart-actions'>
          <div className='mini-cart-quantity'>
            <input
              type='number'
              className='mini-cart-quantity-input'
              data-idcart={idCart}
              value={inputNumber}
              onChange={setItemCartByInput}
            />
            <span
              className={show === 'max' ? 'hoverText show' : 'hoverText'}
              style={{ backgroundColor: color }}
            >
              <span>{stock}</span> items is max
            </span>
            <span
              className={itemCount === 0 ? 'hoverText show' : 'hoverText'}
              style={{ backgroundColor: '#47a8f5' }}
            >
              Add item quantity
            </span>
            {itemCount !== 1 ? (
              <button
                className='mini-cart-minus-btn'
                onClick={() => toggleItemCart(idCart, 'dec')}
              >
                <RemoveIcon />
              </button>
            ) : (
              <button
                className='mini-cart-minus-btn'
                onClick={() => {
                  toggleItemCart(idCart, 'dec');
                  removeItemCart(idCart);
                }}
              >
                <BsTrash />
              </button>
            )}
            <button
              className='mini-cart-plus-btn'
              onClick={() => toggleItemCart(idCart, 'inc')}
            >
              <AddIcon />
            </button>
          </div>
          <div className='wrapper-btn-mini-cart'>
            <button
              className='mini-cart-edit-btn'
              onClick={() => {
                getSingleProductTSP(id);
                setIdCartTSP(idCart);
                miniAction('open', 'CartEditModal');
                miniAction('open', 'CartModal');
              }}
            >
              <span>Edit item</span>
              <AiOutlineEdit />
            </button>
            <button
              className='mini-cart-delete-btn'
              onClick={() => removeItemCart(idCart)}
            >
              <span>Remove this item</span>
              <BsTrash />
            </button>
          </div>
        </div>
      </div>
    </li>
  );
};

export default CartMiniProductItem;
