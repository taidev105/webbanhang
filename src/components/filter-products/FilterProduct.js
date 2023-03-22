import React, { useState, useEffect } from 'react';
import './filterProduct.scss';
import Grid from '@material-ui/core/Grid';
import Filter from '../filter/Filter';
import FilterListOutlinedIcon from '@material-ui/icons/FilterListOutlined';
import ProductMiniItem from '../product-mini-item/ProductMiniItem';
import { useButtonContext } from '../../context/button_context';
import { useFilterContext } from '../../context/filter_context';
import { useProductContext } from '../../context/product_context';
import SortIcon from '@material-ui/icons/Sort';
import { scrollToTop } from '../../utils/helper';
import ProductMiniLoading from '../product-mimi-loading/ProductMiniLoading';

const FilterProduct = () => {
  const {
    filteredProducts: products,
    sortUpdate,
    clearAllFilter,
    filter: { category },
  } = useFilterContext();
  const [numberGrid, setNumberGrid] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const productPerPage = 8;
  const [pageNumbers, setPageNumbers] = useState(0);
  const { miniAction } = useButtonContext();
  const { productsLoading } = useProductContext();

  const actionOpenFilterMini = () => {
    miniAction('open', 'FilterMini');
  };
  const actionOpenSortMini = () => {
    miniAction('open', 'SortMini');
  };
  const switchPage = (value) => {
    if (value === 'inc') {
      setCurrentPage((oldpage) => oldpage + 1);
    } else {
      setCurrentPage((oldpage) => oldpage - 1);
    }
  };
  useEffect(() => {
    if (products) {
      setCurrentPage(0);
      setPageNumbers(Math.round(products.length / productPerPage));
    }
  }, [products]);
  if (!products) {
    return <h2>Sorry, no products matched your search.</h2>;
  }
  return (
    <div className='filter-and-product-section'>
      <div className='filter-and-product-container section-container'>
        <div className='filter-and-product-wrapper section-content-wrapper'>
          <div className='filter-and-product-header'>
            <div className='filter-btn' onClick={actionOpenFilterMini}>
              <FilterListOutlinedIcon />
              <span>Filter</span>
            </div>
            <div className='product-view'>
              {Array.from({ length: 2 }, (_, i) => i).map((a, index) => {
                return (
                  <div
                    className={`product-view-btn column${index + 2} ${
                      numberGrid === index && 'active'
                    }`}
                    key={index}
                    onClick={() => setNumberGrid(index)}
                  ></div>
                );
              })}
            </div>
            <div className='sort-btn-wrapper'>
              <div className='filter-btn' onClick={actionOpenSortMini}>
                <SortIcon />
                <span>Sort</span>
              </div>
              <select
                className='filter-select'
                name='product_type'
                onChange={sortUpdate}
              >
                <option value='lowest'>Price (lowest)</option>
                <option value='highest'>Price (highest)</option>
                <option value='A-Z'>name (A-Z)</option>
                <option value='Z-A'>name (Z-A)</option>
              </select>
            </div>
          </div>
          <Grid container>
            <Grid item md={3} lg={3}>
              <div className='wrapper-filter'>
                <Filter />
              </div>
            </Grid>
            {productsLoading && (
              <Grid
                container
                item
                xs={12}
                sm={12}
                md={9}
                lg={9}
                className='section-grid-content-wrapper'
              >
                {Array.from({ length: 6 }, (_, i) => i).map((item, index) => {
                  return (
                    <Grid
                      item
                      key={index}
                      xs={12 / (numberGrid + 2)}
                      sm={12 / (numberGrid + 2)}
                      md={12 / (numberGrid + 2)}
                      lg={12 / (numberGrid + 2)}
                    >
                      <ProductMiniLoading />
                    </Grid>
                  );
                })}
              </Grid>
            )}
            {products.length === 0 ? (
              <Grid
                container
                item
                xs={12}
                sm={12}
                md={9}
                lg={9}
                className='section-grid-content-wrapper'
              >
                <h2 className='no-match-product'>
                  Sorry, no products matched your search.
                  <br />
                  <span onClick={clearAllFilter}>Clear Filters</span>
                </h2>
              </Grid>
            ) : (
              <Grid
                container
                item
                xs={12}
                sm={12}
                md={9}
                lg={9}
                className='section-grid-content-wrapper'
              >
                {products
                  .slice(
                    currentPage * productPerPage,
                    currentPage * productPerPage + productPerPage
                  )
                  .map((product, index) => (
                    <Grid
                      key={index}
                      item
                      xs={12 / (numberGrid + 2)}
                      sm={12 / (numberGrid + 2)}
                      md={12 / (numberGrid + 2)}
                      lg={12 / (numberGrid + 2)}
                    >
                      <ProductMiniItem
                        product={product}
                        page={'products'}
                        category={category}
                        paginationPage={currentPage}
                      />
                    </Grid>
                  ))}
                <Grid item xs={12} sm={12} md={12} lg={12}>
                  <div className='pagination'>
                    <div className='section-container'>
                      <div className='section-content-wrapper bottom margin center'>
                        <button
                          className={
                            currentPage === 0
                              ? 'pagination-btn none'
                              : 'pagination-btn'
                          }
                          onClick={() => {
                            switchPage('dec');
                            scrollToTop(200);
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
                                  scrollToTop(200);
                                }}
                              >
                                {index + 1}
                              </button>
                            );
                          }
                        )}
                        <button
                          className={
                            currentPage === pageNumbers - 1 ||
                            products.length < productPerPage
                              ? 'pagination-btn none'
                              : 'pagination-btn'
                          }
                          onClick={() => {
                            switchPage('inc');
                            scrollToTop(200);
                          }}
                        >
                          Next
                        </button>
                      </div>
                    </div>
                  </div>
                </Grid>
              </Grid>
            )}
          </Grid>
        </div>
      </div>
    </div>
  );
};

export default FilterProduct;
