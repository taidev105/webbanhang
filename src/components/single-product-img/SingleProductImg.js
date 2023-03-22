import React, { useState } from 'react';
import { NextArrow, PrevArrow } from '../../utils/helper';
import './singleProductImg.scss';
const SingleProductImg = ({
  AllOfImg,
  onNew,
  onSale,
  stock,
  indexIMG,
  switchIMG,
  setHiddenInfo,
}) => {
  const [lenLeft, setLenLeft] = useState(0);
  const [lenTop, setLenTop] = useState(0);
  const lenSize = 200;
  const [height, setHeight] = useState(0);
  const [width, setWidth] = useState(0);
  const [ratioHeight, setRatioHeight] = useState(0);
  const [ratioWidth, setRatioWidth] = useState(0);
  const [hiddenZoom, setHiddenZoom] = useState(true);
  const moveEvent = (e) => {
    if (
      e.target.className === 'next-arrow' ||
      e.target.className === 'prev-arrow'
    ) {
      setHiddenInfo(true);
      setHiddenZoom(true);
    } else {
      setHiddenZoom(false);
      setHiddenInfo(false);
    }
    const imgEl = document.querySelector('.single-product-img');
    const imgResultEl = document.querySelector(
      '.single-product-img__img__zoom'
    );
    let imgTop,
      imgLeft,
      cx,
      cy,
      imgHeight,
      imgWidth,
      imgResultHeight,
      imgResultWidth;
    /*get the x and y positions of the image:*/
    imgTop = imgEl.getBoundingClientRect().top;
    imgLeft = imgEl.getBoundingClientRect().left;
    imgHeight = imgEl.getBoundingClientRect().height;
    setHeight(imgHeight);
    imgWidth = imgEl.getBoundingClientRect().width;
    setWidth(imgWidth);
    /*calculate the ratio between result DIV and lens: len 200x200*/
    imgResultHeight = imgResultEl.getBoundingClientRect().height;
    imgResultWidth = imgResultEl.getBoundingClientRect().width;
    setRatioHeight(imgResultHeight / lenSize);
    setRatioWidth(imgResultWidth / lenSize);
    e.preventDefault();
    /*calculate the cursor's x and y coordinates, relative to the image:*/
    cx = e.pageX - imgLeft;
    cy = e.pageY - imgTop;
    /*consider any page scrolling:*/
    cx = cx - window.pageXOffset - lenSize / 2;
    cy = cy - window.pageYOffset - lenSize / 2;
    /*prevent the lens from being positioned outside the image:*/
    if (cy < 0) {
      cy = 0;
    }
    if (cx < 0) {
      cx = 0;
    }
    if (imgHeight - cy < lenSize) {
      cy = imgHeight - lenSize;
    }
    if (imgWidth - cx < lenSize) {
      cx = imgWidth - lenSize;
    }
    setLenTop(cy);
    setLenLeft(cx);
  };
  return (
    <div
      className='single-product-img'
      onMouseOut={() => setHiddenInfo(true)}
      onMouseMove={moveEvent}
    >
      {AllOfImg &&
        AllOfImg.map((img, index) => {
          return (
            <div
              key={index}
              className={
                indexIMG === index
                  ? 'single-product-img__img active'
                  : 'single-product-img__img'
              }
              style={{
                backgroundImage: `url(${img.thumbnails.large.url})`,
              }}
            >
              <div
                className={hiddenZoom ? 'zoom_len hidden' : 'zoom_len'}
                style={{ top: `${lenTop}px`, left: `${lenLeft}px` }}
                onMouseMove={moveEvent}
              ></div>
              <div
                className={
                  hiddenZoom
                    ? 'single-product-img__img__zoom hidden'
                    : 'single-product-img__img__zoom'
                }
                style={{
                  backgroundImage: `url(${img.thumbnails.full.url}) `,
                  backgroundPosition: `-${lenLeft * ratioWidth}px -${
                    lenTop * ratioHeight
                  }px`,
                  backgroundSize: `${width * ratioWidth}px ${
                    height * ratioHeight
                  }px `,
                }}
              ></div>
            </div>
          );
        })}
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
      <NextArrow onClick={() => switchIMG('inc')} />
      <PrevArrow onClick={() => switchIMG('dec')} />
    </div>
  );
};

export default SingleProductImg;
