import React, { useState, useEffect } from 'react';
import { BlogItem } from '../../components';
import { NextArrow, PrevArrow } from '../../utils/helper';
import Slider from 'react-slick';
import './blogPage.scss';
import Grid from '@material-ui/core/Grid';
import LoadingImg from '../../components/loadding-img/LoaddingImg';
import { useProductContext } from '../../context/product_context';
import { scrollToTop } from '../../utils/helper';
import { Link } from 'react-router-dom';
const BlogPage = () => {
  const { blogs } = useProductContext();
  const [currentPage, setCurrentPage] = useState(0);
  const blogPerPage = 4;
  const [pageNumbers, setPageNumbers] = useState(0);

  useEffect(() => {
    setPageNumbers(Math.round(blogs.length / blogPerPage));
    // eslint-disable-next-line
  }, []);

  const switchPage = (value) => {
    if (value === 'inc') {
      setCurrentPage((oldpage) => oldpage + 1);
    } else {
      setCurrentPage((oldpage) => oldpage - 1);
    }
  };

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
      <>
        <div className='insta-section margin'>
          <div className='insta-container section-content-wrapper none-margin'>
            <Slider {...settingsBlog}>
              {Array.from({ length: 3 }, (_, i) => i).map((blog, index) => {
                return (
                  <article className='blog-slide position' key={index}>
                    <Link to='#'>
                      <LoadingImg classImg={'img-blog'} />
                    </Link>
                  </article>
                );
              })}
            </Slider>
          </div>
        </div>
        <div className='sale-section'>
          <div className='sale-container section-container'>
            <div className='sale-wrapper section-content-wrapper'>
              <div className='sale-product-wrapper'>
                <Grid container className='section-grid-content-wrapper'>
                  {Array.from({ length: blogPerPage }, (_, i) => i).map(
                    (blog, index) => {
                      return (
                        <Grid item xs={12} sm={6} key={index}>
                          <BlogItem />
                        </Grid>
                      );
                    }
                  )}
                </Grid>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
  return (
    <div className='content'>
      <div className='insta-section margin'>
        <div className='insta-container section-content-wrapper none-margin'>
          <Slider {...settingsBlog}>
            {blogs.slice(0, 4).map((blog, index) => {
              return (
                <article className='blog-slide position' key={index}>
                  <Link to='#'>
                    <div
                      className='img-blog'
                      style={{ backgroundImage: `url(${blog.img})` }}
                    ></div>
                  </Link>
                  <div className='blog-page-post-info'>
                    <span className='post-author'>
                      by <span className='bold'>{blog.author}</span>
                    </span>
                    <h4 className='post-title'>
                      <Link to='#'>{blog.postTitle}</Link>
                    </h4>
                    <span className='post-time'>
                      <span className='bold'>
                        <time dateTime='2020-04-06T02:17:00Z'>
                          April 6, 2020
                        </time>
                      </span>
                    </span>
                  </div>
                </article>
              );
            })}
          </Slider>
        </div>
      </div>
      <div className='sale-section'>
        <div className='sale-container section-container'>
          <div className='sale-wrapper section-content-wrapper'>
            <div className='sale-product-wrapper'>
              {blogs.length === 0 ? (
                <h2>LOADIING</h2>
              ) : (
                <Grid container className='section-grid-content-wrapper'>
                  {blogs
                    .slice(
                      currentPage * blogPerPage,
                      currentPage * blogPerPage + blogPerPage
                    )
                    .map((blog, index) => {
                      return (
                        <Grid item xs={12} sm={6} key={index}>
                          <BlogItem blog={blog} hideContent={true} />
                        </Grid>
                      );
                    })}
                </Grid>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className='pagination'>
        <div className='section-container'>
          <div className='section-content-wrapper bottom margin center'>
            <button
              className={
                currentPage === 0 ? 'pagination-btn none' : 'pagination-btn'
              }
              onClick={() => {
                switchPage('dec');
                scrollToTop(300);
              }}
            >
              Prev
            </button>
            {Array.from({ length: pageNumbers }, (_, i) => i).map(
              (a, index) => {
                return (
                  <button
                    key={index}
                    className={
                      index === currentPage
                        ? 'number-pagination-btn actived'
                        : 'number-pagination-btn'
                    }
                    onClick={() => {
                      setCurrentPage(index);
                      scrollToTop(300);
                    }}
                  >
                    {index + 1}
                  </button>
                );
              }
            )}
            <button
              className={
                currentPage === pageNumbers - 1 || blogs.length === 0
                  ? 'pagination-btn none'
                  : 'pagination-btn'
              }
              onClick={() => {
                switchPage('inc');
                scrollToTop(300);
              }}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPage;
