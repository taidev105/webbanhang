import React from 'react';
import { useParams } from 'react-router-dom';
import {
  SingleProductHero,
  SingleProductContent,
  SingleProductRecommend,
} from '../components';
import { useProductContext } from '../context/product_context';
const SingleProductPage = () => {
  const { page, category } = useParams();
  const { singleProduct } = useProductContext();
  return (
    <div className='content'>
      <SingleProductHero page={page} category={category} />
      {Object.keys(singleProduct).length > 0 ? (
        <SingleProductContent product={singleProduct} />
      ) : (
        <h2>Sorry,there is not singleProduct</h2>
      )}
      <SingleProductRecommend />
    </div>
  );
};

export default SingleProductPage;
