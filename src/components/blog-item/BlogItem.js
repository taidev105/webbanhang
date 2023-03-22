import React from 'react';
import './blogItem.scss';
import LoadingImg from '../loadding-img/LoaddingImg';
import { Link } from 'react-router-dom';
const BlogItem = ({ blog, hideContent }) => {
  if (blog) {
    return (
      <article className='blog-slide padding' key={blog.id}>
        <Link to='#'>
          <div
            className='img-blog'
            style={{ backgroundImage: `url(${blog.img})` }}
          ></div>
        </Link>
        <div className='post-info'>
          <h4 className='post-title'>
            <Link to='#'>{blog.postTitle}</Link>
          </h4>
          <span className='post-author'>
            by <span className='bold'>{blog.author}</span>
          </span>
          <span className='post-time'>
            on{' '}
            <span className='bold'>
              <time dateTime='2020-04-06T02:17:00Z'>April 6, 2020</time>
            </span>
          </span>
        </div>
        {!hideContent && (
          <div className='post-content'>
            <span>{blog.content}</span>
          </div>
        )}
      </article>
    );
  }
  return (
    <article className='blog-slide padding'>
      <Link to='#'>
        <LoadingImg classImg={'img-blog'} />
      </Link>
      <div className='post-info'>
        <h4 className='post-title'>
          <Link to='#'>Style Advice All Men Should Hear</Link>
        </h4>
        <span className='post-author'>
          by <span className='bold'>admin</span>
        </span>
        <span className='post-time'>
          on{' '}
          <span className='bold'>
            <time dateTime='2020-04-06T02:17:00Z'>April 6, 2020</time>
          </span>
        </span>
      </div>
    </article>
  );
};

export default BlogItem;
