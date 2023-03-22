import React, { useState, useEffect, useRef } from 'react';
import './singleProductContent.scss';
import Grid from '@material-ui/core/Grid';

import Slider from 'react-slick';
import { NextArrow, PrevArrow } from '../../utils/helper';
import SingleProductImg from '../single-product-img/SingleProductImg';
import SingleProductInfo from '../single-product-info/SingleProductInfo';
import { useProductContext } from '../../context/product_context';
import { useCartContext } from '../../context/cart_context';
const SingleProductContent = () => {
  const {
    singleProduct: product,
    setSingleProductSize,
    singleProductAction,
    setItemCount,
    setItemCountByInput,
    singleProductAction: { indexIMG, colorIndex },
    switchIMG,
  } = useProductContext();
  const { addToCart } = useCartContext();
  const [hiddenInfo, setHiddenInfo] = useState(true);
  const { AllOfImg } = product;
  const sliderRef = useRef();
  const [mouseDown, setMouseDown] = useState(0);
  const [mouseUp, setMouseUp] = useState(0);
  useEffect(() => {
    document
      .querySelector('.single-product-img')
      .addEventListener('mousedown', (e) => {
        e.preventDefault();
        setMouseDown(e.x);
      });
    document
      .querySelector('.single-product-img')
      .addEventListener('mouseup', (e) => {
        setMouseUp(e.x);
      }); // eslint-disable-next-line
  }, []);
  useEffect(() => {
    if (mouseDown !== mouseUp) {
      if (mouseDown > mouseUp) {
        switchIMG('inc');
      }
      if (mouseDown < mouseUp) {
        switchIMG('dec');
      }
    }
    setMouseDown(0);
    setMouseUp(0); // eslint-disable-next-line
  }, [mouseUp]);
  //set position of slider
  const handleOnClick = (index) => {
    sliderRef.current.slickGoTo(index);
  };
  //set color follow index
  useEffect(() => {
    handleOnClick(indexIMG - 2); // eslint-disable-next-line
  }, [indexIMG]);

  var settingsSingleProduct = {
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 5,
    initialSlide: 0,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    infinite: false,
  };

  return (
    <div className='single-product-section'>
      <div className='single-product-container section-container'>
        <div className='section-content-wrapper'>
          <Grid container className='section-grid-content-wrapper'>
            <Grid item xs={12} sm={6} md={6} lg={6}>
              <SingleProductImg
                {...product}
                indexIMG={indexIMG}
                switchIMG={switchIMG}
                setHiddenInfo={setHiddenInfo}
                hiddenInfo={hiddenInfo}
              />
              <div className='single-product-thumbnails-list'>
                <Slider ref={sliderRef} {...settingsSingleProduct}>
                  {AllOfImg.map((img, index) => {
                    return (
                      <div className='single-product-thumbnails' key={index}>
                        <div
                          className={
                            index === indexIMG
                              ? 'single-product-thumbnails__img active'
                              : 'single-product-thumbnails__img'
                          }
                          style={{
                            backgroundImage: `url(${img.thumbnails.large.url})`,
                          }}
                          onClick={() => switchIMG(index)}
                        ></div>
                      </div>
                    );
                  })}
                </Slider>
              </div>
            </Grid>
            <Grid item xs={12} sm={6} md={6} lg={6}>
              <SingleProductInfo
                {...product}
                addToCart={addToCart}
                colorIndex={colorIndex}
                hiddenInfo={hiddenInfo}
                switchIMG={switchIMG}
                setSingleProductSize={setSingleProductSize}
                singleProductAction={singleProductAction}
                setItemCount={setItemCount}
                setItemCountByInput={setItemCountByInput}
              />
            </Grid>
          </Grid>
        </div>
      </div>
    </div>
  );
};

export default SingleProductContent;
