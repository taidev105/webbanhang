import React from 'react';
import './singleProductHero.scss';
import { Link } from 'react-router-dom';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import { useProductContext } from '../../context/product_context';
import { useFilterContext } from '../../context/filter_context';
import StorefrontIcon from '@material-ui/icons/Storefront';
const SingleProductHero = ({ page, category }) => {
  const { singleProduct } = useProductContext();
  const { filterCategoryUpdate } = useFilterContext();
  return (
    <div className='page-hero-section'>
      <div className='page-hero-container section-container'>
        <div className='page-hero-link-wrapper '>
          <Link to='/' className='hero-link'>
            Home
          </Link>
          <KeyboardArrowRightIcon />
          {page === 'products' && (
            <>
              <Link
                to='/products'
                onClick={() => filterCategoryUpdate(category)}
                className='hero-link'
              >
                {category}
              </Link>
              <KeyboardArrowRightIcon />
            </>
          )}
          <span className='hero-product-name'>{singleProduct.name}</span>
        </div>
        <div className='icon-back-wrapper'>
          {page === 'products' && (
            <Link to='/products' onClick={() => filterCategoryUpdate(category)}>
              <StorefrontIcon />
              <KeyboardArrowRightIcon />
              <span className='hover-text'>
                back to {category === 'All' ? 'All products' : category}
              </span>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default SingleProductHero;
