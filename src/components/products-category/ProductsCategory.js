import React from 'react';
import './productsCategory.scss';
import { useProductContext } from '../../context/product_context';
import { useFilterContext } from '../../context/filter_context';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import hero from '../../assets/hero.jpg';
const ProductCategory = () => {
  const { category } = useProductContext();
  const openClose = (e) => {
    e.target.parentElement.classList.toggle('active');
  };
  const {
    filterUpdate,
    filter: { category: filterCategory },
  } = useFilterContext();
  const openCloseClick = (e) => {
    e.target.parentElement.parentElement.parentElement.classList.toggle(
      'active'
    );
    filterUpdate(e);
  };
  return (
    <>
      <div className='category-section active'>
        <div className='category-title' onClick={openClose}>
          <h3>categories</h3>
          <ExpandLessIcon />
        </div>
        <ul className='category-list'>
          <li className='category-item'>
            <button
              className={
                filterCategory === 'All'
                  ? 'category-item-btn active'
                  : 'category-item-btn '
              }
              name='category'
              data-category='All'
              onClick={openCloseClick}
            >
              All Products
            </button>
          </li>
          {category.map((item, index) => {
            return (
              <li className='category-item' key={index}>
                <button
                  className={
                    filterCategory === item
                      ? 'category-item-btn active'
                      : 'category-item-btn '
                  }
                  name='category'
                  key={index}
                  data-category={item}
                  onClick={openCloseClick}
                >
                  {item}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
      <div className='hero-section'>
        <div className='hero-img' style={{ backgroundImage: `url(${hero})` }}>
          <span>
            {filterCategory === 'All' ? 'All Products' : filterCategory}
          </span>
        </div>
      </div>
    </>
  );
};

export default ProductCategory;
