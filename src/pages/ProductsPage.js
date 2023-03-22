import React from 'react';
import { ProductsCategory, FilterProduct } from '../components';

const ProductsPage = () => {
  return (
    <div className='content'>
      <ProductsCategory />
      <FilterProduct />
    </div>
  );
};

export default ProductsPage;
