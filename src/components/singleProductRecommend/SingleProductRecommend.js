import React, { useEffect } from 'react';
import './singleProductRecommend.scss';
import Slider from 'react-slick';
import { useProductContext } from '../../context/product_context';
import ProductMiniItem from '../product-mini-item/ProductMiniItem';
import ProductMiniLoading from '../../components/product-mimi-loading/ProductMiniLoading';
const SingleProductRecommend = () => {
  const { recommendProducts, viewedProducts } = useProductContext();

  var settingsSingleProduct = {
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 0,
    infinite: true,
    responsive: [
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
    ],
  };
  useEffect(() => {
    document
      .querySelector('.single-product-recommendations-container')
      .addEventListener('mousedown', (e) => {
        e.preventDefault();
      });
  });

  return (
    <div className='single-product-recommendations-section'>
      <div className='single-product-recommendations-container section-container'>
        {recommendProducts.length > 1 && viewedProducts.length > 1 && (
          <div className='section-content-wrapper'>
            <div className='sp-recommendations-content'>
              <div className='sp-recommendations-content_title'>
                <h3>You may also like</h3>
              </div>
              <Slider {...settingsSingleProduct}>
                {recommendProducts.map((product, index) => {
                  return (
                    <ProductMiniItem
                      product={product}
                      key={index}
                      recommendProducts={recommendProducts}
                    />
                  );
                })}
              </Slider>
            </div>
            <div className='sp-recommendations-content'>
              <div className='sp-recommendations-content_title'>
                <h3>Recently viewed products</h3>
              </div>

              <Slider {...settingsSingleProduct}>
                {viewedProducts
                  .slice(1, viewedProducts.length)
                  .map((product, index) => {
                    return <ProductMiniItem product={product} key={index} />;
                  })}
              </Slider>
            </div>
          </div>
        )}
        {recommendProducts.length === 1 && viewedProducts.length === 1 && (
          <div className='section-content-wrapper'>
            <div className='sp-recommendations-content'>
              <div className='sp-recommendations-content_title'>
                <h3>You may also like</h3>
              </div>
              <Slider {...settingsSingleProduct}>
                {Array.from({ length: 4 }, (_, i) => i).map(
                  (product, index) => {
                    return <ProductMiniLoading />;
                  }
                )}
              </Slider>
            </div>
            <div className='sp-recommendations-content'>
              <div className='sp-recommendations-content_title'>
                <h3>Recently viewed products</h3>
              </div>
              <Slider {...settingsSingleProduct}>
                {Array.from({ length: 4 }, (_, i) => i).map(
                  (product, index) => {
                    return <ProductMiniLoading />;
                  }
                )}
              </Slider>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SingleProductRecommend;
