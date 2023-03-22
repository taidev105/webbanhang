import React, { useState, useEffect } from 'react';
import './singleProductInfo.scss';
import { formatPrice } from '../../utils/helper';
import Box from '@material-ui/core/Box';
import Rating from '@material-ui/lab/Rating';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import payment from '../../assets/payment.png';
import { Link } from 'react-router-dom';
import { icons } from '../../utils/data';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { useFilterContext } from '../../context/filter_context';
import { useProductContext } from '../../context/product_context';
import { useButtonContext } from '../../context/button_context';
import { useCartContext } from '../../context/cart_context';
import { useUserContext } from '../../context/user_context';

const SingleProductInfo = ({
  name,
  price,
  review,
  colorImg,
  size,
  category,
  id,
  rate,
  description,
  stock,
  brand,
  colorIndex,
  switchIMG,
  hiddenInfo,
  addToCart,
  setSingleProductSize,
  singleProductAction,
  setItemCount,
  setItemCountByInput,
}) => {
  const { wishList, addToWishList, removeWishList } = useUserContext();
  const { clearCart, showCartmessage } = useCartContext();
  const { getSingleProduct } = useProductContext();
  const {
    size: sizeAction,
    itemCount,
    productAlertMess: { show, color },
  } = singleProductAction;
  const { filterBrandUpdate } = useFilterContext();
  const { miniAction, currentPage } = useButtonContext();
  const [shake, setShake] = useState(false);

  useEffect(() => {
    let timeout;
    if (shake === true) {
      timeout = setTimeout(() => {
        setShake(false);
      }, 1500);
    } else {
      timeout = setTimeout(() => {
        setShake(true);
      }, 5000);
    }
    return () => {
      clearTimeout(timeout);
    }; // eslint-disable-next-line
  }, [shake]);

  return (
    <div
      className={
        !hiddenInfo ? 'single-product-info hidden' : 'single-product-info'
      }
    >
      <div className='single-product-name-wrapper'>
        <Link
          to='/singleProduct/none/none'
          onClick={() => {
            getSingleProduct(id);
            miniAction('close', 'SingleProductModal');
          }}
        >
          <h3 className='single-product-name'>{name}</h3>
        </Link>
      </div>
      <div className='single-product-price-wrapper'>
        <span className='single-product-price'>{formatPrice(price)}</span>
        <div className='single-product-rating-wrapper'>
          <Box component='fieldset' mb={3} borderColor='transparent'>
            <Rating name='read-only' value={rate} readOnly size='large' />
            <span className='single-product-count-review'>
              ({review} review)
            </span>
          </Box>
        </div>
      </div>
      <div className='single-product-decription-wrapper'>
        <p>{description}</p>
      </div>
      {colorImg.length > 1 && (
        <div className='single-product-color-wrapper'>
          <div className='single-product-color-title'>
            <h4>COLOR: {colorIndex}</h4>
          </div>
          <div className='product-mini-watch-list'>
            {colorImg.map((color, index) => {
              return (
                <span
                  className={
                    color.colorName === colorIndex
                      ? `watch-list-color active`
                      : `watch-list-color `
                  }
                  onClick={() => switchIMG(color.indexImg[0])}
                  style={{ backgroundColor: `${color.colorCode}` }}
                  // onMouseOver={() => {
                  //   setLockImgHover(false);
                  //   setIndexImg(index);
                  // }}
                  key={index}
                >
                  <span className='watch-list-hover-text'>
                    {color.colorName}
                  </span>
                </span>
              );
            })}
          </div>
        </div>
      )}
      <div className='single-product-size-wrapper'>
        <div className='single-product-size-title'>
          <h4>SIZE: {sizeAction}</h4>
        </div>
        <div className='single-product-size'>
          {size.map((item, index) => {
            return (
              <span
                key={index}
                className={
                  item === sizeAction
                    ? 'single-product-size-item active'
                    : 'single-product-size-item'
                }
                onClick={() => setSingleProductSize(item)}
              >
                {item}
              </span>
            );
          })}
        </div>
      </div>
      <div className='single-product-cart-wrapper'>
        {stock > 0 && (
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
        )}
        {stock === 0 && (
          <div className='out-of-stock-btn-wrapper'>Out Of Stock</div>
        )}
        <div className='single-product-wishList-wrapper'>
          {!wishList.some((item) => item === id) ? (
            <span
              className='single-product-wishList'
              onClick={() => addToWishList(id)}
            >
              <FavoriteBorderIcon />
              <span className='single-product-wishList-hover-text'>
                Add To Wishlist
              </span>
            </span>
          ) : (
            <span
              className='single-product-wishList active'
              onClick={() => removeWishList(id, true)}
            >
              <FavoriteIcon />
              <span className='single-product-wishList-hover-text'>
                Remove Wishlist
              </span>
            </span>
          )}
        </div>
        {stock > 0 && (
          <div
            className={
              shake
                ? 'add-to-cart-btn-wrapper shake'
                : 'add-to-cart-btn-wrapper'
            }
          >
            <button
              className={
                isNaN(itemCount)
                  ? 'add-to-cart-btn button_primary no-pointer'
                  : 'add-to-cart-btn button_primary'
              }
              onClick={() => {
                addToCart();
                if (currentPage !== '/cart') {
                  miniAction('open', 'MiniCart');
                }
                if (currentPage === '/cart') {
                  showCartmessage('Success!', 'added item to cart', '#2fb886');
                }
                miniAction('close', 'SingleProductModal');
              }}
            >
              ADD TO CART
            </button>
          </div>
        )}
      </div>
      <div className='single-product-payment-wrapper'>
        <img src={payment} alt='' />
      </div>
      <div className='single-product-meta'>
        <span className='simple-product-stock category-tag'>
          Vendor:
          <Link
            to='/products'
            onClick={() => filterBrandUpdate(brand)}
            title=''
          >
            {brand}
          </Link>
        </span>
        <span className='sku-wrapper'>
          SKU:
          <span className='sku'>{id}</span>
        </span>
        <span className='simple-product-stock sku-wrapper'>
          Availability:{' '}
          <span className='sku--blod'>
            {stock > 0 ? 'In Stock' : 'Out Of Stock'}
          </span>
        </span>
        <span className='category-tag'>
          Categories:{' '}
          {category.map((item, index) => {
            return (
              <Link to='/products' title='' key={index}>
                {item}
              </Link>
            );
          })}
        </span>
      </div>
      <div className='social-icon-wrapper' onClick={clearCart}>
        <div className='social-footer-container'>
          {icons.map((icon, index) => {
            return (
              <Link to='#' className={`social-icon ${icon.name}`} key={index}>
                {icon.icon}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SingleProductInfo;
