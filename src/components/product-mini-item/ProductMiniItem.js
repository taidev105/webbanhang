import React, { useState, useEffect } from 'react';
import './productMiniItem.scss';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { formatPrice } from '../../utils/helper';
import VisibilityOutlinedIcon from '@material-ui/icons/VisibilityOutlined';
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined';
import DeleteForeverOutlinedIcon from '@material-ui/icons/DeleteForeverOutlined';
import { useProductContext } from '../../context/product_context';
import { Link } from 'react-router-dom';
import { useButtonContext } from '../../context/button_context';
import { useUserContext } from '../../context/user_context';
import { useFilterContext } from '../../context/filter_context';
const ProductMiniItem = ({
  product,
  page,
  category,
  paginationPage,
  handleSubHover,
  isInWishListPage,
  recommendProducts,
}) => {
  const { colorImg, size, onNew, onSale, name, price, stock, id } = product;
  const { wishList, addToWishList, removeWishList } = useUserContext();
  const [indexImg, setIndexImg] = useState(0);
  const [lockImgHover, setLockImgHover] = useState(true);
  const { getSingleProductTSP, getSingleProduct } = useProductContext();
  const { miniAction } = useButtonContext();
  const { filteredProducts } = useFilterContext();
  useEffect(() => {
    setLockImgHover(true);
    setIndexImg(0); // eslint-disable-next-line
  }, [paginationPage, wishList, recommendProducts, filteredProducts]);
  return (
    <div className='mini-product-item'>
      <div className='mini-product-img-container'>
        <Link
          to={`/singleProduct/${page}/${category}`}
          className='mini-product-img-wrapper'
          onClick={() => {
            getSingleProduct(id);
            if (handleSubHover) {
              handleSubHover();
            }
          }}
        >
          {colorImg[indexImg] && (
            <div
              className={
                lockImgHover
                  ? `mini-product-img`
                  : `mini-product-img lock-scale`
              }
              style={{
                backgroundImage: `url(${colorImg[indexImg].img[0].thumbnails.large.url})`,
              }}
            ></div>
          )}
        </Link>
        <div className='mini-product-img-wrapper_hover'>
          {lockImgHover && (
            <div
              className='mini-product-img_hover'
              style={{
                backgroundImage: `url(${colorImg[0].img[1].thumbnails.large.url})`,
              }}
            ></div>
          )}
        </div>
        <div className='mini-product-size-contain'>
          {size && <p>{size.join()}</p>}
        </div>
        {wishList && !isInWishListPage && (
          <div className='mini-product-wishlist-container'>
            {!wishList.some((item) => item === id) ? (
              <button
                className='wishList-link'
                onClick={() => addToWishList(id)}
              >
                <div className='wish-list'>
                  <FavoriteBorderIcon />
                  <span className='hoverText'>Add to Wishlist</span>
                </div>
              </button>
            ) : (
              <button
                className='wishList-link active'
                onClick={() => removeWishList(id, true)}
              >
                <div className='wish-list'>
                  <span className='hoverText'>Revome Wishlist</span>
                  <FavoriteIcon />
                </div>
              </button>
            )}
          </div>
        )}
        {isInWishListPage && (
          <div className='mini-product-wishlist-container'>
            <button
              className='wishList-link'
              onClick={() => removeWishList(id)}
            >
              <div className='wish-list-trash'>
                <span className='hoverText'>Revome Wishlist</span>
                <DeleteForeverOutlinedIcon />
              </div>
            </button>
          </div>
        )}
        <div className='mini-product-btn-container'>
          <button
            onClick={() => {
              getSingleProductTSP(id);
              miniAction('open', 'SingleProductModal');
            }}
          >
            <span>Quick View</span>
            <VisibilityOutlinedIcon />
          </button>
          <button
            onClick={() => {
              getSingleProductTSP(id);
              miniAction('open', 'CartModal');
              miniAction('close', 'CartEditModal');
            }}
          >
            <span>Quick Shop</span>
            <ShoppingCartOutlinedIcon />
          </button>
        </div>
      </div>
      <span className='label-mini-product-container'>
        {onNew && (
          <span className='onNew-lable'>
            <span>New</span>
          </span>
        )}
        {onSale && (
          <span className='onSale-lable'>
            <span>-{onSale * 100}%</span>
          </span>
        )}
        {stock === 0 && (
          <span className='out-of-stock-lable'>
            <span>Sold out</span>
          </span>
        )}
      </span>
      <div className='mini-product-info'>
        <h3 className='mini-product-title'>
          <Link
            to={`/singleProduct/${page}/${category}`}
            onClick={() => {
              getSingleProduct(id);

              if (handleSubHover) {
                handleSubHover();
              }
            }}
          >
            {name}
          </Link>{' '}
        </h3>
        <span className='mini-product-price'>
          {!onSale && <span className='money'>{formatPrice(price)}</span>}
          {onSale && (
            <>
              <del>
                <span className='money'>{formatPrice(price)} </span>
              </del>
              <ins>
                <span className='money'>
                  {formatPrice(price * (1 - onSale))}{' '}
                </span>
              </ins>
            </>
          )}
        </span>
        {colorImg.length > 1 && (
          <div className='product-mini-watch-list'>
            {colorImg.map((color, index) => {
              return (
                <span
                  className={
                    index === indexImg
                      ? `watch-list-color watch-list-color-activated`
                      : `watch-list-color `
                  }
                  style={{ backgroundColor: `${color.colorCode}` }}
                  onMouseOver={() => {
                    setLockImgHover(false);
                    setIndexImg(index);
                  }}
                  key={index}
                >
                  <span className='watch-list-hover-text'>
                    {color.colorName}
                  </span>
                </span>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductMiniItem;
