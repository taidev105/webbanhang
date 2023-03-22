import React from 'react';
import {
  CollectionList,
  Banner,
  BlogInsta,
  Instagram,
  Trending,
  SlideShow,
  Sale,
} from '../components';

const HomePage = () => {
  return (
    <div className='content'>
      <SlideShow />
      <CollectionList />
      <Trending />
      <Banner />
      <Sale />
      <BlogInsta />
      <Instagram />
    </div>
  );
};

export default HomePage;
