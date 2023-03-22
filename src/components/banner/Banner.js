import React from 'react';
import './banner.scss';
import Grid from '@material-ui/core/Grid';
import LoaddingImg from '../loadding-img/LoaddingImg';
import { Link } from 'react-router-dom';
import { useFilterContext } from '../../context/filter_context';
import { useProductContext } from '../../context/product_context';
const BannerBlog = () => {
  const { banners } = useProductContext();

  const { filterCategoryUpdate } = useFilterContext();
  if (banners.length > 0) {
    return (
      <div className='banner-section'>
        <div className='banner-container'>
          <div className='section-content-wrapper'>
            <Grid container className='section-grid-content-wrapper'>
              {banners.map((banner, index) => {
                return (
                  <Grid item sx={12} sm={6} md={6} lg={6} key={banner.id}>
                    <div className='banner-content'>
                      <Link
                        to={banner.link}
                        onClick={() => filterCategoryUpdate('All', true)}
                      >
                        <div
                          className='banner-img'
                          style={{
                            backgroundImage: `url(${banner.img})`,
                          }}
                        ></div>
                      </Link>
                      {/* change h3 h4 */}
                      {index % 2 === 0 ? (
                        <div className='banner-title'>
                          <h3>{banner.bigText}</h3>
                          <h4>{banner.smallText}</h4>
                        </div>
                      ) : (
                        <div className='banner-title'>
                          <h4>{banner.smallText}</h4>
                          <h3>{banner.bigText}</h3>
                        </div>
                      )}
                    </div>
                  </Grid>
                );
              })}
            </Grid>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className='banner-section'>
      <div className='banner-container'>
        <div className='section-content-wrapper'>
          <Grid container className='section-grid-content-wrapper'>
            {Array.from({ length: 2 }, (_, i) => i).map((a, index) => {
              return (
                <Grid item sx={12} sm={6} md={6} lg={6} key={index}>
                  <div className='banner-content'>
                    <Link to=''>
                      <LoaddingImg classImg={'banner-img'} />
                    </Link>
                  </div>
                </Grid>
              );
            })}
          </Grid>
        </div>
      </div>
    </div>
  );
};

export default BannerBlog;
