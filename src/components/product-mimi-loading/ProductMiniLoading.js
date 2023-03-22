import React from 'react';
import './productMiniLoading.scss';
import LoaddingImg from '../loadding-img/LoaddingImg';
import { Skeleton } from '@material-ui/lab';
import { Link } from 'react-router-dom';
const ProductMiniLoading = () => {
  return (
    <div className='mini-product-item'>
      <div className='mini-product-img-container'>
        <Link to='#' className='mini-product-img-wrapper'>
          <LoaddingImg classImg={'mini-product-img'} />
        </Link>
      </div>
      <div className='mini-product-info'>
        <h3 className='mini-product-title'>
          <Skeleton width={140} />
          {/* <Link to='#'>Ultraboost DNA</Link>{' '} */}
        </h3>
        <span className='mini-product-price'>
          <Skeleton width={80} />
          <Skeleton width={40} />
          {/* <del>
            <span className='money'>{formatPrice(3333333)} </span>
          </del>
          <ins>
            <span className='money'>{formatPrice(3333333)} </span>
          </ins> */}
        </span>
      </div>
    </div>
  );
};

export default ProductMiniLoading;
