import React from 'react';
import './cartPage.scss';
import { CartPageItem, SingleProductRecommend } from '../../components';
import hero from '../../assets/hero.jpg';
import Grid from '@material-ui/core/Grid';
import { useCartContext } from '../../context/cart_context';
import payment from '../../assets/payment.png';
import { formatPrice, scrollToTop } from '../../utils/helper';
import RemoveShoppingCartOutlinedIcon from '@material-ui/icons/RemoveShoppingCartOutlined';
import { Link } from 'react-router-dom';
import { useUserContext } from '../../context/user_context';
const CartPage = () => {
  const { cart, amountTotal, clearCart, checkCart, showCartmessage } =
    useCartContext();
  const { myUser, logout } = useUserContext();
  return (
    <div className='content'>
      <div className='hero-section margin'>
        <div className='hero-img' style={{ backgroundImage: `url(${hero})` }}>
          <span>SHOPPING CART</span>
        </div>
      </div>
      <div className='shopping-cart-section'>
        <div className='shopping-cart-container section-container'>
          {cart.length > 0 ? (
            <>
              <div className='cart-header'>
                <Grid container>
                  <Grid item sm={5} className='sc-item flex-left header'>
                    <span className='cart-header-title header'>PRODUCT</span>
                  </Grid>
                  <Grid item sm={3} className='sc-item header'>
                    <span className='cart-header-title '>PRICE</span>
                  </Grid>
                  <Grid item sm={2} className='sc-item header'>
                    <span className='cart-header-title '>QUANTITY</span>
                  </Grid>
                  <Grid item sm={2} className='sc-item flex-right header'>
                    <span className='cart-header-title '>TOTAL</span>
                  </Grid>
                </Grid>
              </div>
              <div className='shopping-cart-content'>
                {cart.map((cartItem, index) => {
                  return <CartPageItem key={index} cartItem={cartItem} />;
                })}
                <button
                  className='sc-content-clear__btn'
                  onClick={() => {
                    clearCart();
                    scrollToTop(0);
                  }}
                >
                  CLEAR CART
                </button>
              </div>
              <div className='shopping-cart-footer'>
                <Grid container>
                  <Grid item xs={12} sm={6}></Grid>
                  <Grid item xs={12} sm={6}>
                    <div className='sc-checkout'>
                      <span className='sc-checkout__sub-total'>
                        SUBTOTAL: <span>{formatPrice(amountTotal)}</span>
                      </span>
                      <span className='sc-checkout__condition'>
                        Taxes, shipping and discounts codes calculated at
                        checkout
                      </span>
                      {!myUser && (
                        <button
                          className='button_primary'
                          onClick={() =>
                            logout({ returnTo: window.location.origin })
                          }
                        >
                          LOGIN
                        </button>
                      )}
                      {myUser && checkCart && (
                        <Link to='/checkOut' className='button_primary'>
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
                      <img
                        src={payment}
                        alt='logo'
                        className='sc-checkout__payment-logo'
                      />
                    </div>
                  </Grid>
                </Grid>
              </div>
            </>
          ) : (
            <div className='shopping-cart--empty'>
              <RemoveShoppingCartOutlinedIcon />
              <h4>Your cart is empty.</h4>
              <p>
                Before proceed to checkout you must add some products to your
                shopping cart.
                <br /> You will find a lot of interesting products on our "Shop"
                page.
              </p>
              <Link
                to='/products'
                className='link-back-to-shop button_primary '
              >
                <span>RETURN TO SHOP</span>
              </Link>
            </div>
          )}
        </div>
      </div>
      <SingleProductRecommend />
    </div>
  );
};

export default CartPage;
