import React from 'react';
import './collectionList.scss';
import Grid from '@material-ui/core/Grid';
import Loading from '../loadding-img/LoaddingImg';
import { Link } from 'react-router-dom';
import { useFilterContext } from '../../context/filter_context';
import { useProductContext } from '../../context/product_context';

const CollectionList = () => {
  const { collections: colls } = useProductContext();
  const { filterCategoryUpdate } = useFilterContext();
  // useEffect(() => {
  //   fetchData('collection', setColls, 'full');
  // }, []);

  const find = (position, imgTitleLink) => {
    return colls.find((coll) => coll.position === position)[imgTitleLink];
  };
  return (
    <div className='section-collection-list'>
      <div className='collection-list-container section-container'>
        <div className='collection-list '>
          <Grid container className='section-grid-content-wrapper '>
            <Grid item xs={12} sm={6} md={6} lg={6}>
              <div className='item-collection-content'>
                <Link
                  to='/products'
                  onClick={() =>
                    filterCategoryUpdate(`${find('left', 'link')}`)
                  }
                  className='item-collection-link'
                >
                  {colls.length > 0 ? (
                    <div
                      className='item-collection-img'
                      style={{
                        backgroundImage: `url(${find('left', 'img')})`,
                      }}
                    ></div>
                  ) : (
                    <Loading classImg={'item-collection-img'} />
                  )}
                </Link>
                {colls.length > 0 && (
                  <div className='item-collection-title'>
                    <h3>{find('left', 'title')}</h3>
                  </div>
                )}
              </div>
            </Grid>
            <Grid item xs={6} sm={3} md={3} lg={3}>
              <div className='row'>
                <div className='item-collection-content '>
                  <Link
                    to='/products'
                    onClick={() =>
                      filterCategoryUpdate(`${find('center-top', 'link')}`)
                    }
                    className='item-collection-link'
                  >
                    {colls.length > 0 ? (
                      <div
                        className='item-collection-img'
                        style={{
                          backgroundImage: `url(${find('center-top', 'img')})`,
                        }}
                      ></div>
                    ) : (
                      <Loading classImg={'item-collection-img'} />
                    )}
                  </Link>
                  {colls.length > 0 && (
                    <div className='item-collection-title'>
                      <h3>{find('center-top', 'title')}</h3>
                    </div>
                  )}
                </div>
                <div className='item-collection-content'>
                  <Link
                    to='/products'
                    onClick={() =>
                      filterCategoryUpdate(`${find('center-bottom', 'link')}`)
                    }
                    className='item-collection-link'
                  >
                    {colls.length > 0 ? (
                      <div
                        className='item-collection-img'
                        style={{
                          backgroundImage: `url(${find(
                            'center-bottom',
                            'img'
                          )})`,
                        }}
                      ></div>
                    ) : (
                      <Loading classImg={'item-collection-img'} />
                    )}
                  </Link>
                  {colls.length > 0 && (
                    <div className='item-collection-title'>
                      <h3>{find('center-bottom', 'title')}</h3>
                    </div>
                  )}
                </div>
              </div>
            </Grid>
            <Grid item xs={6} sm={3} md={3} lg={3}>
              <div className='item-collection-content'>
                <Link
                  to='/products'
                  onClick={() =>
                    filterCategoryUpdate(`${find('right', 'link')}`)
                  }
                  className='item-collection-link'
                >
                  {colls.length > 0 ? (
                    <div
                      className='item-collection-img'
                      style={{
                        backgroundImage: `url(${find('right', 'img')})`,
                      }}
                    ></div>
                  ) : (
                    <Loading classImg={'item-collection-img'} />
                  )}
                </Link>
                {colls.length > 0 && (
                  <div className='item-collection-title'>
                    <h3>{find('right', 'title')}</h3>
                  </div>
                )}
              </div>
            </Grid>
          </Grid>
        </div>
      </div>
    </div>
  );
};

export default CollectionList;
