import React, { useEffect, useState } from 'react';
import './navbar.scss';
import NavButton from '../navButton/Navbutton';
import logo from '../../assets/logo.svg';
import ReorderIcon from '@material-ui/icons/Reorder';
import { useButtonContext } from '../../context/button_context';
import { Link } from 'react-router-dom';
import { useProductContext } from '../../context/product_context';
import { useFilterContext } from '../../context/filter_context';
import Grid from '@material-ui/core/Grid';
import wowmen2 from '../../assets/wowmen2.jpg';
import men from '../../assets/men.jpg';
import Slider from 'react-slick';
import { NextArrow, PrevArrow } from '../../utils/helper';
import ProductMiniItem from '../product-mini-item/ProductMiniItem';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import { scrollToTop } from '../../utils/helper';
import CartToolBar from '../cart-tool-bar/CartToolBar';

const Navbar = () => {
  const { miniAction, currentPage } = useButtonContext();
  const { saleProducts: sale } = useProductContext();
  const { filterCategoryUpdate } = useFilterContext();
  const [hiddenToolbar, setHiddenToolbar] = useState(true);
  const [hiddenBackBTN, setHiddenBackBTN] = useState(false);
  const [hiddenNavbar, setHiddenNavbar] = useState(true);
  const [subHover, setSubHover] = useState(true);
  const { category } = useProductContext();
  const [left, setLeft] = useState('-100%');
  //  singleProduct;
  useEffect(() => {
    document
      .querySelector('.sub-menu-slider-wrapper')
      .addEventListener('mousedown', (e) => {
        e.preventDefault();
      });
    let prevScrollpos = window.pageYOffset;
    window.onscroll = function () {
      const currentScrollPos = window.pageYOffset;

      if (prevScrollpos < currentScrollPos && currentScrollPos > 75) {
        setHiddenNavbar(false);
      } else {
        setHiddenNavbar(true);
      }
      //set btn
      if (currentScrollPos > 75) {
        setHiddenBackBTN(false);
      } else {
        setHiddenBackBTN(true);
      }
      //set toolbar
      if (currentPage.split('/')[1] === 'singleProduct') {
        if (currentScrollPos > 590) {
          setHiddenToolbar(false);
        } else {
          setHiddenToolbar(true);
        }
      } else {
        setHiddenToolbar(true);
      }

      if (currentPage === '/about') {
        const videoEle = document.querySelector('.video-container');
        if (videoEle) {
          const heightVideo =
            document.querySelector('.video-container').offsetHeight + 75;
          const widthLetter =
            document.querySelector('.under-letter').offsetWidth;
          if (currentScrollPos > heightVideo) {
            const left = currentScrollPos - heightVideo - widthLetter - 10;
            setLeft(left);
          } else {
            setLeft(-10000);
          }
        }
      }
      prevScrollpos = currentScrollPos;
    }; // eslint-disable-next-line
  }, [currentPage]);
  const handleSubHover = () => {
    setSubHover(false);
    setTimeout(() => {
      setSubHover(true);
    }, 500);
  };

  var settingSlide = {
    speed: 600,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 0,
    infinite: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          initialSlide: 0,
        },
      },
    ],
  };
  return (
    <>
      <div className={hiddenNavbar ? 'nav' : 'nav hidden'}>
        <div className='navbar'>
          <div className='logo-wrapper'>
            <button
              className='nav-toggle-btn'
              onClick={() => miniAction('open', 'SideBar')}
            >
              <ReorderIcon style={{ fontSize: 30 }} />
            </button>
            <Link to='/' className='nav-logo'>
              <img src={logo} alt='' />
            </Link>
          </div>
          <div className='nav-links-wrapper'>
            <Link to='/' className='nav-logo'>
              <img src={logo} alt='' />
            </Link>
            <ul className='nav-links'>
              <li>
                <Link to='/'>Home</Link>
              </li>
              <li>
                <button className='nav-button'>Products</button>
                <div
                  className={
                    subHover
                      ? 'sub-menu-wrapper '
                      : 'sub-menu-wrapper no-pointer'
                  }
                >
                  <Grid container>
                    <Grid item sm={4}>
                      <Link
                        to='/products'
                        onClick={() => {
                          filterCategoryUpdate('Women');
                          handleSubHover();
                        }}
                        className='submenu-img-wrapper margin-left'
                      >
                        <div
                          className='submenu-img'
                          style={{
                            backgroundImage: `url(${wowmen2})`,
                          }}
                        ></div>
                        <button className='submenu-img-btn'>Wowmen</button>
                      </Link>
                    </Grid>
                    <Grid item sm={4}>
                      <Link
                        to='/products'
                        onClick={() => {
                          filterCategoryUpdate('Men');
                          handleSubHover();
                        }}
                        className='submenu-img-wrapper'
                      >
                        <div
                          className='submenu-img'
                          style={{
                            backgroundImage: `url(${men})`,
                          }}
                        ></div>
                        <button className='submenu-img-btn'>Men</button>
                      </Link>
                    </Grid>
                    <Grid item sm={4}>
                      <ul className='sub-menu small-width '>
                        {category.map((category, index) => {
                          return (
                            <li key={index}>
                              <Link
                                to='/products'
                                onClick={() => {
                                  filterCategoryUpdate(category);
                                  handleSubHover();
                                }}
                              >
                                {category}
                              </Link>
                            </li>
                          );
                        })}
                      </ul>
                    </Grid>
                  </Grid>
                </div>
              </li>
              <li>
                <button className='nav-button' style={{ color: 'red' }}>
                  Sale
                </button>
                <div
                  className={
                    subHover
                      ? 'sub-menu-wrapper submenu-slide '
                      : 'sub-menu-wrapper submenu-slide no-pointer'
                  }
                >
                  <Grid container>
                    <Grid item sm={2}>
                      <div className='sub-menu-slider-menu-wrapper'>
                        <ul className='sub-menu text-align '>
                          {category.slice(0, 7).map((category, index) => {
                            return (
                              <li key={index}>
                                <Link
                                  to='/products'
                                  onClick={() => {
                                    filterCategoryUpdate(category, true);
                                    handleSubHover();
                                  }}
                                >
                                  {category}
                                </Link>
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                    </Grid>
                    <Grid item sm={10}>
                      <div className='sub-menu-slider-wrapper '>
                        <Slider {...settingSlide}>
                          {sale.map((product, index) => {
                            return (
                              <ProductMiniItem
                                product={product}
                                key={index}
                                handleSubHover={handleSubHover}
                              />
                            );
                          })}
                        </Slider>
                      </div>
                    </Grid>
                  </Grid>
                </div>
              </li>
              <li>
                <Link to='/about'>About</Link>
              </li>
              <li>
                <Link to='/blog'>Blog</Link>
              </li>
            </ul>
          </div>
          <NavButton />
        </div>
      </div>
      <CartToolBar hiddenToolbar={hiddenToolbar} />
      <div
        className={
          !hiddenToolbar
            ? 'back-to-top-btn-wrapper top'
            : 'back-to-top-btn-wrapper'
        }
      >
        <button
          onClick={scrollToTop}
          className={
            hiddenBackBTN ? 'back-to-top-btn' : 'back-to-top-btn hidden'
          }
        >
          <ExpandLessIcon />
        </button>
      </div>
      {currentPage === '/about' && (
        <div className='under-letter' style={{ left: `${left}px` }}>
          <img src={logo} alt='empty' />
        </div>
      )}
    </>
  );
};

export default Navbar;
