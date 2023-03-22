import React, { useState } from 'react';
import hero from '../../assets/hero.jpg';
import './wishListPage.scss';
import { useProductContext } from '../../context/product_context';
import Grid from '@material-ui/core/Grid';
import { ProductMiniItem } from '../../components';
import { Link } from 'react-router-dom';

import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
const WishListPage = () => {
  const [numberGrid, setNumberGrid] = useState(0);
  const { wishProducts } = useProductContext();
  return (
    <div className='content'>
      <div className='hero-section margin'>
        <div className='hero-img' style={{ backgroundImage: `url(${hero})` }}>
          <span>View your wishlist products</span>
        </div>
      </div>
      <div className='wish-list-section'>
        {wishProducts.length > 0 ? (
          <div className='sale-container section-container'>
            <div className='product-view-wrapper'>
              <div className='product-view'>
                {Array.from({ length: 3 }, (_, i) => i).map((a, index) => {
                  return (
                    <div
                      className={`product-view-btn column${index + 2} ${
                        numberGrid === index && 'active'
                      }`}
                      key={index}
                      onClick={() => setNumberGrid(index)}
                    ></div>
                  );
                })}
              </div>
            </div>
            <Grid container className='section-grid-content-wrapper'>
              {wishProducts.map((product, index) => {
                return (
                  <Grid
                    item
                    xs={12 / (numberGrid + 2)}
                    sm={12 / (numberGrid + 2)}
                    md={12 / (numberGrid + 2)}
                    lg={12 / (numberGrid + 2)}
                    key={index}
                  >
                    <ProductMiniItem
                      product={product}
                      isInWishListPage={true}
                    />
                  </Grid>
                );
              })}
            </Grid>
          </div>
        ) : (
          <div className='sale-container section-container'>
            <div className='shopping-cart--empty'>
              <FavoriteBorderIcon />
              <h4>WISHLIST IS EMPTY.</h4>
              <p>
                You don't have any products in the wishlist yet.
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
          </div>
        )}
      </div>
    </div>
  );
};

export default WishListPage;
