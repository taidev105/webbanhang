import React from 'react';
import './toolbar.scss';
import { useButtonContext } from '../../context/button_context';
import { BsSearch, BsHeart } from 'react-icons/bs';
import { AiOutlineShop } from 'react-icons/ai';
import { BiUser } from 'react-icons/bi';
import { FiShoppingCart } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import FilterListOutlinedIcon from '@material-ui/icons/FilterListOutlined';
import SortIcon from '@material-ui/icons/Sort';
import { useCartContext } from '../../context/cart_context';
import { useUserContext } from '../../context/user_context';

const Toolbar = () => {
  const { miniAction, isInProductPage, currentPage } = useButtonContext();
  const { totalItem } = useCartContext();
  const { wishList, myUser, loginWithRedirect } = useUserContext();
  return (
    <div className='toolbar-section'>
      {!isInProductPage && (
        <div className='toolbar-icon-wrapper'>
          <Link to='/products' className='toolbar-link'>
            <span className='toolbar-icon'>
              <AiOutlineShop />
            </span>
            <span className='toolbar-name'>shopping</span>
          </Link>
        </div>
      )}
      {isInProductPage && (
        <>
          <div className='toolbar-icon-wrapper'>
            <button
              className='toolbar-link btn'
              onClick={() => miniAction('open', 'FilterMini')}
            >
              <span className='toolbar-icon'>
                <FilterListOutlinedIcon />
              </span>
              <span className='toolbar-name'>Filter</span>
            </button>
          </div>
          <div className='toolbar-icon-wrapper'>
            <button
              className='toolbar-link btn'
              onClick={() => miniAction('open', 'SortMini')}
            >
              <span className='toolbar-icon'>
                <SortIcon />
              </span>
              <span className='toolbar-name'>Sort</span>
            </button>
          </div>
        </>
      )}

      <div className='toolbar-icon-wrapper'>
        <button
          className='toolbar-link'
          onClick={() => miniAction('open', 'MiniSearch')}
        >
          <span className='toolbar-icon'>
            <BsSearch />
          </span>
          <span className='toolbar-name'>search</span>
        </button>
      </div>

      <div
        className={
          currentPage === '/cart'
            ? 'toolbar-icon-wrapper no-pointer'
            : 'toolbar-icon-wrapper '
        }
      >
        <button
          className='toolbar-link'
          onClick={() => miniAction('open', 'MiniCart')}
        >
          <span className='toolbar-icon'>
            <FiShoppingCart />
            <span className='toolbar-count'>{totalItem}</span>
          </span>
          <span className='toolbar-name'>Cart</span>
        </button>
      </div>
      <div
        className={
          currentPage === '/wishList'
            ? 'toolbar-icon-wrapper no-pointer'
            : 'toolbar-icon-wrapper '
        }
      >
        <Link to='/wishList' className='toolbar-link'>
          <span className='toolbar-icon'>
            <BsHeart />
            <span className='toolbar-count'>{wishList.length}</span>
          </span>
          <span className='toolbar-name'>Wishlist</span>
        </Link>
      </div>
      <div className='toolbar-icon-wrapper'>
        {myUser && (
          <Link to='/user' className='toolbar-link'>
            <span className='toolbar-icon'>
              <div className='user__img'>
                <img src={myUser.picture} alt='empty'></img>
              </div>
            </span>
            {myUser.nickname.length > 10 && (
              <span className='toolbar-name'>
                {myUser.nickname.slice(0, 10)}...
              </span>
            )}
            {myUser.nickname.length < 11 && (
              <span className='toolbar-name'>{myUser.nickname}</span>
            )}
          </Link>
        )}
        {!myUser && (
          <button className='toolbar-link' onClick={loginWithRedirect}>
            <span className='toolbar-icon'>
              <BiUser />
            </span>
            <span className='toolbar-name'>Account</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default Toolbar;
