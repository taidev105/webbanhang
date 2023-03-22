import React, { useState } from 'react';
import './trending.scss';
import Grid from '@material-ui/core/Grid';
import ProductMiniItem from '../product-mini-item/ProductMiniItem';
import ProductMiniLoading from '../product-mimi-loading/ProductMiniLoading';
import { useProductContext } from '../../context/product_context';

const Trending = () => {
  const { trendingProducts: trending, productsLoading: loading } =
    useProductContext();

  const [number, setNumber] = useState(8);

  return (
    <div className='trending-section'>
      <div className='trending-container section-container'>
        <div className='trending-wrapper section-content-wrapper'>
          <div className='section-title-container'>
            <h3>
              <span>TRENDING</span>
            </h3>
            <span>Top view in this week</span>
          </div>
          <div className='trending-product-wrapper'>
            {loading ? (
              <Grid container className='section-grid-content-wrapper'>
                {Array.from({ length: 8 }, (_, i) => i).map(
                  (product, index) => {
                    return (
                      <Grid item xs={6} sm={3} key={index}>
                        <ProductMiniLoading />
                      </Grid>
                    );
                  }
                )}
              </Grid>
            ) : (
              <Grid container className='section-grid-content-wrapper'>
                {trending.slice(0, number).map((product, index) => {
                  return (
                    <Grid item xs={6} sm={3} key={index}>
                      <ProductMiniItem
                        product={product}
                        key={index}
                        page={'home'}
                        category={''}
                      />
                    </Grid>
                  );
                })}
              </Grid>
            )}
          </div>
          <div
            className={
              number === 16
                ? 'trending-load-more-wrapper none'
                : 'trending-load-more-wrapper'
            }
          >
            <button
              className='trending-load-more'
              onClick={() => setNumber(16)}
            >
              Load More
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Trending;
