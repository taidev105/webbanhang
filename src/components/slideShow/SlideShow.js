import React, { useState, useEffect } from 'react';
import './slideShow.scss';
import blur from '../../assets/blur.jpeg';
import { useProductContext } from '../../context/product_context';
import { useFilterContext } from '../../context/filter_context';
import { Link } from 'react-router-dom';

const SlideShow = () => {
  const { slideShows: slides } = useProductContext();
  const { filterCategoryUpdate } = useFilterContext();
  const [slideIdex, setSlideIndex] = useState(0);
  const [mouseDown, setMouseDown] = useState(0);
  const [mouseUp, setMouseUp] = useState(0);

  useEffect(() => {
    document
      .querySelector('.section-slide-show-inner')
      .addEventListener('mousedown', (e) => {
        e.preventDefault();
        setMouseDown(e.x);
      });
    document
      .querySelector('.section-slide-show-inner')
      .addEventListener('mouseup', (e) => {
        setMouseUp(e.x);
      });
    document
      .querySelector('.section-slide-show-inner')
      .addEventListener('touchstart', (e) => {
        e.preventDefault();
        setMouseDown(e.touches[0].clientX);
      });
    document
      .querySelector('.section-slide-show-inner')
      .addEventListener('touchend', (e) => {
        setMouseUp(e.changedTouches[0].clientX);
      }); // eslint-disable-next-line
  }, []);
  useEffect(() => {
    if (mouseDown !== mouseUp) {
      if (mouseDown > mouseUp) {
        setSlideIndex((oldTest) => {
          let newTest = oldTest + 1;
          if (newTest > 3) {
            newTest = 0;
          }
          return newTest;
        });
      }
      if (mouseDown < mouseUp) {
        setSlideIndex((oldTest) => {
          let newTest = oldTest - 1;
          if (newTest < 0) {
            newTest = 3;
          }
          return newTest;
        });
      }
    }
    setMouseDown(0);
    setMouseUp(0); // eslint-disable-next-line
  }, [mouseUp]);
  useEffect(() => {
    const timer = setTimeout(() => {
      setSlideIndex((oldTest) => {
        let newTest = oldTest + 1;
        if (newTest > 3) {
          newTest = 0;
        }
        return newTest;
      });
    }, 5000);
    return () => {
      clearTimeout(timer);
    };
  }, [slideIdex]);

  if (slides.length === 0) {
    return (
      <div className='section-slide-show-inner'>
        <div className='section-slide-show-inner-loadding '>
          <img src={blur} alt='empty' className='img-loading' />
        </div>
        <div className='slide-dot-button-container'>
          {Array.from({ length: 4 }, (_, i) => i).map((a, index) => {
            return <button className='slide-dot-btn' key={index}></button>;
          })}
        </div>
      </div>
    );
  }
  return (
    <div className='section-slide-show-inner'>
      <div className='slides'>
        {slides.map((slide, index) => {
          const { img, position, title, text, link, filter } = slide;
          let classa;
          if (index === slideIdex) {
            classa = 'slide-actived';
          }
          if (index === slideIdex - 1) {
            classa = 'slide-left';
          }
          // if index = 0 so left is 3
          if (index === slideIdex + 1) {
            classa = 'slide-right';
          }
          if (index === 3 && slideIdex - 1 < 0) {
            classa = 'slide-left';
          }
          if (index === 0 && slideIdex + 1 > 3) {
            classa = 'slide-right';
          }
          return (
            <div className={`slide ${classa || 'slide-right'}`} key={index}>
              <div className={`slide-content slide-content-${position}`}>
                <div className='slide-content-caption'>
                  <div className='slide-content-title'>
                    <p>{title}</p>
                  </div>
                  <div className='slide-content-text'>
                    <p>{text}</p>
                  </div>
                  <Link
                    to={link}
                    onClick={() => filterCategoryUpdate('All', filter)}
                    className='slide-link-btn'
                  >
                    Explore Now
                  </Link>
                </div>
              </div>
              <div className='img-container'>
                <div className='overlay-img'>
                  <img className='slide-img' src={img} alt='' />
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className='slide-dot-button-container'>
        {slides.map((a, index) => {
          return (
            <button
              key={index}
              className={slideIdex === index ? 'slide-dot-btn-actived' : null}
              onClick={() => setSlideIndex(index)}
            ></button>
          );
        })}
      </div>
    </div>
  );
};

export default SlideShow;
