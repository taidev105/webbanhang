import React, { useState, useEffect } from 'react';
import './instagram.scss';
import Slider from 'react-slick';
import { secShippings } from '../../utils/data';
import { BiChevronRight, BiChevronLeft } from 'react-icons/bi';
import Grid from '@material-ui/core/Grid';
import Loadding from '../loadding-img/LoaddingImg';
import { getLinkApi } from '../../utils/helper';
import { useProductContext } from '../../context/product_context';
import { useButtonContext } from '../../context/button_context';
const Instagram = () => {
  const [instas, setInstas] = useState([]);
  const { getSingleProductTSP } = useProductContext();
  const { miniAction } = useButtonContext();
  useEffect(() => {
    document
      .querySelector('.insta-section')
      .addEventListener('mousedown', (e) => {
        e.preventDefault();
      });
    const fetchData = async () => {
      // const res = await fetch(getLinkApi('instagram'));
      // const resLink = await fetch(getLinkApi('instagramLinking'));
      const [res, resLink] = await Promise.all([
        fetch(getLinkApi('instagram')),
        fetch(getLinkApi('instagramLinking')),
      ]);
      const data = await res.json();
      const dataLink = await resLink.json();

      const newInstas = data.records.map((record) => {
        const link = record.fields.instagramLinking.map((id) => {
          return dataLink.records.find((link) => link.id === id).fields;
        });
        return {
          ...record.fields,
          instagramLinking: link,
          img: record.fields.img[0].thumbnails.large.url,
        };
      });

      setInstas(newInstas);
    };
    fetchData(); // eslint-disable-next-line
  }, []);
  const NextArrow = ({ onClick }) => {
    return (
      <div className='next-arrow' onClick={onClick}>
        <BiChevronRight />
      </div>
    );
  };
  const PrevArrow = ({ onClick }) => {
    return (
      <div className='prev-arrow' onClick={onClick}>
        <BiChevronLeft />
      </div>
    );
  };
  var settingsInsta = {
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 6,
    infinite: false,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
          initialSlide: 0,
        },
      },
      {
        breakpoint: 765,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 0,
        },
      },
    ],
  };
  if (instas.length === 0) {
    return (
      <>
        <div className='insta-section'>
          <div className='insta-container section-content-wrapper'>
            <div className='section-title-container'>
              <h3>
                <span>@ FOLLOW US ON INSTAGRAM</span>
              </h3>
            </div>
            <Slider {...settingsInsta}>
              {Array.from({ length: 4 }, (_, i) => i).map((insta, index) => {
                return (
                  <div className='insta-content' key={index}>
                    <Loadding classImg={'insta-img'} />
                  </div>
                );
              })}
            </Slider>
          </div>
        </div>
        <div className='shipping-section'>
          <div className='shipping-container section-container'>
            <div className='shipping-content-wrapper '>
              <Grid container className='section-grid-content-wrapper'>
                {secShippings.map((secShipping, index) => {
                  return (
                    <Grid item sx={12} sm={6} md={3} index={index} key={index}>
                      <div className='shipping-content'>
                        <div className='shipping-icon'>{secShipping.icon}</div>
                        <div className='shipping-info'>
                          <h3 className='shipping-title'>
                            {secShipping.title}
                          </h3>
                          <span className='shipping-content'>
                            {secShipping.content}
                          </span>
                        </div>
                      </div>
                    </Grid>
                  );
                })}
              </Grid>
            </div>
          </div>
        </div>
      </>
    );
  }
  return (
    <>
      <div className='insta-section'>
        <div className='insta-container section-content-wrapper'>
          <div className='section-title-container'>
            <h3>
              <span>@ FOLLOW US ON INSTAGRAM</span>
            </h3>
          </div>
          <Slider {...settingsInsta}>
            {instas.map((insta, index) => {
              return (
                <div className='insta-content' key={index}>
                  <div
                    className='insta-img'
                    style={{ backgroundImage: `url(${insta.img})` }}
                  ></div>
                  {insta.instagramLinking.map((item, index) => {
                    return (
                      <button
                        key={index}
                        style={{ top: `${item.top}%`, left: `${item.left}%` }}
                        onClick={() => {
                          getSingleProductTSP(item.singleProductID[0]);
                          miniAction('open', 'SingleProductModal');
                        }}
                      >
                        {index + 1}
                      </button>
                    );
                  })}
                </div>
              );
            })}
          </Slider>
        </div>
      </div>
      <div className='shipping-section'>
        <div className='shipping-container section-container'>
          <div className='shipping-content-wrapper '>
            <Grid container className='section-grid-content-wrapper'>
              {secShippings.map((secShipping, index) => {
                return (
                  <Grid item sx={12} sm={6} md={3} key={index}>
                    <div className='shipping-content'>
                      <div className='shipping-icon'>{secShipping.icon}</div>
                      <div className='shipping-info'>
                        <h3 className='shipping-title'>{secShipping.title}</h3>
                        <span className='shipping-content'>
                          {secShipping.content}
                        </span>
                      </div>
                    </div>
                  </Grid>
                );
              })}
            </Grid>
          </div>
        </div>
      </div>
    </>
  );
};

export default Instagram;
