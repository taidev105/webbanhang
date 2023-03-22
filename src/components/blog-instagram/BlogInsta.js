import React from 'react';
import './blogInsta.scss';
import Slider from 'react-slick';
import Loadding from '../loadding-img/LoaddingImg';
import { NextArrow, PrevArrow } from '../../utils/helper';
import BlogItem from '../blog-item/BlogItem';
import { useProductContext } from '../../context/product_context';
import { Link } from 'react-router-dom';
const BlogInsta = () => {
  const { blogHomes: blogs } = useProductContext();
  var settingsBlog = {
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    initialSlide: 0,
    infinite: false,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 600,
        settings: {
          // fade: true,
          lazyLoad: true,
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
    ],
  };

  if (blogs.length === 0) {
    return (
      <div className='blog-section'>
        <div className='blog-container section-container'>
          <div className='section-content-wrapper'>
            <div className='section-title-container'>
              <h3>
                <span>LATES FROM BLOG</span>
              </h3>
              <span>The freshest and most exciting news</span>
            </div>
            <div className='slide-blog-container'>
              <Slider {...settingsBlog}>
                {Array.from({ length: 3 }, (_, i) => i).map((blog, index) => {
                  return (
                    <article className='blog-slide padding' key={index}>
                      <Link to='#'>
                        <Loadding classImg={'img-blog'} />
                      </Link>
                      <div className='post-info'>
                        <h4 className='post-title'>
                          <Link to='#'>Style for couple in Weeding season</Link>
                        </h4>
                        <span className='post-author'>
                          by <span className='bold'>Henrry</span>
                        </span>
                        <span className='post-time'>
                          on{' '}
                          <span className='bold'>
                            <time dateTime='2020-04-06T02:17:00Z'>
                              April 6, 2020
                            </time>
                          </span>
                        </span>
                      </div>
                      <div className='post-content'>
                        <span>
                          Typography is the work of typesetters,
                          compositors,typographers, graphic designers, art
                          directors, mangartists, ...
                        </span>
                      </div>
                    </article>
                  );
                })}
              </Slider>
            </div>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className='blog-section'>
      <div className='blog-container section-container'>
        <div className='section-content-wrapper'>
          <div className='section-title-container'>
            <h3>
              <span>LATES FROM BLOG</span>
            </h3>
            <span>The freshest and most exciting news</span>
          </div>
          <div className='slide-blog-container'>
            <Slider {...settingsBlog}>
              {blogs
                .filter((b) => b.showing)
                .map((blog, index) => {
                  return <BlogItem blog={blog} key={index} />;
                })}
            </Slider>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogInsta;
