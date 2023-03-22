import React from 'react';
import './cartToolBar.scss';
// import Gird from '@material-ui/core/Gird';
import { useCartContext } from '../../context/cart_context';
import { useProductContext } from '../../context/product_context';
import { formatPrice, scrollToTop } from '../../utils/helper';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import { useButtonContext } from '../../context/button_context';
const CartToolBar = ({ hiddenToolbar }) => {
  //ctb is cart-tool-bar
  const {
    singleProduct: { name, price, AllOfImg, stock, colorImg },
    singleProductAction: {
      indexIMG,
      size,
      itemCount,
      productAlertMess: { show, color },
    },
  } = useProductContext();
  const { addToCart } = useCartContext();
  const { miniAction } = useButtonContext();
  const { setItemCount, setItemCountByInput } = useProductContext();

  let colorFollowIndexIMG = 'none';
  if (colorImg) {
    colorFollowIndexIMG = colorImg.find((item) => {
      return item.indexImg.some((i) => i === indexIMG);
    }).colorName;
  }
  return (
    <div className={hiddenToolbar ? 'ctb-section hidden' : 'ctb-section'}>
      <div className='ctb-contain section-container'>
        <div className='ctb__info'>
          <div className='ctb__info__img'>
            {AllOfImg && (
              <img
                src={AllOfImg[indexIMG].thumbnails.large.url}
                alt='empty'
              ></img>
            )}
          </div>
          <div className='ctb__info__info'>
            <span className='ctb__info__info_name'>{name}</span>
            {colorImg && (
              <span
                className='ctb__info__info_size'
                onClick={() => scrollToTop(0)}
              >
                {size}/{colorFollowIndexIMG}
              </span>
            )}
          </div>
        </div>
        {/* cart */}
        <div className='ctb__cart'>
          <span className='ctb__cart__price'>{formatPrice(price)}</span>
          <div className='ctb__cart__amount-btn'>
            <div className='mini-cart-quantity'>
              <span
                className={show === 'max' ? 'hoverText show' : 'hoverText'}
                style={{ backgroundColor: color }}
              >
                <span>{stock}</span> items is max
              </span>
              <span
                className={show === 'min' ? 'hoverText show' : 'hoverText'}
                style={{ backgroundColor: color }}
              >
                <span>1</span> item is min
              </span>
              <span
                className={isNaN(itemCount) ? 'hoverText show' : 'hoverText'}
                style={{ backgroundColor: '#47a8f5' }}
              >
                Add item quantity
              </span>
              <input
                type='number'
                className='mini-cart-quantity-input'
                value={itemCount}
                onChange={setItemCountByInput}
              />
              <button className='mini-cart-minus-btn'>
                <RemoveIcon
                  onClick={() => {
                    setItemCount('dec');
                  }}
                />
              </button>
              <button
                className='mini-cart-plus-btn'
                onClick={() => {
                  setItemCount('inc');
                }}
              >
                <AddIcon />
              </button>
            </div>
          </div>
          <button
            className={
              isNaN(itemCount)
                ? 'ctb__cart__add-btn no-pointer'
                : 'ctb__cart__add-btn'
            }
            onClick={() => {
              addToCart();
              miniAction('open', 'MiniCart');
              miniAction('close', 'SingleProductModal');
            }}
          >
            ADD TO CART
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartToolBar;
